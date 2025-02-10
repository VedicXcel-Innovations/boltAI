import React, { useEffect, useState } from 'react';
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
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from '../components/Icons';
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
      console.log(data);
      if (response.ok) {
        setOpenModal(false);
        setSelectedItems([]);
        fetchTransactions();
        fetchInventory();
      } else {
        console.error('Failed to create transaction');
      }
    } catch (error) {
      toast.error(`Error submitting transaction : ${error}`, {
        position: 'top-center',
      });
      console.error('Error submitting transaction:', error);
    }
  };
  return (
    <>
    <div className="grid grid-cols-1 col-span-10 md:col-span-6 lg:col-span-8 xl:col-span-10 2xl:col-span-14 gap-8 p-8">
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            width: '50%',
            margin: 'auto',
            mt: 5,
            p: 3,
            maxHeight: '80vh', // ✅ Limit modal height
            overflow: 'hidden', // ✅ Prevent full modal from scrolling
            borderRadius: 2,
          }}
        >
          {/* Scrollable Content */}
          <Box sx={{ overflowY: 'auto', flexGrow: 1, pr: 1, maxHeight: '65vh' }}>
            <Typography variant="h6">New Transaction</Typography>

            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              sx={{ mt: 2 }}
              value={newTransaction.name}
              onChange={e => setNewTransaction({ ...newTransaction, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Reason"
              variant="outlined"
              sx={{ mt: 2 }}
              value={newTransaction.reason}
              onChange={e => setNewTransaction({ ...newTransaction, reason: e.target.value })}
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              sx={{ mt: 2 }}
              value={newTransaction.description}
              onChange={e => setNewTransaction({ ...newTransaction, description: e.target.value })}
            />

            {/* Available Items List */}
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Available Items
            </Typography>
            <Box sx={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid gray', p: 1 }}>
              {items.map(item => (
                <Box
                  key={item.item_id}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>
                    {item.item_name} ({item.uom})
                  </Typography>
                  <Button variant="outlined" onClick={() => handleAddItem(item)}>
                    Add
                  </Button>
                </Box>
              ))}
            </Box>

            {/* Selected Items List */}
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Selected Items
            </Typography>
            {selectedItems.map((item, index) => (
              <Box key={index} display="flex" alignItems="center" gap={2} sx={{ mt: 1 }}>
                <Typography>{item.item_name}</Typography>
                <TextField
                  label="Amount"
                  type="number"
                  value={item.amount_modified}
                  onChange={e => handleItemChange(index, 'amount_modified', e.target.value)}
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveItem(item.item_id)}
                >
                  Remove
                </Button>
              </Box>
            ))}
          </Box>

          {/* Fixed Footer with Submit Button */}
          <Box
            sx={{
              textAlign: 'right',
              mt: 2,
              pt: 2,
              borderTop: '1px solid #ccc',
              background: 'white',
            }}
          >
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      <TableHead>
        <TableRow>
          <TableCell>Item Name</TableCell>
          <TableCell>Available</TableCell>
          <TableCell>On Hold</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {inventory.map(item => (
          <TableRow key={item.item_id}>
            <TableCell>{item.item_name}</TableCell>
            <TableCell>{item.amount_available}</TableCell>
            <TableCell>{item.amount_on_hold}</TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableContainer component={Paper}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
          style={{ marginBottom: 10 }}
        >
          New Transaction
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Reference ID</TableCell>
              <TableCell>Transaction Type</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map(transaction => (
              <React.Fragment key={transaction.transaction_id}>
                {/* Main Transaction Row */}
                <TableRow>
                  <TableCell
                    onClick={() => toggleRow(transaction.transaction_id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {openRows[transaction.transaction_id] ? (
                      <DoubleArrowUpIcon />
                    ) : (
                      <DoubleArrowDownIcon />
                    )}
                  </TableCell>
                  <TableCell>{transaction.reference_id}</TableCell>
                  <TableCell>{transaction.transaction_type}</TableCell>
                  <TableCell>{transaction.created_by}</TableCell>
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell>{transaction.reason}</TableCell>
                  <TableCell>{new Date(transaction.created_at).toLocaleString()}</TableCell>
                </TableRow>

                {/* Collapsible Row for Items */}
                <TableRow>
                  <TableCell colSpan={7} style={{ padding: 0 }}>
                    <Collapse
                      in={openRows[transaction.transaction_id]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box margin={1}>
                        <Typography variant="subtitle1" gutterBottom>
                          Items in this Transaction
                        </Typography>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Item Name</TableCell>
                              <TableCell>Amount Modified</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {transaction.items.map(item => (
                              <TableRow key={item.item_id}>
                                <TableCell>{item.item_name}</TableCell>
                                <TableCell>{item.amount_modified}</TableCell>
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
      <ToastContainer />
    </>
  );
};

export default TransactionsPage;
