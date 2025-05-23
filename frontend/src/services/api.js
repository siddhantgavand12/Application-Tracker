// src/services/api.js
import axios from 'axios';
// api url

const API_URL = 'https://application-tracker-cust.onrender.com'; 
// const API_URL = 'http://localhost:5000';  

// Fetch all applications
export const fetchApplications = async () => {
    try {
        // response
        const response = await axios.get(`${API_URL}/applications`);
        console.log('Fetched applications:', response.data);
        // return 
        return response.data;
    } catch (error) {
        console.error('Error fetching applications:', error);
        throw error;
    }
};

// Other API calls can go here (POST, PUT, DELETE, etc.)
// Create a new application
export const createApplication = async (applicationData) => {
    try {
        const response = await axios.post(`${API_URL}/applications`, applicationData);
        return response.data;
    } catch (error) {
        console.error('Error creating application:', error);
        throw error;
    }
};

export const updateApplication = async (id, applicationData) => {
    try {
        const response = await axios.put(`${API_URL}/applications/${id}`, applicationData); // Change `put` to `patch`
        return response.data;
    } catch (error) {
        console.error('Error updating application:', error);
        throw error;
    }
};

// Delete application 
export const deleteApplication = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/applications/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting application:', error); 
        
        throw error;
    }
};
