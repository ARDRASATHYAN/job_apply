// JobPostForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './JobPostForm.css';

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
    jobType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/jobs', formData);
      console.log('Job posted successfully:', response.data);
      // Clear the form or redirect the user as needed
      setFormData({
        title: '',
        description: '',
        requirements: '',
        location: '',
        salary: '',
        jobType: '',
      });
    } catch (error) {
      console.error('Error posting job:', error.response.data);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Job Title"
        required
        className="form-input"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Job Description"
        required
        className="form-textarea"
      ></textarea>
      <textarea
        name="requirements"
        value={formData.requirements}
        onChange={handleChange}
        placeholder="Requirements"
        required
        className="form-textarea"
      ></textarea>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        required
        className="form-input"
      />
      <input
        type="number"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
        placeholder="Salary"
        required
        className="form-input"
      />
      <select
        name="jobType"
        value={formData.jobType}
        onChange={handleChange}
        required
        className="form-select"
      >
        <option value="">Select Job Type</option>
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Contract">Contract</option>
        <option value="Temporary">Temporary</option>
        <option value="Internship">Internship</option>
      </select>
      <button type="submit" className="form-button">Post Job</button>
    </form>
  );
};

export default JobPostForm;
