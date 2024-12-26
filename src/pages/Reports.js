import React, { useEffect, useState, useRef } from 'react';
import { Button, TextField, Popover } from '@mui/material';
import { DayPicker } from 'react-day-picker';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Loader from '../components/Loader';
import DistributionModal from '../components/DistributionModal';

const apiBaseUrl = process.env.API_BASE_URL;

const Reports = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    setLoading(true);
    fetch(`${apiBaseUrl}/createEvent/events`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData && responseData.data) {
          const sortedEvents = responseData.data.sort(
            (a, b) => new Date(b.distribution_date) - new Date(a.distribution_date),
          );
          setEvents(sortedEvents);
          setFilteredEvents(sortedEvents);
        } else {
          setEvents([]);
          setFilteredEvents([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  };

  const handleDateSelect = date => {
    if (date) {
      setSelectedDate(date);
      setIsDatePickerOpen(false);
      setAnchorEl(null);
    }
  };

  const handleSearch = () => {
    if (selectedDate) {
      const filtered = events.filter(
        event =>
          new Date(event.distribution_date).toLocaleDateString() ===
          selectedDate.toLocaleDateString(),
      );
      setFilteredEvents(filtered);
      setTimeout(() => {
        if (filtered.length === 0) {
          alert('No event found. Please check the event Distribution date.');
        }
      }, 300);
    }
  };

  const handleEventChange = event => {
    setLoading(true);
    const statusValue = event.status === 2 ? 'in progress' : 'inactive';
    fetch(`${apiBaseUrl}/createEvent/updateStatus/${event.event_id}/${statusValue}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setLoading(false);
        fetchEvents();
      })
      .catch(error => {
        console.error('Error', error);
        setLoading(false);
      });
  };

  const handlePDF = (event, type) => {
    setLoading(true);

    const endpoint =
      type === 'user'
        ? `${apiBaseUrl}/createEvent/event-users-pdf/${event.event_id}/`
        : `${apiBaseUrl}/createEvent/event-orgs-pdf/${event.event_id}/`;

    fetch(endpoint, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setLoading(false);
        if (responseData && responseData.pdfUrl) {
          window.open(responseData.pdfUrl, '_blank', 'noopener,noreferrer');
        } else {
          alert('Report not found!');
        }
      })
      .catch(error => {
        console.error('Error', error);
        setLoading(false);
        alert('Report not found!');
      });
  };

  const handleEventReport = event => {
    setLoading(true);

    const endpoint = `${apiBaseUrl}/createEvent/event-report-pdf/${event.event_id}`;

    fetch(endpoint, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setLoading(false);
        if (responseData && responseData.pdfUrl) {
          window.open(responseData.pdfUrl, '_blank', 'noopener,noreferrer');
        } else {
          alert('Report not found!');
        }
      })
      .catch(error => {
        console.error('Error', error);
        setLoading(false);
        alert('Report not found!');
      });
  };

  const calculateTotalAmountNeeded = event => {
    const totalSelectedUsers = event.selected_users.length || 1;
    const totalSelectedOrgs = event.selected_orgs.length || 1;
    const totalSelected = event.event_type === 'People' ? totalSelectedUsers : totalSelectedOrgs;

    return event.items.map(item => ({
      item_name: item.item_name,
      totalAmount: item.amount * totalSelected,
      item_id: item.item_id,
    }));
  };

  const handleReportClick = event => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    setIsDatePickerOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsDatePickerOpen(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto mt-6 col-span-10 md:col-span-6 lg:col-span-8 xl:col-span-10 2xl:col-span-14 p-4">
      <div className="grid grid-cols-1 gap-4 mt-3 mb-6 relative">
        <div className="flex justify-center gap-3 mb-2">
          <TextField
            type="text"
            value={selectedDate ? selectedDate.toLocaleDateString() : ''}
            placeholder="Select distribution date"
            onClick={handleClick}
            readOnly
            sx={{
              width: '700px',
              transition: 'box-shadow 0.3s ease-in-out',
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
                },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{
              width: '200px',
              padding: '10px 10px',
              fontSize: '20px',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '8px',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              '&:hover': {
                backgroundColor: '#0056b3',
                transform: 'scale(1.05)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            Search
          </Button>
        </div>
        <Popover
          open={isDatePickerOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
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
            selected={selectedDate}
            onSelect={handleDateSelect}
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
        </Popover>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-6 mt-2">
        {filteredEvents?.map(event => (
          <div key={event.event_id} className="bg-white p-6 rounded-lg shadow-lg mb-4">
            <h2 className="text-2xl font-bold text-blue-500 text-center mb-2">
              {event.event_name}
            </h2>
            <p className="text-gray-700 text-center">
              <strong>Distribution Date:</strong>{' '}
              {new Date(event.distribution_date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 text-center">
              <strong>Type:</strong> {event.support_description}
            </p>
            <p className="text-gray-700 text-center">
              <strong>Created At:</strong> {new Date(event.event_created_at).toLocaleDateString()}
            </p>
            <p className="text-gray-700 text-center">
              <strong>Status:</strong> {event.status === 0 ? 'Inactive' : 'Active'}
            </p>
            {event.items.length > 0 && (
              <>
                <div className="grid grid-cols-2 mt-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-center text-purple-700">
                      Items per Capita
                    </h3>
                    <ul className="list-disc list-inside">
                      {event.items.map(item => (
                        <li key={item.item_id} className="text-sm text-gray-700 text-center">
                          {item.item_name}: {item.amount} {item.item_id == 5 ? `₹` : `KG/Litre`}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-center text-purple-700">
                      Items in Total
                    </h3>
                    <ul className="list-disc list-inside">
                      {calculateTotalAmountNeeded(event).map(item => (
                        <li key={item.item_name} className="text-sm text-gray-700 text-center">
                          {item.item_name}: {item.totalAmount}{' '}
                          {item.item_id == 5 ? `₹` : `KG/Litre`}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
            {event.event_type === 'People' && event.selected_users.length > 0 && (
              <>
                <h3 className="text-xl font-bold mt-4 mb-2 text-center text-purple-700">
                  Selected Users
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {event.selected_users.map(user => (
                    <div
                      key={user.person_id}
                      className="flex items-center gap-2 bg-gray-200 p-2 rounded"
                    >
                      {user.name}
                    </div>
                  ))}
                </div>
              </>
            )}

            {event.event_type === 'Organization' && event.selected_orgs.length > 0 && (
              <>
                <h3 className="text-xl font-bold mt-4 mb-2 text-center text-purple-700">
                  Selected Organizations:
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {event.selected_orgs.map(org => (
                    <div
                      key={org.organization_id}
                      className="flex items-center gap-2 bg-gray-200 p-2 rounded"
                    >
                      {org.organization_name}
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="flex justify-center mt-4">
              {event.status !== 0 ? (
                <button
                  className={`${
                    event.status === 2
                      ? 'bg-green-500 hover:bg-green-700'
                      : 'bg-red-500 hover:bg-red-700'
                  } text-white font-bold py-2 px-4 rounded`}
                  onClick={() => handleEventChange(event)}
                >
                  {event.status === 2 ? 'Start Event' : 'End Event'}
                </button>
              ) : (
                <button
                  className={`${
                    event.status === 2
                      ? 'bg-green-500 hover:bg-green-700'
                      : 'bg-orange-500 hover:bg-orange-700'
                  } text-white font-bold py-2 px-4 rounded`}
                  onClick={() => handleEventReport(event)}
                >
                  {'Report'}
                </button>
              )}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-3 mr-3 rounded"
                onClick={() => handleReportClick(event)}
              >
                Status
              </button>
              {event.event_type === 'People' && (
                <button
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handlePDF(event, 'user')}
                >
                  Download
                </button>
              )}
              {event.event_type === 'Organization' && (
                <button
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handlePDF(event, 'org')}
                >
                  Download
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {modalOpen && <DistributionModal event={selectedEvent} onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default Reports;
