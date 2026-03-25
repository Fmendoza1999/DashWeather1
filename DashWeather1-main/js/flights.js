const COUNTRY_AIRPORTS = {
  "Ireland":        { iata: "DUB", city: "Dublin" },
  "United Kingdom": { iata: "LHR", city: "London Heathrow" },
  "France":         { iata: "CDG", city: "Paris Charles de Gaulle" },
  "Germany":        { iata: "FRA", city: "Frankfurt" },
  "Italy":          { iata: "FCO", city: "Rome Fiumicino" },
  "Spain":          { iata: "MAD", city: "Madrid Barajas" },
  "Portugal":       { iata: "LIS", city: "Lisbon" },
  "Netherlands":    { iata: "AMS", city: "Amsterdam Schiphol" },
  "Greece":         { iata: "ATH", city: "Athens" },
  "Switzerland":    { iata: "ZRH", city: "Zurich" },
  "Austria":        { iata: "VIE", city: "Vienna" },
  "Sweden":         { iata: "ARN", city: "Stockholm Arlanda" },
  "Norway":         { iata: "OSL", city: "Oslo Gardermoen" },
  "Denmark":        { iata: "CPH", city: "Copenhagen" },
  "Finland":        { iata: "HEL", city: "Helsinki" },
  "Poland":         { iata: "WAW", city: "Warsaw Chopin" },
  "United States":  { iata: "JFK", city: "New York JFK" },
  "Canada":         { iata: "YYZ", city: "Toronto Pearson" },
  "Mexico":         { iata: "MEX", city: "Mexico City" },
  "Brazil":         { iata: "GRU", city: "São Paulo Guarulhos" },
  "Argentina":      { iata: "EZE", city: "Buenos Aires Ezeiza" },
  "Japan":          { iata: "NRT", city: "Tokyo Narita" },
  "China":          { iata: "PEK", city: "Beijing Capital" },
  "India":          { iata: "DEL", city: "New Delhi Indira Gandhi" },
  "Australia":      { iata: "SYD", city: "Sydney Kingsford Smith" },
  "UAE":            { iata: "DXB", city: "Dubai International" },
  "South Africa":   { iata: "JNB", city: "Johannesburg OR Tambo" },
  "Thailand":       { iata: "BKK", city: "Bangkok Suvarnabhumi" },
  "Singapore":      { iata: "SIN", city: "Singapore Changi" },
  "South Korea":    { iata: "ICN", city: "Seoul Incheon" },
  "Turkey":         { iata: "IST", city: "Istanbul" },
  "Egypt":          { iata: "CAI", city: "Cairo International" },
  "Morocco":        { iata: "CMN", city: "Casablanca Mohammed V" },
  "Malaysia":       { iata: "KUL", city: "Kuala Lumpur" },
  "Indonesia":      { iata: "CGK", city: "Jakarta Soekarno-Hatta" },
  "New Zealand":    { iata: "AKL", city: "Auckland" },
  "Russia":         { iata: "SVO", city: "Moscow Sheremetyevo" },
};

const AIRLINE_INFO = {
  'FR': { name: 'Ryanair',          color: '#073cf5', url: 'https://www.ryanair.com',          logo: '🟡' },
  'U2': { name: 'easyJet',          color: '#ff6600', url: 'https://www.easyjet.com',           logo: '🟠' },
  'W6': { name: 'Wizz Air',         color: '#c6007e', url: 'https://www.wizzair.com',           logo: '🟣' },
  'EI': { name: 'Aer Lingus',       color: '#009a5b', url: 'https://www.aerlingus.com',         logo: '🟢' },
  'BA': { name: 'British Airways',  color: '#075aaa', url: 'https://www.britishairways.com',    logo: '🔵' },
  'LH': { name: 'Lufthansa',        color: '#05164d', url: 'https://www.lufthansa.com',         logo: '🔵' },
  'AF': { name: 'Air France',       color: '#002395', url: 'https://www.airfrance.com',         logo: '🔵' },
  'EK': { name: 'Emirates',         color: '#d71921', url: 'https://www.emirates.com',          logo: '🔴' },
  'QR': { name: 'Qatar Airways',    color: '#5c0632', url: 'https://www.qatarairways.com',      logo: '🟤' },
  'TK': { name: 'Turkish Airlines', color: '#c70000', url: 'https://www.turkishairlines.com',   logo: '🔴' },
  'IB': { name: 'Iberia',           color: '#c8102e', url: 'https://www.iberia.com',            logo: '🔴' },
  'AZ': { name: 'ITA Airways',      color: '#0062cc', url: 'https://www.itaairways.com',        logo: '🔵' },
  'LX': { name: 'Swiss',            color: '#cc0000', url: 'https://www.swiss.com',             logo: '🔴' },
  'KL': { name: 'KLM',              color: '#009ada', url: 'https://www.klm.com',               logo: '🔵' },
  'OS': { name: 'Austrian',         color: '#c10000', url: 'https://www.austrian.com',          logo: '🔴' },
  'SK': { name: 'SAS',              color: '#000099', url: 'https://www.flysas.com',            logo: '🔵' },
};

