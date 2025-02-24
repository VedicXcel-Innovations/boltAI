import React, { useState, useEffect, useCallback } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemIcon,
  Popover,
  styled,
  TextField,
} from '@mui/material';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.dark,
    color: theme.palette.text,
    fontWeight: 'bold',
    boxShadow: theme.shadows[2],
  },
}));

const AssignEventsModal = ({ open, handleClose, userId, apiBaseUrl, token }) => {
  const [assignedEvents, setAssignedEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [currentCardExpiry, setCurrentCardExpiry] = useState(null);
  const [newCardExpiry, setNewCardExpiry] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [amount, setAmount] = useState('');

  const fetchAssignedEvents = useCallback(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/eventCategories/userAssignments/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = (await response.json()).data;
      setAssignedEvents(data.map(event => event.event_category_id));
    } catch (error) {
      console.error('Error fetching assigned events:', error);
      toast.info('No events assigned to this user');
    }
  }, [userId, apiBaseUrl, token]);

  const fetchAllEvents = useCallback(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/eventCategories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setAllEvents(data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to fetch events');
    }
  }, [apiBaseUrl, token]);

  const fetchCardExpiry = useCallback(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/eventCategories/fetchCardExpiry/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = (await response.json()).data;
      setCurrentCardExpiry(new Date(data.user_card_expiry));
    } catch (error) {
      console.error('Error fetching card expiry date:', error);
      toast.error('Failed to fetch card expiry date');
    }
  }, [userId, apiBaseUrl, token]);

  const fetchEntries = useCallback(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/rationUsers/entries/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAmount(data.amount);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  }, [userId, apiBaseUrl, token]);

  useEffect(() => {
    if (open) {
      fetchAllEvents();
      fetchAssignedEvents();
      fetchCardExpiry();
      fetchEntries();
    }
    return () => {
      setAssignedEvents([]);
      setAllEvents([]);
      setCurrentCardExpiry(null);
      setNewCardExpiry(null);
    };
  }, [open, userId, fetchAllEvents, fetchAssignedEvents, fetchCardExpiry, fetchEntries]);

  const handleToggle = eventId => {
    setAssignedEvents(prev => {
      if (prev.includes(eventId)) {
        return prev.filter(id => id !== eventId);
      } else {
        return [...prev, eventId];
      }
    });
  };

  const handleModalClose = () => {
    handleClose();
  };

  const addEntry = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/rationUsers/addEntry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          amount: Number(amount),
        }),
      });
      const data = await response.json();
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  const handleSave = async () => {
    try {
      const eventCategoryIds = Array.isArray(assignedEvents) ? assignedEvents : [];

      const eventsResponse = await fetch(`${apiBaseUrl}/eventCategories/assignUserToCategory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          eventCategoryIds: eventCategoryIds.length > 0 ? eventCategoryIds : [],
        }),
      });
      await addEntry();
      if (!eventsResponse.ok) {
        const errorData = await eventsResponse.json();
        console.error('Error data:', errorData);
        toast.error(errorData.error || 'Failed to update event assignments');
        return;
      }

      if (newCardExpiry) {
        const cardResponse = await fetch(`${apiBaseUrl}/eventCategories/updateCardExpiry`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: userId,
            user_card_expiry: format(newCardExpiry, 'yyyy-MM-dd'),
          }),
        });

        if (!cardResponse.ok) {
          const errorData = await cardResponse.json();
          console.error('Error data:', errorData);
          toast.error(errorData.error || 'Failed to update card expiry date');
          return;
        }
      }

      toast.success('Event assignments and card expiry date updated successfully', {
        onClose: handleClose,
      });
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error(error.message);
    }
  };

  const handleDateChange = date => {
    setNewCardExpiry(date);
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          maxWidth: '500px',
          mx: 'auto',
          mt: '10%',
          position: 'relative',
          textAlign: 'center',
        }}
      >
        <button
          onClick={handleClose}
          className="absolute right-8 top-8 text-red-500 text-2xl font-bold hover:text-red-700 transition-colors"
        >
          &times;
        </button>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#6d28d9' }}
        >
          Assign Events
        </Typography>
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 0,
          }}
        >
          {allEvents.map(event => (
            <ListItem
              key={event.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center',
                marginBottom: 1,
                padding: '8px 16px',
              }}
            >
              <ListItemIcon sx={{ minWidth: 'auto', marginRight: 0 }}>
                <Checkbox
                  onClick={() => handleToggle(event.id)}
                  edge="start"
                  checked={assignedEvents.includes(event.id)}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText
                primary={event.name}
                sx={{
                  marginLeft: -5,
                }}
              />
              {event.id === `12` ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'left',
                    marginLeft: 2,
                    color: 'green',
                  }}
                >
                  <TextField
                    variant="outlined"
                    label="Amount"
                    size="small"
                    type="number"
                    value={amount}
                    InputProps={{
                      readOnly: !assignedEvents.includes(event.id),
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                    }}
                    onInput={e => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    }}
                    onChange={e => setAmount(e.target.value)}
                    sx={{ width: '150px' }}
                  />
                </Box>
              ) : null}
            </ListItem>
          ))}
        </List>
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#6d28d9' }}
          >
            Card Validity
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Current Expiry Date:{' '}
            {currentCardExpiry && currentCardExpiry.getTime() !== new Date('1970-01-01').getTime()
              ? format(currentCardExpiry, 'dd/MM/yyyy')
              : 'Not available'}
          </Typography>
          {newCardExpiry && (
            <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
              New Expiry Date: {format(newCardExpiry, 'dd/MM/yyyy')}
            </Typography>
          )}
          <StyledButton
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={event => setAnchorEl(event.currentTarget)}
          >
            Change
          </StyledButton>
          <Popover
            open={popoverOpen}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <Box sx={{ p: 2 }}>
              <DayPicker
                mode="single"
                selected={newCardExpiry || currentCardExpiry}
                onSelect={handleDateChange}
                fromDate={new Date()}
                classNames={{
                  caption: 'flex justify-center py-2 mb-4 relative items-center',
                  caption_label: 'text-sm font-medium text-gray-900',
                  nav: 'flex items-center',
                  nav_button:
                    'h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300',
                  nav_button_previous: 'absolute left-1.5',
                  nav_button_next: 'absolute right-1.5',
                  table: 'w-full border-collapse',
                  head_row: 'flex font-medium text-gray-900',
                  head_cell: 'm-0.5 w-9 font-normal text-sm',
                  row: 'flex w-full mt-2',
                  cell: 'text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                  day: 'h-9 w-9 p-0 font-normal',
                  day_range_end: 'day-range-end',
                  day_selected:
                    'rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white',
                  day_today: 'rounded-md bg-gray-200 text-gray-900',
                  day_outside:
                    'day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10',
                  day_disabled: 'text-gray-500 opacity-50',
                  day_hidden: 'invisible',
                }}
                components={{
                  IconLeft: ({ ...props }) => (
                    <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                  ),
                  IconRight: ({ ...props }) => (
                    <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                  ),
                }}
              />
            </Box>
          </Popover>
        </Box>
        <StyledButton variant="contained" color="success" sx={{ mt: 2 }} onClick={handleSave}>
          Save
        </StyledButton>
        <ToastContainer position="top-center" />
      </Box>
    </Modal>
  );
};

export default AssignEventsModal;
