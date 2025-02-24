import React, { useState, useEffect } from 'react';
import { Input, Button } from '@material-tailwind/react';
import Loader from './Loader';

const apiBaseUrl = process.env.API_BASE_URL;

function OrganizationSelectionModal({ isOpen, onClose, onSelect }) {
  const [organizations, setOrganizations] = useState([]);
  const [organizationNameFilter, setOrganizationNameFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);

  const handleFilterChange = event => {
    setOrganizationNameFilter(event.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      handleSearchOrganizations();
    }
  }, [isOpen]);

  const handleSearchOrganizations = async () => {
    const queryString = `organization_name=${organizationNameFilter}`;
    setLoading(true);
    fetch(`${apiBaseUrl}/rationOrganizations/getRationOrganizations?${queryString}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setOrganizations(responseData.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching:', error);
        setLoading(false);
      });
  };

  const toggleOrganizationSelection = organization => {
    const isSelected = selectedOrganizations.some(org => org.id === organization.id);

    if (isSelected) {
      setSelectedOrganizations(prevSelectedOrgs =>
        prevSelectedOrgs.filter(org => org.id !== organization.id),
      );
    } else {
      setSelectedOrganizations(prevSelectedOrgs => [...prevSelectedOrgs, organization]);
    }
  };

  const handleConfirmSelection = () => {
    onSelect(selectedOrganizations);
    onClose();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
          <div className="flex justify-center items-center mb-6 relative">
            <h2 className="text-2xl font-bold text-center w-full text-gray-800">
              Select Organizations
            </h2>
            <button
              onClick={onClose}
              className="absolute right-0 top-0 text-red-500 text-2xl font-bold hover:text-red-700 transition-colors"
            >
              &times;
            </button>
          </div>
          <div className="space-y-4">
            <Input
              label="Name"
              name="name"
              value={organizationNameFilter}
              onChange={handleFilterChange}
              className="mb-4"
            />
            <div className="flex justify-center mb-4">
              <Button className="w-40" onClick={handleSearchOrganizations}>
                Search
              </Button>
            </div>
            <ul className="mt-4 max-h-64 overflow-y-auto">
              {organizations.map(org => (
                <li
                  key={org.id}
                  onClick={() => toggleOrganizationSelection(org)}
                  className={`p-2 border-t border-b cursor-pointer transition-colors ${
                    selectedOrganizations.some(selectedOrg => selectedOrg.id === org.id)
                      ? 'bg-blue-200 hover:bg-blue-300'
                      : ''
                  }`}
                >
                  {org.organization_name}
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-6">
              <Button className="w-40" onClick={handleConfirmSelection}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default OrganizationSelectionModal;
