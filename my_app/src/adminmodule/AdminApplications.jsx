import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            const token = localStorage.getItem('token'); 

            try {
                const response = await axios.get('http://localhost:3000/api/applications', {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                    },
                });
                setApplications(response.data);
            } catch (err) {
                console.error(err); 
                setError('Failed to fetch applications');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleStatusClick = (applicationId) => {
      
        console.log(`Status button clicked for application ID: ${applicationId}`);
    };

    if (loading) {
        return <div>Loading applications...</div>;
    }

    if (error) {
        return <div className="text-red-600">{error}</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
            {applications.length === 0 ? (
                <p>No job applications found.</p>
            ) : (
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Job Title</th>
                            <th className="border px-4 py-2">Applicant</th>
                            <th className="border px-4 py-2">Company</th>
                            <th className="border px-4 py-2">Location</th>
                            <th className="border px-4 py-2">Applied On</th>
                            <th className="border px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application) => (
                            <tr key={application._id}>
                                <td className="border px-4 py-2">{application.jobId.title}</td>
                                <td className="border px-4 py-2">{application.userId.name}</td>
                                <td className="border px-4 py-2">{application.jobId.company}</td>
                                <td className="border px-4 py-2">{application.jobId.location}</td>
                                <td className="border px-4 py-2">{new Date(application.createdAt).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleStatusClick(application._id)}
                                        className="bg-blue-500 text-white py-1 px-3 rounded"
                                    >
                                        View Status
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminApplications;

