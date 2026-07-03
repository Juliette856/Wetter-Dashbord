# Wetter Dashboard

Ein kleines Wetter-Dashboard, das als Azure Static Web App mit einer Azure Function (serverless) läuft.

## Architektur

- Frontend: statische Seite (HTML, Tailwind, JS) im Ordner `src`
- Backend: Azure Function `getWeather` im Ordner `api`
- Wetterdaten: OpenWeatherMap API
- Secrets: `OPENWEATHER_KEY` als App Setting (empfohlen über Azure Key Vault)
- CI/CD: GitHub Actions + Azure Static Web Apps

## Voraussetzungen

- GitHub Account
- Azure Account
- OpenWeatherMap API Key

## Setup

1. Repo auf GitHub erstellen und diesen Code pushen.
2. In Azure eine **Static Web App** erstellen.
   - App location: `src`
   - API location: `api`
3. In der Static Web App unter **Configuration** ein App Setting setzen:
   - `OPENWEATHER_KEY` = dein OpenWeatherMap API Key
4. Den von Azure generierten Deployment Token als Secret in GitHub speichern:
   - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
5. Änderungen auf `main` pushen → GitHub Action baut und deployed automatisch.

## Nutzung

- App-URL öffnen (von Azure Static Web Apps).
- Stadt eingeben, auf „Wetter“ klicken.
- Aktuelle Wetterdaten werden angezeigt.
