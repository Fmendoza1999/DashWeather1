const DEMO_VIDEOS = {
  "Ireland":        ["YM4c3NL5bJE","bJ0G3V-U3k4","nLNIe6YHBFI"],
  "United Kingdom": ["mT3RKrEIoRM","Ixb3M9fDDLE","eqHLzwlJ3SM"],
  "France":         ["SBcMpMVDtJI","9VWGAoxFTQU","e1P0WIMlMk0"],
  "Germany":        ["J6_0i8BFhRs","0VHFjYgCOX4","lCmQWM-nqOA"],
  "Italy":          ["_Cv_AYVQ_Bc","4-HKLO-VCNU","vIOMqBnrVmo"],
  "Spain":          ["wHxYQliqxlI","3-fgJakuxgI","I9lTDNuVF5k"],
  "Japan":          ["WoHRjbQ-r60","UMGrDWbRoQA","d0HMZxF1MiU"],
  "Australia":      ["gZ14HUP4w04","3MRrLMd3e3g","bkExMhKajn0"],
  "United States":  ["XGHEzXXMFoc","UmRWHqE-7bY","j2S_LBe1-Y0"],
  "Brazil":         ["S33jIiCHZLI","JVTFGPi7_5I","WbHxlkCOSw4"],
  "India":          ["gCv6psf-oNQ","gBCo8B2p4_Q","6yK8xqVpB9w"],
  "South Africa":   ["Vc3jdw3xFB4","8ZTjMVU1oXk","BQ3P7e5mhVw"],
  "China":          ["1Wj0cqTIQ8c","DVv-5Wf8U2Q","V2mkpOamMnM"],
  "Thailand":       ["oEJc2e6S0lE","k6QMTQAL0gY","5l-QZuqBcRU"],
  "UAE":            ["SZvBHpq6P8o","9dJySMv4VOM","k3IkMEz1Gu4"],
  "Greece":         ["S7sVdBgBxDY","t5T5udYOKE0","8pUmMFBYnYM"],
  "Portugal":       ["gZdLlzKrm6s","OaIBIFSsL6Q","y7hIfkEkXAs"],
  "Netherlands":    ["UGCe1M5KQHM","MQlCz0h9qcI","8UmJYSPFQk8"],
  "Morocco":        ["1iSY4tRAVUs","RGOHZnH5cRo","tVnL0FQ4VzU"],
  "Turkey":         ["eVfJb8LCGZ8","IYr5B7PeHFg","fLpInBxMlC4"],
};
const FALLBACK = ["YkzEnTMDMco","8g6bJqNvOec","3C5q8YdOBfg"];

