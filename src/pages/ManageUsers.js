import React, { useState, useEffect, useCallback } from 'react';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AssignEventsModal from '../components/AssignEventsModal';
import Loader from '../components/Loader';

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

const ManageUsers = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const [active, setActive] = useState(1);
  const [lastPage, setLastPage] = useState(5);

  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleEdit = async user => {
    navigate('/EditUserData', { state: user });
  };

  const fetchUsers = useCallback(() => {
    setLoading(true);
    fetch(`${apiBaseUrl}/rationUsers/getRationUsersList?param=${filters}&page=${active}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.data.length === 0) {
          setTimeout(() => {
            alert('No user found. Please check Name or Contact Number.');
          }, 200);
        }
        setUsers(responseData.data);
        setLastPage(responseData.totalPages);
        setActive(responseData.currentPage);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, [active, filters]);

  const handleSearch = () => {
    setFilters(searchInput);
    setActive(1);
  };

  const next = () => {
    if (active === lastPage) return;
    setActive(prev => prev + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(prev => prev - 1);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, active]);

  const handleAssign = userId => {
    setSelectedUserId(userId);
    setAssignModalOpen(true);
  };

  const closeModal = () => {
    setAssignModalOpen(false);
    setSelectedUserId(null);
  };

  const handleDelete = async userId => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
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

        const response = await fetch(`${apiBaseUrl}/rationUsers/delete/${userId}`, {
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
        toast.success('User deleted successfully', {
          position: 'top-center',
        });
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

  const handleFilterChange = e => {
    setSearchInput(e.target.value);
  };

  const handleFoodCard = user => {
    setLoading(true);
    fetch(`${apiBaseUrl}/rationUsers/foodCard/${user.id}/`, {
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

  const handlePensionCard = user => {
    setLoading(true);
    fetch(`${apiBaseUrl}/rationUsers/pensionCard/${user.id}/`, {
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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto mt-8 col-span-10 md:col-span-6 lg:col-span-8 xl:col-span-10 2xl:col-span-14 p-4">
      <div className="grid grid-cols-1 gap-4 mt-3 mb-6">
        <div className="flex justify-center gap-3 mb-2">
          <TextField
            type="text"
            placeholder="Search by Name or Contact Number"
            value={searchInput}
            onChange={handleFilterChange}
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
                      onClick={() => handleDelete(user.id)}
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
      <div className="flex justify-center items-center mt-4">
        <IconButton
          onClick={prev}
          disabled={active === 1}
          sx={{ color: active === 1 ? 'gray' : 'primary.main' }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body1" className="mx-4">
          Page {active} of {lastPage}
        </Typography>
        <IconButton
          onClick={next}
          disabled={active === lastPage}
          sx={{ color: active === lastPage ? 'gray' : 'primary.main' }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </div>
      <AssignEventsModal
        open={assignModalOpen}
        handleClose={closeModal}
        userId={selectedUserId}
        apiBaseUrl={apiBaseUrl}
        token={localStorage.getItem('token')}
      />
      <ToastContainer />
    </div>
  );
};

export default ManageUsers;
