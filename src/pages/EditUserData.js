import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Option, Select, Input } from '@material-tailwind/react';
import { Button, Typography } from '@mui/material';
import Loader from '../components/Loader';
import SelectionPopup from '../components/SelectionPopup';
import Modal from '../components/Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiBaseUrl = process.env.API_BASE_URL;

const EditUserData = () => {
  const location = useLocation();
  const user = location.state || {};
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: '',
    //col1
    form_no: '',
    age: '',
    caste_name: '',
    monthly_income: '',
    holding_number: '',
    block_ward_name: '',
    pincode: '',
    type_name: '',
    male_member: '',
    house_type: '',
    //col2
    name: '',
    gender_name: '',
    religion_name: '',
    earning_member: '',
    floor_number: '',
    lane_name: '',
    landmark: '',
    card_number: '',
    female_member: '',
    staff: '',
    //col3
    fat_hus_name: '',
    status_name: '',
    occupation: '',
    contact_number: '',
    municipality_name: '',
    city_town: '',
    landlord: '',
    total_family_member: '',
    children_member: '',
    //bigCol
    survey_report: '',
    user_photo: '',
    //ids
    mun_pan_id: '',
    ward_id: '',
    area_id: '',
    gender: '',
    caste: '',
    id_card_type: '',
    religion: '',
    marital_status: '',
    istest: true,
  });

  useEffect(() => {
    handleEdit(user);
  }, []);

  const [municipalityPopupOpen, setMunicipalityPopupOpen] = useState(false);
  const [wardPopupOpen, setWardPopupOpen] = useState(false);
  const [areaPopupOpen, setAreaPopupOpen] = useState(false);

  const [genderPopupOpen, setgenderPopupOpen] = useState(false);
  const [castPopupOpen, setcastPopupOpen] = useState(false);
  const [idCardPopupOpen, setidCardPopupOpen] = useState(false);
  const [religionPopupOpen, setreligionPopupOpen] = useState(false);
  const [maritalStatusPopupOpen, setmaritalStatusPopupOpen] = useState(false);

  const [municipalities, setMunicipalities] = useState([]);
  const [wards, setWards] = useState([]);
  const [areas, setAreas] = useState([]);

  const [genders, setGenders] = useState([]);
  const [casts, setCastes] = useState([]);
  const [idCardTypes, setidCardTypes] = useState([]);
  const [religions, setreligions] = useState([]);
  const [maritalStatuses, setmaritalStatuses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleEdit = async user => {
    setLoading(true);
    await loadData();
    setLoading(false);
  };

  const updateForm = userDetails => {
    return new Promise(resolve => {
      setForm({
        id: userDetails.id,
        //col1
        form_no: userDetails.form_no,
        age: userDetails.age,
        caste_name: userDetails.caste_name,
        monthly_income: userDetails.monthly_income,
        holding_number: userDetails.holding_number,
        block_ward_name: userDetails.block_ward_name,
        pincode: userDetails.pincode,
        type_name: userDetails.type_name,
        male_member: userDetails.male_member,
        house_type: userDetails.house_type,
        //col2
        name: userDetails.name,
        gender_name: userDetails.gender_name,
        religion_name: userDetails.religion_name,
        earning_member: userDetails.earning_member,
        floor_number: userDetails.floor_number,
        lane_name: userDetails.lane_name,
        landmark: userDetails.landmark,
        card_number: userDetails.card_number,
        female_member: userDetails.female_member,
        staff_id: userDetails.staff_id === 3 ? 'No' : 'Yes',
        //col3
        fat_hus_name: userDetails.fat_hus_name,
        status_name: userDetails.status_name,
        occupation: userDetails.occupation,
        contact_number: userDetails.contact_number,
        municipality_name: userDetails.municipality_name,
        city_town: userDetails.city_town,
        landlord: userDetails.landlord,
        total_family_member: userDetails.total_family_member,
        children_member: userDetails.children_member,
        //bigCol
        survey_report: userDetails.survey_report,
        user_photo: userDetails.user_photo,
        //ids
        mun_pan_id: userDetails.mun_pan_id,
        ward_id: userDetails.ward_id,
        area_id: userDetails.area_id,
        gender: userDetails.gender,
        caste: userDetails.caste,
        id_card_type: userDetails.id_card_type,
        religion: userDetails.religion,
        marital_status: userDetails.marital_status,
        istest: true,
      });
      resolve();
    });
  };

  const loadData = async () => {
    try {
      const fetchPromises = [
        fetchMunicipalities(),
        fetchMaritalStatus(),
        fetchCaste(),
        fetchGender(),
        fetchIdCardTypes(),
        fetchReligion(),
        fetchUserDetails(),
      ];

      await Promise.all(fetchPromises);
      await fetchWard(user.mun_pan_id);
      await fetchArea(user.mun_pan_id, user.ward_id);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/rationUsers/userDetails/${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      updateForm(responseData);
    } catch (error) {
      console.error('Error fetching municipalities:', error);
    }
  };

  const fetchMunicipalities = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/municipalities/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setMunicipalities(responseData.data);
    } catch (error) {
      console.error('Error fetching municipalities:', error);
    }
  };

  const fetchGender = async () => {
    await fetch(`${apiBaseUrl}/gender`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setGenders(responseData.data);
      })
      .catch(error => {
        console.error('Error fetching:', error);
      });
  };

  const fetchCaste = async () => {
    await fetch(`${apiBaseUrl}/caste`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setCastes(responseData.data);
      })
      .catch(error => {
        console.error('Error fetching:', error);
      });
  };

  const fetchIdCardTypes = async () => {
    await fetch(`${apiBaseUrl}/idCardType`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setidCardTypes(responseData.data);
      })
      .catch(error => {
        console.error('Error fetching:', error);
      });
  };

  const fetchReligion = async () => {
    await fetch(`${apiBaseUrl}/religion`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setreligions(responseData.data);
      })
      .catch(error => {
        console.error('Error fetching:', error);
      });
  };

  const fetchMaritalStatus = async () => {
    await fetch(`${apiBaseUrl}/maritalStatus`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => response.json())
      .then(responseData => {
        setmaritalStatuses(responseData.data);
      })
      .catch(error => {
        console.error('Error fetching:', error);
      });
  };

  const handleMunicipalitySelect = async value => {
    setForm({
      ...form,
      municipality_name: value.name,
      mun_pan_id: value.id,
      block_ward_name: '',
      ward_id: '',
      lane_name: '',
      area_id: '',
    });
    setWards([]);
    setAreas([]);

    const municipalityId = value.id;
    if (municipalityId) {
      await fetchWard(municipalityId);
    }
  };

  const fetchWard = async municipalityId => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/wards/all/${municipalityId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setWards(responseData.data);
    } catch (error) {
      console.error('Error fetching wards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWardSelect = async value => {
    setForm({
      ...form,
      block_ward_name: value.name,
      ward_id: value.id,
      lane_name: '',
      area_id: '',
    });
    setAreas([]);
    if (value.id && form.mun_pan_id) {
      await fetchArea(form.mun_pan_id, value.id);
    }
  };

  const fetchArea = async (municipalityId, ward_id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${apiBaseUrl}/areaCategories/all/${municipalityId}/${ward_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setAreas(responseData.data);
    } catch (error) {
      console.error('Error fetching wards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAreaSelect = value => {
    setForm({ ...form, lane_name: value.name, area_id: value.id });
  };

  const handleGenderChange = value => {
    setForm({
      ...form,
      gender_name: value.gender_name,
      gender: value.gender_id,
    });
    handleCloseGenderModal();
  };

  const renderGenderOption = option => {
    return `${option.gender_name}`;
  };

  const handleCloseGenderModal = () => setgenderPopupOpen(false);

  const handleCasteChange = value => {
    setForm({ ...form, caste: value.caste_name, caste_id: value.caste });
    handleCloseCasteModal();
  };

  const renderCasteOption = option => {
    return `${option.caste_name}`;
  };

  const handleCloseCasteModal = () => setcastPopupOpen(false);

  const handleIdCardChange = value => {
    setForm({
      ...form,
      type_name: value.type_name,
      id_card_type: value.id,
    });
    handleCloseIdCardModal();
  };

  const renderIdCardOption = option => {
    return `${option.type_name}`;
  };

  const handleCloseIdCardModal = () => setidCardPopupOpen(false);

  const handleReligionChange = value => {
    setForm({
      ...form,
      religion_name: value.religion_name,
      religion: value.religion_id,
    });
    handleCloseReligionModal();
  };

  const renderReligionOption = option => {
    return `${option.religion_name}`;
  };

  const handleCloseReligionModal = () => setreligionPopupOpen(false);

  const handleIdMaritalStatusChange = value => {
    setForm({
      ...form,
      status_name: value.status_name,
      marital_status: value.status_id,
    });
    handleCloseMaritalStatusModal();
  };

  const renderMaritalStatusOption = option => {
    return `${option.status_name}`;
  };

  const handleCloseMaritalStatusModal = () => setmaritalStatusPopupOpen(false);

  const [photo, setPhoto] = useState(null);
  const [isFileValid, setIsFileValid] = useState(false);

  const handleFileChange = e => {
    const file = e.target.files[0];

    if (!file) {
      setIsFileValid(false);
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      toast.error('Invalid file type. Supported formats are jpeg, jpg, png, gif.', {
        position: 'top-center',
      });
      e.target.value = null;
      setIsFileValid(false);
      return;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 4) {
      toast.error('File size must be 4 MB or less.', {
        position: 'top-center',
      });
      e.target.value = null;
      setIsFileValid(false);
      return;
    }

    setForm({ ...form, user_photo: file });
    setIsFileValid(true);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      if (isFileValid && form.user_photo) {
        const formData = new FormData();
        formData.append('id', form.id);
        formData.append('user_photo', form.user_photo);

        const uploadResponse = await fetch(`${apiBaseUrl}/rationUsers/upload`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || 'Failed to upload the photo.');
        }

        const uploadData = await uploadResponse.json();
        form.user_photo = uploadData.user.user_photo;
        setTimeout(() => {
          toast.success('New photo uploaded and old photo archived successfully.', {
            position: 'top-center',
          });
        }, 500);
      }

      const response = await fetch(`${apiBaseUrl}/rationUsers/edit/${form.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user data.');
      }

      const responseData = await response.json();
      setTimeout(() => {
        toast.success(responseData.message, {
          position: 'top-center',
        });
      }, 500);
    } catch (error) {
      const errorMessage = error.message ? error.message : 'An unexpected error occurred.';
      toast.error(`Error: ${errorMessage}`, {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container bg-white rounded-lg mx-auto mt-10 p-8 col-span-10 md:col-span-6 lg:col-span-8 xl:col-span-10 2xl:col-span-14">
      <div className="flex justify-between items-center mb-2 mt-3">
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: 'green',
            fontWeight: 'bold',
            width: '100%',
            paddingLeft: '50px',
            paddingBottom: '15px',
          }}
        >
          Modify User Data
        </Typography>
      </div>
      <form onSubmit={handleSaveChanges}>
        <div className="grid grid-cols-3 gap-10 px-4">
          <div className="col-span-1 space-y-4">
            <Input
              type="number"
              label="Form Number"
              value={form.form_no}
              onChange={e =>
                setForm({
                  ...form,
                  form_no: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
            />
            <Input
              type="number"
              label="Age"
              value={form.age}
              onChange={e =>
                setForm({
                  ...form,
                  age: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
            />
            <Input
              type="text"
              label="Caste"
              value={form.caste_name}
              onClick={() => setcastPopupOpen(true)}
              readOnly
              fullWidth
              variant="outlined"
            />
            <Input
              type="number"
              label="Monthly Family Income"
              value={form.monthly_income}
              onChange={e =>
                setForm({
                  ...form,
                  monthly_income: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
            />
            <Input
              type="text"
              label="Address Holding Number"
              value={form.holding_number}
              onChange={e =>
                setForm({
                  ...form,
                  holding_number: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
            />
            <Input
              type="text"
              label="Ward Name"
              value={form.block_ward_name}
              onClick={() => setWardPopupOpen(true)}
              readOnly
              fullWidth
              variant="outlined"
            />
            <Input
              type="number"
              label="Pincode"
              value={form.pincode}
              onChange={e =>
                setForm({
                  ...form,
                  pincode: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
            />
            <Input
              type="text"
              label="Identity Card"
              value={form.type_name}
              onClick={() => setidCardPopupOpen(true)}
              readOnly
              fullWidth
              variant="outlined"
            />
            <Input
              type="number"
              label="Total Male Members"
              value={form.male_member}
              onChange={e =>
                setForm({
                  ...form,
                  male_member: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
            />
            <Select
              label="House"
              value={form.house_type}
              onChange={value => (form.house_type = value)}
            >
              <Option value="" disabled>
                Select House
              </Option>
              <Option key={'1'} value={'Own'}>
                {'Own'}
              </Option>
              <Option key={'2'} value={'Rented'}>
                {'Rented'}
              </Option>
            </Select>
          </div>
          <div className="col-span-1 space-y-4">
            <Input
              type="text"
              label="Name"
              value={form.name}
              onChange={e =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
            />
            <Input
              type="text"
              label="Gender"
              value={form.gender_name}
              onClick={() => setgenderPopupOpen(true)}
              readOnly
              fullWidth
              variant="outlined"
            />
            <Input
              type="text"
              label="Religion"
              value={form.religion_name}
              onClick={() => setreligionPopupOpen(true)}
              readOnly
              fullWidth
              variant="outlined"
            />
            <Input
              type="number"
              label="Number of Earning Members"
              value={form.earning_member}
              onChange={e =>
                setForm({
                  ...form,
                  earning_member: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
            />
            <Input
              type="number"
              label="Floor Number"
              value={form.floor_number}
              onChange={e =>
                setForm({
                  ...form,
                  floor_number: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
            />
            <Input
              type="text"
              label="Lane Name"
              value={form.lane_name}
              onClick={() => setAreaPopupOpen(true)}
              readOnly
              fullWidth
              variant="outlined"
            />
            <Input
              type="text"
              label="Landmark"
              value={form.landmark}
              onChange={e =>
                setForm({
                  ...form,
                  landmark: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
            />
            <Input
              type="text"
              label="Identity Card Number"
              value={form.card_number}
              onChange={e =>
                setForm({
                  ...form,
                  card_number: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
            />
            <Input
              type="number"
              label="Total Female Members"
              value={form.female_member}
              onChange={e =>
                setForm({
                  ...form,
                  female_member: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
            />
            <Select label="Staff" value={form.staff_id} onChange={value => (form.staff_id = value)}>
              <Option value="" disabled>
                Select Staff
              </Option>
              <Option key={'1'} value={'Yes'}>
                {'Yes'}
              </Option>
              <Option key={'2'} value={'No'}>
                {'No'}
              </Option>
            </Select>
          </div>
          <div className="col-span-1 space-y-4">
            <Input
              type="text"
              label="Father/Husband Name"
              value={form.fat_hus_name}
              onChange={e =>
                setForm({
                  ...form,
                  fat_hus_name: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
            />
            <Input
              type="text"
              label="Marital Status"
              value={form.status_name}
              onClick={() => setmaritalStatusPopupOpen(true)}
              readOnly
              fullWidth
              variant="outlined"
            />
            <Input
              type="text"
              label="Occupation"
              value={form.occupation}
              onChange={e =>
                setForm({
                  ...form,
                  occupation: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
            />
            <Input
              type="number"
              label="Contact Number"
              value={form.contact_number}
              onChange={e =>
                setForm({
                  ...form,
                  contact_number: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
            />
            <Input
              type="text"
              label="Municipality Name"
              value={form.municipality_name}
              onClick={() => setMunicipalityPopupOpen(true)}
              readOnly
              fullWidth
              variant="outlined"
            />
            <Input
              type="text"
              label="City/Town"
              value={form.city_town}
              onChange={e =>
                setForm({
                  ...form,
                  city_town: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
            />
            <Input
              type="text"
              label="Name of Landlord"
              value={form.landlord}
              onChange={e =>
                setForm({
                  ...form,
                  landlord: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
            />
            <Input
              type="number"
              label="Number of Family Members"
              value={form.total_family_member}
              onChange={e =>
                setForm({
                  ...form,
                  total_family_member: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
            />
            <Input
              type="number"
              label="Children Member"
              value={form.children_member}
              onChange={e =>
                setForm({
                  ...form,
                  children_member: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
            />
          </div>
        </div>
        <div className="px-4 py-4">
          <Input
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            label="Upload Photo"
            onChange={handleFileChange}
            fullWidth
            variant="outlined"
          />
          {photo && (
            <div className="mt-4">
              <img
                src={photo}
                alt="Uploaded Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
        <div className="px-4 py-4">
          <Input
            type="text"
            label="Survey Report"
            value={form.survey_report}
            onChange={e =>
              setForm({
                ...form,
                survey_report: e.target.value,
              })
            }
            fullWidth
            variant="outlined"
          />
        </div>
        <div className="flex justify-center px-4 py-4 gap-6">
          <Button variant="contained" color="success" type="submit" className="mr-4">
            Save
          </Button>
          <Button variant="contained" color="error" onClick={() => navigate('/ManageUsers')}>
            Close
          </Button>
        </div>
      </form>
      <SelectionPopup
        open={municipalityPopupOpen}
        onClose={() => setMunicipalityPopupOpen(false)}
        data={municipalities}
        onSelect={handleMunicipalitySelect}
        title="Municipality/Panchayat"
      />
      <SelectionPopup
        open={wardPopupOpen}
        onClose={() => setWardPopupOpen(false)}
        data={wards}
        onSelect={handleWardSelect}
        title="Ward Number"
      />
      <SelectionPopup
        open={areaPopupOpen}
        onClose={() => setAreaPopupOpen(false)}
        data={areas}
        onSelect={handleAreaSelect}
        title="Lane Name"
      />
      <Modal
        isOpen={castPopupOpen}
        onClose={handleCloseCasteModal}
        options={casts}
        onSelect={handleCasteChange}
        renderOption={renderCasteOption}
      />
      <Modal
        isOpen={genderPopupOpen}
        onClose={handleCloseGenderModal}
        options={genders}
        onSelect={handleGenderChange}
        renderOption={renderGenderOption}
      />
      <Modal
        isOpen={idCardPopupOpen}
        onClose={handleCloseIdCardModal}
        options={idCardTypes}
        onSelect={handleIdCardChange}
        renderOption={renderIdCardOption}
      />
      <Modal
        isOpen={religionPopupOpen}
        onClose={handleCloseReligionModal}
        options={religions}
        onSelect={handleReligionChange}
        renderOption={renderReligionOption}
      />
      <Modal
        isOpen={maritalStatusPopupOpen}
        onClose={handleCloseMaritalStatusModal}
        options={maritalStatuses}
        onSelect={handleIdMaritalStatusChange}
        renderOption={renderMaritalStatusOption}
      />
      <ToastContainer />
    </div>
  );
};

export default EditUserData;
