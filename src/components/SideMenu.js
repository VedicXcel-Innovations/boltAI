import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function SideMenu() {
  const location = useLocation();
  const navigate = useNavigate();

  const getLinkClasses = path => {
    return `flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-gray-300 hover:text-gray-700 ${
      location.pathname === path ? 'text-blue-500' : 'text-gray-500'
    }`;
  };

  const handleLinkClick = path => e => {
    if (location.pathname === path) {
      e.preventDefault();
      window.location.reload();
    } else {
      navigate(path);
    }
  };

  return (
    <div className="flex-col justify-between bg-gray-100 hidden md:flex lg:flex rounded-lg h-full">
      <div className="px-4 py-2 md:px-4 md:py-2 lg:px-6 lg:py-2">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          <Link to="/" className={getLinkClasses('/')} onClick={handleLinkClick('/')}>
            <img alt="dashboard-icon" src={require('../assets/dashboard-icon.png')} />
            <span className="text-sm font-bold"> Dashboard </span>
          </Link>

          <Link
            to="/CreateUsers"
            className={getLinkClasses('/CreateUsers')}
            onClick={handleLinkClick('/CreateUsers')}
          >
            <img alt="user-icon" src={require('../assets/user-icon.png')} />
            <span className="text-sm font-bold"> Create Users </span>
          </Link>

          <Link
            to="/CreateOrganization"
            className={getLinkClasses('/CreateOrganization')}
            onClick={handleLinkClick('/CreateOrganization')}
          >
            <img alt="organizationuser-icon" src={require('../assets/organizationuser-icon.png')} />
            <span className="text-sm font-bold"> Create Organization </span>
          </Link>

          <Link
            to="/AreaCategory"
            className={getLinkClasses('/AreaCategory')}
            onClick={handleLinkClick('/AreaCategory')}
          >
            <img alt="area-icon" src={require('../assets/area-icon.png')} />
            <span className="text-sm font-bold"> Area Category </span>
          </Link>

          <Link
            to="/CreateEvents"
            className={getLinkClasses('/CreateEvents')}
            onClick={handleLinkClick('/CreateEvents')}
          >
            <img alt="event-icon" src={require('../assets/event-icon.png')} />
            <span className="text-sm font-bold"> Create Events </span>
          </Link>

          <Link
            to="/reports"
            className={getLinkClasses('/reports')}
            onClick={handleLinkClick('/reports')}
          >
            <img alt="reports-icon" src={require('../assets/reports-icon.png')} />
            <span className="text-sm font-bold"> Reports </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default SideMenu;
