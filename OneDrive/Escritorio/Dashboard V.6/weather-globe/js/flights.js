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
  "Ukraine":        { iata: "KBP", city: "Kyiv Boryspil" },
};
const AIRLINE_INFO = {
  'FR': { name: 'Ryanair',        logo: '', color: '#073cf5', url: 'https://www.ryanair.com' },
  'U2': { name: 'easyJet',        logo: '', color: '#ff6600', url: 'https://www.easyjet.com' },
  'W6': { name: 'Wizz Air',       logo: '', color: '#c6007e', url: 'https://www.wizzair.com' },
  'EI': { name: 'Aer Lingus',     logo: '', color: '#009a5b', url: 'https://www.aerlingus.com' },
  'BA': { name: 'British Airways', logo: '', color: '#075aaa', url: 'https://www.britishairways.com' },
  'LH': { name: 'Lufthansa',      logo: '', color: '#05164d', url: 'https://www.lufthansa.com' },
  'AF': { name: 'Air France',     logo: '', color: '#002395', url: 'https://www.airfrance.com' },
  'EK': { name: 'Emirates',       logo: '', color: '#d71921', url: 'https://www.emirates.com' },
  'QR': { name: 'Qatar Airways',  logo: '', color: '#5c0632', url: 'https://www.qatarairways.com' },
  'TK': { name: 'Turkish Airlines',logo:'', color: '#c70000', url: 'https://www.turkishairlines.com' },
};
let amadeusToken = null;
let tokenExpiry  = 0;

async function getAmadeusToken() {
  if (amadeusToken && Date.now() < tokenExpiry) return amadeusToken;

  if (CONFIG.AMADEUS_API_KEY === 'YOUR_AMADEUS_API_KEY_HERE') {
    throw new Error('Amadeus API key not configured. Add your key to js/config.js');
  }

  const res = await fetch(`${CONFIG.AMADEUS_BASE_URL}/v1/security/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=client_credentials&client_id=${CONFIG.AMADEUS_API_KEY}&client_secret=${CONFIG.AMADEUS_API_SECRET}`
  });

  if (!res.ok) throw new Error('Amadeus auth failed: ' + res.status);
  const data = await res.json();
  amadeusToken = data.access_token;
  tokenExpiry  = Date.now() + (data.expires_in - 60) * 1000;
  return amadeusToken;
}
async function searchFlights(destinationCountry) {
  const destAirport = COUNTRY_AIRPORTS[destinationCountry];
  if (!destAirport) throw new Error(`No airport data for ${destinationCountry}`);

  const origin = CONFIG.DEFAULT_ORIGIN_AIRPORT;
  if (origin === destAirport.iata) throw new Error('You are already in this country!');

  const token = await getAmadeusToken();

  const depDate = new Date();
  depDate.setDate(depDate.getDate() + 14);
  const dateStr = depDate.toISOString().slice(0, 10);

  const url = `${CONFIG.AMADEUS_BASE_URL}/v2/shopping/flight-offers?` +
    `originLocationCode=${origin}` +
    `&destinationLocationCode=${destAirport.iata}` +
    `&departureDate=${dateStr}` +
    `&adults=1` +
    `&max=${CONFIG.MAX_FLIGHT_RESULTS}` +
    `&currencyCode=EUR`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.errors?.[0]?.detail || 'Flight search failed');
  }

  const data = await res.json();
  return parseFlightOffers(data.data || [], destAirport);
}

