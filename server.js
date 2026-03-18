const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// 🟢 PASTE YOUR GOOGLE WEB APP URL FROM THE DEPLOYMENT STEP HERE
const SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';

app.post('/api/reserve', async (req, res) => {
    try {
        // This sends the data from Muse UI to your Google Spreadsheet
        const response = await axios.post(SCRIPT_URL, req.body);
        res.json(response.data);
    } catch (error) {
        console.error("Connection Error:", error);
        res.status(500).json({ error: "Failed to connect to Muse Database" });
    }
});

// For Render deployment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Muse System active on port ${PORT}`));