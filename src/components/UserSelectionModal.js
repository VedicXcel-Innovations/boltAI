import React, { useState, useEffect } from 'react';
import { Input, Button } from '@material-tailwind/react';
import Loader from './Loader';

const apiBaseUrl = process.env.API_BASE_URL;

const UserSelectionModal = ({ isOpen, onClose, onSelect, event_id }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    card_number: '',
    mun_pan_id: '',
    ward_id: '',
    area_id: '',
    form_no: '',
    reg_no: '',
    contact_number: '',
    name: '',
  });

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  const fetchUsers = () => {
    const queryString = Object.keys(filters)
      .map(key => (filters[key] ? `${key}=${filters[key]}` : ''))
      .filter(Boolean)
      .join('&');
    setLoading(true);
    fetch(`${apiBaseUrl}/rationUsers/getRationUsers?eventCategoryId=${event_id}&${queryString}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setUsers(responseData.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching:', error);
        setLoading(false);
      });
  };

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleUserSelect = user => {
    setSelectedUsers(prevSelectedUsers => {
      if (prevSelectedUsers.some(u => u.id === user.id)) {
        return prevSelectedUsers.filter(u => u.id !== user.id);
      } else {
        return [...prevSelectedUsers, user];
      }
    });
  };

  const handleSelectAllUsers = () => {
    setSelectedUsers(users);
  };

  const handleSubmit = () => {
    onSelect(selectedUsers);
    onClose();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full">
          <div className="flex justify-center items-center mb-6 relative">
            <h2 className="text-2xl font-bold text-center w-full text-gray-800">Select Users</h2>
            <button
              onClick={onClose}
              className="absolute right-0 top-0 text-red-500 text-2xl font-bold hover:text-red-700 transition-colors"
            >
              &times;
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Input label="Name" name="name" value={filters.name} onChange={handleFilterChange} />
            <Input
              label="Contact Number"
              name="contact_number"
              value={filters.contact_number}
              onChange={handleFilterChange}
            />
            <Input
              label="Card Number"
              name="card_number"
              value={filters.card_number}
              onChange={handleFilterChange}
            />
            <Input
              label="Registration Number"
              name="reg_no"
              value={filters.reg_no}
              onChange={handleFilterChange}
            />
            <div className="col-span-2 flex justify-center space-x-4">
              <Button className="w-40" onClick={fetchUsers}>
                Apply Filters
              </Button>
              <Button className="w-40" onClick={handleSelectAllUsers}>
                Select All
              </Button>
            </div>
          </div>
          <div className="mt-4 max-h-64 overflow-y-auto">
            {users?.map(user => (
              <div
                key={user.id}
                className={`p-2 border-t border-b cursor-pointer transition-colors ${
                  selectedUsers.some(u => u.id === user.id) ? 'bg-blue-200 hover:bg-blue-300' : ''
                }`}
                onClick={() => handleUserSelect(user)}
              >
                {user.name}
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <Button className="w-40" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserSelectionModal;
