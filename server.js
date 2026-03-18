const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// 🟢 PASTE YOUR NEW SCRIPT API URL HERE 🟢
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyEcUkJbWRrLXgvVyYNEDgdcyqcP2QKooYQszB1HWi3hvmR-U-1G8opqefJzpsp0GZy/exec';

// 1. ROUTE TO SAVE DATA (From the Form)
app.post('/api/reserve', async (req, res) => {
    try {
        const response = await axios.post(SCRIPT_URL, req.body);
        res.json(response.data);
    } catch (error) {
        console.error("Error saving:", error);
        res.status(500).json({ error: "Failed to save to Spreadsheet" });
    }
});

// 2. ROUTE TO FETCH DATA (For the Calendar)
app.get('/api/bookings', async (req, res) => {
    try {
        const response = await axios.get(SCRIPT_URL);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching:", error);
        res.status(500).json([]);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Muse Server is Live on Port ${PORT}`));
