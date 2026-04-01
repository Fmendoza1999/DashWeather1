let leafletMap = null;

function renderMapTab(container, country) {
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:12px;height:100%;min-height:0">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-shrink:0">
        <div>
          <div style="font-family:'Unbounded',sans-serif;font-size:14px;color:var(--text)">🗺️ ${country.n} — Interactive Map</div>
          <div style="font-size:8px;letter-spacing:2px;color:var(--muted);margin-top:4px">CLICK ANYWHERE FOR LOCAL WEATHER · SWITCH LAYERS TOP-RIGHT</div>
        </div>
        <div class="live-pill"><div class="live-dot"></div>OPENSTREETMAP · FREE</div>
      </div>

      <div id="leaflet-map" style="flex:1;min-height:400px;border-radius:14px;overflow:hidden;border:1px solid rgba(0,180,230,0.15)"></div>

      <div style="font-size:8px;color:var(--muted);letter-spacing:1px;text-align:center;flex-shrink:0">
        © OpenStreetMap contributors · Satellite © Esri · No API key needed
      </div>
    </div>

    <style>
      .leaflet-container { background:#03070f !important; font-family:'Space Mono',monospace !important; }
      .leaflet-popup-content-wrapper { background:#03070f; border:1px solid rgba(0,180,230,0.3); border-radius:10px; box-shadow:0 0 20px rgba(0,100,200,0.3); color:#ddeeff; }
      .leaflet-popup-tip { background:#03070f; }
      .leaflet-control-layers { background:rgba(3,7,15,0.95) !important; border:1px solid rgba(0,180,230,0.2) !important; color:#ddeeff; border-radius:8px !important; }
      .leaflet-control-layers label { color:#ddeeff !important; font-size:10px; }
      .leaflet-control-zoom a { background:rgba(3,7,15,0.95) !important; border-color:rgba(0,180,230,0.2) !important; color:#00e5ff !important; }
      .leaflet-control-zoom a:hover { background:rgba(0,200,255,0.1) !important; }
      .leaflet-bar { border:1px solid rgba(0,180,230,0.2) !important; }
      .leaflet-control-attribution { background:rgba(3,7,15,0.7) !important; color:#3a6080 !important; font-size:7px !important; }
      .leaflet-control-attribution a { color:#3a6080 !important; }
      @keyframes mapPulse { 0%,100%{box-shadow:0 0 20px rgba(0,200,255,0.4)} 50%{box-shadow:0 0 35px rgba(0,200,255,0.7)} }
    </style>`;

  // Init Leaflet after DOM paint
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (typeof L === 'undefined') {
      document.getElementById('leaflet-map').innerHTML = `<div class="no-content"><p>Map library not loaded.<br>Check internet connection.</p></div>`;
      return;
    }
    initLeaflet(country);
  }));
}

function initLeaflet(country) {

  if (leafletMap) { try { leafletMap.remove(); } catch(e) {} leafletMap = null; }

  leafletMap = L.map('leaflet-map', {
    center: [country.la, country.lo],
    zoom: 6,
    zoomControl: true,
    scrollWheelZoom: true,
  });

  const dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© CartoDB', maxZoom: 19
  });
  const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap', maxZoom: 18
  });
  const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© Esri', maxZoom: 17
  });

  dark.addTo(leafletMap);
  L.control.layers({ '🌙 Dark': dark, '🗺️ Streets': streets, '🛰️ Satellite': satellite }).addTo(leafletMap);
  const pinIcon = L.divIcon({
    html: `<div style="width:40px;height:40px;background:rgba(0,200,255,0.15);border:2px solid rgba(0,200,255,0.5);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:0 0 20px rgba(0,200,255,0.4);animation:mapPulse 2s ease-in-out infinite">${country.f}</div>`,
    className: '', iconSize: [40,40], iconAnchor: [20,20]
  });

  L.marker([country.la, country.lo], { icon: pinIcon })
    .addTo(leafletMap)
    .bindPopup(`<div style="font-family:'Space Mono',monospace;padding:2px 6px;font-size:11px"><strong>${country.f} ${country.n}</strong><br><span style="color:#3a6080">${country.cy}</span></div>`)
    .openPopup();

  leafletMap.on('click', async e => {
    const { lat, lng } = e.latlng;
    const loading = L.popup().setLatLng([lat, lng])
      .setContent(`<div style="font-family:'Space Mono',monospace;font-size:10px;padding:4px 8px">⏳ Loading weather...</div>`)
      .openOn(leafletMap);
    try {
      const w = await fetchWeatherData(lat, lng);
      loading.setContent(`
        <div style="font-family:'Space Mono',monospace;padding:6px 10px;min-width:150px;text-align:center">
          <div style="font-size:28px">${w.icon}</div>
          <div style="font-family:'Unbounded',sans-serif;font-size:22px;font-weight:900">${w.temp_c}°C</div>
          <div style="font-size:9px;color:#3a6080;letter-spacing:2px">${w.condition}</div>
          <div style="font-size:9px;color:#00e5ff;margin-top:4px">${w.city}</div>
          <div style="font-size:8px;color:#3a6080">💧${w.humidity}% · 💨${w.wind_kmh}km/h</div>
        </div>`);
    } catch(e) {
      loading.setContent(`<div style="color:#ff6b6b;font-size:10px;padding:6px">⚠ ${e.message}</div>`);
    }
  });

  setTimeout(() => leafletMap && leafletMap.invalidateSize(), 200);
}
