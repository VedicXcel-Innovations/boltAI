import React, { useState, useEffect } from 'react';
import { Input, Button, Select, Option, Textarea } from '@material-tailwind/react';
import Loader from '../components/Loader';
import SelectionPopup from '../components/SelectionPopup';
import Modal from '../components/Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiBaseUrl = process.env.API_BASE_URL;

function CreateUsers() {
  useEffect(() => {
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
          setLoading(false);
        });
    };
    const fetchGender = () => {
      fetch(`${apiBaseUrl}/gender`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(response => response.json())
        .then(responseData => {
          setGenders(responseData.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching:', error);
          setLoading(false);
        });
    };

    const fetchCaste = () => {
      fetch(`${apiBaseUrl}/caste`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(response => response.json())
        .then(responseData => {
          setCastes(responseData.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching:', error);
          setLoading(false);
        });
    };

    const fetchIdCardTypes = () => {
      fetch(`${apiBaseUrl}/idCardType`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(response => response.json())
        .then(responseData => {
          setidCardTypes(responseData.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching:', error);
          setLoading(false);
        });
    };

    const fetchReligion = () => {
      fetch(`${apiBaseUrl}/religion`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(response => response.json())
        .then(responseData => {
          setreligions(responseData.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching:', error);
          setLoading(false);
        });
    };

    const fetchMaritalStatus = () => {
      fetch(`${apiBaseUrl}/maritalStatus`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(response => response.json())
        .then(responseData => {
          setmaritalStatuses(responseData.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching:', error);
          setLoading(false);
        });
    };

    const fetchFormNo = () => {
      fetch(`${apiBaseUrl}/rationUsers/generateFormNo`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(response => response.json())
        .then(responseData => {
          setForm({
            ...form,
            form_no: responseData.form_no,
          });
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching:', error);
          setLoading(false);
        });
    };

    const loadData = async () => {
      await fetchMunicipalities();
      await fetchMaritalStatus();
      await fetchCaste();
      await fetchGender();
      await fetchIdCardTypes();
      await fetchReligion();
      await fetchFormNo();
    };
    loadData();
  }, []);

  // Add validation function for contact number
  const validateContactNumber = contactNumber => {
    // Check if input is not empty
    if (!contactNumber) {
      return 'Contact number cannot be empty.';
    }
    // Check if input is a number
    const num = /^[1-9][0-9]{0,9}$/;
    if (!num.test(contactNumber)) {
      return 'Contact number must be a number, cannot start with zero, and must be 10 digits.';
    }

    return null;
  };
  // Handle contact number change with validation
  const handleContactNumberChange = e => {
    const value = e.target.value;
    const error = validateContactNumber(value);

    if (error) {
      toast.error(error, {
        position: 'top-center',
      });
    } else {
      setForm({ ...form, contact_number: value });
    }
  };

  // Add validation function for identity card number
  const validateIdentityCardNumber = IdentityCardNumber => {
    // Check if input is not empty
    if (!IdentityCardNumber) {
      return 'Identity card number cannot be empty.';
    }
    // Check if input is alphanumeric or only numeric
    const num = /^[A-Za-z\d]{1,12}$/;
    if (!num.test(IdentityCardNumber)) {
      return 'Identity card number must be 12 digits.';
    }

    return null;
  };
  // Handle identity card number change with validation
  const handleIdentityCardNumberChange = e => {
    const value = e.target.value;
    const error = validateIdentityCardNumber(value);

    if (error) {
      toast.error(error, {
        position: 'top-center',
      });
    } else {
      setForm({ ...form, identity_Card_number: value });
    }
  };

  const handleMunicipalitySelect = async value => {
    setForm({
      ...form,
      municipality_name: value.name,
      municipality_id: value.id,
      ward_number: '',
      ward_id: '',
      lane_name: '',
      lane_id: '',
    });
    setWards([]);
    setAreas([]);

    const municipalityId = value.id;
    if (municipalityId) {
      setLoading(true);
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
          setLoading(false);
        });
    }
  };

  const handleWardSelect = value => {
    setForm({
      ...form,
      ward_number: value.name,
      ward_id: value.id,
      lane_name: '',
      lane_id: '',
    });
    setAreas([]);
    if (value.id && form.municipality_id) {
      setLoading(true);
      fetch(`${apiBaseUrl}/areaCategories/all/${form.municipality_id}/${value.id}`, {
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
          setLoading(false);
        });
    }
  };

  const handleAreaSelect = value => {
    setForm({ ...form, lane_name: value.name, lane_id: value.id });
  };

  const handleGenderChange = value => {
    setForm({ ...form, gender: value.gender_name, gender_id: value.gender_id });
    handleCloseGenderModal();
  };

  const renderGenderOption = option => {
    return `${option.gender_name}`;
  };

  const handleCloseGenderModal = () => setgenderPopupOpen(false);

  const handleCasteChange = value => {
    setForm({ ...form, caste: value.caste_name, caste_id: value.caste_id });
    handleCloseCasteModal();
  };

  const renderCasteOption = option => {
    return `${option.caste_name}`;
  };

  const handleCloseCasteModal = () => setcastPopupOpen(false);

  const handleIdCardChange = value => {
    setForm({ ...form, identity_Card: value.type_name, idcard_id: value.id });
    handleCloseIdCardModal();
  };

  const renderIdCardOption = option => {
    return `${option.type_name}`;
  };

  const handleCloseIdCardModal = () => setidCardPopupOpen(false);

  const handleReligionChange = value => {
    setForm({
      ...form,
      religion: value.religion_name,
      religion_id: value.religion_id,
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
      marital_status: value.status_name,
      maritalStatuse_id: value.status_id,
    });
    handleCloseMaritalStatusModal();
  };

  const renderMaritalStatusOption = option => {
    return `${option.status_name}`;
  };

  const handleCloseMaritalStatusModal = () => setmaritalStatusPopupOpen(false);

  const [loading, setLoading] = useState(true);

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

  const [form, setForm] = useState({
    //col1
    form_no: '',
    age: '',
    caste: '',
    monthly_family_income: '',
    address_holding_number: '',
    ward_number: '',
    pincode: '',
    identity_Card: '',
    total_male_members: '',
    house: '',
    //col2
    name: '',
    gender: '',
    religion: '',
    number_of_earning_members: '',
    floor_number: '',
    lane_name: '',
    landmark: '',
    identity_Card_number: '',
    total_female_members: '',
    staff: '',
    //col3
    father_husband_name: '',
    marital_status: '',
    occupation: '',
    contact_number: '',
    municipality_name: '',
    city_town: '',
    name_of_landlord: '',
    number_of_family_members: '',
    children_member: '',
    //bigCol
    survey_report: '',
    user_photo: null,
    //ids
    municipality_id: '',
    ward_id: '',
    lane_id: '',
    gender_id: '',
    caste_id: '',
    idcard_id: '',
    religion_id: '',
    maritalStatuse_id: '',
    istest: true,
  });

  const uploadImage = async data => {
    if (!form.user_photo || !data.user.id) {
      return;
    }

    const formData = new FormData();
    formData.append('user_photo', form.user_photo);
    formData.append('id', data.user.id);

    try {
      const response = await fetch(`${apiBaseUrl}/rationUsers/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload photo');
      }

      const responseData = await response.json();
    } catch (error) {
      console.error('Error uploading photo:', error.message);
    }
  };

  const [isFileValid, setIsFileValid] = useState(false);

  const handleSave = e => {
    e.preventDefault();

    for (const [key, value] of Object.entries(form)) {
      if (!value) {
        toast.error(`Please fill out the ${key.replace(/_/g, ' ')} field.`, {
          position: 'top-center',
        });
        return;
      }
    }

    setLoading(true);
    const postData = JSON.stringify(form);

    fetch(`${apiBaseUrl}/rationUsers/save`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: postData,
    })
      .then(response =>
        response.json().then(data => {
          if (!response.ok) {
            throw new Error(data.error);
          }
          return data;
        }),
      )
      .then(async responseData => {
        // Clear form and reset states
        setForm({
          // Reset the fields
          form_no: '',
          age: '',
          caste: '',
          monthly_family_income: '',
          address_holding_number: '',
          ward_number: '',
          pincode: '',
          identity_Card: '',
          total_male_members: '',
          house: '',
          name: '',
          gender: '',
          religion: '',
          number_of_earning_members: '',
          floor_number: '',
          lane_name: '',
          landmark: '',
          identity_Card_number: '',
          total_female_members: '',
          staff: '',
          father_husband_name: '',
          marital_status: '',
          occupation: '',
          contact_number: '',
          municipality_name: '',
          city_town: '',
          name_of_landlord: '',
          number_of_family_members: '',
          children_member: '',
          survey_report: '',
          user_photo: null,
          municipality_id: '',
          ward_id: '',
          lane_id: '',
          gender_id: '',
          caste_id: '',
          idcard_id: '',
          religion_id: '',
          maritalStatuse_id: '',
          istest: true,
        });
        setIsFileValid(false); // Reset file validity
        setLoading(false);
        await uploadImage(responseData);
        toast.success(responseData.message, {
          position: 'top-center',
        });
      })
      .catch(error => {
        console.error('Error ', error);
        const e = error.message ? error.message : error;
        setLoading(false);
        toast.error(`Error: ${e}`, {
          position: 'top-center',
        });
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="col-span-10 md:col-span-6 lg:col-span-8 xl:col-span-10 2xl:col-span-14 p-8">
      <form onSubmit={handleSave} className="bg-white shadow-lg rounded-lg p-10 space-y-4">
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-1 space-y-4">
            <Input
              label="Form No"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.form_no}
              readOnly
              tabIndex="1"
              onChange={e => setForm({ ...form, form_no: e.target.value })}
            />
            <Input
              label="Age"
              type="number"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.age}
              tabIndex="4"
              onChange={e => setForm({ ...form, age: e.target.value })}
            />
            <Input
              label="Caste Category"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.caste}
              tabIndex="7"
              onClick={() => setcastPopupOpen(true)}
              readOnly
            />
            <Input
              label="Montly Family Income"
              type="number"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.monthly_family_income}
              tabIndex="10"
              onChange={e => setForm({ ...form, monthly_family_income: e.target.value })}
            />
            <Input
              label="Address Holding Number"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.address_holding_number}
              tabIndex="13"
              onChange={e => setForm({ ...form, address_holding_number: e.target.value })}
            />
            <Input
              label="Block Name/Ward Number"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.ward_number}
              tabIndex="16"
              onClick={() => setWardPopupOpen(true)}
              readOnly
            />
            <Input
              label="Pincode"
              type="number"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.pincode}
              tabIndex="19"
              onChange={e => setForm({ ...form, pincode: e.target.value })}
            />
            <Input
              label="Identity Card"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.identity_Card}
              tabIndex="22"
              onClick={() => setidCardPopupOpen(true)}
              readOnly
            />
            <Input
              label="Total Male Members"
              type="number"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.total_male_members}
              tabIndex="25"
              onChange={e => setForm({ ...form, total_male_members: e.target.value })}
            />
            <Select
              label="House"
              value={form.house}
              tabIndex="28"
              onChange={value => (form.house = value)}
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
              label="Name"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.name}
              tabIndex="2"
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <Input
              label="Gender"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.gender}
              tabIndex="5"
              onClick={() => setgenderPopupOpen(true)}
              readOnly
            />
            <Input
              label="Religion"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.religion}
              tabIndex="8"
              onClick={() => setreligionPopupOpen(true)}
              readOnly
            />
            <Input
              label="Number of Earning Members"
              type="number"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.number_of_earning_members}
              tabIndex="11"
              onChange={e => setForm({ ...form, number_of_earning_members: e.target.value })}
            />
            <Input
              label="Floor Number"
              type="number"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.floor_number}
              tabIndex="14"
              onChange={e => setForm({ ...form, floor_number: e.target.value })}
            />
            <Input
              label="Lane/Road Name"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.lane_name}
              tabIndex="17"
              onClick={() => setAreaPopupOpen(true)}
              readOnly
            />
            <Input
              label="Land Mark"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.landmark}
              tabIndex="20"
              onChange={e => setForm({ ...form, landmark: e.target.value })}
            />
            <Input
              label="Identity Card Number"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.identity_Card_number}
              tabIndex="23"
              onChange={handleIdentityCardNumberChange}
            />
            <Input
              label="Total Female Members"
              type="number"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.total_female_members}
              tabIndex="26"
              onChange={e => setForm({ ...form, total_female_members: e.target.value })}
            />
            <Select
              label="Staff"
              value={form.staff}
              tabIndex="29"
              onChange={value => (form.staff = value)}
            >
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
              label="Father/Husband Name"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.father_husband_name}
              tabIndex="3"
              onChange={e => setForm({ ...form, father_husband_name: e.target.value })}
            />
            <Input
              label="Marital Status"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.marital_status}
              tabIndex="6"
              onClick={() => setmaritalStatusPopupOpen(true)}
              readOnly
            />
            <Input
              label="Occupation"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.occupation}
              tabIndex="9"
              onChange={e => setForm({ ...form, occupation: e.target.value })}
            />
            <Input
              label="Contact Number"
              type="number"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.contact_number}
              tabIndex="12"
              onChange={handleContactNumberChange}
            />
            <Input
              label="Municipality/Panchayat Name"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.municipality_name}
              tabIndex="15"
              onClick={() => setMunicipalityPopupOpen(true)}
              readOnly
            />
            <Input
              label="City/Town"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.city_town}
              tabIndex="18"
              onChange={e => setForm({ ...form, city_town: e.target.value })}
            />
            <Input
              label="Name of Landlord"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.name_of_landlord}
              tabIndex="21"
              onChange={e => setForm({ ...form, name_of_landlord: e.target.value })}
            />
            <Input
              label="Number of Family Members"
              type="number"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.number_of_family_members}
              tabIndex="24"
              onChange={e => setForm({ ...form, number_of_family_members: e.target.value })}
            />
            <Input
              label="Children"
              type="number"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              value={form.children_member}
              tabIndex="27"
              onChange={e => setForm({ ...form, children_member: e.target.value })}
            />
          </div>
          <div className="col-span-1 space-y-4">
            <label className="block text-sm font-medium text-gray-700">Upload Photo</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.gif"
              onChange={e => {
                const file = e.target.files[0];
                if (!file) {
                  setIsFileValid(false);
                  return;
                }

                // Validate file type
                if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                  toast.error('Invalid file type. Supported formats are jpeg, jpg, png, gif.', {
                    position: 'top-center',
                  });
                  e.target.value = null;
                  setIsFileValid(false);
                  return;
                }

                // Validate file size
                const fileSizeMB = file.size / (1024 * 1024);
                if (fileSizeMB > 4) {
                  toast.error('File size must be 4 MB or less.', {
                    position: 'top-center',
                  });
                  e.target.value = null;
                  setIsFileValid(false);
                  return;
                }

                // If all validations pass
                setForm({ ...form, user_photo: file });
                setIsFileValid(true);
              }}
              className="mt-2 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-2"
            />
          </div>
          <div className="col-span-3 space-y-4">
            <Textarea
              label="Survey Report"
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-4 py-4"
              value={form.survey_report}
              tabIndex="30"
              onChange={e => setForm({ ...form, survey_report: e.target.value })}
            />
          </div>
          <div className="flex justify-center items-center col-span-3 mt-6 pt-4">
            <Button
              type="submit"
              className="bg-blue-500 text-white py-2 px-20 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg"
              disabled={!isFileValid || loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </form>
      <SelectionPopup
        open={municipalityPopupOpen}
        onClose={() => setMunicipalityPopupOpen(false)}
        data={municipalities}
        onSelect={handleMunicipalitySelect}
        title="Municipality/Panchayat Name"
      />
      <SelectionPopup
        open={wardPopupOpen}
        onClose={() => setWardPopupOpen(false)}
        data={wards}
        onSelect={handleWardSelect}
        title="Block Name/Ward Number"
      />
      <SelectionPopup
        open={areaPopupOpen}
        onClose={() => setAreaPopupOpen(false)}
        data={areas}
        onSelect={handleAreaSelect}
        title="Lane/Road Name"
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
}

export default CreateUsers;
