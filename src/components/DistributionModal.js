import React, { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import Loader from './Loader';

const apiBaseUrl = process.env.API_BASE_URL;

const DistributionModal = ({ event, onClose }) => {
  const [distributionData, setDistributionData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (event.event_type === 'People') {
      fetchDistributionData();
    } else if (event.event_type === 'Organization') {
      fetchDistributionDataOrg();
    }
  }, []);

  const fetchDistributionData = () => {
    setLoading(true);
    fetch(`${apiBaseUrl}/createEvent/getDistributionByUser?event_id=${event.event_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setDistributionData(responseData.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching distribution data:', error);
        setLoading(false);
      });
  };

  const fetchDistributionDataOrg = () => {
    setLoading(true);
    fetch(`${apiBaseUrl}/createEvent/getDistributionByOrg?event_id=${event.event_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setDistributionData(responseData.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching distribution data:', error);
        setLoading(false);
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Modal open={true} onClose={onClose}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-3xl">
        <h2 className="text-2xl font-bold text-blue-500 text-center mb-4">
          Distribution Report for {event.event_name}
        </h2>
        <div className="max-h-96 overflow-y-auto">
          {distributionData?.length > 0 ? (
            event.event_type === 'People' ? (
              distributionData.map(user => (
                <div key={user.user_id} className="mb-4">
                  <h3 className="text-xl font-bold text-purple-700">{user.user_name}</h3>
                  <ul className="list-disc list-inside">
                    {user.items.map(item => (
                      <li key={item.item_id} className="text-sm text-gray-700">
                        {item.item_name} - {item.amount}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              distributionData.map(org => (
                <div key={org.org_id} className="mb-4">
                  <h3 className="text-xl font-bold text-purple-700">{org.org_name}</h3>
                  <ul className="list-disc list-inside">
                    {org.items.map(item => (
                      <li key={item.item_id} className="text-sm text-gray-700">
                        {item.item_name} - {item.amount}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )
          ) : (
            <p className="text-gray-700 text-center">No distribution data found for this event.</p>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DistributionModal;
