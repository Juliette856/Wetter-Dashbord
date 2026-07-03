const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

const app = express();

// Serve frontend
app.use(express.static(path.join(__dirname, "src")));

// API route
app.get("/api/getweather", async (req, res) => {
    const city = req.query.city;
    const apikey = process.env.OPENWEATHER_KEY;

    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }

    if (!apikey) {
        return res.status(500).json({ error: "OPENWEATHER_KEY is not configured" });
    }

    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric&lang=de`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            return res.status(500).json({ error: "Unable to fetch weather for this city" });
        }

        return res.json({
            name: data.name,
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            icon: data.weather[0].icon
        });

    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

