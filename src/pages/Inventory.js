import React, { useEffect, useState, useRef } from 'react';
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
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiBaseUrl = process.env.API_BASE_URL;

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [openRows, setOpenRows] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [newTransaction, setNewTransaction] = useState({
    name: '',
    reason: '',
    description: '',
    items: [{ item_id: '', amount_modified: '' }],
  });

  useEffect(() => {
    fetchTransactions();
    fetchItems();
    fetchInventory();
  }, []);

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
        setInventory(data.data); // Store inventory in state
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
      toast.error('Failed to fetch inventory data', {
        position: 'top-center',
      });
    }
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
        toast.success('Transaction added successfully', {
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
                    {`${item.amount_available} KG/Litre`}
                  </TableCell>
                  <TableCell align="center" className="px-6 py-4 font-bold">
                    {`${item.amount_on_hold} KG/Litre`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="flex justify-center items-center mb-6">
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
            }}
          >
            New Transaction
          </Button>
        </div>

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
                                  <TableCell align="center">{`${item.amount_modified} KG/Litre`}</TableCell>
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
          className="bg-white rounded-lg shadow-xl"
          sx={{
            width: '90%',
            maxWidth: '800px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            p: 4,
          }}
        >
          <Typography variant="h5" className="font-bold text-gray-800 mb-6">
            New Transaction
          </Typography>

          <div className="overflow-y-auto flex-grow pr-4">
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={newTransaction.name}
              onChange={e => setNewTransaction({ ...newTransaction, name: e.target.value })}
              className="mb-4"
            />
            <TextField
              fullWidth
              label="Reason"
              variant="outlined"
              value={newTransaction.reason}
              onChange={e => setNewTransaction({ ...newTransaction, reason: e.target.value })}
              className="mb-4"
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              value={newTransaction.description}
              onChange={e => setNewTransaction({ ...newTransaction, description: e.target.value })}
              className="mb-6"
            />

            <Typography variant="h6" className="font-semibold text-gray-700 mb-3">
              Available Items
            </Typography>
            <Paper className="p-4 mb-6 max-h-48 overflow-y-auto">
              {items.map(item => (
                <div
                  key={item.item_id}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                >
                  <Typography>
                    {item.item_name} ({item.uom})
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleAddItem(item)}
                    size="small"
                    className="min-w-[100px]"
                  >
                    Add
                  </Button>
                </div>
              ))}
            </Paper>

            <Typography variant="h6" className="font-semibold text-gray-700 mb-3">
              Selected Items
            </Typography>
            <div className="space-y-3">
              {selectedItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-gray-50 p-3 rounded">
                  <Typography className="min-w-[150px]">{item.item_name}</Typography>
                  <TextField
                    label="Amount"
                    type="number"
                    size="small"
                    value={item.amount_modified}
                    onChange={e => handleItemChange(index, 'amount_modified', e.target.value)}
                    className="flex-grow"
                  />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveItem(item.item_id)}
                    size="small"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <Button
              variant="outlined"
              onClick={() => setOpenModal(false)}
              className="min-w-[100px]"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              className="min-w-[100px]"
              disabled={selectedItems.length === 0}
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
