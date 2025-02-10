import React, { useEffect, useState } from 'react';
import AddEditAreaForm from './AddEditAreaForm';
import Loader from './Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiBaseUrl = process.env.API_BASE_URL;

const WardList = ({ municipalityId, onWardChange }) => {
  const [wards, setWards] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedWardId, setSelectedWardId] = useState(null);

  useEffect(() => {
    const fetchWards = () => {
      if (municipalityId) {
        fetch(`${apiBaseUrl}/wards/all/${municipalityId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
          .then(response => response.json())
          .then(responseData => {
            setWards(responseData.data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching wards:', error);
            toast.error(`Error fetching wards: ${error.message}`, {
              position: 'top-center',
            });
            setLoading(false);
          });
      }
    };

    fetchWards();
  }, [municipalityId]);

  const refreshWards = () => {
    if (municipalityId) {
      fetch(`${apiBaseUrl}/wards/all/${municipalityId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(response => response.json())
        .then(responseData => {
          setWards(responseData.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching wards:', error);
          toast.error(`Error fetching wards: ${error.message}`, {
            position: 'top-center',
          });
          setLoading(false);
        });
    }
  };

  const handleView = item => {
    onWardChange(item.id);
    setSelectedWardId(item.id);
  };

  const handleAdd = () => {
    setIsEditing(true);
    setCurrentItem(null);
  };

  const handleEdit = item => {
    setIsEditing(true);
    setCurrentItem(item);
  };

  const handleDelete = id => {
    setLoading(true);
    fetch(`${apiBaseUrl}/wards/delete/${id}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response =>
        response.json().then(data => {
          if (!response.ok) {
            throw new Error(data.error);
          }
          return data;
        }),
      )
      .then(data => {
        toast.success('Ward deleted successfully', {
          position: 'top-center',
        });
        setWards(wards.filter(w => w.id !== id));
      })
      .then(() => {
        refreshWards();
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error(`Error deleting ward: ${error.message}`, {
          position: 'top-center',
        });
        setLoading(false);
      });
  };

  const handleSave = data => {
    const isEdit = currentItem != null;
    const method = 'POST';
    const url = isEdit ? `${apiBaseUrl}/wards/edit/${currentItem.id}` : `${apiBaseUrl}/wards/add`;
    setLoading(true);
    data.municipality_id = municipalityId;
    if (isEdit === false) {
      data.istest = true;
    }
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(newData => {
        if (currentItem) {
          setWards(wards.map(w => (w.id === newData.ward.id ? newData.ward : w)));
        } else {
          setWards([...wards, newData.ward]);
        }
        setIsEditing(false);
        setCurrentItem(null);
        toast.success(`Ward ${isEdit ? 'updated' : 'added'} successfully`, {
          position: 'top-center',
        });
      })
      .then(() => {
        refreshWards();
      })
      .catch(error => {
        console.error('Error saving ward:', error);
        toast.error(`Error saving ward: ${error.message}`, {
          position: 'top-center',
        });
        setLoading(false);
      });
  };

  const handleClose = () => {
    window.location.reload();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentItem(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="ward-list p-4 bg-white shadow-md rounded-lg relative">
      <h3 className="text-xl font-bold mb-4 text-center">Ward List</h3>
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-red-500 text-2xl font-bold hover:text-red-700 transition-colors"
      >
        &times;
      </button>
      <div className="flex justify-center mb-4">
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Add Ward
        </button>
      </div>
      {isEditing && (
        <AddEditAreaForm
          itemType="Ward"
          itemData={currentItem}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      <ul className="space-y-4 max-h-96 overflow-y-auto scrollbar-custom pr-4">
        {wards.map(ward => (
          <li
            key={ward.id}
            className={`flex justify-between items-center p-4 bg-blue-100 rounded-md ${
              ward.id === selectedWardId ? 'bg-blue-500' : ''
            }`}
          >
            <div className="flex items-center">
              <span className="font-medium">{ward.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleView(ward)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
              >
                View
              </button>
              <button
                onClick={() => handleEdit(ward)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(ward.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WardList;