function parseFlightOffers(offers, destAirport) {
  return offers.map(offer => {
    const seg = offer.itineraries[0].segments[0];
    const carrier = seg.carrierCode;
    const airline  = AIRLINE_INFO[carrier] || { name: carrier, logo: '✈️', color: '#00e5ff', url: `https://www.google.com/flights` };
    const price    = offer.price.total;
    const currency = offer.price.currency;
    const duration = offer.itineraries[0].duration.replace('PT', '').replace('H', 'h ').replace('M', 'm');
    const depTime  = seg.departure.at.slice(11, 16);
    const arrTime  = seg.arrival.at.slice(11, 16);
    const stops    = offer.itineraries[0].segments.length - 1;

    return {
      airline, carrier, price, currency, duration,
      depTime, arrTime, stops,
      from: seg.departure.iataCode,
      to:   seg.arrival.iataCode,
      destCity: destAirport.city,
      bookUrl: airline.url,
      googleFlightsUrl: `https://www.google.com/flights?q=flights+from+${seg.departure.iataCode}+to+${seg.arrival.iataCode}`
    };
  });
}
function renderFlightsTab(container, destinationCountry) {
  const destAirport = COUNTRY_AIRPORTS[destinationCountry];

  container.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
        <div>
          <div style="font-family:'Unbounded',sans-serif;font-size:15px;color:var(--text)">
            Flights to ${destinationCountry}
          </div>
          <div style="font-size:8px;letter-spacing:2px;color:var(--muted);margin-top:4px">
            FROM ${CONFIG.DEFAULT_ORIGIN_AIRPORT} · CHEAPEST IN NEXT 14 DAYS
          </div>
        </div>
        <div class="live-pill"><div class="live-dot"></div>AMADEUS API</div>
      </div>

      ${!destAirport ? `
        <div class="no-content">
          <div class="nc-icon"></div>
          <p>No flight data for ${destinationCountry} yet.</p>
        </div>
      ` : CONFIG.AMADEUS_API_KEY === 'YOUR_AMADEUS_API_KEY_HERE' ? `
        <!-- DEMO MODE — shown when no API key is set -->
        ${renderDemoFlights(destinationCountry, destAirport)}
        <div style="background:rgba(255,107,53,0.08);border:1px solid rgba(255,107,53,0.25);border-radius:12px;padding:16px;font-size:9px;color:var(--accent);letter-spacing:1px;line-height:2">
        </div>
      ` : `
        <div id="flights-loading" class="loading"><div class="spin"></div><p>SEARCHING FLIGHTS...</p></div>
      `}
    </div>`;

  if (destAirport && CONFIG.AMADEUS_API_KEY !== '650bd3cb3df04cca920b1e6039fa9e3c') {
    searchFlights(destinationCountry).then(flights => {
      const loadEl = container.querySelector('#flights-loading');
      if (loadEl) {
        loadEl.outerHTML = flights.map(f => flightCardHTML(f)).join('');
      }
    }).catch(err => {
      const loadEl = container.querySelector('#flights-loading');
      if (loadEl) loadEl.outerHTML = `
        <div class="errc"><p> ${err.message}</p></div>`;
    });
  }
}

function renderDemoFlights(country, airport) {
  const demos = [
    { airline: AIRLINE_INFO['FR'], price: '24.99', currency: 'EUR', duration: '2h 15m', depTime: '06:25', arrTime: '08:40', stops: 0, from: CONFIG.DEFAULT_ORIGIN_AIRPORT, to: airport.iata, destCity: airport.city, bookUrl: 'https://www.ryanair.com', googleFlightsUrl: '#' },
    { airline: AIRLINE_INFO['U2'], price: '39.90', currency: 'EUR', duration: '2h 20m', depTime: '10:50', arrTime: '13:10', stops: 0, from: CONFIG.DEFAULT_ORIGIN_AIRPORT, to: airport.iata, destCity: airport.city, bookUrl: 'https://www.easyjet.com', googleFlightsUrl: '#' },
    { airline: AIRLINE_INFO['EI'], price: '67.00', currency: 'EUR', duration: '2h 05m', depTime: '14:15', arrTime: '16:20', stops: 0, from: CONFIG.DEFAULT_ORIGIN_AIRPORT, to: airport.iata, destCity: airport.city, bookUrl: 'https://www.aerlingus.com', googleFlightsUrl: '#' },
  ];
  return demos.map(f => flightCardHTML(f)).join('');
}

function flightCardHTML(f) {
  return `
    <div style="
      background:rgba(0,20,50,0.75);
      border:1px solid rgba(0,180,230,0.15);
      border-radius:14px;
      padding:16px 18px;
      display:flex;align-items:center;gap:14px;
      transition:all .2s;
      cursor:pointer;
    "
    onmouseover="this.style.borderColor='rgba(0,200,255,0.35)';this.style.transform='translateY(-2px)'"
    onmouseout="this.style.borderColor='rgba(0,180,230,0.15)';this.style.transform=''"
    >
      <!-- Airline logo/colour strip -->
      <div style="
        width:4px;height:60px;border-radius:4px;
        background:${f.airline.color};flex-shrink:0;
        box-shadow:0 0 10px ${f.airline.color}55;
      "></div>

      <!-- Airline name -->
      <div style="min-width:90px">
        <div style="font-size:9px;letter-spacing:1px;color:var(--muted)">AIRLINE</div>
        <div style="font-family:'Unbounded',sans-serif;font-size:11px;font-weight:700;color:var(--text);margin-top:3px">${f.airline.logo} ${f.airline.name}</div>
        <div style="font-size:8px;color:var(--muted);margin-top:2px">${f.stops === 0 ? 'Non-stop' : ` ${f.stops} stop`}</div>
      </div>

      <!-- Route + times -->
      <div style="flex:1;text-align:center">
        <div style="display:flex;align-items:center;justify-content:center;gap:8px">
          <div>
            <div style="font-family:'Unbounded',sans-serif;font-size:16px;font-weight:700">${f.depTime}</div>
            <div style="font-size:8px;color:var(--muted)">${f.from}</div>
          </div>
          <div style="color:var(--muted);font-size:10px">──✈──</div>
          <div>
            <div style="font-family:'Unbounded',sans-serif;font-size:16px;font-weight:700">${f.arrTime}</div>
            <div style="font-size:8px;color:var(--muted)">${f.to}</div>
          </div>
        </div>
        <div style="font-size:8px;color:var(--muted);margin-top:4px">⏱ ${f.duration}</div>
      </div>

      <!-- Book buttons — no price shown -->
      <div style="text-align:right;min-width:110px">
        <div style="font-size:7px;letter-spacing:2px;color:var(--muted);margin-bottom:6px">BOOK VIA</div>
        <a href="${f.bookUrl}" target="_blank"
           style="display:block;padding:7px 10px;
           background:linear-gradient(135deg,var(--glow2),var(--glow));
           border-radius:100px;color:#03070f;font-size:8px;font-weight:700;
           letter-spacing:1px;text-decoration:none;text-align:center;transition:all .2s"
           onmouseover="this.style.transform='scale(1.05)'"
           onmouseout="this.style.transform=''">
          ${f.airline.name} →
        </a>
        <a href="https://www.google.com/flights" target="_blank"
           style="display:block;margin-top:5px;padding:6px 10px;
           background:rgba(0,200,255,0.08);border:1px solid rgba(0,200,255,0.2);
           border-radius:100px;color:var(--glow);font-size:8px;
           letter-spacing:1px;text-decoration:none;text-align:center;transition:all .2s"
           onmouseover="this.style.background='rgba(0,200,255,0.15)'"
           onmouseout="this.style.background='rgba(0,200,255,0.08)'">
          Google Flights →
        </a>
        <a href="https://www.skyscanner.com" target="_blank"
           style="display:block;margin-top:5px;font-size:7px;color:var(--muted);
           text-decoration:none;letter-spacing:1px;text-align:center">
          Skyscanner →
        </a>
      </div>
    </div>`;
}
