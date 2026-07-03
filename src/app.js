async function loadWeather() {
  const cityInput = document.getElementById("cityInput");
  const status = document.getElementById("status");
  const result = document.getElementById("result");

  const city = cityInput.value.trim();
  if (!city) {
    status.textContent = "Bitte eine Stadt eingeben.";
    result.classList.add("hidden");
    return;
  }

  status.textContent = "Lade Wetterdaten…";
  result.classList.add("hidden");

  try {
    const response = await fetch(`/api/getWeather?city=${encodeURIComponent(city)}`);
    const data = await response.json();

    if (!response.ok || data.error) {
      status.textContent = "Fehler: " + (data.error || "Unbekannter Fehler");
      result.classList.add("hidden");
      return;
    }

    status.textContent = "";

    const iconUrl = data.icon
      ? `https://openweathermap.org/img/wn/${data.icon}@2x.png`
      : null;

    result.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <div class="weather-title">${data.name}</div>
          <div class="text-gray-600">${data.description}</div>
        </div>
        ${
          iconUrl
            ? `<img src="${iconUrl}" alt="Icon" class="w-16 h-16" />`
            : ""
        }
      </div>
      <div class="mt-3">
        <div class="weather-row">
          <span>Temperatur:</span>
          <span><strong>${data.temp} °C</strong></span>
        </div>
        <div class="weather-row">
          <span>Gefühlt:</span>
          <span>${data.feels_like} °C</span>
        </div>
        <div class="weather-row">
          <span>Luftfeuchtigkeit:</span>
          <span>${data.humidity} %</span>
        </div>
      </div>
    `;

    result.classList.remove("hidden");
  } catch (err) {
    status.textContent = "Netzwerkfehler oder API nicht erreichbar.";
    result.classList.add("hidden");
  }
}
