import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import { Input, Button } from '@material-tailwind/react';

const apiBaseUrl = process.env.API_BASE_URL;

function Login() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginUser = e => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setErrorMessage('Please enter username and password.');
      setSuccessMessage('');
      return;
    }
    
    fetch(`${apiBaseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
        login_from: 'website',
      }),
    })
      .then(async response => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Something went wrong. Please try again.');
        }
        return response.json();
      })
      .then(data => {
        setSuccessMessage('Successfully logged in.');
        setErrorMessage('');
        localStorage.setItem('token', data.token);
        const newUser = {
          id: data.user.id,
          username: data.user.username,
          role: data.user.role,
          token: data.token,
        };
        authContext.signin(newUser, () => {
          navigate('/');
        });
      })
      .catch(error => {
        console.error('Error logging in:', error.message);
        setErrorMessage(error.message);
        setSuccessMessage('');
      });
  };

  return (
    <div className="relative h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src={require('../assets/signup.png')}
          alt="Signup"
          className="object-cover h-full w-full filter blur"
        />
      </div>
      <div className="relative z-10 flex items-center justify-center h-full w-full max-w-md p-6">
        <div className="w-full p-8 bg-white bg-opacity-85 rounded-lg shadow-lg">
          <div className="text-center">
            <img
              className="mx-auto h-12 w-auto"
              src={require('../assets/logo.png')}
              alt="Your Company"
            />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={loginUser}>
            <div className="flex flex-col items-center justify-center">
              {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
              {successMessage && <div className="text-green-500 text-sm">{successMessage}</div>}
            </div>
            <div className="rounded-md shadow-sm space-y-4">
              <Input
                className="bg-white bg-opacity-50 focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
                label="Username"
                type="text"
                name="username"
                autoComplete="username"
                value={form.username}
                onChange={handleInputChange}
              />
              <Input
                className="bg-white bg-opacity-50 focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
                label="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Button
                type="submit"
                className="group relative flex w-full justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
              >
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
