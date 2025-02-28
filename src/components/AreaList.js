import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import AddEditAreaForm from './AddEditAreaForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiBaseUrl = process.env.API_BASE_URL;

const AreaList = ({ municipalityId, wardId }) => {
  const [loading, setLoading] = useState(true);
  const [areas, setAreas] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const fetchAreas = () => {
      if (wardId && municipalityId) {
        fetch(`${apiBaseUrl}/areaCategories/all/${municipalityId}/${wardId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
          .then(response => response.json())
          .then(responseData => {
            setAreas(responseData.data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching areas:', error);
            toast.error(`Error fetching areas: ${error.message}`, {
              position: 'top-center',
            });
            setLoading(false);
          });
      }
    };
    fetchAreas();
  }, [municipalityId, wardId]);

  const refreshAreas = () => {
    if (wardId && municipalityId) {
      fetch(`${apiBaseUrl}/areaCategories/all/${municipalityId}/${wardId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(response => response.json())
        .then(responseData => {
          setAreas(responseData.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching areas:', error);
          toast.error(`Error fetching areas: ${error.message}`, {
            position: 'top-center',
          });
          setLoading(false);
        });
    }
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
    fetch(`${apiBaseUrl}/areaCategories/delete/${id}`, {
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
        toast.success('Area deleted successfully', {
          position: 'top-center',
        });
        setAreas(areas.filter(a => a.id !== id));
      })
      .then(() => {
        refreshAreas();
      })
      .catch(error => {
        console.error('Error deleting area:', error);
        toast.error(`Error deleting area: ${error.message}`, {
          position: 'top-center',
        });
        setLoading(false);
      });
  };

  const handleSave = data => {
    const isEdit = currentItem != null;
    const method = 'POST';
    const url = isEdit
      ? `${apiBaseUrl}/areaCategories/edit/${currentItem.id}`
      : `${apiBaseUrl}/areaCategories/add`;
    setLoading(true);
    data.mun_pan_id = municipalityId;
    data.ward_id = wardId;
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
          setAreas(areas.map(a => (a.id === newData.areaCategory.id ? newData.areaCategory : a)));
        } else {
          setAreas([...areas, newData.areaCategory]);
        }
        setIsEditing(false);
        setCurrentItem(null);
        toast.success(`Area ${isEdit ? 'updated' : 'added'} successfully`, {
          position: 'top-center',
        });
      })
      .then(() => {
        refreshAreas();
      })
      .catch(error => {
        console.error('Error saving area:', error);
        toast.error(`Error saving areas: ${error.message}`, {
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
    <div className="area-list p-4 bg-white shadow-md rounded-lg relative">
      <h3 className="text-xl font-bold mb-4 text-center">Area List</h3>
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
          Add Area
        </button>
      </div>
      {isEditing && (
        <AddEditAreaForm
          itemType="Area"
          itemData={currentItem}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      <ul className="space-y-4 max-h-96 overflow-y-auto scrollbar-custom pr-4">
        {areas.map(area => (
          <li
            key={area.id}
            className={`flex justify-between items-center p-4 bg-blue-100 rounded-md`}
          >
            <div className="flex items-center">
              <span className="font-medium">{area.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleEdit(area)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(area.id)}
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

export default AreaList;