async function fetchTravelVideos(countryName) {
  const noKey = CONFIG.YOUTUBE_KEY === 'YOUR_YOUTUBE_API_KEY_HERE';

  if (noKey) {
    const ids = DEMO_VIDEOS[countryName] || FALLBACK;
    return ids.map(id => ({
      id, demo: true,
      title:     `${countryName} — Travel Guide`,
      channel:   'Travel Channel',
      thumbnail: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
      url:       `https://www.youtube.com/watch?v=${id}`
    }));
  }

  const q   = encodeURIComponent(`${countryName} travel guide 4K`);
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=video&maxResults=${CONFIG.MAX_VIDEO_RESULTS}&order=relevance&key=${CONFIG.YOUTUBE_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('YouTube API error ' + res.status);
  const data = await res.json();
  return (data.items || []).map(item => ({
    id:        item.id.videoId,
    title:     item.snippet.title,
    channel:   item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium?.url || `https://img.youtube.com/vi/${item.id.videoId}/mqdefault.jpg`,
    url:       `https://www.youtube.com/watch?v=${item.id.videoId}`,
    demo:      false
  }));
}

async function renderVideosTab(container, country) {
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
        <div>
          <div style="font-family:'Unbounded',sans-serif;font-size:14px;color:var(--text)">🎥 Travel Videos — ${country.n}</div>
          <div style="font-size:8px;letter-spacing:2px;color:var(--muted);margin-top:4px">CLICK THUMBNAIL TO PLAY INLINE</div>
        </div>
        <div class="live-pill"><div class="live-dot"></div>YOUTUBE</div>
      </div>
      <div id="vid-list" class="loading"><div class="spin"></div><p>LOADING VIDEOS...</p></div>
    </div>`;

  try {
    const videos = await fetchTravelVideos(country.n);
    const list   = container.querySelector('#vid-list');
    if (!videos.length) {
      list.outerHTML = `<div class="no-content"><div class="nc-icon">🎥</div><p>No videos found for ${country.n}.</p></div>`;
      return;
    }

    list.className = '';
    list.style.cssText = 'display:flex;flex-direction:column;gap:14px';
    list.innerHTML = videos.map((v, i) => `
      <div style="background:rgba(0,20,50,0.7);border:1px solid rgba(0,180,230,0.12);border-radius:14px;overflow:hidden;transition:border-color .3s"
           onmouseover="this.style.borderColor='rgba(0,200,255,0.3)'" onmouseout="this.style.borderColor='rgba(0,180,230,0.12)'">
        <!-- Thumbnail (click to play) -->
        <div id="vt-${i}" style="position:relative;cursor:pointer;overflow:hidden;padding-bottom:56.25%;height:0" onclick="playVideo('${v.id}',${i})">
          <img src="${v.thumbnail}" alt="${v.title}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .4s"
               onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.3)">
            <div style="width:56px;height:56px;border-radius:50%;background:rgba(255,0,0,0.85);display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 0 25px rgba(255,0,0,0.5);transition:transform .2s"
                 onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">▶</div>
          </div>
          ${v.demo ? `<div style="position:absolute;top:10px;right:10px;background:rgba(255,107,53,0.85);border-radius:100px;padding:2px 8px;font-size:7px;letter-spacing:2px;color:#fff">DEMO</div>` : ''}
        </div>
        <!-- Embed (hidden until play) -->
        <div id="ve-${i}" style="display:none;position:relative;padding-bottom:56.25%;height:0"></div>
        <!-- Info row -->
        <div style="padding:10px 14px;display:flex;align-items:center;justify-content:space-between;gap:10px">
          <div style="flex:1;min-width:0">
            <div style="font-family:'Unbounded',sans-serif;font-size:11px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${v.title}</div>
            <div style="font-size:8px;color:var(--muted);letter-spacing:1px;margin-top:3px">📺 ${v.channel}</div>
          </div>
          <a href="${v.url}" target="_blank" style="flex-shrink:0;padding:6px 12px;background:rgba(255,0,0,0.15);border:1px solid rgba(255,0,0,0.3);border-radius:100px;color:#ff4444;font-size:8px;letter-spacing:1px;text-decoration:none;white-space:nowrap;transition:background .2s"
             onmouseover="this.style.background='rgba(255,0,0,0.25)'" onmouseout="this.style.background='rgba(255,0,0,0.15)'">▶ YOUTUBE</a>
        </div>
      </div>`).join('');

    if (videos[0]?.demo) {
      list.insertAdjacentHTML('beforeend', `
        <div style="background:rgba(255,107,53,0.08);border:1px solid rgba(255,107,53,0.25);border-radius:12px;padding:14px 16px;font-size:9px;color:var(--accent);letter-spacing:1px;line-height:2">
          ⚠️ DEMO MODE — Add your free YouTube API key to <code>js/config.js</code> for live results.<br>
          <a href="https://console.cloud.google.com" target="_blank" style="color:var(--glow)">→ console.cloud.google.com (free)</a>
        </div>`);
    }

  } catch(e) {
    container.querySelector('#vid-list').outerHTML = `<div class="errc"><p>🎥 ${e.message}</p></div>`;
  }
}

function playVideo(id, i) {
  document.getElementById(`vt-${i}`).style.display = 'none';
  const embed = document.getElementById(`ve-${i}`);
  embed.style.display = 'block';
  embed.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1"
    style="position:absolute;inset:0;width:100%;height:100%;border:none"
    allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>`;
}
