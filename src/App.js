import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContext from './AuthContext';
import Layout from './components/Layout';
import Loader from './components/Loader';
import './index.css';

import Login from './pages/Login';
import ProtectedWrapper from './ProtectedWrapper';
import Dashboard from './pages/Dashboard';
import CreateUsers from './pages/CreateUsers';
import ManageUsers from './pages/ManageUsers';
import EditUserData from './pages/EditUserData';
import CreateOrganization from './pages/CreateOrganization';
import AreaCategory from './pages/AreaCategory';
import CreateEvents from './pages/Events';
import Reports from './pages/Reports';
import NoPageFound from './pages/NoPageFound';

const App = () => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
    setLoader(false);
  }, []);

  const signin = (newUser, callback) => {
    const userObject = {
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
      token: newUser.token,
    };
    setUser(userObject);
    localStorage.setItem('user', JSON.stringify(userObject));
    if (callback) callback();
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = { user, signin, signout };

  if (loader) return <Loader />;

  return (
    <AuthContext.Provider value={value}>
      <div className={loader ? 'blur-background' : ''}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedWrapper>
                  <Layout />
                </ProtectedWrapper>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="/CreateUsers" element={<CreateUsers />} />
              <Route path="/ManageUsers" element={<ManageUsers />} />
              <Route path="/EditUserData" element={<EditUserData />} />
              <Route path="/CreateOrganization" element={<CreateOrganization />} />
              <Route path="/AreaCategory" element={<AreaCategory />} />
              <Route path="/CreateEvents" element={<CreateEvents />} />
              <Route path="/reports" element={<Reports />} />
            </Route>
            <Route path="*" element={<NoPageFound />} />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
