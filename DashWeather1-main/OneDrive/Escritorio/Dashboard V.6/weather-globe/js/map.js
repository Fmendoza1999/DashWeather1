// ═══════════════════════════════════════════════════════
//  MAP.JS — 🗺️ Interactive Map via Leaflet.js
//  Uses OpenStreetMap tiles — FREE, no API key needed!
// ═══════════════════════════════════════════════════════

let leafletMap = null;
let mapMarker  = null;
let mapInit    = false;

// ── INITIALISE MAP ────────────────────────────────────────────────────────────
function initMap(containerId, lat, lon, countryName, flag) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Destroy previous map instance (Leaflet doesn't auto-clean)
  if (leafletMap) {
    leafletMap.remove();
    leafletMap = null;
    mapMarker  = null;
    mapInit    = false;
  }

  // Leaflet is loaded via CDN in index.html
  if (typeof L === 'undefined') {
    container.innerHTML = `<div class="no-content"><p>Map library not loaded. Check internet connection.</p></div>`;
    return;
  }

  // Init Leaflet map
  leafletMap = L.map(containerId, {
    center: [lat, lon],
    zoom: 6,
    zoomControl: true,
    scrollWheelZoom: true,
  });

  // ── Tile layers (all free, no key) ──
  const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
  });

  // ESRI Satellite (free, no key)
  const satelliteLayer = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri',
    maxZoom: 17,
  });

  // Dark/Night style (free, no key)
  const darkLayer = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© CartoDB',
    maxZoom: 19,
  });

  // Start with dark theme to match app
  darkLayer.addTo(leafletMap);

  // Layer control
  const baseLayers = {
    '🌙 Dark':      darkLayer,
    '🗺️ Streets':  streetLayer,
    '🛰️ Satellite': satelliteLayer,
  };
  L.control.layers(baseLayers).addTo(leafletMap);

  // ── Custom marker ──
  const pinIcon = L.divIcon({
    html: `
      <div style="
        position:relative;
        display:flex;align-items:center;justify-content:center;
      ">
        <div style="
          width:40px;height:40px;
          background:rgba(0,200,255,0.15);
          border:2px solid rgba(0,200,255,0.5);
          border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          font-size:22px;
          box-shadow:0 0 20px rgba(0,200,255,0.4);
          animation:mapPulse 2s ease-in-out infinite;
        ">${flag}</div>
      </div>
    `,
    className: '',
    iconSize:   [40, 40],
    iconAnchor: [20, 20],
  });

  mapMarker = L.marker([lat, lon], { icon: pinIcon })
    .addTo(leafletMap)
    .bindPopup(`
      <div style="font-family:'Space Mono',monospace;color:#ddeeff;background:#03070f;padding:4px 8px;border-radius:6px;font-size:11px">
        <strong>${flag} ${countryName}</strong><br>
        <span style="color:#3a6080">${lat.toFixed(3)}, ${lon.toFixed(3)}</span>
      </div>
    `, { className: 'dark-popup' })
    .openPopup();

  // ── Click map to get weather at that location ──
  leafletMap.on('click', async (e) => {
    const { lat: clickLat, lng: clickLon } = e.latlng;
    showMapClickWeather(clickLat, clickLon);
  });

  mapInit = true;

  // Must call invalidateSize after container becomes visible
  setTimeout(() => leafletMap && leafletMap.invalidateSize(), 150);
}

// ── CLICK-TO-WEATHER ──────────────────────────────────────────────────────────
async function showMapClickWeather(lat, lon) {
  // Show a loading popup at the clicked point
  const loadPopup = L.popup()
    .setLatLng([lat, lon])
    .setContent(`<div style="font-family:'Space Mono',monospace;font-size:10px;color:#ddeeff;background:#03070f;padding:6px 10px;border-radius:6px">⏳ Loading weather...</div>`)
    .openOn(leafletMap);

  try {
    const w = await fetchWeatherData(lat, lon);
    loadPopup.setContent(`
      <div style="font-family:'Space Mono',monospace;background:#03070f;padding:8px 12px;border-radius:8px;color:#ddeeff;min-width:160px">
        <div style="font-size:24px;text-align:center">${w.icon}</div>
        <div style="font-family:'Unbounded',sans-serif;font-size:22px;font-weight:900;text-align:center">${w.temp_c}°C</div>
        <div style="font-size:9px;color:#3a6080;text-align:center;letter-spacing:2px">${w.condition}</div>
        <div style="font-size:9px;color:#00e5ff;text-align:center;margin-top:4px">${w.city}</div>
        <div style="font-size:8px;color:#3a6080;text-align:center">💧${w.humidity}% · 💨${w.wind_kmh}km/h</div>
      </div>
    `);
  } catch (e) {
    loadPopup.setContent(`<div style="color:#ff6b6b;font-size:10px;padding:6px">⚠ ${e.message}</div>`);
  }
}

// ── RENDER MAP TAB ────────────────────────────────────────────────────────────
function renderMapTab(container, country) {
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:14px;height:100%">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div>
          <div style="font-family:'Unbounded',sans-serif;font-size:14px;color:var(--text)">
            🗺️ ${country.n} — Interactive Map
          </div>
          <div style="font-size:8px;letter-spacing:2px;color:var(--muted);margin-top:4px">
            CLICK ANYWHERE ON MAP FOR LOCAL WEATHER
          </div>
        </div>
        <div class="live-pill"><div class="live-dot"></div>OPENSTREETMAP</div>
      </div>

      <!-- Map container -->
      <div id="leaflet-map" style="
        flex:1;
        min-height:420px;
        border-radius:14px;
        overflow:hidden;
        border:1px solid rgba(0,180,230,0.15);
        background:#03070f;
      "></div>

      <div style="font-size:8px;color:var(--muted);letter-spacing:1px;text-align:center">
        🌐 Map data © OpenStreetMap contributors · Satellite © Esri · No API key required
      </div>
    </div>

    <style>
      /* Override Leaflet styles to match dark theme */
      .leaflet-container { background: #03070f !important; font-family: 'Space Mono', monospace; }
      .leaflet-popup-content-wrapper { background: #03070f; border: 1px solid rgba(0,180,230,0.3); border-radius: 10px; box-shadow: 0 0 20px rgba(0,100,200,0.3); }
      .leaflet-popup-tip { background: #03070f; }
      .leaflet-control-layers { background: rgba(3,7,15,0.95); border: 1px solid rgba(0,180,230,0.2); color: #ddeeff; }
      .leaflet-control-layers label { color: #ddeeff; font-size: 10px; }
      .leaflet-control-zoom a { background: rgba(3,7,15,0.95); border-color: rgba(0,180,230,0.2); color: var(--glow); }
      .leaflet-control-zoom a:hover { background: rgba(0,200,255,0.1); }
      .leaflet-bar { border: 1px solid rgba(0,180,230,0.2) !important; }
      .leaflet-control-attribution { background: rgba(3,7,15,0.8) !important; color: #3a6080 !important; font-size: 8px; }
      .leaflet-control-attribution a { color: #3a6080 !important; }
      @keyframes mapPulse { 0%,100%{box-shadow:0 0 20px rgba(0,200,255,0.4)} 50%{box-shadow:0 0 35px rgba(0,200,255,0.7)} }
    </style>
  `;

  // Init map after DOM is ready
  requestAnimationFrame(() => {
    initMap('leaflet-map', country.la, country.lo, country.n, country.f);
  });
}
