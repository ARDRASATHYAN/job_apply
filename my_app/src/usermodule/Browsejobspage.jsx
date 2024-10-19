import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BrowsejobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const navigate=useNavigate()

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

  const handleApply = (jobId) => {
   navigate(`/jobapply/${jobId}`)
    console.log('Applied for job:', jobId);
  };

  return (
    <div>
      <h2>Job Listings</h2>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job._id} className="job-card">
            <h3>{job.title}</h3>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Requirements:</strong> {job.requirements}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> ${job.salary}</p>
            <p><strong>Job Type:</strong> {job.jobType}</p>
            {/* Add an "Apply" button */}
            <button onClick={() => handleApply(job._id)}>Apply</button>
          </div>
        ))
      ) : (
        <p>No job listings available.</p>
      )}
    </div>
  );
};

export default BrowsejobsPage;
