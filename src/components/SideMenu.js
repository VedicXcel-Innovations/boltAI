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
    <div className="h-full bg-gray-100 p-4 rounded-lg">
      <nav aria-label="Main Nav" className="flex flex-col space-y-2">
        <Link to="/" className={getLinkClasses('/')} onClick={handleLinkClick('/')}>
          <img
            alt="dashboard-icon"
            src={require('../assets/dashboard-icon.png')}
            className="w-6 h-6"
          />
          <span className="text-sm font-bold"> Dashboard </span>
        </Link>

        <Link
          to="/CreateUsers"
          className={getLinkClasses('/CreateUsers')}
          onClick={handleLinkClick('/CreateUsers')}
        >
          <img alt="user-icon" src={require('../assets/user-icon.png')} className="w-6 h-6" />
          <span className="text-sm font-bold"> Create Users </span>
        </Link>

        <Link
          to="/CreateOrganization"
          className={getLinkClasses('/CreateOrganization')}
          onClick={handleLinkClick('/CreateOrganization')}
        >
          <img
            alt="organizationuser-icon"
            src={require('../assets/organizationuser-icon.png')}
            className="w-6 h-6"
          />
          <span className="text-sm font-bold"> Create Organization </span>
        </Link>

        <Link
          to="/AreaCategory"
          className={getLinkClasses('/AreaCategory')}
          onClick={handleLinkClick('/AreaCategory')}
        >
          <img alt="area-icon" src={require('../assets/area-icon.png')} className="w-6 h-6" />
          <span className="text-sm font-bold"> Area Category </span>
        </Link>

        <Link
          to="/CreateEvents"
          className={getLinkClasses('/CreateEvents')}
          onClick={handleLinkClick('/CreateEvents')}
        >
          <img alt="event-icon" src={require('../assets/event-icon.png')} className="w-6 h-6" />
          <span className="text-sm font-bold"> Create Events </span>
        </Link>

        <Link
          to="/reports"
          className={getLinkClasses('/reports')}
          onClick={handleLinkClick('/reports')}
        >
          <img alt="reports-icon" src={require('../assets/reports-icon.png')} className="w-6 h-6" />
          <span className="text-sm font-bold"> Reports </span>
        </Link>
      </nav>
    </div>
  );
}

export default SideMenu;
