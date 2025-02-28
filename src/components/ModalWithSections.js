import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';

const ModalWithSections = ({
  isOpen,
  onClose,
  optionsSection1,
  optionsSection2,
  renderOption,
  onSelect,
  previouslySelectedItems = [],
  type,
}) => {
  const [selectedSection1, setSelectedSection1] = useState([]);
  const [selectedSection2, setSelectedSection2] = useState(null);
  const [amounts, setAmounts] = useState({});

  useEffect(() => {}, [previouslySelectedItems, optionsSection1, optionsSection2]);

  const handleCheckboxChangeSection1 = option => {
    setSelectedSection1(
      selectedSection1.includes(option)
        ? selectedSection1.filter(item => item !== option)
        : [...selectedSection1, option],
    );
    const updatedSelection = new Set(selectedSection1);
    if (updatedSelection.has(option)) {
      updatedSelection.delete(option);
    } else {
      updatedSelection.add(option);
    }
    setSelectedSection1(Array.from(updatedSelection));
    setSelectedSection2(null);
  };

  const handleCheckboxChangeSection2 = option => {
    setSelectedSection1([]);
    setSelectedSection2(option === selectedSection2 ? null : option);
  };

  const handleSelectAllSection1 = () => {
    setSelectedSection1(optionsSection1);
    setSelectedSection2(null);
  };

  const handleDeselectAllSection1 = () => {
    setSelectedSection1([]);
    setSelectedSection2(null);
  };

  const handleAmountChange = (itemId, amount) => {
    setAmounts({ ...amounts, [itemId]: amount });
  };

  const handleConfirm = () => {
    const selectedItems = selectedSection1.length > 0 ? selectedSection1 : [selectedSection2];
    const validAmounts = selectedItems.every(item => amounts[item.item_id] > 0);

    if (validAmounts) {
      const selectedItems = selectedSection1.length > 0 ? selectedSection1 : [selectedSection2];
      const validAmounts = selectedItems.every(item => amounts[item.item_id] > 0);

      if (validAmounts) {
        onSelect(
          selectedItems.map(item => ({
            ...item,
            amount: amounts[item.item_id],
          })),
        );
        onClose();
      } else {
        alert('Amount for selected items must be greater than zero.');
      }
    } else {
      alert('Amount for selected items must be greater than zero.');
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
          <div className="flex justify-center items-center mb-6 relative">
            <h2 className="text-2xl font-bold text-center w-full text-gray-800">Select Items</h2>
            <button
              onClick={onClose}
              className="absolute right-0 top-0 text-red-500 text-2xl font-bold hover:text-red-700 transition-colors"
            >
              &times;
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4">
            {type === 'food' ? (
              <div>
                <h3 className="font-bold mb-2 flex justify-between items-center">
                  Food Items
                  <div className="flex space-x-2">
                    <Button onClick={handleSelectAllSection1} className="w-30">
                      Select All
                    </Button>
                    <Button onClick={handleDeselectAllSection1} className="w-30">
                      Deselect All
                    </Button>
                  </div>
                </h3>
                {optionsSection1.map(option => (
                  <div
                    key={option.item_id}
                    className={`p-2 flex items-center justify-between transition-colors ${
                      selectedSection1.includes(option) ? 'bg-blue-300' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedSection1.includes(option)}
                        onChange={() => handleCheckboxChangeSection1(option)}
                        className="mr-2"
                      />
                      <div>{renderOption(option)}</div>
                    </div>
                    {selectedSection1.includes(option) && (
                      <div>
                        <input
                          type="number"
                          min="0"
                          value={
                            amounts[option.item_id] !== undefined ? amounts[option.item_id] : ''
                          }
                          onChange={e => handleAmountChange(option.item_id, e.target.value)}
                          className="ml-4 p-1 border border-gray-300 rounded"
                        />
                        <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>KG/Litre</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
            <div>
              {type === 'money' ? (
                <div>
                  <h3 className="font-bold mb-2 flex justify-between items-center">Financial</h3>
                  {optionsSection2.map(option => (
                    <div
                      key={option.item_id}
                      className={`p-2 flex items-center justify-between transition-colors ${
                        selectedSection2 === option ? 'bg-blue-300' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedSection2 === option}
                          onChange={() => handleCheckboxChangeSection2(option)}
                          className="mr-2"
                        />
                        <div>{renderOption(option)}</div>
                      </div>
                      {selectedSection2 === option && (
                        <div>
                          <input
                            type="number"
                            min="0"
                            value={
                              amounts[option.item_id] !== undefined ? amounts[option.item_id] : ''
                            }
                            onChange={e => handleAmountChange(option.item_id, e.target.value)}
                            className="ml-4 p-1 border border-gray-300 rounded"
                          />
                          <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>₹</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Button
              onClick={handleConfirm}
              className="w-30"
              disabled={
                (selectedSection1.length === 0 && !selectedSection2) ||
                selectedSection1.some(
                  item => !amounts[item.item_id] || amounts[item.item_id] <= 0,
                ) ||
                (selectedSection2 &&
                  (!amounts[selectedSection2.item_id] || amounts[selectedSection2.item_id] <= 0))
              }
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalWithSections;
