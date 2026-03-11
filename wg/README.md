# Weather Globe v3.0 — World Explorer

## Folder Structure



## Quick Start

1. **Unzip** this folder somewhere on your computer
2. Open **`js/config.js`** in any text editor
3. The app works in **demo mode immediately** — no API keys needed to start!
4. Double-click **`index.html`** to open in your browser

> If the globe doesn't appear, try opening with **Google Chrome** or **Firefox**.
> Safari may block local file access.

---

## API Keys (All Free)

### OpenWeatherMap — Live Weather
- Already included (free key)
- Get your own: https://openweathermap.org/api
- Free tier: **1,000 calls/day**

### Amadeus — Live Flight Prices
- Get key: https://developers.amadeus.com
- Click **Create App** → copy API Key + Secret into `config.js`
- Free tier: **500 calls/month** (test environment)
- Without key: shows demo flight prices

### YouTube — Travel Videos
- Get key: https://console.cloud.google.com
- Enable **YouTube Data API v3** → create credentials
- Free tier: **10,000 units/day**
- Without key: shows curated demo videos per country

---

## Features

| Tab | What it does |
|-----|-------------|
| **Cities** | City photos from Unsplash + live weather per city |
| **Webcams** | Live webcam previews linking to Windy/EarthCam |
| **Weather** | Full weather + 5-day forecast (OpenWeatherMap) |
| **Map** | Interactive map — click anywhere for local weather |
| **Flights** | Cheapest flights from your airport (Ryanair, easyJet etc.) |
| **Videos** | Travel videos with inline YouTube player |

---

## Deployment (Host it free)

- **GitHub Pages**: Push to GitHub, enable Pages in Settings
- **Netlify**: Drag the folder to netlify.com/drop
- **Vercel**: `vercel deploy` in the folder

