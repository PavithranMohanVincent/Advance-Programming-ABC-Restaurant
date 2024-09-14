import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const tableSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  outlet: yup.string().required('Outlet is required'),
  username: yup.string().required('Username is required'),
  date: yup.date().required('Date is required'),
  time: yup.string().required('Time is required'),
  guests: yup.number().positive('Number of guests must be positive').required('Number of guests is required'),
  contactNo: yup.string().required('Contact number is required')
});

const validateUsername = async (username) => {
  return true;
};

const ConfirmationDialog = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;
  return (
    <div className="dialog">
      <p>{message}</p>
      <button className="btn btn-primary" onClick={onConfirm}>Confirm</button>
      <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
    </div>
  );
};

const Reservation = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [submitHandler, setSubmitHandler] = useState(() => () => { });
  const [dialogMessage, setDialogMessage] = useState('');

  const {
    register: registerTable,
    handleSubmit: handleTableSubmit,
    formState: { errors: tableErrors }
  } = useForm({
    resolver: yupResolver(tableSchema)
  });

  const onTableSubmit = async (data) => {
    const formattedDate = new Date(data.date).toISOString().split('T')[0];

    const tableData = {
      ...data,
      date: formattedDate,
      status: 'pending'
    };

    const isUsernameValid = await validateUsername(data.username);
    if (!isUsernameValid) {
      console.log('Username does not exist');
      return;
    }

    setDialogMessage('Are you sure you want to submit the table reservation?');
    setSubmitHandler(() => async () => {
      try {
        await axios.post('/table', tableData);
        alert('Table reservation submitted successfully. You will receive a confirmation in your email!');
        window.location.reload();
      } catch (error) {
        console.error('Error submitting table reservation:', error);
      }
    });
    setShowDialog(true);
  };

  const handleConfirm = async () => {
    setShowDialog(false);
    if (submitHandler) {
      await submitHandler();
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  const outlets = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya', 'Hambantota', 'Monaragala', 'Badulla', 'Ratnapura',
    'Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya', 'Anuradhapura', 'Polonnaruwa', 'Puttalam', 'Kurunegala', 'Kegalle',
    'Matara', 'Galle', 'Tangalle', 'Ampara', 'Batticaloa', 'Trincomalee', 'Jaffna', 'Kilinochchi'
  ];

  return (
    <div className="container mt-5">
      <form className="reservation-form" onSubmit={handleTableSubmit(onTableSubmit)}>
        <h1 className="mb-4">Reserve a Table</h1>

        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-group">
              <label>Name:</label>
              <input type="text" className="form-control" {...registerTable('name')} placeholder="Enter Your Name" />
              {tableErrors.name && <p className="text-danger">{tableErrors.name.message}</p>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="outlet">Outlet:</label>
              <select id="outlet" className="form-control" {...registerTable('outlet')}>
                <option value="">Select Your District</option>
                {outlets.map((outlet) => (
                  <option key={outlet} value={outlet}>
                    {outlet}
                  </option>
                ))}
              </select>
              {tableErrors.outlet && <p className="text-danger">{tableErrors.outlet.message}</p>}
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-group">
              <label>User Name:</label>
              <input type="text" className="form-control" {...registerTable('username')} placeholder="Enter Your Username or Email" />
              {tableErrors.username && <p className="text-danger">{tableErrors.username.message}</p>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Date:</label>
              <input type="date" className="form-control" {...registerTable('date')} />
              {tableErrors.date && <p className="text-danger">{tableErrors.date.message}</p>}
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-group">
              <label>Time:</label>
              <input type="time" className="form-control" {...registerTable('time')} />
              {tableErrors.time && <p className="text-danger">{tableErrors.time.message}</p>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Number of Guests:</label>
              <input type="number" className="form-control" {...registerTable('guests')} placeholder="Number of Guests" />
              {tableErrors.guests && <p className="text-danger">{tableErrors.guests.message}</p>}
            </div>
          </div>
        </div>

        <div className="form-group mb-3">
          <label>Contact Number:</label>
          <input type="text" className="form-control" {...registerTable('contactNo')} placeholder="Enter Contact Number" />
          {tableErrors.contactNo && <p className="text-danger">{tableErrors.contactNo.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary">Reserve</button>
      </form>

      <ConfirmationDialog
        isOpen={showDialog}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message={dialogMessage}
      />

      <footer className="mt-5 text-center">
        <p>&copy; ABC Restaurant 2024.</p>
      </footer>
    </div>
  );
};

export default Reservation;
