import React from 'react';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
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
    <Disclosure as="nav" className="bg-gray-300">
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-auto"
                  src={require('../assets/logo.png')}
                  alt="Inventory Management System"
                />
              </div>
              <div className="hidden lg:block ml-10">
                <span
                  className="font-bold text-2xl md:text-3xl lg:text-4xl"
                  style={{ color: '#00303F' }}
                >
                  Food & Financial Support Program
                </span>
              </div>

              <div className="hidden lg:block">
                <div className="flex items-center space-x-4">
                  <button className="rounded-full bg-gray-300 p-1 text-gray-400 hover:text-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-7 w-7" aria-hidden="true" />
                  </button>

                  <Menu as="div" className="relative">
                    <Menu.Button className="flex items-center rounded-full bg-gray-300 text-sm focus:outline-none">
                      <img
                        className="h-7 w-7 rounded-full"
                        src={userData?.profile_picture}
                        alt="profile"
                      />
                      <span className="ml-2 text-sm text-black font-medium">
                        {error ? 'Hi' : `Hi, ${userData?.first_name} ${userData?.last_name}`}
                      </span>
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg">
                        {userNavigation.map(item => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link
                                to={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700',
                                )}
                                onClick={signout}
                              >
                                {item.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>

              <div className="lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map(item => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={userData?.profile_picture}
                    alt="profile"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-black">
                    {error ? 'Hi' : `${userData?.first_name} ${userData?.last_name}`}
                  </div>
                </div>
                <button className="ml-auto rounded-full bg-gray-300 p-1 text-gray-400 hover:text-white">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map(item => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    onClick={signout}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
