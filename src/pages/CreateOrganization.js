import React, { useState, useRef } from 'react';
import { Input, Button, Select, Option } from '@material-tailwind/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader';

const apiBaseUrl = process.env.API_BASE_URL;

const CreateOrganization = () => {
  const [form, setForm] = useState({
    organization_name: '',
    activities: '',
    address: '',
    contact_person_name: '',
    contact_person_phone: '',
    is_assigned_another_person: 'No',
    assigned_person_name: '',
    assigned_person_phone: '',
    contact_person_photo: null,
    assigned_person_photo: null,
  });
  const [isAssigned, setIsAssigned] = useState(false);
  const [loading, setLoading] = useState(false);

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
    const { name, value } = e.target;
    const error = validateContactNumber(value);

    if (error) {
      toast.error(error, {
        position: 'top-center',
      });
    } else {
      setForm(prevForm => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const [isFileValid, setIsFileValid] = useState(false);

  const handleFileChange = e => {
    const { name, files } = e.target;
    const file = files[0];

    // Supported file types
    const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    if (file) {
      // Check if the file type is supported
      if (!supportedFormats.includes(file.type)) {
        toast.error('Invalid file type. Supported formats are jpeg, jpg, png, gif.', {
          position: 'top-center',
        });
        e.target.value = null;
        setIsFileValid(false);
        return;
      }

      // Check if the file size is 4 MB or less
      const maxSizeInMB = 4;
      if (file.size > maxSizeInMB * 1024 * 1024) {
        toast.error('File size must be 4 MB or less.', {
          position: 'top-center',
        });
        e.target.value = null;
        setIsFileValid(false);
        return;
      }

      // If all checks pass, update the form state and set file as valid
      setForm(prevForm => ({ ...prevForm, [name]: file }));
      setIsFileValid(true);
    } else {
      setIsFileValid(false);
    }
  };

  const excludedFields = ['assigned_person_name', 'assigned_person_phone', 'assigned_person_photo'];

  const contactPersonPhotoRef = useRef(null);
  const assignedPersonPhotoRef = useRef(null);

  const handleSave = async e => {
    e.preventDefault();
    for (const [key, value] of Object.entries(form)) {
      if (!excludedFields.includes(key) && !value) {
        toast.error(`Please fill out the ${key.replace(/_/g, ' ')} field.`, {
          position: 'top-center',
        });
        return;
      }
    }
    setLoading(true);

    try {
      // Save organization data
      const response = await fetch(`${apiBaseUrl}/rationOrganizations/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          organization_name: form.organization_name,
          activities: form.activities,
          address: form.address,
          contact_person_name: form.contact_person_name,
          contact_person_phone: form.contact_person_phone,
          is_assigned_another_person: form.is_assigned_another_person,
          assigned_person_name: form.assigned_person_name,
          assigned_person_phone: form.assigned_person_phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save organization data');
      }

      const organizationId = data.organization.id;

      // Upload photos
      const formData = new FormData();
      formData.append('id', organizationId);
      if (form.contact_person_photo) {
        formData.append('contact_person_photo', form.contact_person_photo);
      }
      if (form.assigned_person_photo) {
        formData.append('assigned_person_photo', form.assigned_person_photo);
      }

      const uploadResponse = await fetch(`${apiBaseUrl}/rationOrganizations/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || 'Failed to upload photos');
      }

      toast.success('Organization data saved successfully.', {
        position: 'top-center',
      });
      // Reset the form state
      setForm({
        organization_name: '',
        activities: '',
        address: '',
        contact_person_name: '',
        contact_person_phone: '',
        is_assigned_another_person: 'No',
        assigned_person_name: '',
        assigned_person_phone: '',
        contact_person_photo: null,
        assigned_person_photo: null,
      });
      // Reset file inputs using refs
      if (contactPersonPhotoRef.current) {
        contactPersonPhotoRef.current.value = null;
      }
      if (assignedPersonPhotoRef.current) {
        assignedPersonPhotoRef.current.value = null;
      }
      // Reset file validity state
      setIsFileValid(false);
    } catch (err) {
      toast.error(err.message, { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-10 md:col-span-6 lg:col-span-8 xl:col-span-10 2xl:col-span-14 p-8">
      <form onSubmit={handleSave} className="bg-white shadow-lg rounded-lg p-10 space-y-4">
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-1 space-y-4">
            <Input
              label="Name of the Organization"
              name="organization_name"
              value={form.organization_name}
              tabIndex="1"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
            />
            <Input
              label="Contact Person Name"
              name="contact_person_name"
              value={form.contact_person_name}
              tabIndex="4"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
            />
            <Select
              label="If Assigned Another Person"
              value={form.is_assigned_another_person}
              tabIndex="6"
              onChange={value => {
                setIsAssigned(value === 'Yes');
                setForm(prevForm => ({
                  ...prevForm,
                  is_assigned_another_person: value,
                }));
              }}
            >
              <Option key={'1'} value={'Yes'}>
                Yes
              </Option>
              <Option key={'2'} value={'No'}>
                No
              </Option>
            </Select>
            {isAssigned && (
              <Input
                label="Assigned Person Name"
                name="assigned_person_name"
                value={form.assigned_person_name}
                tabIndex="7"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              />
            )}
          </div>
          <div className="col-span-1 space-y-4">
            <Input
              label="Activities of the Organization"
              name="activities"
              value={form.activities}
              tabIndex="2"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
            />
            <Input
              label="Contact Person Phone No"
              name="contact_person_phone"
              type="number"
              value={form.contact_person_phone}
              tabIndex="5"
              onChange={handleContactNumberChange}
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
            />
            <Input
              label=""
              type=""
              className="hidden bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
            />
            {isAssigned && (
              <Input
                label="Assigned Person Phone No"
                name="assigned_person_phone"
                type="number"
                value={form.assigned_person_phone}
                tabIndex="8"
                onChange={handleContactNumberChange}
                className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
              />
            )}
          </div>
          <div className="col-span-1 space-y-4">
            <Input
              label="Address"
              name="address"
              value={form.address}
              tabIndex="3"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-4"
            />
            <label className="block text-sm font-medium text-gray-700">Contact Person Photo</label>
            <input
              type="file"
              name="contact_person_photo"
              accept=".jpeg,.jpg,.png,.gif"
              onChange={handleFileChange}
              ref={contactPersonPhotoRef}
              className="mt-2 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-2"
            />
            {isAssigned && (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Assigned Person Photo
                </label>
                <input
                  type="file"
                  name="assigned_person_photo"
                  accept=".jpeg,.jpg,.png,.gif"
                  onChange={handleFileChange}
                  ref={assignedPersonPhotoRef}
                  className="mt-2 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none px-6 py-2"
                />
              </>
            )}
          </div>
          <div className="flex justify-center items-center col-span-3 mt-6 pt-4">
            <Button
              type="submit"
              className="bg-blue-500 text-white py-2 px-20 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg"
              disabled={loading || !isFileValid}
            >
              {loading ? <Loader /> : 'Save'}
            </Button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateOrganization;