let amadeusToken = null;
let tokenExpiry  = 0;

async function getAmadeusToken() {
  if (amadeusToken && Date.now() < tokenExpiry) return amadeusToken;
  if (CONFIG.AMADEUS_API_KEY === 'YOUR_AMADEUS_API_KEY_HERE')
    throw new Error('NO_KEY');

  const res = await fetch(`${CONFIG.AMADEUS_BASE_URL}/v1/security/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=client_credentials&client_id=${CONFIG.AMADEUS_API_KEY}&client_secret=${CONFIG.AMADEUS_API_SECRET}`
  });
  if (!res.ok) throw new Error('Amadeus auth failed ' + res.status);
  const data = await res.json();
  amadeusToken = data.access_token;
  tokenExpiry  = Date.now() + (data.expires_in - 60) * 1000;
  return amadeusToken;
}

async function searchFlights(destinationCountry) {
  const dest   = COUNTRY_AIRPORTS[destinationCountry];
  const origin = CONFIG.DEFAULT_ORIGIN_AIRPORT;
  if (!dest)               throw new Error(`No airport data for ${destinationCountry}`);
  if (origin === dest.iata) throw new Error('You are already in this country!');

  const token   = await getAmadeusToken();
  const depDate = new Date(); depDate.setDate(depDate.getDate() + 14);
  const dateStr = depDate.toISOString().slice(0, 10);

  const url = `${CONFIG.AMADEUS_BASE_URL}/v2/shopping/flight-offers?` +
    `originLocationCode=${origin}&destinationLocationCode=${dest.iata}` +
    `&departureDate=${dateStr}&adults=1&max=${CONFIG.MAX_FLIGHT_RESULTS}&currencyCode=EUR`;

  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) { const e = await res.json(); throw new Error(e.errors?.[0]?.detail || 'Search failed'); }

  const data = await res.json();
  return (data.data || []).map(offer => {
    const seg     = offer.itineraries[0].segments[0];
    const carrier = seg.carrierCode;
    const airline = AIRLINE_INFO[carrier] || { name: carrier, color: '#00e5ff', url: 'https://www.google.com/flights', logo: '✈️' };
    const dur     = offer.itineraries[0].duration.replace('PT','').replace('H','h ').replace('M','m');
    return {
      airline,
      price:    offer.price.total,
      currency: offer.price.currency,
      duration: dur,
      depTime:  seg.departure.at.slice(11,16),
      arrTime:  seg.arrival.at.slice(11,16),
      stops:    offer.itineraries[0].segments.length - 1,
      from:     seg.departure.iataCode,
      to:       seg.arrival.iataCode,
      destCity: dest.city,
      bookUrl:  airline.url,
      gfUrl:    `https://www.google.com/flights?q=flights+${seg.departure.iataCode}+to+${seg.arrival.iataCode}`
    };
  });
}

