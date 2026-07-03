const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

const app = express();

// Serve frontend
app.use(express.static(path.join(__dirname, "src")));

// API route
app.get("/api/getWeather", async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.OPENWEATHER_KEY;

    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }

    if (!apiKey) {
        return res.status(500).json({ error: "OPENWEATHER_KEY is not configured" });
    }

    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather` +
            `?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=de`;

        const response = await fetch(url);
        const w = await response.json();

        if (!response.ok) {
            return res.status(500).json({ error: w.message || "API error" });
        }

        res.json({
            name: w.name,
            temp: w.main.temp,
            feels_like: w.main.feels_like,
            humidity: w.main.humidity,
            description: w.weather[0].description,
            icon: w.weather[0].icon
        });
    } catch (err) {
        res.status(500).json({ error: "Unable to fetch weather for this city" });
    }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
