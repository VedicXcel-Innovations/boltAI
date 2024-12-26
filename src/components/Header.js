import React from 'react';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import AuthContext from '../AuthContext';
import { Link } from 'react-router-dom';

const apiBaseUrl = process.env.API_BASE_URL;

const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'CreateUsers', href: '/CreateUsers', current: false },
  { name: 'CreateOrganization', href: '/CreateOrganization', current: false },
  { name: 'AreaCategory', href: '/AreaCategory', current: false },
  { name: 'CreateEvents', href: '/CreateEvents', current: false },
];

const userNavigation = [{ name: 'Sign out', href: './login' }];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      setError(error.message);
    }
  };

  const signout = async () => {
    localStorage.removeItem('token');
    authContext.signout();
  };

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-300">
        {({ open }) => (
          <>
            <div className="flex items-center h-16">
              {/* Logo Container */}
              <div className="flex items-center pl-7 pt-8">
                <img
                  className="h-14 w-auto"
                  src={require('../assets/logo.png')}
                  alt="Inventory Management System"
                />
              </div>

              {/* Main Container */}
              <div className="flex-grow flex items-center justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Text Container */}
                <div className="flex-grow flex items-center justify-center pt-4">
                  <span className="font-bold text-4xl" style={{ color: '#00303F' }}>
                    Food & Financial Support Program
                  </span>
                </div>
              </div>

              {/* Right-aligned items */}
              <div className="flex items-center space-x-4 pr-10">
                {/* Notification Button */}
                <button
                  type="button"
                  className="rounded-full bg-gray-300 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-7 w-7" aria-hidden="true" />
                </button>

                {/* Profile Dropdown */}
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-7 w-7 rounded-full"
                        src={userData?.profile_picture}
                        alt="profile"
                      />
                    </Menu.Button>
                    {/* User Name */}
                    <div className="absolute top-full right-0 bg-gray-100 shadow-lg rounded-lg px-4 py-2 mt-2 hover:bg-white transition duration-300">
                      <p className="text-sm text-black font-medium whitespace-nowrap">
                        {error ? 'Hi' : `Hi, ${userData?.first_name} ${userData?.last_name}`}
                      </p>
                    </div>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map(item => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              to={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700',
                              )}
                            >
                              <span onClick={() => signout()}>{item.name}</span>
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>

            {/* Navigation Links */}
            <Disclosure.Panel className="sm:hidden">
              <div className="flex flex-col items-center w-full mt-4 space-y-2">
                {navigation.map(item => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900',
                      'block px-3 py-2 rounded-md text-base font-medium',
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
