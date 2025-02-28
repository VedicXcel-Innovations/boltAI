import React, { useState } from 'react';
import MunicipalityList from '../components/MunicipalityList';
import WardList from '../components/WardList';
import AreaList from '../components/AreaList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AreaCategory() {
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);

  const handleMunicipalityChange = municipalityId => {
    setSelectedMunicipality(municipalityId);
    setSelectedWard('');
    setIsAreaModalOpen(false);
  };

  const handleWardChange = wardId => {
    setSelectedWard(wardId);
    setIsAreaModalOpen(true);
  };

  return (
    <div
      className="grid grid-cols-3 col-span-10 md:col-span-6 lg:col-span-8 xl:col-span-10 2xl:col-span-14
                  gap-3 justify-center items-center p-8 mt-6"
    >
      <div>
        <MunicipalityList onMunicipalityChange={handleMunicipalityChange} />
      </div>

      {selectedMunicipality && (
        <div>
          <WardList municipalityId={selectedMunicipality} onWardChange={handleWardChange} />
        </div>
      )}

      {isAreaModalOpen && (
        <div>
          <AreaList municipalityId={selectedMunicipality} wardId={selectedWard} />
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default AreaCategory;
