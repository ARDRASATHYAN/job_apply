// AppliedJobs.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppliedJobs = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            const token = localStorage.getItem('authToken'); // Get token for authorization

            try {
                const response = await axios.get('http://localhost:3000/api/applied-jobs', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the token
                    },
                });
                setAppliedJobs(response.data);
            } catch (err) {
                setError('Failed to fetch applied jobs');
            } finally {
                setLoading(false);
            }
        };

        fetchAppliedJobs();
    }, []);

    if (loading) {
        return <div>Loading applied jobs...</div>;
    }

    if (error) {
        return <div className="text-red-600">{error}</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Applied Jobs</h1>
            {appliedJobs.length === 0 ? (
                <p>No jobs applied yet.</p>
            ) : (
                <ul>
                    {appliedJobs.map((application) => (
                        <li key={application._id} className="border-b py-4">
                            <h2 className="font-bold">{application.jobId.title}</h2>
                            <p><strong>Company:</strong> {application.jobId.company}</p>
                            <p><strong>Location:</strong> {application.jobId.location}</p>
                            <p><strong>Applied On:</strong> {new Date(application.createdAt).toLocaleDateString()}</p>
                            {/* Add any additional job application details here */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AppliedJobs;

