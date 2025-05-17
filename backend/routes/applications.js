const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// Add a new application
router.post('/', async (req, res) => {
    const { jobTitle, candidateName, status } = req.body;

    try {
        const newApplication = new Application({ jobTitle, candidateName, status });
        await newApplication.save();
        res.status(201).json(newApplication);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all applications
router.get('/', async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update application status
router.put('/:id', async (req, res) => { 
    const { jobTitle, candidateName, status } = req.body;
    const { id } = req.params;

    try {
        const updatedApplication = await Application.findByIdAndUpdate(
            id,
            { jobTitle, candidateName, status },
            { new: true } // Return the updated document
        );

        if (!updatedApplication) {
            return res.status(404).json({ error: 'Application not found' });
        }

        res.status(200).json(updatedApplication);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Delete an application
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedApplication = await Application.findByIdAndDelete(id);

        if (!deletedApplication) {
            return res.status(404).json({ error: 'Application not found' });
        }

        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
