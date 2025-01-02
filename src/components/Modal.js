import React from 'react';

const Modal = ({ isOpen, onClose, options, onSelect, renderOption }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <div className="flex justify-center items-center mb-6 relative">
          <h2 className="text-2xl font-bold text-center w-full text-gray-800">Select an Option</h2>
          <button
            onClick={onClose}
            className="absolute right-0 top-0 text-red-500 text-2xl font-bold hover:text-red-700 transition-colors"
          >
            &times;
          </button>
        </div>
        <div className="mt-4 max-h-64 overflow-y-auto">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelect(option)}
              className="w-full text-left p-3 rounded-md hover:bg-blue-300 transition-colors"
            >
              {renderOption(option)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
