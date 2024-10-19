// JobList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './JobList.css'; 

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJobId, setEditingJobId] = useState(null); // To track which job is being edited
  const [editedJobData, setEditedJobData] = useState({}); // To store the edited job details

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/jobs/${id}`);
      setJobs(jobs.filter(job => job._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleEdit = (job) => {
    setEditingJobId(job._id); // Set the job ID being edited
    setEditedJobData(job); // Set the current job data for editing
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/jobs/${id}`, editedJobData);
      const updatedJobs = jobs.map(job => job._id === id ? { ...job, ...editedJobData } : job);
      setJobs(updatedJobs);
      setEditingJobId(null); // Exit edit mode
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedJobData({ ...editedJobData, [name]: value });
  };

  return (
    <div>
      <h2>Job Listings</h2>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job._id} className="job-card">
            {editingJobId === job._id ? (
              // Editable fields when the job is being edited
              <>
                <input
                  type="text"
                  name="title"
                  value={editedJobData.title}
                  onChange={handleChange}
                />
                <textarea
                  name="description"
                  value={editedJobData.description}
                  onChange={handleChange}
                />
                <textarea
                  name="requirements"
                  value={editedJobData.requirements}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="location"
                  value={editedJobData.location}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="salary"
                  value={editedJobData.salary}
                  onChange={handleChange}
                />
                <select
                  name="jobType"
                  value={editedJobData.jobType}
                  onChange={handleChange}
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Internship">Internship</option>
                </select>
                <button onClick={() => handleSave(job._id)}>Save</button>
              </>
            ) : (
              // Display job details when not in edit mode
              <>
                <h3>{job.title}</h3>
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Requirements:</strong> {job.requirements}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
                <p><strong>Job Type:</strong> {job.jobType}</p>
                <button onClick={() => handleEdit(job)}>Edit</button>
              </>
            )}
            <button onClick={() => handleDelete(job._id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No job listings available.</p>
      )}
    </div>
  );
};

export default JobList;

