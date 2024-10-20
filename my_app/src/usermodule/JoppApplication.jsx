import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const JobApplyForm = () => {
  const { jobId } = useParams(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentLocation: '',
    education: '',
  });
  const [resume, setResume] = useState(null); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    // Optional: Validate file type and size here if needed
    if (file && file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      setResume(null);
    } else {
      setError('');
      setResume(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('email', formData.email);
    formDataObj.append('phone', formData.phone);
    formDataObj.append('currentLocation', formData.currentLocation);
    formDataObj.append('education', formData.education);
    formDataObj.append('resume', resume); 
    formDataObj.append('jobId', jobId); 
    const userId = localStorage.getItem('userId'); 
    formDataObj.append('userId', userId); 
    const token = localStorage.getItem('authToken'); 
    try {
      const response = await axios.post(`http://localhost:3000/api/jobs/${jobId}/apply`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,  
        },
      });
      console.log('Application submitted successfully:', response.data);
      navigate('/success');
    } catch (error) {
      setError('Error submitting application. Please try again.');
      console.error('Error submitting application:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">Job Application</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Current Location</label>
        <input
          type="text"
          name="currentLocation"
          value={formData.currentLocation}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Education</label>
        <input
          type="text"
          name="education"
          value={formData.education}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Resume (PDF)</label>
        <input
          type="file"
          name="resume"
          accept="application/pdf"
          onChange={handleResumeChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" disabled={loading} className="mt-4 bg-blue-500 text-white p-2">
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
};

export default JobApplyForm;
