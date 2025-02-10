import React, { useState, useEffect, useCallback } from 'react';
import { Input, Button } from '@material-tailwind/react';
import Loader from './Loader';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const apiBaseUrl = process.env.API_BASE_URL;

const UserSelectionModal = ({ isOpen, onClose, onSelect, event_id }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [municipalities, setMunicipalities] = useState([]);
  const [wards, setWards] = useState([]);
  const [areas, setAreas] = useState([]);
  const [filters, setFilters] = useState({
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
      fetchMunicipalities();
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

  const fetchMunicipalities = useCallback(() => {
    setLoading(true);
    fetch(`${apiBaseUrl}/municipalities/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch municipalities');
        }
        return response.json();
      })
      .then(responseData => {
        setMunicipalities(responseData.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching municipalities:', error);
        setLoading(false);
      });
  }, []);

  const fetchWards = useCallback(municipalityId => {
    if (municipalityId) {
      setLoading(true);
      fetch(`${apiBaseUrl}/wards/all/${municipalityId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch wards');
          }
          return response.json();
        })
        .then(responseData => {
          setWards(responseData.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching wards:', error);
          setLoading(false);
        });
    } else {
      setWards([]);
    }
  }, []);

  const fetchAreas = useCallback((municipalityId, blockWardId) => {
    if (blockWardId && municipalityId) {
      setLoading(true);
      fetch(`${apiBaseUrl}/areaCategories/all/${municipalityId}/${blockWardId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch areas');
          }
          return response.json();
        })
        .then(responseData => {
          setAreas(responseData.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching areas:', error);
          setLoading(false);
        });
    } else {
      setAreas([]);
    }
  }, []);

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleAreaFilterChange = event => {
    const { name, value } = event.target;

    setFilters(prevFilters => {
      let newFilters = { ...prevFilters, [name]: value };

      if (name === 'mun_pan_id') {
        newFilters.ward_id = null;
        newFilters.area_id = null;
      }

      if (name === 'ward_id') {
        newFilters.area_id = null;
      }

      return newFilters;
    });

    if (name === 'mun_pan_id') {
      fetchWards(value);
    } else if (name === 'ward_id') {
      fetchAreas(filters.mun_pan_id, value);
    }
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
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 mb-4">
            <Input
              label="Name"
              name="name"
              className="py-7 hover:border-black"
              value={filters.name}
              onChange={handleFilterChange}
            />
            <Input
              label="Contact Number"
              name="contact_number"
              className="py-7 hover:border-black"
              value={filters.contact_number}
              onChange={handleFilterChange}
            />
            <div className="relative">
              <Input
                label=""
                name="reg_no"
                className="py-7 mt-4 hover:border-black"
                value={filters.reg_no}
                onChange={handleFilterChange}
              />
              {/* Adjust the label position manually */}
              <label
                htmlFor="reg_no"
                className="absolute text-sm text-gray-600 left-3 top-6 transition-all duration-200"
              >
                Registration Number
              </label>
            </div>
            <FormControl className="!mt-4">
              <InputLabel id="municipality-select-label">Municipality</InputLabel>
              <Select
                labelId="municipality-select-label"
                id="municipality-select"
                value={filters.mun_pan_id}
                onChange={e => {
                  setFilters({
                    ...filters,
                    mun_pan_id: e.target.value,
                    blockWardId: null,
                    cityTownIds: null,
                  });
                  handleAreaFilterChange(e);
                  fetchWards(e.target.value);
                }}
              >
                {municipalities.map(municipality => (
                  <MenuItem key={municipality.id} value={municipality.id}>
                    {municipality.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="ward-select-label">Block/Ward</InputLabel>
              <Select
                labelId="ward-select-label"
                id="ward-select"
                value={filters.ward_id}
                onChange={e => {
                  setFilters({ ...filters, ward_id: e.target.value, cityTownIds: null });
                  handleAreaFilterChange(e);
                  fetchAreas(filters.mun_pan_id, e.target.value);
                }}
              >
                {wards.map(ward => (
                  <MenuItem key={ward.id} value={ward.id}>
                    {ward.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="area-select-label">Area/Lane</InputLabel>
              <Select
                labelId="area-select-label"
                id="area-select"
                value={filters.area_id}
                onChange={e => {
                  setFilters({ ...filters, area_id: e.target.value });
                  handleAreaFilterChange(e);
                }}
              >
                {areas.map(area => (
                  <MenuItem key={area.id} value={area.id}>
                    {area.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-span-2 flex justify-center space-x-4">
            <Button className="w-40" onClick={fetchUsers}>
              Apply Filters
            </Button>
            <Button className="w-40" onClick={handleSelectAllUsers}>
              Select All
            </Button>
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
