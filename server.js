const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// 🟢 PASTE YOUR GOOGLE DEPLOYMENT URL HERE
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzEhCUXEC-xXFbVX4FbPlCD15KwpwJCtyK19psbEguGiAyxtPokUXSzczr7PoZHrK6n/exec';

app.post('/api/reserve', async (req, res) => {
    try {
        const response = await axios.post(SCRIPT_URL, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Connect Error" });
    }
});

app.get('/api/bookings', async (req, res) => {
    try {
        const response = await axios.get(SCRIPT_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json([]);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Muse active on ${PORT}`));
