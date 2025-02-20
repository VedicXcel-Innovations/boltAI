import React, { useEffect, useState, useContext } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Popover,
} from '@mui/material';
import AuthContext from '../AuthContext';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiBaseUrl = process.env.API_BASE_URL;

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const TransactionsPage = () => {
  const authContext = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [openRows, setOpenRows] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isItemPopupOpen, setItemPopupOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemUom, setNewItemUom] = useState('');
  const [openStockReport, setOpenStockReport] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDateAnchor, setStartDateAnchor] = useState(null);
  const [endDateAnchor, setEndDateAnchor] = useState(null);
  const [eventType, setEventType] = useState('');

  const [newTransaction, setNewTransaction] = useState({
    name: '',
    reason: '',
    description: '',
    items: [{ item_id: '', amount_modified: '' }],
  });

  useEffect(() => {
    if (!authContext.user) {
      return;
    }

    fetchTransactions();
    fetchItems();
    fetchInventory();
  }, [authContext.user]);

  const fetchInventory = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/inventory`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setInventory(data.data);
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
      toast.error('Failed to fetch inventory data', {
        position: 'top-center',
      });
    }
  };

  // Graph Data for Food
  const filteredData = inventory.filter(item => item.item_name !== 'Money');
  const labels = filteredData.map(item => item.item_name);
  const amountAvailableFood = filteredData.map(item => item.amount_available);
  const amountOnHoldFood = filteredData.map(item => item.amount_on_hold);
  const totals = filteredData.map(item => item.amount_available + item.amount_on_hold);
  const uomDataFood = filteredData.map(item => item.uom);

  const chartDataFood = {
    labels,
    datasets: [
      {
        label: 'Available',
        data: amountAvailableFood,
        uom: uomDataFood,
        backgroundColor: 'rgba(76, 175, 80, 0.6)',
        borderColor: 'rgba(76, 175, 80, 1)',
        borderWidth: 1,
      },
      {
        label: 'On Hold',
        data: amountOnHoldFood,
        uom: uomDataFood,
        backgroundColor: 'rgba(244, 67, 54, 0.6)',
        borderColor: 'rgba(244, 67, 54, 1)',
        borderWidth: 1,
      },
      {
        // Invisible dataset for Total (used only for datalabels)
        label: 'Total',
        data: totals,
        uom: uomDataFood,
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 0,
      },
    ],
  };

  const chartOptionsFood = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: tooltipItems => tooltipItems[0].label,
          label: tooltipItem => {
            const datasetLabel = tooltipItem.dataset.label;
            const value = tooltipItem.raw;
            const index = tooltipItem.dataIndex;
            const uom = tooltipItem.dataset.uom[index];

            if (datasetLabel === 'Available') {
              return `Available: ${value} ${uom}`;
            } else if (datasetLabel === 'On Hold') {
              return `On Hold: ${value} ${uom}`;
            } else if (datasetLabel === 'Total') {
              return `Total: ${value} ${uom}`;
            }
            return '';
          },
        },
      },
      datalabels: {
        color: '#000',
        anchor: context => {
          if (context.dataset.label === 'Total') {
            return 'start';
          }
          return 'center';
        },
        align: context => {
          if (context.dataset.label === 'Total') {
            return 'top';
          }
          return 'center';
        },
        formatter: (value, context) => {
          const index = context.dataIndex;
          const datasetLabel = context.dataset.label;
          const uom = context.dataset.uom[index];

          if (datasetLabel === 'Available' || datasetLabel === 'On Hold') {
            return `${value} ${uom}`;
          }
          if (datasetLabel === 'Total') {
            return `${value} ${uom}`;
          }
          return '';
        },
      },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  // Graph Data for Money
  const moneyItem = inventory.find(item => item.item_name === 'Money');
  const amountAvailableMoney = moneyItem ? moneyItem.amount_available : 0;
  const amountOnHoldMoney = moneyItem ? moneyItem.amount_on_hold : 0;
  const totalAmount = amountAvailableMoney + amountOnHoldMoney;
  const uomDataMoney = moneyItem ? moneyItem.uom : '';

  const chartDataMoney = {
    labels: ['Money'],
    datasets: [
      {
        label: 'Available',
        data: [amountAvailableMoney],
        uom: uomDataMoney,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'On Hold',
        data: [amountOnHoldMoney],
        uom: uomDataMoney,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total',
        data: [totalAmount],
        uom: uomDataMoney,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptionsMoney = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          title: () => 'Money',
          label: tooltipItem => {
            const datasetLabel = tooltipItem.dataset.label;
            const value = tooltipItem.raw;
            const uom = tooltipItem.dataset.uom;

            if (datasetLabel === 'Available') {
              return `Available: ${value} ${uom}`;
            } else if (datasetLabel === 'On Hold') {
              return `On Hold: ${value} ${uom}`;
            } else if (datasetLabel === 'Total') {
              return `Total: ${value} ${uom}`;
            }

            return '';
          },
        },
      },
      datalabels: {
        color: '#000',
        anchor: 'end',
        align: 'start',
        formatter: (value, context) => {
          const uom = context.dataset.uom;
          return `${value} ${uom}`;
        },
      },
    },
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/eventItems`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (data && data.data) {
        setItems(data.data);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error(`Failed to get items from inventory : ${error}`, {
        position: 'top-center',
      });
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/transaction/get-transactions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data from inventory');
      }
      const data = await response.json();
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Error fetching data from inventory:', error);
      toast.error('Failed to get data from inventory. Please try again later.', {
        position: 'top-center',
      });
    }
  };

  const toggleRow = id => {
    setOpenRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddItem = item => {
    if (!selectedItems.find(i => i.item_id === item.item_id)) {
      setSelectedItems([...selectedItems, { ...item, amount_modified: '' }]);
    }
  };

  const handleRemoveItem = itemId => {
    setSelectedItems(selectedItems.filter(item => item.item_id !== itemId));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...selectedItems];
    updatedItems[index][field] = value;
    setSelectedItems(updatedItems);
  };

  const handleSubmit = async () => {
    const transactionData = {
      transaction_type: 'ADD',
      description: newTransaction.description,
      name: newTransaction.name,
      reason: newTransaction.reason,
      items: selectedItems.map(({ item_id, amount_modified }) => ({
        item_id,
        quantity: parseInt(amount_modified, 10),
      })),
    };
    try {
      const response = await fetch(`${apiBaseUrl}/transaction/add-transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(transactionData),
      });
      const data = await response.json();
      if (response.ok) {
        setOpenModal(false);
        setSelectedItems([]);
        fetchTransactions();
        fetchInventory();
        toast.success('Transaction successful', {
          position: 'top-center',
        });
      } else {
        toast.error('Failed to create transaction', {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error(`Error submitting transaction : ${error}`, {
        position: 'top-center',
      });
    }
  };

  const handleAddNewItem = async () => {
    const userConfirmed = window.confirm('Do you really want to save this item?');
    if (!userConfirmed) {
      toast.error('Operation cancelled', { position: 'top-center' });

      setItemPopupOpen(false);
      setNewItemName('');
      setNewItemUom('');
      fetchItems();
      fetchInventory();

      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${apiBaseUrl}/eventItems/additem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          item_name: newItemName,
          uom: newItemUom,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add item');
      }

      toast.success('New item added successfully', { position: 'top-center' });

      setItemPopupOpen(false);
      setNewItemName('');
      setNewItemUom('');
      fetchItems();
      fetchInventory();
    } catch (error) {
      toast.error(`Error: ${error.message}`, { position: 'top-center' });
    }
  };

  const handleDownloadStockReport = async () => {
    if (!startDate || !endDate || !eventType) {
      toast.error('Please fill in all fields', {
        position: 'top-center',
      });
      return;
    }

    const requestBody = {
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      support_categories_id: eventType,
    };

    try {
      const response = await fetch(`${apiBaseUrl}/inventory/generate-excel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      if (result.success && result.fileUrl) {
        window.open(result.fileUrl, '_blank');
        toast.success('Stock report generated successfully', {
          position: 'top-center',
        });
      } else {
        toast.error('Failed to generate report', {
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error('Error fetching report:', error);
      toast.error('Error generating report', {
        position: 'top-center',
      });
    }

    setOpenStockReport(false);
  };

  const handleStartDateClick = event => {
    setStartDateAnchor(event.currentTarget);
  };

  const handleEndDateClick = event => {
    setEndDateAnchor(event.currentTarget);
  };

  const handleStartDateSelect = date => {
    setStartDate(date);
    setStartDateAnchor(null);
  };

  const handleEndDateSelect = date => {
    setEndDate(date);
    setEndDateAnchor(null);
  };

  const DoubleArrowDownIcon = ({ size = 24, color = 'blue' }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 10l6 6 6-6H6z" />
      <path d="M6 4l6 6 6-6H6z" />
    </svg>
  );

  const DoubleArrowUpIcon = ({ size = 24, color = 'skyblue' }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 14l-6-6-6 6h12z" />
      <path d="M18 20l-6-6-6 6h12z" />
    </svg>
  );

  return (
    <div className="container mx-auto mt-6 col-span-10 md:col-span-6 lg:col-span-8 xl:col-span-10 2xl:col-span-14 p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <Typography variant="h4" className="text-center text-blue-700 mb-8">
          <strong>Current Inventory Status</strong>
        </Typography>

        {/* **Inventory Table** */}
        <TableContainer component={Paper} className="mt-6 mb-8 shadow-md">
          <Table className="min-w-full">
            <TableHead className="bg-gray-300">
              <TableRow>
                <TableCell align="center" className="font-bold text-lg text-gray-700 px-6 py-4">
                  <strong>Item Name</strong>
                </TableCell>
                <TableCell align="center" className="font-bold text-lg text-gray-700 px-6 py-4">
                  <strong>Available Quantity</strong>
                </TableCell>
                <TableCell align="center" className="font-bold text-lg text-gray-700 px-6 py-4">
                  <strong>Hold Quantity</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.map(item => (
                <TableRow
                  key={item.item_id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <TableCell align="center" className="px-6 py-4 font-bold">
                    {item.item_name}
                  </TableCell>
                  <TableCell align="center" className="px-6 py-4 font-bold">
                    {item.amount_available} {item.uom}
                  </TableCell>
                  <TableCell align="center" className="px-6 py-4 font-bold">
                    {item.amount_on_hold} {item.uom}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Flex container for both charts */}
        <div className="flex justify-between mb-20">
          {/* Food Chart */}
          <div className="w-1/2 mr-4">
            <Typography variant="h5" className="text-center text-blue-700 mb-4">
              <strong>Food Stock Status</strong>
            </Typography>
            <Bar data={chartDataFood} options={chartOptionsFood} />
          </div>

          {/* Money Chart */}
          <div className="w-1/2 ml-4">
            <Typography variant="h5" className="text-center text-blue-700 mb-4">
              <strong>Financial Stock Status</strong>
            </Typography>
            <Bar data={chartDataMoney} options={chartOptionsMoney} />
          </div>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (authContext.user?.role !== 'admin') {
                toast.error('Access Denied: Admin privileges required', { position: 'top-center' });
                return;
              }
              setItemPopupOpen(true);
            }}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1.25rem',
              padding: '0.75rem 2rem',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              marginRight: '3rem',
            }}
          >
            New Item
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={() => setOpenModal(true)}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1.25rem',
              padding: '0.75rem 2rem',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              marginRight: '3rem',
            }}
          >
            New Transaction
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenStockReport(true)}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1.25rem',
              padding: '0.75rem 2rem',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              marginRight: '3rem',
            }}
          >
            Stock Report
          </Button>

          <Dialog
            open={openStockReport}
            onClose={() => setOpenStockReport(false)}
            PaperProps={{
              style: {
                borderRadius: '16px',
                padding: '16px',
                maxWidth: '500px',
                width: '100%',
                background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <DialogTitle
              sx={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#7E22CE',
                textAlign: 'center',
                borderBottom: '2px solid #e3f2fd',
                paddingBottom: '16px',
                marginBottom: '16px',
              }}
            >
              Generate Stock Report
            </DialogTitle>
            <DialogContent>
              <div className="space-y-6">
                <div className="mt-4">
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: '#2c3e50',
                      marginBottom: '8px',
                    }}
                  >
                    Start Date
                  </Typography>
                  <TextField
                    fullWidth
                    value={startDate ? format(startDate, 'PP') : ''}
                    onClick={handleStartDateClick}
                    placeholder="Select start date"
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#3f51b5',
                          },
                        },
                      },
                    }}
                  />
                  <Popover
                    open={Boolean(startDateAnchor)}
                    anchorEl={startDateAnchor}
                    onClose={() => setStartDateAnchor(null)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <DayPicker
                      mode="single"
                      selected={startDate}
                      onSelect={handleStartDateSelect}
                      classNames={{
                        caption: 'flex justify-center py-2 mb-4 relative items-center',
                        caption_label: 'text-sm font-medium text-gray-900',
                        nav: 'flex items-center',
                        nav_button:
                          'h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300',
                        nav_button_previous: 'absolute left-3',
                        nav_button_next: 'absolute left-6',
                        table: 'w-full border-collapse',
                        head_row: 'flex font-medium text-gray-900',
                        head_cell: 'm-0.5 w-9 font-normal text-sm',
                        row: 'flex w-full mt-2',
                        cell: 'text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                        day: 'h-9 w-9 p-0 font-normal',
                        day_selected: 'bg-blue-600 text-white hover:bg-blue-700',
                        day_today: 'bg-gray-200 text-gray-900',
                        day_outside: 'text-gray-500 opacity-50',
                        day_disabled: 'text-gray-500 opacity-50',
                        day_hidden: 'invisible',
                      }}
                      components={{
                        IconLeft: ({ ...props }) => (
                          <ChevronLeftIcon className="h-4 w-4 stroke-2" {...props} />
                        ),
                        IconRight: ({ ...props }) => (
                          <ChevronRightIcon className="h-4 w-4 stroke-2 " {...props} />
                        ),
                      }}
                    />
                  </Popover>
                </div>

                <div className="mt-4">
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: '#2c3e50',
                      marginBottom: '8px',
                    }}
                  >
                    End Date
                  </Typography>
                  <TextField
                    fullWidth
                    value={endDate ? format(endDate, 'PP') : ''}
                    onClick={handleEndDateClick}
                    placeholder="Select end date"
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#3f51b5',
                          },
                        },
                      },
                    }}
                  />
                  <Popover
                    open={Boolean(endDateAnchor)}
                    anchorEl={endDateAnchor}
                    onClose={() => setEndDateAnchor(null)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <DayPicker
                      mode="single"
                      selected={endDate}
                      onSelect={handleEndDateSelect}
                      classNames={{
                        caption: 'flex justify-center py-2 mb-4 relative items-center',
                        caption_label: 'text-sm font-medium text-gray-900',
                        nav: 'flex items-center',
                        nav_button:
                          'h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300',
                        nav_button_previous: 'absolute left-3',
                        nav_button_next: 'absolute left-6',
                        table: 'w-full border-collapse',
                        head_row: 'flex font-medium text-gray-900',
                        head_cell: 'm-0.5 w-9 font-normal text-sm',
                        row: 'flex w-full mt-2',
                        cell: 'text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                        day: 'h-9 w-9 p-0 font-normal',
                        day_selected: 'bg-blue-600 text-white hover:bg-blue-700',
                        day_today: 'bg-gray-200 text-gray-900',
                        day_outside: 'text-gray-500 opacity-50',
                        day_disabled: 'text-gray-500 opacity-50',
                        day_hidden: 'invisible',
                      }}
                      components={{
                        IconLeft: ({ ...props }) => (
                          <ChevronLeftIcon className="h-4 w-4 stroke-2" {...props} />
                        ),
                        IconRight: ({ ...props }) => (
                          <ChevronRightIcon className="h-4 w-4 stroke-2" {...props} />
                        ),
                      }}
                    />
                  </Popover>
                </div>

                <div className="mt-4">
                  <TextField
                    select
                    label="Event Type"
                    value={eventType}
                    onChange={e => setEventType(e.target.value)}
                    fullWidth
                    margin="dense"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'white',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#3f51b5',
                          },
                        },
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#e0e0e0',
                      },
                      '& .MuiInputLabel-root': {
                        color: '#2c3e50',
                        fontWeight: 500,
                      },
                    }}
                  >
                    <MenuItem value="11" sx={{ py: 1.5 }}>
                      Food Event
                    </MenuItem>
                    <MenuItem value="12" sx={{ py: 1.5 }}>
                      Financial Event
                    </MenuItem>
                  </TextField>
                </div>
              </div>
            </DialogContent>
            <DialogActions
              sx={{
                padding: '24px',
                borderTop: '2px solid #e3f2fd',
                marginTop: '16px',
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
              }}
            >
              <Button onClick={() => setOpenStockReport(false)} variant="contained" color="error">
                Cancel
              </Button>
              <Button onClick={handleDownloadStockReport} variant="contained" color="success">
                Download Report
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        {isItemPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full relative">
              {/* Popup Header */}
              <div className="flex items-center mb-4 relative">
                <h2 className="text-2xl font-semibold text-blue-700 text-center w-full">
                  Add New Food Item
                </h2>
                <button
                  onClick={() => setItemPopupOpen(false)}
                  className="absolute right-0 text-gray-500 hover:text-red-500 transition-all text-2xl font-bold"
                >
                  &times;
                </button>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Item Name Input */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Item Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newItemName}
                    onChange={e => setNewItemName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter Item Name"
                    required
                  />
                </div>

                {/* UOM Dropdown */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Unit of Measure (UOM) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newItemUom}
                    onChange={e => setNewItemUom(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    required
                  >
                    <option value="" disabled>
                      Select Unit
                    </option>
                    <option value="KG">KG</option>
                    <option value="Litre">Litre</option>
                  </select>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleAddNewItem}
                disabled={!newItemName || !newItemUom}
                className={`w-full mt-4 p-2 font-bold rounded-lg transition-all
          ${newItemName && newItemUom ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                Save
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-center items-center mt-10 mb-6">
          <Typography variant="h4" className="text-center text-purple-700 mb-8">
            <strong>Transaction History</strong>
          </Typography>
        </div>

        <TableContainer component={Paper} className="shadow-md">
          <Table className="min-w-full">
            <TableHead className="bg-gray-300">
              <TableRow>
                <TableCell align="center" className="w-16"></TableCell>
                <TableCell align="center" className="font-bold text-gray-700">
                  <strong>Ref. ID</strong>
                </TableCell>
                <TableCell align="center" className="font-bold text-gray-700">
                  <strong>Transaction Type</strong>
                </TableCell>
                <TableCell align="center" className="font-bold text-gray-700">
                  <strong>Transaction Name</strong>
                </TableCell>
                <TableCell align="center" className="font-bold text-gray-700">
                  <strong>Reason</strong>
                </TableCell>
                <TableCell align="center" className="font-bold text-gray-700">
                  <strong>Created By</strong>
                </TableCell>
                <TableCell align="center" className="font-bold text-gray-700">
                  <strong>Created At</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map(transaction => (
                <React.Fragment key={transaction.transaction_id}>
                  <TableRow className="hover:bg-gray-50 transition-colors duration-150">
                    <TableCell
                      align="center"
                      onClick={() => toggleRow(transaction.transaction_id)}
                      className="cursor-pointer"
                    >
                      {openRows[transaction.transaction_id] ? (
                        <DoubleArrowUpIcon />
                      ) : (
                        <DoubleArrowDownIcon />
                      )}
                    </TableCell>
                    <TableCell align="center">{transaction.reference_id}</TableCell>
                    <TableCell align="center">{transaction.transaction_type}</TableCell>
                    <TableCell align="center">{transaction.name}</TableCell>
                    <TableCell align="center">{transaction.reason}</TableCell>
                    <TableCell align="center">{transaction.created_by}</TableCell>
                    <TableCell align="center">
                      {new Date(transaction.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={7} style={{ padding: 0 }}>
                      <Collapse
                        in={openRows[transaction.transaction_id]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box className="p-4 bg-gray-50">
                          <Typography
                            variant="h5"
                            align="center"
                            className="font-bold text-purple-500 mb-5"
                          >
                            Transaction Description
                          </Typography>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">
                                  <strong>Item Name</strong>
                                </TableCell>
                                <TableCell align="center">
                                  <strong>Amount Modified</strong>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {transaction.items.map(item => (
                                <TableRow key={item.item_id}>
                                  <TableCell align="center">{item.item_name}</TableCell>
                                  <TableCell align="center">
                                    {item.amount_modified} {item.uom}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        className="flex items-center justify-center"
      >
        <Box
          className="bg-white rounded-xl shadow-2xl"
          sx={{
            width: '90%',
            maxWidth: '800px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            p: 6,
            border: '2px solid #e0e0e0',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#6B21A8',
              mb: 4,
              textAlign: 'center',
              letterSpacing: '0.5px',
            }}
          >
            Add New Transaction
          </Typography>

          <div className="overflow-y-auto flex-grow pr-4 space-y-6">
            {/* Form Fields */}
            <TextField
              fullWidth
              label="Transaction Name"
              variant="outlined"
              value={newTransaction.name}
              onChange={e => setNewTransaction({ ...newTransaction, name: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#3f51b5',
                  },
                },
              }}
              required
              error={!newTransaction.name} // Show error if the field is empty
              helperText={!newTransaction.name ? 'Transaction Name is required' : ''}
            />

            <TextField
              fullWidth
              label="Reason"
              variant="outlined"
              value={newTransaction.reason}
              onChange={e => setNewTransaction({ ...newTransaction, reason: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#3f51b5',
                  },
                },
              }}
              required
              error={!newTransaction.reason} // Show error if the field is empty
              helperText={!newTransaction.reason ? 'Reason is required' : ''}
            />

            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              value={newTransaction.description}
              onChange={e => setNewTransaction({ ...newTransaction, description: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#3f51b5',
                  },
                },
              }}
            />

            {/* Available Items Section */}
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontWeight: 600,
                color: '#6B21A8',
                mt: 4,
                mb: 2,
              }}
            >
              Available Items
            </Typography>

            <Paper
              elevation={3}
              sx={{
                p: 3,
                maxHeight: '200px',
                overflow: 'auto',
                borderRadius: '16px',
                backgroundColor: '#f5f5f5',
              }}
            >
              {items.map(item => (
                <div
                  key={item.item_id}
                  className="flex items-center justify-between p-3 hover:bg-white rounded-lg transition-all duration-200 mb-2"
                >
                  <Typography sx={{ fontWeight: 500 }}>
                    {item.item_name} ({item.uom})
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleAddItem(item)}
                    size="small"
                    sx={{
                      borderRadius: '8px',
                      minWidth: '100px',
                      textTransform: 'none',
                      borderColor: '#3f51b5',
                      color: '#3f51b5',
                      '&:hover': {
                        borderColor: '#1a237e',
                        backgroundColor: 'rgba(63, 81, 181, 0.04)',
                      },
                    }}
                  >
                    Add
                  </Button>
                </div>
              ))}
            </Paper>

            {/* Selected Items Section */}
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontWeight: 600,
                color: '#6B21A8',
                mt: 4,
                mb: 2,
              }}
            >
              Selected Items
            </Typography>

            <div className="space-y-3">
              {selectedItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-blue-50 p-4 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <Typography sx={{ minWidth: '150px', fontWeight: 500 }}>
                    {item.item_name}
                  </Typography>
                  <TextField
                    label="Amount"
                    type="number"
                    size="small"
                    value={item.amount_modified}
                    onChange={e => handleItemChange(index, 'amount_modified', e.target.value)}
                    sx={{
                      flexGrow: 1,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveItem(item.item_id)}
                    size="small"
                    sx={{
                      borderRadius: '8px',
                      textTransform: 'none',
                      boxShadow: 'none',
                      '&:hover': {
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-center gap-4 mt-8 pt-4 border-t border-gray-200">
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenModal(false)}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
                padding: '0.5rem 1.5rem',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              disabled={
                !newTransaction.name || !newTransaction.reason || selectedItems.length === 0
              }
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
                padding: '0.5rem 1.5rem',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default TransactionsPage;
