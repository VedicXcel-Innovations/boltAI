import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';
import Chart from 'react-apexcharts';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import {
  Modal,
  TextField,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  styled,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
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

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function Dashboard() {
  const [chart, BarChartData] = useState({
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        data: [],
      },
    ],
  });

  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Users',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/dashboard/pieChart`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch pie chart data');
        }

        const data = await response.json();

        const labels = [
          'Food Support - Male',
          'Food Support - Female',
          'Financial Support - Male',
          'Financial Support - Female',
        ];

        const dataset = [
          data['Food Support'].Male,
          data['Food Support'].Female,
          data['Financial Support'].Male,
          data['Financial Support'].Female,
        ];

        const backgroundColor = [
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ];

        const borderColor = [
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
        ];

        setPieChartData({
          labels,
          datasets: [
            {
              label: 'Total Users',
              data: dataset,
              backgroundColor,
              borderColor,
              borderWidth: 1,
            },
          ],
          plugins: {
            datalabels: {
              color: '#fff',
              formatter: value => {
                return value;
              },
              anchor: 'center',
              align: 'center',
            },
          },
        });
      } catch (error) {
        console.error('Error fetching pie chart data', error);
      }
    };

    const fetchBarChartData = async () => {
      const response = await fetch(`${apiBaseUrl}/dashboard/barChart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();

      const currentYear = new Date().getFullYear();
      const previousYear = currentYear - 1;

      const currentYearFinancialData = [];
      const currentYearFoodData = [];
      const previousYearFinancialData = [];
      const previousYearFoodData = [];
      const categories = [];

      data.forEach(item => {
        const monthName = new Date(item.year, item.month - 1).toLocaleString('default', {
          month: 'long',
        });

        if (!categories.includes(monthName)) {
          categories.push(monthName);
        }

        if (item.year == currentYear) {
          currentYearFinancialData.push(parseInt(item.financial_total, 10));
          currentYearFoodData.push(parseInt(item.food_total, 10));
        } else if (item.year == previousYear) {
          previousYearFinancialData.push(parseInt(item.financial_total, 10));
          previousYearFoodData.push(parseInt(item.food_total, 10));
        }
      });

      BarChartData({
        options: {
          xaxis: {
            categories: categories,
          },
          plotOptions: {
            bar: {
              grouped: true,
              horizontal: false,
            },
          },
          dataLabels: {
            enabled: false,
            style: {
              colors: ['#000000'],
            },
          },
          yaxis: {
            title: {
              text: 'Amount',
            },
          },
          fill: {
            opacity: 1,
          },
        },
        series: [
          {
            name: `${previousYear} Food Items`,
            data: previousYearFoodData,
          },
          {
            name: `${previousYear} Financial Items`,
            data: previousYearFinancialData,
          },
          {
            name: `${currentYear} Food Items`,
            data: currentYearFoodData,
          },
          {
            name: `${currentYear} Financial Items`,
            data: currentYearFinancialData,
          },
        ],
      });
    };

    fetchPieChartData();
    fetchBarChartData();
  }, []);

  const authContext = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    email: '',
    role: '',
    can_login_from_website: false,
    can_login_from_mobile: false,
    organization_id: '',
    first_name: '',
    last_name: '',
    profile_picture: '',
  });

  useEffect(() => {
    if (!authContext.user) {
    }
  }, [authContext.user]);

  const handleOpenCreateUser = () => {
    if (authContext.user?.role === 'admin') {
      setOpenCreateUser(true);
    } else {
      toast.error(
        'You do not have authorization to access this feature. Please contact your system administrator.',
        { position: 'top-center' },
      );
    }
  };
  const handleCloseCreateUser = () => setOpenCreateUser(false);

  const handleCreateUserChange = e => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token found');
      }

      const newUserWithDefaults = {
        ...newUser,
        role: 'user',
        organization_id: 1,
        profile_picture: 'logo512.png',
      };

      const response = await fetch(`${apiBaseUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUserWithDefaults),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const data = await response.json();
      if (data.error) {
        toast.error(`Error: ${data.error}`);
      } else {
        toast.success(`User created successfully!`, {
          position: 'top-center',
        });
        handleCloseCreateUser();
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: 'top-center',
      });
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${apiBaseUrl}/passwordChange`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      const data = await response.json();
      if (data.error) {
        toast.error(`Error: ${data.error}`);
      } else {
        toast.success(`Password changed successfully!`, {
          position: 'top-center',
        });
        handleClose();
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: 'top-center',
      });
    }
  };

  const [openManageStaff, setOpenManageStaff] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (openManageStaff) {
      fetchUsers();
    }
  }, [openManageStaff]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/users/status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const data = await response.json();
      const filteredUsers = data.users.filter(user => user.role !== 'admin');
      setUsers(filteredUsers);
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: 'top-center',
      });
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/passwordChange/adminReset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ userId: selectedUser.user_id, newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }
      toast.success('Password reset successfully!', {
        position: 'top-center',
      });
      setSelectedUser(null);
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: 'top-center',
      });
    }
  };

  const handleStatusUpdate = async user => {
    try {
      const newStatus = user.status === 'active' ? 'inactive' : 'active';

      const response = await fetch(`${apiBaseUrl}/register/statusUpdate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ userId: user.user_id, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      toast.success('User status updated successfully!', {
        position: 'top-center',
      });

      fetchUsers();
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: 'top-center',
      });
    }
  };

  const handleOpenManageStaff = () => {
    if (authContext.user?.role === 'admin') {
      setOpenManageStaff(true);
    } else {
      toast.error(
        'You do not have authorization to access this feature. Please contact your system administrator.',
        { position: 'top-center' },
      );
    }
  };
  const handleCloseManageStaff = () => setOpenManageStaff(false);

  return (
    <>
      <div className="grid grid-cols-4 col-span-10 md:col-span-6 lg:col-span-8 xl:col-span-10 2xl:col-span-14 gap-8 p-8">
        <article className="flex flex-col items-center gap-4 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 p-6 shadow-lg transition-transform transform hover:scale-105">
          <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
            <Link
              to="/ManageUsers"
              className="text-center text-2xl font-bold text-blue-700 hover:text-blue-900 transition-colors"
            >
              Manage <br /> Users
            </Link>
          </div>
        </article>

        <article className="flex flex-col items-center gap-4 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 p-6 shadow-lg transition-transform transform hover:scale-105">
          <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
            <button
              className="text-center text-2xl font-bold text-teal-700 hover:text-cyan-900 transition-colors cursor-pointer"
              onClick={handleOpenCreateUser}
            >
              Create <br /> Staff
            </button>
          </div>
        </article>

        <Dialog open={openCreateUser} onClose={handleCloseCreateUser}>
          <DialogTitle
            style={{
              fontWeight: 'bold',
              fontSize: '24px',
              textAlign: 'center',
            }}
          >
            Create New Staff
          </DialogTitle>

          <DialogContent>
            <TextField
              label="Username"
              value={newUser.username}
              onChange={e => setNewUser({ ...newUser, username: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type={newPasswordVisible ? 'text' : 'password'}
              value={newUser.password}
              onChange={e => setNewUser({ ...newUser, password: e.target.value })}
              InputProps={{
                endAdornment: (
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                  >
                    {newPasswordVisible ? (
                      <EyeSlashIcon className="h-6 w-6 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-6 w-6 text-gray-500" />
                    )}
                  </button>
                ),
              }}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={newUser.email}
              onChange={e => setNewUser({ ...newUser, email: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="First Name"
              value={newUser.first_name}
              onChange={handleCreateUserChange}
              fullWidth
              margin="normal"
              name="first_name"
            />
            <TextField
              label="Last Name"
              value={newUser.last_name}
              onChange={handleCreateUserChange}
              fullWidth
              margin="normal"
              name="last_name"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newUser.can_login_from_website}
                  onChange={e =>
                    setNewUser({
                      ...newUser,
                      can_login_from_website: e.target.checked,
                    })
                  }
                  color="primary"
                />
              }
              label="Login From Website"
              labelPlacement="end"
              style={{ marginBottom: '6px' }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newUser.can_login_from_mobile}
                  onChange={e =>
                    setNewUser({
                      ...newUser,
                      can_login_from_mobile: e.target.checked,
                    })
                  }
                  color="primary"
                />
              }
              label="Login From Mobile"
              labelPlacement="end"
              style={{ marginBottom: '6px' }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseCreateUser}
              color="primary"
              style={{ fontSize: '14px', fontWeight: 'bold' }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleCreateUser}
              color="primary"
              style={{ fontSize: '14px', fontWeight: 'bold' }}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>

        <article className="flex flex-col items-center gap-4 rounded-xl bg-gradient-to-r from-green-400 to-green-600 p-6 shadow-lg transition-transform transform hover:scale-105">
          <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
            <button
              onClick={handleOpenManageStaff}
              className="text-center text-2xl font-bold text-green-700 hover:text-green-900 transition-colors"
            >
              Manage <br /> Staff
            </button>
          </div>
        </article>

        <Dialog open={openManageStaff} onClose={handleCloseManageStaff} fullWidth maxWidth="md">
          <DialogTitle style={{ fontWeight: 'bold', textAlign: 'center' }}>
            Manage Staff
          </DialogTitle>
          <DialogContent>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-center">Username</th>
                  <th className="border border-gray-300 p-2 text-center">Email</th>
                  <th className="border border-gray-300 p-2 text-center">Status</th>
                  <th className="border border-gray-300 p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.user_id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2 text-center">{user.username}</td>
                    <td className="border border-gray-300 p-2 text-center">{user.email}</td>
                    <td className="border border-gray-300 p-2 text-center">{user.status}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      <StyledButton
                        onClick={() => handleStatusUpdate(user)}
                        variant="contained"
                        color={user.status === 'active' ? 'error' : 'success'}
                        style={{ marginRight: '8px' }}
                      >
                        {user.status === 'active' ? 'Inactivate' : 'Activate'}
                      </StyledButton>
                      <StyledButton
                        onClick={() => setSelectedUser(user)}
                        variant="contained"
                        color="secondary"
                      >
                        Reset Password
                      </StyledButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseManageStaff} color="primary" style={{ fontWeight: 'bold' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {selectedUser && (
          <Modal open={Boolean(selectedUser)} onClose={() => setSelectedUser(null)}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 1,
              }}
            >
              <h2 className="text-center font-bold text-lg">
                Reset Password for {selectedUser.username}
              </h2>
              <TextField
                label="New Password"
                type={newPasswordVisible ? 'text' : 'password'}
                fullWidth
                margin="normal"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                    >
                      {newPasswordVisible ? (
                        <EyeSlashIcon className="h-6 w-6 text-gray-500" />
                      ) : (
                        <EyeIcon className="h-6 w-6 text-gray-500" />
                      )}
                    </button>
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                type={confirmPasswordVisible ? 'text' : 'password'}
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    >
                      {confirmPasswordVisible ? (
                        <EyeSlashIcon className="h-6 w-6 text-gray-500" />
                      ) : (
                        <EyeIcon className="h-6 w-6 text-gray-500" />
                      )}
                    </button>
                  ),
                }}
              />
              <div className="flex justify-end mt-4">
                <StyledButton
                  onClick={() => setSelectedUser(null)}
                  variant="contained"
                  color="primary"
                  style={{ marginRight: '8px' }}
                >
                  Cancel
                </StyledButton>
                <StyledButton
                  onClick={handleResetPassword}
                  variant="contained"
                  color="error"
                  disabled={!newPassword || newPassword !== confirmPassword}
                >
                  Reset
                </StyledButton>
              </div>
            </Box>
          </Modal>
        )}

        <article className="flex flex-col items-center gap-4 rounded-xl bg-gradient-to-r from-orange-400 to-orange-600 p-6 shadow-lg transition-transform transform hover:scale-105">
          <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
            <button
              onClick={handleOpen}
              className="text-center text-2xl font-bold text-orange-700 hover:text-orange-900 transition-colors"
            >
              Change <br /> Password
            </button>
          </div>
        </article>

        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 1,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <h2
                style={{
                  fontWeight: 'bold',
                  fontSize: '24px',
                  marginBottom: '6px',
                }}
              >
                Change Password
              </h2>
              <button
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={handleClose}
              >
                <XMarkIcon className="h-6 w-6 text-red-500 hover:text-red-700 transition-colors" />
              </button>
            </div>
            <TextField
              label="Current Password"
              type={currentPasswordVisible ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => setCurrentPasswordVisible(!currentPasswordVisible)}
                  >
                    {currentPasswordVisible ? (
                      <EyeSlashIcon className="h-6 w-6 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-6 w-6 text-gray-500" />
                    )}
                  </button>
                ),
              }}
            />
            <TextField
              label="New Password"
              type={newPasswordVisible ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                  >
                    {newPasswordVisible ? (
                      <EyeSlashIcon className="h-6 w-6 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-6 w-6 text-gray-500" />
                    )}
                  </button>
                ),
              }}
            />
            <TextField
              label="Confirm New Password"
              type={confirmPasswordVisible ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={confirmNewPassword}
              onChange={e => setConfirmNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  >
                    {confirmPasswordVisible ? (
                      <EyeSlashIcon className="h-6 w-6 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-6 w-6 text-gray-500" />
                    )}
                  </button>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleChangePassword}
              disabled={!currentPassword || !newPassword || newPassword !== confirmNewPassword}
            >
              Change Password
            </Button>
          </Box>
        </Modal>

        <div className="flex justify-around bg-white rounded-lg py-8 col-span-full justify-center">
          <div>
            <Chart options={chart.options} series={chart.series} type="bar" width="550" />
          </div>
          <div>
            <Doughnut data={pieChartData} />
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default Dashboard;
