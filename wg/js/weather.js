const DAYS = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

function owmEmoji(icon) {
  const m = {
    '01d':'☀️','01n':'🌙','02d':'🌤️','02n':'🌤️',
    '03d':'⛅','03n':'⛅','04d':'☁️','04n':'☁️',
    '09d':'🌧️','09n':'🌧️','10d':'🌦️','10n':'🌦️',
    '11d':'⛈️','11n':'⛈️','13d':'❄️','13n':'❄️',
    '50d':'🌫️','50n':'🌫️'
  };
  return m[icon] || '🌡️';
}

function degToDir(d) {
  return ['N','NE','E','SE','S','SW','W','NW'][Math.round(d / 45) % 8];
}

async function fetchWeatherData(lat, lon) {
  const KEY = CONFIG.OWM_KEY;
  const [curRes, forRes] = await Promise.all([
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`),
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric&cnt=40`)
  ]);
  if (!curRes.ok) throw new Error('Weather API error ' + curRes.status);

  const cur  = await curRes.json();
  const fore = await forRes.json();

  const dayMap = {};
  for (const item of fore.list) {
    const dt   = new Date(item.dt * 1000);
    const key  = dt.toISOString().slice(0, 10);
    const hour = dt.getUTCHours();
    if (!dayMap[key] || Math.abs(hour - 12) < Math.abs(new Date(dayMap[key].dt * 1000).getUTCHours() - 12))
      dayMap[key] = item;
  }

  const forecast = Object.values(dayMap).slice(1, 6).map(item => {
    const dt = new Date(item.dt * 1000);
    return {
      day:       DAYS[dt.getDay()],
      icon:      owmEmoji(item.weather[0].icon),
      high:      Math.round(item.main.temp_max),
      low:       Math.round(item.main.temp_min),
      condition: item.weather[0].main
    };
  });

  return {
    city:          cur.name,
    temp_c:        Math.round(cur.main.temp),
    feels_like:    Math.round(cur.main.feels_like),
    humidity:      cur.main.humidity,
    wind_kmh:      Math.round(cur.wind.speed * 3.6),
    wind_dir:      degToDir(cur.wind.deg || 0),
    pressure_hpa:  cur.main.pressure,
    condition:     cur.weather[0].main,
    icon:          owmEmoji(cur.weather[0].icon),
    visibility_km: Math.round((cur.visibility || 0) / 1000),
    forecast
  };
}

async function getWeather() {
  if (!selC) { flashPill(); return; }
  const panel = document.getElementById('panel');
  panel.innerHTML = `<div class="slbl">// fetching</div><div class="loading"><div class="spin"></div><p>LOADING WEATHER...</p></div>`;
  try {
    const w  = await fetchWeatherData(selC.la, selC.lo);
    const fc = w.forecast.map(d => `
      <div class="fd">
        <div class="fdd">${d.day}</div>
        <div class="fdi">${d.icon}</div>
        <div class="fdt">${d.high}°</div>
        <div class="fdl">${d.low}°</div>
      </div>`).join('');
    panel.innerHTML = `
      <div class="slbl">// current weather</div>
      <div class="main-card">
        <div class="wico">${w.icon}</div>
        <div class="wtemp">${w.temp_c}°<span style="font-size:26px;font-weight:300">C</span></div>
        <div class="wdesc">${w.condition}</div>
        <div class="wcity">${w.city}, ${selC.n}</div>
        <div class="wflag">${selC.f}</div>
      </div>
      <div class="ai-badge"><div class="ai-dot"></div>OPENWEATHERMAP API</div>
      <div class="slbl">// conditions</div>
      <div class="sgrid">
        <div class="scard"><div class="slb">Feels Like</div><div class="svl">${w.feels_like}<span class="sun">°C</span></div></div>
        <div class="scard"><div class="slb">Humidity</div><div class="svl">${w.humidity}<span class="sun">%</span></div></div>
        <div class="scard"><div class="slb">Wind</div><div class="svl">${w.wind_kmh}<span class="sun"> km/h ${w.wind_dir}</span></div></div>
        <div class="scard"><div class="slb">Pressure</div><div class="svl">${w.pressure_hpa}<span class="sun"> hPa</span></div></div>
        <div class="scard"><div class="slb">UV Index</div><div class="svl">—<span class="sun"> /11</span></div></div>
        <div class="scard"><div class="slb">Visibility</div><div class="svl">${w.visibility_km}<span class="sun"> km</span></div></div>
      </div>
      <div class="slbl">// 5-day forecast</div>
      <div class="frow">${fc}</div>`;
  } catch(e) {
    panel.innerHTML = `<div class="slbl">// error</div><div class="errc"><p>⚠ ${e.message}</p></div>`;
  }
}

function flashPill() {
  const el = document.getElementById('selLbl');
  el.textContent = '⚠ Select a country first!';
  el.style.color = '#ff4444';
  setTimeout(() => {
    el.textContent = '↻ rotate & click a country';
    el.style.color = '';
    el.className   = 'sel-lbl ph';
  }, 2000);
}
