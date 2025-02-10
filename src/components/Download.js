import React from 'react';

const DownloadModal = ({ url, fileName, isOpen, onClose }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || 'download';
    link.click();
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <button onClick={handleDownload}>Download</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DownloadModal;
