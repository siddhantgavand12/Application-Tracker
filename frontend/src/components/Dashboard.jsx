// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { fetchApplications } from '../services/api';

const Dashboard = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch applications data on component mount
    useEffect(() => {
        const getApplications = async () => {
            try {
                const data = await fetchApplications();
                setApplications(data);
            } catch (error) {
                console.error('Failed to fetch applications', error);
            } finally {
                setLoading(false);
            }
        };

        getApplications();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Application Tracker</h1>
            <table className="min-w-full border-collapse border">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-6 py-3 border">Job Title</th>
                        <th className="px-6 py-3 border">Candidate Name</th>
                        <th className="px-6 py-3 border">Status</th>
                        <th className="px-6 py-3 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="px-6 py-4 text-center">No applications found.</td>
                        </tr>
                    ) : (
                        applications.map((application) => (
                            <tr key={application._id} className="bg-white border-b hover:bg-gray-100">
                                <td className="px-6 py-4">{application.jobTitle}</td>
                                <td className="px-6 py-4">{application.candidateName}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-sm px-2 py-1 rounded ${getStatusClass(application.status)}`}>
                                        {application.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-sm text-green-600 hover:underline">Update</button>
                                    <button className="text-sm text-red-600 hover:underline ml-4">Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

// Helper function to determine status class for styling
const getStatusClass = (status) => {
    switch (status) {
        case 'Shortlisted':
            return 'bg-blue-100 text-blue-600';
        case 'Rejected':
            return 'bg-red-100 text-red-600';
        case 'Interviewed':
            return 'bg-yellow-100 text-yellow-600';
        case 'Hired':
            return 'bg-green-100 text-green-600';
        default:
            return 'bg-gray-100 text-gray-600';
    }
};

export default Dashboard;
