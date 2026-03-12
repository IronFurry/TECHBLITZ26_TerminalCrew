import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, AlignLeft, Check } from 'lucide-react';
import './Forms.css';

const BookAppointment = () => {
  const navigate = useNavigate();
  const { success } = useToast();
  const [formData, setFormData] = useState({
    patientName: '',
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    success('Appointment successfully booked!');
    navigate('/receptionist');
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Book Appointment</h1>
        <p>Schedule a new appointment for a patient.</p>
      </div>

      <motion.form 
        className="booking-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="form-group">
          <label><User size={16}/> Patient Name</label>
          <input 
            type="text" 
            name="patientName"
            required 
            placeholder="John Doe" 
            value={formData.patientName} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label><User size={16}/> Select Doctor</label>
          <select name="doctor" required value={formData.doctor} onChange={handleChange}>
            <option value="" disabled>Select a Doctor</option>
            <option value="smith">Dr. Smith (General)</option>
            <option value="jones">Dr. Jones (Pediatrics)</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label><Calendar size={16}/> Date</label>
            <input 
              type="date" 
              name="date"
              required 
              value={formData.date} 
              onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <label><Clock size={16}/> Time</label>
            <input 
              type="time" 
              name="time"
              required 
              value={formData.time} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <div className="form-group">
          <label><AlignLeft size={16}/> Reason for Visit</label>
          <textarea 
            name="reason"
            rows="4" 
            placeholder="Briefly describe the reason for the visit..."
            value={formData.reason}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="btn-primary">
            <Check size={18} /> Confirm Booking
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default BookAppointment;
