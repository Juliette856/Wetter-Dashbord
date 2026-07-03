const axios = require("axios");

module.exports = async function (context, req) {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHER_KEY;

  if (!city) {
    context.res = {
      status: 400,
      body: { error: "City query parameter is required" }
    };
    return;
  }

  if (!apiKey) {
    context.res = {
      status: 500,
      body: { error: "OPENWEATHER_KEY is not configured" }
    };
    return;
  }

  try {
    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=de`;

    const response = await axios.get(url);
    const w = response.data;

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: {
        name: w.name,
        temp: w.main.temp,
        feels_like: w.main.feels_like,
        humidity: w.main.humidity,
        description: w.weather[0].description,
        icon: w.weather[0].icon
      }
    };
  } catch (err) {
    context.log("Weather API error:", err.message);
    context.res = {
      status: 500,
      body: { error: "Unable to fetch weather for this city" }
    };
  }
};
