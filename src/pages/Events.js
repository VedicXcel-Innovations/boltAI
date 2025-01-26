import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import {
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
  Select,
  Option,
  Button,
} from '@material-tailwind/react';
import ModalWithSections from '../components/ModalWithSections';
import UserSelectionModal from '../components/UserSelectionModal';
import OrganizationSelectionModal from '../components/OrganizationModal';
import Loader from '../components/Loader';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiBaseUrl = process.env.API_BASE_URL;

function Event() {
  const [userRole, setUserRole] = useState(null);
  const [form, setForm] = useState({
    event: '',
    event_name: null,
    event_id: null,
    event_date: null,
    items: [],
    type: '',
    selected_users: [],
    selected_orgs: [],
    event_type: null,
  });
  const [loading, setLoading] = useState(true);
  const [eventPopupOpen, setEventPopupOpen] = useState(false);
  const [datepopoverOpen, setDatePopoverOpen] = useState(false);
  const [itemModalOpen, setitemModalOpen] = useState(false);
  const [userPopupOpen, setUserPopupOpen] = useState(false);
  const [isOrganizationModalOpen, setOrganizationModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [items, setItems] = useState([]);
  const [userOrOrgs, setuserOrOrgs] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [isItemPopupOpen, setItemPopupOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [erroMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUserRole();
    fetchEvents();
  }, [selectedItem]);

  const fetchUserRole = async () => {
    try {
      const userResponse = await fetch(`${apiBaseUrl}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user role');
      }

      const currentUser = await userResponse.json();
      setUserRole(currentUser.role);
    } catch (error) {
      console.error('Error fetching user role:', error);
      toast.error('Failed to fetch user role. Please try again later.', {
        position: 'top-center',
      });
    }
  };

  const fetchEntries = async userIds => {
    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/rationUsers/moneyEntries?userIds=${userIds}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (data.message != null) {
        setErrorMessage(`${data.message}`);
      } else {
        setErrorMessage(``);
        if (data.entries && data.entries.length > 0) {
          const totalAmount = data.entries.reduce((sum, entry) => sum + entry.amount, 0);
          const averageAmount = totalAmount / data.entries.length;
          setSelectedItem([{ item_id: 5, item_name: 'Money', amount: `${averageAmount}` }]);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(`${error}`);
      console.error('Error fetching entries:', error);
    }
  };

  const fetchEvents = () => {
    fetch(`${apiBaseUrl}/eventCategories`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setEvents(responseData.data);
        setLoading(false);
      })
      .then(() => fetchItems())
      .catch(error => {
        console.error('Error fetching:', error);
        setLoading(false);
        const e = error.message ? error.message : error;
        toast.error(`Error: ${e}`, {
          position: 'top-center',
        });
      });
  };

  const fetchItems = () => {
    fetch(`${apiBaseUrl}/eventItems`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setItems(responseData.data);
      })
      .catch(error => {
        console.error('Error fetching:', error);
        const e = error.message ? error.message : error;
        toast.error(`Error: ${e}`, {
          position: 'top-center',
        });
      });
  };

  const handleCloseEventModal = () => setEventPopupOpen(false);

  const handleEventChange = value => {
    setForm({
      ...form,
      event_name: value.name,
      event_id: value.id,
      event_type: value.type,
      items: [],
    });
    setSelectedItem([]);
    handleCloseEventModal();
  };

  const renderEventOption = option => {
    return `${option.name}`;
  };

  const handleDateSelect = selectedDate => {
    if (selectedDate) {
      const utcDate = new Date(
        Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()),
      );
      const formattedDate = format(utcDate, 'yyyy-MM-dd');
      setForm(prevForm => ({
        ...prevForm,
        event_date: formattedDate,
      }));
      setDatePopoverOpen(false);
    }
  };

  const handleModalSelect = selection => {
    setForm({
      ...form,
      items: selection.map(option => `${option.item_name}-${option.amount}`).join(', '),
    });
    setSelectedItem(selection);
  };

  const handleTypeChange = event => {
    if (event === form.event) {
      return;
    }
    setForm({ ...form, type: event });
    setuserOrOrgs([]);
  };

  const handleUserSelection = async selectedUsers => {
    setForm({ ...form, selected_users: selectedUsers });
    setuserOrOrgs(selectedUsers);
    if (form.type === 'people' && form.event_type === 'money') {
      const idString = selectedUsers.map(item => item.id).join(',');
      await fetchEntries(idString);
    }
  };

  const handleOrganizationSelect = organization => {
    setForm({ ...form, selected_orgs: organization });
    setuserOrOrgs(organization);
  };

  const removeSelectedUser = userId => {
    const updatedUsers = form.selected_users.filter(user => user.id !== userId);
    setForm({
      ...form,
      selected_users: updatedUsers,
    });
    const user_Orgs = userOrOrgs.filter(user => user.id !== userId);
    if (form.type === 'people' && form.event_type === 'money') {
      const idString = updatedUsers.map(item => item.id).join(',');
      fetchEntries(idString);
    }
    setuserOrOrgs(user_Orgs);
  };

  const removeSelectedOrg = id => {
    const updatedOrgs = form.selected_orgs.filter(org => org.id !== id);
    setForm({
      ...form,
      selected_orgs: updatedOrgs,
    });
    const user_Orgs = userOrOrgs.filter(org => org.id !== id);
    setuserOrOrgs(user_Orgs);
  };

  const calculateTotalAmountNeeded = () => {
    const totalSelectedUsers = form.selected_users.length || 1;
    const totalSelectedOrgs = form.selected_orgs.length || 1;
    const totalSelected = form.type === 'people' ? totalSelectedUsers : totalSelectedOrgs;
    return selectedItem.map(item => ({
      item_name: item.item_name,
      totalAmount: item.amount * totalSelected,
      item_id: item.item_id,
    }));
  };

  const foodItems = items.filter(item => item.isitem);
  const financialItems = items.filter(item => !item.isitem);

  const handleSave = e => {
    e.preventDefault();
    setLoading(true);
    const postData = JSON.stringify(form);
    let parsedData = JSON.parse(postData);
    parsedData.items = selectedItem;
    parsedData.isTest = true;
    const updatedPostData = JSON.stringify(parsedData);

    fetch(`${apiBaseUrl}/createEvent/save`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: updatedPostData,
    })
      .then(response =>
        response.json().then(data => {
          setLoading(false);
          if (!response.ok) {
            throw new Error(data.error);
          }
          return data;
        }),
      )
      .then(async responseData => {
        setLoading(false);
        setForm({
          event: '',
          event_name: '',
          event_id: null,
          event_date: null,
          items: [],
          type: '',
          selected_users: [],
          selected_orgs: [],
          event_type: null,
        });
        setSelectedItem([]);
        setuserOrOrgs([]);
        setTimeout(() => {
          toast.success(responseData.message, {
            position: 'top-center',
          });
        }, 500);
      })
      .catch(error => {
        setLoading(false);
        console.error('Error ', error);
        const e = error.message ? error.message : error;
        setLoading(false);
        setTimeout(() => {
          toast.error(`Error: ${errorMessage}`, {
            position: 'top-center',
          });
        }, 500);
      });
  };

  const isSubmitDisabled =
    form.selected_users.length === 0 && form.selected_orgs.length === 0 && erroMessage != '';

  const handleAddNewItem = () => {
    const userConfirmed = window.confirm('Do you really want to save this item?');
    if (userConfirmed) {
      fetch(`${apiBaseUrl}/eventItems/additem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ item_name: newItemName }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            toast.error(`Error: ${data.error}`, {
              position: 'top-center',
            });
          } else {
            toast.success('New item added successfully', {
              position: 'top-center',
            });
            setItemPopupOpen(false);
            setNewItemName('');
            fetchItems();
          }
        })
        .catch(error => {
          toast.error(`Error: ${error.message}`, {
            position: 'top-center',
          });
        });
    } else {
      toast.info('Operation cancelled', {
        position: 'top-center',
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="col-span-10 md:col-span-6 lg:col-span-8 xl:col-span-10 2xl:col-span-14 p-8">
      <div className="bg-white shadow-lg rounded-lg p-10 space-y-4">
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-3 gap-10">
            <div className="col-span-1 space-y-4">
              <Input
                label="Event Name"
                className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-4 py-4"
                value={form.event}
                onChange={e => setForm({ ...form, event: e.target.value })}
              />
            </div>
            <div className="col-span-1 space-y-4">
              <Popover placement="bottom" open={datepopoverOpen} handler={setDatePopoverOpen}>
                <PopoverHandler>
                  <Input
                    label="Select Date"
                    className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-4 py-4"
                    onChange={() => null}
                    onClick={() => setDatePopoverOpen(!datepopoverOpen)}
                    value={form.event_date ? format(new Date(form.event_date), 'PPP') : ''}
                  />
                </PopoverHandler>
                <PopoverContent>
                  <DayPicker
                    mode="single"
                    selected={new Date(form.event_date)}
                    onSelect={handleDateSelect}
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
                </PopoverContent>
              </Popover>
              <div>
                {form.event_name != null ? (
                  <Select
                    label="Select Type of Beneficiary"
                    className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-4 py-4"
                    value={form.type}
                    onChange={handleTypeChange}
                  >
                    <Option value="people">Individual</Option>
                    <Option value="organization">Organization</Option>
                  </Select>
                ) : null}
              </div>
            </div>
            <div className="col-span-1 space-y-4">
              <Input
                label="Select Type of Support"
                className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-4 py-4"
                value={form.event_name}
                onClick={() => setEventPopupOpen(true)}
                readOnly
              />
              <div>
                {(form.type === 'people' && form.event_type === 'money') ||
                form.event_name === null ||
                form.event_type === null ? null : (
                  <Input
                    label="Select Item"
                    className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-4 py-4"
                    onChange={() => null}
                    onClick={() => setitemModalOpen(!itemModalOpen)}
                    value={form.items}
                  />
                )}
              </div>
            </div>
            <div className="col-span-3 space-y-4 w-full flex justify-center">
              {form.type === 'people' && (
                <div>
                  <div className="w-full flex justify-center mb-4">
                    <Button
                      className="col-span-3 space-y-4 bg-blue-500 text-white py-2 px-16 rounded-lg hover:bg-blue-600 text-md"
                      onClick={() => setUserPopupOpen(true)}
                    >
                      Select Users
                    </Button>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {userOrOrgs.map(user => (
                      <div
                        key={user.id}
                        className="flex items-center gap-2 bg-gray-200 p-2 rounded"
                      >
                        {user.name}
                        <button
                          className="bg-red-500 text-white text-lg py-0.5 px-1.5 rounded hover:bg-red-600"
                          onClick={() => removeSelectedUser(user.id)}
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    <div className="text-red-500 pt-4">{erroMessage}</div>
                  </div>
                </div>
              )}
              {form.type === 'organization' && (
                <div>
                  <div className="w-full flex justify-center mb-4">
                    <Button
                      className="col-span-3 space-y-4 bg-blue-500 text-white py-2 px-16 rounded-lg hover:bg-blue-600 text-md"
                      onClick={() => setOrganizationModalOpen(true)}
                    >
                      Select Organizations
                    </Button>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {userOrOrgs.map(org => (
                      <div key={org.id} className="flex items-center gap-2 bg-gray-200 p-2 rounded">
                        {org.organization_name}
                        <button
                          className="bg-red-500 text-white text-lg py-0.5 px-1.5 rounded hover:bg-red-600"
                          onClick={() => removeSelectedOrg(org.id)}
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-3 space-y-4 w-full flex flex-col items-center">
              <h3 className="text-lg font-semibold text-center">
                Total Amount Needed for Each Item:
              </h3>
              <ul className="space-y-2">
                {calculateTotalAmountNeeded().map(item => (
                  <li key={item.item_name} className="flex justify-center">
                    <span className="mr-2">{item.item_name}:</span>
                    <span>{item.totalAmount}</span>
                    <span style={{ marginLeft: '8px' }}>
                      {item.item_id == 5 ? `₹` : `KG/Litre`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-3 space-y-4 w-full flex justify-center">
              {userRole === 'admin' && (
                <Button
                  className="bg-purple-500 text-white py-2 px-12 rounded-lg hover:bg-purple-600 text-lg"
                  onClick={() => setItemPopupOpen(true)}
                >
                  Manage Item
                </Button>
              )}
            </div>
            <div className="col-span-3 space-y-4 w-full flex justify-center">
              <Button
                type="submit"
                className="bg-blue-500 text-white py-2 px-24 rounded-lg hover:bg-blue-600 text-lg"
                disabled={isSubmitDisabled}
              >
                Submit
              </Button>
            </div>
          </div>
          <Modal
            isOpen={eventPopupOpen}
            onClose={handleCloseEventModal}
            options={events}
            onSelect={handleEventChange}
            renderOption={renderEventOption}
          />
          <ModalWithSections
            isOpen={itemModalOpen}
            onClose={() => setitemModalOpen(false)}
            optionsSection1={foodItems}
            optionsSection2={financialItems}
            renderOption={option => option.item_name}
            previouslySelectedItems={selectedItem}
            onSelect={selection => handleModalSelect(selection)}
            type={form.event_type}
          />
          <UserSelectionModal
            isOpen={userPopupOpen}
            onClose={() => setUserPopupOpen(false)}
            onSelect={handleUserSelection}
            event_id={form.event_id}
          />
          <OrganizationSelectionModal
            isOpen={isOrganizationModalOpen}
            onClose={() => setOrganizationModalOpen(false)}
            onSelect={handleOrganizationSelect}
          />
          {isItemPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
                <div className="flex justify-center items-center mb-6 relative">
                  <h2 className="text-2xl font-bold text-center w-full text-gray-800">
                    Add New Food Item
                  </h2>
                  <button
                    onClick={() => setItemPopupOpen(false)}
                    className="absolute right-0 top-0 text-red-500 text-2xl font-bold hover:text-red-700 transition-colors"
                  >
                    &times;
                  </button>
                </div>
                <div className="mt-4 max-h-64 overflow-y-auto">
                  <div className="mt-4">
                    <input
                      type="text"
                      value={newItemName}
                      onChange={e => setNewItemName(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Enter Item Name"
                    />
                    <button
                      onClick={handleAddNewItem}
                      className="w-full mt-2 p-2 bg-green-500 text-white font-bold rounded"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default Event;
