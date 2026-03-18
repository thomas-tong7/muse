const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// 🟢 PASTE YOUR GOOGLE WEB APP URL HERE
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyEcUkJbWRrLXgvVyYNEDgdcyqcP2QKooYQszB1HWi3hvmR-U-1G8opqefJzpsp0GZy/exec';

// Save Booking
app.post('/api/reserve', async (req, res) => {
    try {
        const response = await axios.post(SCRIPT_URL, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Database Connection Error" });
    }
});

// Fetch Bookings for Calendar
app.get('/api/bookings', async (req, res) => {
    try {
        const response = await axios.get(SCRIPT_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json([]);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Muse Server Live on ${PORT}`));
