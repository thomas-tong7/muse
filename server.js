const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
app.use(express.static('public'));

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx9tRdn7k_9IhfdrtE2ABnvSv-CEYfVfOGGMFWMvBI8hdNm7XjaPBKf6ZuMmo0DXhfx/exec'; 

app.post('/api/reserve', async (req, res) => {
    try {
        const response = await axios.post(SCRIPT_URL, req.body);
        res.json(response.data);
    } catch (error) { res.status(500).json({ error: "Error" }); }
});

app.get('/api/bookings', async (req, res) => {
    try {
        const response = await axios.get(SCRIPT_URL);
        res.json(response.data);
    } catch (error) { res.status(500).json([]); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Muse Server Live`));
