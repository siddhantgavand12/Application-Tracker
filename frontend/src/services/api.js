// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';  // Update with your backend URL

// Fetch all applications
export const fetchApplications = async () => {
    try {
        const response = await axios.get(`${API_URL}/applications`);
        return response.data;
    } catch (error) {
        console.error('Error fetching applications:', error);
        throw error;
    }
};

// Other API calls can go here (POST, PUT, DELETE, etc.)
