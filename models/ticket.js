const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    service: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }, // You may want to store it as a string or date
    therapistName: { type: String, required: true },
    userName: { type: String, required: true },
    location: { type: String, required: true },
    disease: { type: String, required: true },
});

module.exports = mongoose.model('Ticket', ticketSchema);
