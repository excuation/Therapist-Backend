const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket'); // Adjust the import based on your file structure

// Route to get ticket by ID
router.get('/get-ticket/:id', async (req, res) => {
    try {
        const ticketId = req.params.id;
        console.log('Fetching ticket with ID:', ticketId);

        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        return res.json(ticket); // Only send response once
    } catch (error) {
        console.error('Error fetching ticket:', error);
        return res.status(500).json({ message: 'Internal server error' }); // Handle error gracefully
    }
});

module.exports = router;
