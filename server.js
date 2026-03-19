const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxGJSoG27RjdQwKBnS46NhNpwWXRHTjw3GSm7aV45WyD0BshZoCvaBVlwRUFJ7-SDJz/exec'; 

// Route for both Save and Delete
app.post('/api/reserve', async (req, res) => {
    try {
        const response = await axios.post(SCRIPT_URL, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Google Script Error" });
    }
});

// Route to fetch all data
app.get('/api/bookings', async (req, res) => {
    try {
        const response = await axios.get(SCRIPT_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json([]);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Muse Server running on port ${PORT}`));
