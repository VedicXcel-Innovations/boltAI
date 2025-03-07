import React, { useState, useEffect, useCallback, memo } from 'react';
import {
  Button,
  IconButton,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  Typography,
  TextField,
  styled,
  SvgIcon,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Input, Option, Select as MaterialSelect } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import AssignEventsModal from '../components/AssignEventsModal';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiBaseUrl = process.env.API_BASE_URL;

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

const SearchTextField = memo(({ value, onChange }) => {
  return (
    <TextField
      type="text"
      placeholder="Search by Name or Contact Number"
      value={value}
      onChange={onChange}
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
  );
});

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchString, setSearchString] = useState('');
  const [pendingSearchString, setPendingSearchString] = useState('');
  const [filters, setFilters] = useState({
    searchInput: '',
    municipalityId: null,
    blockWardId: null,
    cityTownIds: null,
    gender: '',
    gender_id: '',
    religion: '',
    religion_id: '',
    staff: '',
    type: '',
  });

  const [municipalities, setMunicipalities] = useState([]);
  const [wards, setWards] = useState([]);
  const [areas, setAreas] = useState([]);
  const [genders, setGenders] = useState([]);
  const [religions, setreligions] = useState([]);

  const [genderPopupOpen, setgenderPopupOpen] = useState(false);
  const [religionPopupOpen, setreligionPopupOpen] = useState(false);

  const [totalCount, setTotalCount] = useState('0');

  const handleGenderChange = value => {
    setFilters({ ...filters, gender: value.gender_name, gender_id: value.gender_id });
    setActive(1);
    handleCloseGenderModal();
  };

  const renderGenderOption = option => {
    return `${option.gender_name}`;
  };

  const handleCloseGenderModal = () => setgenderPopupOpen(false);

  const handleReligionChange = value => {
    setFilters({
      ...filters,
      religion: value.religion_name,
      religion_id: value.religion_id,
    });
    setActive(1);
    handleCloseReligionModal();
  };

  const renderReligionOption = option => {
    return `${option.religion_name}`;
  };

  const handleCloseReligionModal = () => setreligionPopupOpen(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const responseData = await fetchUserIdsByType();
    const ids =
      filters.type === '11' ? responseData.food : filters.type === '12' ? responseData.finance : [];
    fetch(`${apiBaseUrl}/rationUsers/getRationUsersList`, {
      method: 'POST',
      body: JSON.stringify({
        param: searchString,
        page: active,
        municipalities: filters.municipalityId ? [filters.municipalityId] : [],
        block_ward_names: filters.blockWardId ? [filters.blockWardId] : [],
        city_towns: filters.cityTownIds ? [filters.cityTownIds] : [],
        religion_id: filters.religion_id,
        gender_id: filters.gender_id,
        staff: filters.staff,
        typeIds: ids,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => response.json())
      .then(responseData => {
        setUsers(responseData.data);
        setLastPage(responseData.totalPages);
        setActive(responseData.currentPage);
        setTotalCount(responseData.totalCount.toString());
        if (responseData.data.length === 0) {
          toast.info('No user data found.', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
        setLoading(false);
      });
  }, [active, filters, searchString]);

  const fetchUserIdsByType = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/rationUsers/getRationUserIds`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch getRationUserIds');
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error('Error fetching getRationUserIds:', error);
      return null;
    } finally {
    }
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

  const fetchGender = () => {
    fetch(`${apiBaseUrl}/gender`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setGenders(responseData.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching:', error);
        setLoading(false);
      });
  };

  const fetchReligion = () => {
    fetch(`${apiBaseUrl}/religion`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setreligions(responseData.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching:', error);
        setLoading(false);
      });
  };

  const handleSearchTextChange = event => {
    setPendingSearchString(event.target.value);
  };

  const handleSearch = () => {
    setSearchString(pendingSearchString);
    setActive(1);
  };

  const handleFilterChange = event => {
    const { name, value } = event.target;

    setPendingSearchString('');
    setSearchString('');

    setFilters(prevFilters => {
      let newFilters = { ...prevFilters, [name]: value };

      if (name === 'municipalityId') {
        newFilters.blockWardId = null;
        newFilters.cityTownIds = null;
      }

      if (name === 'blockWardId') {
        newFilters.cityTownIds = null;
      }

      return newFilters;
    });

    if (name === 'municipalityId') {
      fetchWards(value);
    } else if (name === 'blockWardId') {
      fetchAreas(filters.municipalityId, value);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchMunicipalities();
    fetchGender();
    fetchReligion();
  }, [fetchUsers]);

  const handleAssign = userId => {
    setSelectedUserId(userId);
    setAssignModalOpen(true);
  };

  const closeModal = () => {
    setAssignModalOpen(false);
    setSelectedUserId(null);
  };

  const handleEdit = async user => {
    navigate('/EditUserData', { state: user });
  };

  const handleDeactivate = async userId => {
    const confirmDeactivate = window.confirm('Are you sure you want to delete this user?');
    if (confirmDeactivate) {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No token found');
        }

        // Fetch current user role
        const userResponse = await fetch(`${apiBaseUrl}/users/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user role');
        }

        const currentUser = await userResponse.json();

        if (currentUser.role !== 'admin') {
          toast.error(
            'You do not have authorization to access this page. Please contact your system administrator.',
            {
              position: 'top-center',
            },
          );
          return;
        }

        setLoading(true);

        const response = await fetch(`${apiBaseUrl}/rationUsers/deactivate/${userId}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete user');
        }

        const data = await response.json();
        setUsers(users.filter(user => user.id !== userId));
        setTimeout(() => {
          toast.success('User marked as deleted', {
            position: 'top-center',
          });
        }, 500);
      } catch (error) {
        toast.error(`Error: ${error.message}`, {
          position: 'top-center',
        });
        console.error('Error deleting user:', error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.info('Delete operation cancelled', { position: 'top-center' });
    }
  };

  const handleFoodCard = user => {
    setLoading(true);

    // First, check user assignments
    fetch(`${apiBaseUrl}/eventCategories/userAssignments/${user.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(userAssignmentsData => {
        setLoading(false);

        const isEventCategoryValid = userAssignmentsData.data.some(
          assignment => assignment.event_category_id === '11',
        );

        if (isEventCategoryValid) {
          // Call the food card API if valid event category is found
          fetch(`${apiBaseUrl}/rationUsers/foodCard/${user.id}/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          })
            .then(response => response.json())
            .then(responseData => {
              window.open(responseData.pdfUrl, '_blank', 'noopener,noreferrer');
            })
            .catch(error => {
              console.error('Error generating food card', error);
            });
        } else {
          setTimeout(() => {
            toast.error('User not assigned to food support.', {
              position: 'top-center',
            });
          }, 500);
        }
      })
      .catch(error => {
        console.error('Error fetching user assignments', error);
        setLoading(false);
      });
  };

  const handleAllFoodCard = () => {
    setLoading(true);
    fetch(`${apiBaseUrl}/rationUsers/foodCard`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setLoading(false);
        window.open(responseData.pdfUrl, '_blank', 'noopener,noreferrer');
      })
      .catch(error => {
        console.error('Error', error);
        setLoading(false);
      });
  };

  const handleAllFoodData = () => {
    setLoading(true);
    fetch(`${apiBaseUrl}/rationUsers/foodDataExcel`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setLoading(false);
        window.open(responseData.excelUrl, '_blank', 'noopener,noreferrer');
      })
      .catch(error => {
        console.error('Error', error);
        setLoading(false);
      });
  };

  const handlePensionCard = user => {
    setLoading(true);

    // First, check user assignments
    fetch(`${apiBaseUrl}/eventCategories/userAssignments/${user.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(userAssignmentsData => {
        setLoading(false);

        const isEventCategoryValid = userAssignmentsData.data.some(
          assignment => assignment.event_category_id === '12',
        );

        if (isEventCategoryValid) {
          fetch(`${apiBaseUrl}/rationUsers/pensionCard/${user.id}/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          })
            .then(response => response.json())
            .then(responseData => {
              window.open(responseData.pdfUrl, '_blank', 'noopener,noreferrer');
            })
            .catch(error => {
              console.error('Error generating food card', error);
            });
        } else {
          setTimeout(() => {
            toast.error('User not assigned to pension support.', {
              position: 'top-center',
            });
          }, 500);
        }
      })
      .catch(error => {
        console.error('Error fetching user assignments', error);
        setLoading(false);
      });
  };

  const handleAllPensionCard = () => {
    setLoading(true);
    fetch(`${apiBaseUrl}/rationUsers/pensionCard`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setLoading(false);
        window.open(responseData.pdfUrl, '_blank', 'noopener,noreferrer');
      })
      .catch(error => {
        console.error('Error', error);
        setLoading(false);
      });
  };

  const handleAllPensionData = () => {
    setLoading(true);
    fetch(`${apiBaseUrl}/rationUsers/pensionDataExcel`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setLoading(false);
        window.open(responseData.excelUrl, '_blank', 'noopener,noreferrer');
      })
      .catch(error => {
        console.error('Error', error);
        setLoading(false);
      });
  };

  // Pagination handlers
  const first = () => setActive(1);
  const prev = () => setActive(prev => Math.max(prev - 1, 1));
  const next = () => setActive(prev => Math.min(prev + 1, lastPage));
  const last = () => setActive(lastPage);

  function ArrowBackIcon(props) {
    return (
      <SvgIcon {...props} fontSize="large">
        <path d="M14 6l-6 6 6 6v-12z" />
      </SvgIcon>
    );
  }

  function ArrowForwardIcon(props) {
    return (
      <SvgIcon {...props} fontSize="large">
        <path d="M10 6l6 6-6 6v-12z" />
      </SvgIcon>
    );
  }

  function DoubleArrowBackIcon(props) {
    return (
      <SvgIcon {...props} fontSize="large">
        <path d="M18 6l-6 6 6 6v-12z" />
        <path d="M12 6l-6 6 6 6v-12z" />
      </SvgIcon>
    );
  }

  function DoubleArrowForwardIcon(props) {
    return (
      <SvgIcon {...props} fontSize="large">
        <path d="M6 6l6 6-6 6v-12z" />
        <path d="M12 6l6 6-6 6v-12z" />
      </SvgIcon>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto mt-8 col-span-10 md:col-span-6 lg:col-span-8 xl:col-span-10 2xl:col-span-14 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        {/* Search Section */}
        <div className="flex flex-col gap-6">
          {/* Filter Controls */}
          <div className="flex justify-center items-center gap-4">
            <MaterialSelect
              label=""
              className="px-6 py-6 hover:border-black"
              value={filters.type}
              onChange={value => {
                filters.type = value;
                setActive(1);
                fetchUsers();
              }}
            >
              <Option value="" disabled>
                Support Type
              </Option>
              <Option key={'1'} value={'11'}>
                {'Food Support'}
              </Option>
              <Option key={'2'} value={'12'}>
                {'Financial Support'}
              </Option>
              <Option key={'3'} value={''}>
                {'All Users'}
              </Option>
            </MaterialSelect>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <FormControl fullWidth>
              <InputLabel id="municipality-select-label">Municipality</InputLabel>
              <Select
                labelId="municipality-select-label"
                id="municipality-select"
                value={filters.municipalityId}
                onChange={e => {
                  setFilters({
                    ...filters,
                    municipalityId: e.target.value,
                    blockWardId: null,
                    cityTownIds: null,
                  });
                  handleFilterChange(e);
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
            <FormControl fullWidth>
              <InputLabel id="ward-select-label">Block/Ward</InputLabel>
              <Select
                labelId="ward-select-label"
                id="ward-select"
                value={filters.blockWardId}
                onChange={e => {
                  setFilters({ ...filters, blockWardId: e.target.value, cityTownIds: null });
                  handleFilterChange(e);
                  fetchAreas(filters.municipalityId, e.target.value);
                }}
              >
                {wards.map(ward => (
                  <MenuItem key={ward.id} value={ward.id}>
                    {ward.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="area-select-label">Area/Lane</InputLabel>
              <Select
                labelId="area-select-label"
                id="area-select"
                value={filters.cityTownIds}
                onChange={e => {
                  setFilters({ ...filters, cityTownIds: e.target.value });
                  handleFilterChange(e);
                }}
              >
                {areas.map(area => (
                  <MenuItem key={area.id} value={area.id}>
                    {area.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Input
              label="Gender"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-6 hover:border-black"
              value={filters.gender}
              onClick={() => setgenderPopupOpen(true)}
              readOnly
            />
            <Input
              label="Religion"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-6 hover:border-black"
              value={filters.religion}
              onClick={() => setreligionPopupOpen(true)}
              readOnly
            />
            <MaterialSelect
              label=""
              className="px-6 py-6 hover:border-black"
              value={filters.staff}
              onChange={value => {
                filters.staff = value;
                setActive(1);
                fetchUsers();
              }}
            >
              <Option value="" disabled>
                Select Staff
              </Option>
              <Option key={'1'} value={'Yes'}>
                {'Yes'}
              </Option>
              <Option key={'2'} value={'No'}>
                {'No'}
              </Option>
            </MaterialSelect>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 mt-6">
          <SearchTextField value={pendingSearchString} onChange={handleSearchTextChange} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{
              height: '56px',
              width: '200px',
              fontSize: '20px',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#0056b3',
                transform: 'scale(1.05)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            Search
          </Button>
        </div>
        <div className="flex justify-center items-center gap-4 mt-6">
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleAllFoodCard}
            sx={{
              fontSize: '18px',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            Download All Food Card
          </StyledButton>
          <StyledButton
            variant="contained"
            color="secondary"
            onClick={handleAllPensionCard}
            sx={{
              fontSize: '18px',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            Download All Pension Card
          </StyledButton>
          <StyledButton
            variant="contained"
            color="success"
            onClick={handleAllFoodData}
            sx={{
              fontSize: '18px',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            Download Food Report
          </StyledButton>
          <StyledButton
            variant="contained"
            color="warning"
            onClick={handleAllPensionData}
            sx={{
              fontSize: '18px',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            Download Pension Report
          </StyledButton>
        </div>
      </div>

      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell align="center">
                <span className="font-bold text-lg">Reg. Number</span>
              </TableCell>
              <TableCell align="center">
                <span className="font-bold text-lg">Name</span>
              </TableCell>
              <TableCell align="center">
                <span className="font-bold text-lg">Contact Number</span>
              </TableCell>
              <TableCell align="center">
                <span className="font-bold text-lg">Photo</span>
              </TableCell>
              <TableCell align="center">
                <span className="font-bold text-lg">Action</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id} className="hover:bg-yellow-100">
                <TableCell align="center">{user.reg_no}</TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.contact_number}</TableCell>
                <TableCell
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={`${apiBaseUrl}/photos/uploads/Users_Images/${user.user_photo}`}
                    alt="User Photo"
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = `${apiBaseUrl}/photos/uploads/placeholder.png`;
                    }}
                    style={{ width: '140px', height: '111px' }}
                  />
                </TableCell>
                <TableCell align="center">
                  <div className="flex justify-center">
                    <StyledButton
                      variant="contained"
                      color="secondary"
                      onClick={() => handleAssign(user.id)}
                    >
                      Assign
                    </StyledButton>
                    <StyledButton
                      variant="contained"
                      color="warning"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </StyledButton>
                    <StyledButton
                      variant="contained"
                      color="error"
                      onClick={() => handleDeactivate(user.id)}
                    >
                      Delete
                    </StyledButton>
                  </div>
                  <div className="flex justify-center">
                    <StyledButton
                      variant="contained"
                      color="primary"
                      onClick={() => handleFoodCard(user)}
                    >
                      Food Card
                    </StyledButton>
                    <StyledButton
                      variant="contained"
                      color="success"
                      onClick={() => handlePensionCard(user)}
                    >
                      Pension Card
                    </StyledButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <IconButton
          onClick={first}
          disabled={users.length === 0 || active === 1}
          sx={{ color: users.length === 0 || active === 1 ? 'gray' : 'primary.main' }}
        >
          <DoubleArrowBackIcon />
        </IconButton>
        <IconButton
          onClick={prev}
          disabled={users.length === 0 || active === 1}
          sx={{ color: users.length === 0 || active === 1 ? 'gray' : 'primary.main' }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body1" className="mx-4">
          Items {(active - 1) * 25 + 1} - {Math.min(active * 25, totalCount)} of {totalCount}
        </Typography>
        <IconButton
          onClick={next}
          disabled={users.length === 0 || active === lastPage}
          sx={{ color: users.length === 0 || active === lastPage ? 'gray' : 'primary.main' }}
        >
          <ArrowForwardIcon />
        </IconButton>
        <IconButton
          onClick={last}
          disabled={users.length === 0 || active === lastPage}
          sx={{ color: users.length === 0 || active === lastPage ? 'gray' : 'primary.main' }}
        >
          <DoubleArrowForwardIcon />
        </IconButton>
      </div>

      {/* Modals */}
      <AssignEventsModal
        open={assignModalOpen}
        handleClose={closeModal}
        userId={selectedUserId}
        apiBaseUrl={apiBaseUrl}
        token={localStorage.getItem('token')}
      />
      <Modal
        isOpen={genderPopupOpen}
        onClose={handleCloseGenderModal}
        options={genders}
        onSelect={handleGenderChange}
        renderOption={renderGenderOption}
      />
      <Modal
        isOpen={religionPopupOpen}
        onClose={handleCloseReligionModal}
        options={religions}
        onSelect={handleReligionChange}
        renderOption={renderReligionOption}
      />
      <ToastContainer />
    </div>
  );
};

export default ManageUsers;
