import React, { useEffect, useState } from 'react';
import AddEditAreaForm from './AddEditAreaForm';
import Loader from './Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiBaseUrl = process.env.API_BASE_URL;

const MunicipalityList = ({ onMunicipalityChange }) => {
  const [municipalities, setMunicipalities] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState(null);

  useEffect(() => {
    fetchMunicipalities();
  }, []);

  const fetchMunicipalities = () => {
    fetch(`${apiBaseUrl}/municipalities/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setMunicipalities(responseData.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching municipalities:', error);
        toast.error(`Error fetching municipalities: ${error.message}`, {
          position: 'top-center',
        });
        setLoading(false);
      });
  };

  const handleView = item => {
    onMunicipalityChange(item.id);
    setSelectedMunicipalityId(item.id);
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
    fetch(`${apiBaseUrl}/municipalities/delete/${id}`, {
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
        toast.success('Municipality deleted successfully', {
          position: 'top-center',
        });
        setMunicipalities(municipalities.filter(m => m.id !== id));
        fetchMunicipalities();
      })
      .catch(error => {
        console.error('Error deleting municipality:', error);
        toast.error(`Error deleting municipality: ${error.message}`, {
          position: 'top-center',
        });
        setLoading(false);
      });
  };

  const handleSave = data => {
    const isEdit = currentItem != null;
    const method = 'POST';
    const url = isEdit
      ? `${apiBaseUrl}/municipalities/edit/${currentItem.id}`
      : `${apiBaseUrl}/municipalities/add`;
    if (!isEdit) {
      data.istest = true;
    }
    setLoading(true);
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
          setMunicipalities(
            municipalities.map(m => (m.id === newData.municipality.id ? newData.municipality : m)),
          );
        } else {
          setMunicipalities([...municipalities, newData.municipality]);
        }
        setIsEditing(false);
        setCurrentItem(null);
        fetchMunicipalities();
        toast.success(`Municipality ${isEdit ? 'updated' : 'added'} successfully`, {
          position: 'top-center',
        });
      })
      .catch(error => {
        console.error('Error saving municipality:', error);
        setLoading(false);
        toast.error(`Error saving municipality: ${error.message}`, {
          position: 'top-center',
        });
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentItem(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="municipality-list p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-center">Municipality List</h3>
      <button
        onClick={handleAdd}
        className="block mx-auto mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Add Municipality
      </button>
      {isEditing && (
        <AddEditAreaForm
          itemType="Municipality"
          itemData={currentItem}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      <ul className="space-y-4 max-h-96 overflow-y-auto scrollbar-custom pr-4">
        {municipalities.map(municipality => (
          <li
            key={municipality.id}
            className={`flex justify-between items-center p-4 bg-blue-100 rounded-md ${
              municipality.id === selectedMunicipalityId ? 'bg-blue-500' : ''
            }`}
          >
            <div className="flex items-center">
              <span className="font-medium">{municipality.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleView(municipality)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
              >
                View
              </button>
              <button
                onClick={() => handleEdit(municipality)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(municipality.id)}
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

export default MunicipalityList;