function renderFlightsTab(container, countryName) {
  const dest    = COUNTRY_AIRPORTS[countryName];
  const origin  = CONFIG.DEFAULT_ORIGIN_AIRPORT;
  const noKey   = CONFIG.AMADEUS_API_KEY === 'YOUR_AMADEUS_API_KEY_HERE';

  const demoFlights = dest ? [
    { airline: AIRLINE_INFO['FR'], price:'24.99', currency:'EUR', duration:'2h 15m', depTime:'06:25', arrTime:'08:40', stops:0, from:origin, to:dest.iata, destCity:dest.city, bookUrl:'https://www.ryanair.com',  gfUrl:'#' },
    { airline: AIRLINE_INFO['U2'], price:'39.90', currency:'EUR', duration:'2h 20m', depTime:'10:50', arrTime:'13:10', stops:0, from:origin, to:dest.iata, destCity:dest.city, bookUrl:'https://www.easyjet.com',   gfUrl:'#' },
    { airline: AIRLINE_INFO['EI'], price:'67.00', currency:'EUR', duration:'2h 05m', depTime:'14:15', arrTime:'16:20', stops:0, from:origin, to:dest.iata, destCity:dest.city, bookUrl:'https://www.aerlingus.com', gfUrl:'#' },
    { airline: AIRLINE_INFO['BA'], price:'89.50', currency:'EUR', duration:'2h 30m', depTime:'17:00', arrTime:'19:30', stops:0, from:origin, to:dest.iata, destCity:dest.city, bookUrl:'https://www.britishairways.com', gfUrl:'#' },
  ] : [];

  container.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
        <div>
          <div style="font-family:'Unbounded',sans-serif;font-size:14px;color:var(--text)">✈️ Flights to ${countryName}</div>
          <div style="font-size:8px;letter-spacing:2px;color:var(--muted);margin-top:4px">FROM ${origin} · CHEAPEST IN NEXT 14 DAYS</div>
        </div>
        <div class="live-pill"><div class="live-dot"></div>AMADEUS API</div>
      </div>

      ${!dest ? `<div class="no-content"><div class="nc-icon">✈️</div><p>No airport data for ${countryName} yet.</p></div>` : ''}

      ${dest && noKey ? demoFlights.map(f => flightCardHTML(f)).join('') : ''}

      ${dest && !noKey ? `<div id="fl-loading" class="loading"><div class="spin"></div><p>SEARCHING LIVE PRICES...</p></div>` : ''}

      ${noKey && dest ? `
        <div style="background:rgba(255,107,53,0.08);border:1px solid rgba(255,107,53,0.25);border-radius:12px;padding:14px 16px;font-size:9px;color:var(--accent);letter-spacing:1px;line-height:2">
          ⚠️ DEMO PRICES — Add free Amadeus key to <code>js/config.js</code> for live fares.<br>
          <a href="https://developers.amadeus.com" target="_blank" style="color:var(--glow)">→ developers.amadeus.com (free)</a>
        </div>
      ` : ''}

      <!-- Always show these booking shortcuts -->
      ${dest ? `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:4px">
          <a href="https://www.ryanair.com/gb/en/cheap-flights/dublin/${dest.iata.toLowerCase()}" target="_blank" style="display:flex;align-items:center;gap:8px;padding:12px 14px;background:rgba(7,60,245,0.12);border:1px solid rgba(7,60,245,0.3);border-radius:12px;text-decoration:none;transition:all .2s" onmouseover="this.style.background='rgba(7,60,245,0.22)'" onmouseout="this.style.background='rgba(7,60,245,0.12)'">
            <span style="font-size:22px">🟡</span>
            <div><div style="font-family:'Unbounded',sans-serif;font-size:10px;color:#073cf5">RYANAIR</div><div style="font-size:8px;color:var(--muted)">Book direct →</div></div>
          </a>
          <a href="https://www.easyjet.com/en/flights-to/${dest.city.toLowerCase().replace(/ /g,'-')}" target="_blank" style="display:flex;align-items:center;gap:8px;padding:12px 14px;background:rgba(255,102,0,0.12);border:1px solid rgba(255,102,0,0.3);border-radius:12px;text-decoration:none;transition:all .2s" onmouseover="this.style.background='rgba(255,102,0,0.22)'" onmouseout="this.style.background='rgba(255,102,0,0.12)'">
            <span style="font-size:22px">🟠</span>
            <div><div style="font-family:'Unbounded',sans-serif;font-size:10px;color:#ff6600">EASYJET</div><div style="font-size:8px;color:var(--muted)">Book direct →</div></div>
          </a>
          <a href="https://www.aerlingus.com/flights/${origin.toLowerCase()}-to-${dest.iata.toLowerCase()}/" target="_blank" style="display:flex;align-items:center;gap:8px;padding:12px 14px;background:rgba(0,154,91,0.12);border:1px solid rgba(0,154,91,0.3);border-radius:12px;text-decoration:none;transition:all .2s" onmouseover="this.style.background='rgba(0,154,91,0.22)'" onmouseout="this.style.background='rgba(0,154,91,0.12)'">
            <span style="font-size:22px">🟢</span>
            <div><div style="font-family:'Unbounded',sans-serif;font-size:10px;color:#009a5b">AER LINGUS</div><div style="font-size:8px;color:var(--muted)">Book direct →</div></div>
          </a>
          <a href="https://www.google.com/travel/flights/search?tfs=CBwQAhooagwIAxIIL2m${origin}EAAaFGgMIAxIQL2hl${dest.iata}" target="_blank" style="display:flex;align-items:center;gap:8px;padding:12px 14px;background:rgba(0,200,255,0.08);border:1px solid rgba(0,200,255,0.2);border-radius:12px;text-decoration:none;transition:all .2s" onmouseover="this.style.background='rgba(0,200,255,0.16)'" onmouseout="this.style.background='rgba(0,200,255,0.08)'">
            <span style="font-size:22px">🔍</span>
            <div><div style="font-family:'Unbounded',sans-serif;font-size:10px;color:var(--glow)">GOOGLE FLIGHTS</div><div style="font-size:8px;color:var(--muted)">Compare all →</div></div>
          </a>
        </div>
      ` : ''}
    </div>`;

  if (dest && !noKey) {
    searchFlights(countryName).then(flights => {
      const el = container.querySelector('#fl-loading');
      if (el) el.outerHTML = flights.map(f => flightCardHTML(f)).join('');
    }).catch(err => {
      const el = container.querySelector('#fl-loading');
      if (el) el.outerHTML = `<div class="errc"><p>✈️ ${err.message}</p></div>`;
    });
  }
}

function flightCardHTML(f) {
  return `
    <div style="background:rgba(0,20,50,0.75);border:1px solid rgba(0,180,230,0.15);border-radius:14px;padding:14px 16px;display:flex;align-items:center;gap:12px;transition:all .2s;cursor:pointer"
      onmouseover="this.style.borderColor='rgba(0,200,255,0.35)';this.style.transform='translateY(-2px)'"
      onmouseout="this.style.borderColor='rgba(0,180,230,0.15)';this.style.transform=''">
      <div style="width:4px;height:56px;border-radius:4px;background:${f.airline.color};flex-shrink:0;box-shadow:0 0 10px ${f.airline.color}55"></div>
      <div style="min-width:90px">
        <div style="font-size:9px;color:var(--muted);letter-spacing:1px">AIRLINE</div>
        <div style="font-family:'Unbounded',sans-serif;font-size:11px;font-weight:700;color:var(--text);margin-top:3px">${f.airline.logo} ${f.airline.name}</div>
        <div style="font-size:8px;color:var(--muted);margin-top:2px">${f.stops === 0 ? '🟢 Non-stop' : `🟡 ${f.stops} stop`}</div>
      </div>
      <div style="flex:1;text-align:center">
        <div style="display:flex;align-items:center;justify-content:center;gap:8px">
          <div><div style="font-family:'Unbounded',sans-serif;font-size:16px;font-weight:700">${f.depTime}</div><div style="font-size:8px;color:var(--muted)">${f.from}</div></div>
          <div style="color:var(--muted);font-size:11px">──✈──</div>
          <div><div style="font-family:'Unbounded',sans-serif;font-size:16px;font-weight:700">${f.arrTime}</div><div style="font-size:8px;color:var(--muted)">${f.to}</div></div>
        </div>
        <div style="font-size:8px;color:var(--muted);margin-top:4px">⏱ ${f.duration}</div>
      </div>
      <div style="text-align:right;min-width:85px">
        <div style="font-family:'Unbounded',sans-serif;font-size:20px;font-weight:900;background:linear-gradient(135deg,#fff 20%,var(--glow) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent">€${f.price}</div>
        <a href="${f.bookUrl}" target="_blank" style="display:block;margin-top:6px;padding:6px 10px;background:linear-gradient(135deg,var(--glow2),var(--glow));border-radius:100px;color:#03070f;font-size:8px;font-weight:700;letter-spacing:1px;text-decoration:none;text-align:center">BOOK NOW</a>
        <a href="${f.gfUrl}" target="_blank" style="display:block;margin-top:4px;font-size:7px;color:var(--muted);text-decoration:none;text-align:center">Compare →</a>
      </div>
    </div>`;
}
