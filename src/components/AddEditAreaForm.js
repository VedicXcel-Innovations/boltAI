import React, { useState, useEffect } from 'react';

const AddEditAreaForm = ({ itemType, itemData, onSave, onCancel }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (itemData) {
      setName(itemData.name);
    } else {
      setName('');
    }
  }, [itemData]);

  const handleSubmit = e => {
    e.preventDefault();
    onSave({ name });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-semibold text-center">
            {itemData ? `Edit ${itemType}` : `Add ${itemType}`}
          </h3>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={`${itemType} Name`}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditAreaForm;
