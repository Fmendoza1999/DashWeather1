function getCountryDoll(countryName, flag) {
  return `<div style="
    width:64px;height:64px;border-radius:50%;
    background:rgba(0,20,50,0.8);
    border:2px solid rgba(0,200,255,0.3);
    display:flex;align-items:center;justify-content:center;
    font-size:36px;line-height:1;
    box-shadow:0 0 20px rgba(0,200,255,0.2)">${flag || ''}</div>`;
}
const NEWS_API_KEY = '650bd3cb3df04cca920b1e6039fa9e3c';

async function getCountryNews(countryName, containerEl) {
  if (!containerEl) return;
  containerEl.innerHTML = `<div style="text-align:center;padding:20px;color:var(--muted);font-size:10px;letter-spacing:1px"> LOADING NEWS...</div>`;

  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(countryName)}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${NEWS_API_KEY}`
    );
    const data = await res.json();
    if (!data.articles || !data.articles.length) throw new Error('no articles');

    containerEl.innerHTML = data.articles.map((a, i) => `
      <a href="${a.url}" target="_blank" rel="noopener" class="news-card"
         style="animation-delay:${i * 0.07}s;text-decoration:none;display:block">
        <div class="news-header">
          <span class="news-emoji"></span>
          <div class="news-preview">
            <div class="news-headline">${(a.title || '').replace(/<[^>]+>/g, '').split(' - ')[0]}</div>
            <div class="news-source">${a.source?.name || 'News'} · ${new Date(a.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
          </div>
          <span style="font-size:11px;color:var(--glow);flex-shrink:0">↗</span>
        </div>
        ${a.description ? `<div class="news-body">${a.description.replace(/<[^>]+>/g, '')}</div>` : ''}
      </a>`).join('');

  } catch (e) {
    containerEl.innerHTML = `
      <div class="news-card" style="opacity:0.6">
        <div class="news-header">
          <span class="news-emoji">🌍</span>
          <div class="news-preview">
            <div class="news-headline">Explore ${countryName}</div>
            <div class="news-source">Check Cities, Map &amp; Weather tabs for more</div>
          </div>
        </div>
      </div>`;
  }
}
const CULTURE_DATA = {

  "Ireland": {
    mascot:"", greeting:"Céad Míle Fáilte!", greetingMeaning:"A hundred thousand welcomes!",
    tagline:"Land of saints, scholars & wild Atlantic coastline",
    weatherContext:{climate:"Temperate oceanic — mild, wet, changeable",avgSummer:"☀️ 18°C",avgWinter:" 7°C",rainyDays:"🌧 ~150 days/year",bestTime:"🗓 May – September",tip:"☔ Always pack a light rain jacket — Irish weather can change every 20 minutes!"},
    facts:[
      {emoji:"",title:"Halloween Was Irish!",body:"The Celts celebrated Samhain 2,000+ years ago on Oct 31st — when spirits could roam. Irish immigrants brought it to America in the 1840s famine. The carved turnip became a pumpkin when they arrived."},
      {emoji:"",title:"The World's Longest Pub Lease",body:"In 1759, Arthur Guinness signed a 9,000-year lease at £45/year. The lease runs until 10,759! Today the brewery produces 1.8 billion pints annually."},
      {emoji:"",title:"Zero Snakes — Really!",body:"Ireland has no native snakes. Ice covered the island until 10,000 years ago — snakes never migrated back before rising seas cut the land bridge. St Patrick's legend came later to explain a geological fact!"},
      {emoji:"",title:"Bloomsday — The World's Most Famous Single Day",body:"James Joyce's Ulysses follows Leopold Bloom through June 16, 1904. That date is now celebrated globally — people dress in Edwardian clothes and retrace his exact footsteps through Dublin."},
      {emoji:"",title:"Pub Sessions Anyone Can Join",body:"Traditional Irish music sessions (seisiúns) happen spontaneously in pubs nightly. No stage, no tickets — just musicians in a corner. Anyone with a fiddle or tin whistle can join."},
    ],
    game:{
      title:" Ireland — How much do you actually know?",
      questions:[
        {q:"You're at a Dublin pub and musicians start playing with no announcement. What's happening?",a:["A ticketed concert","A seisiún — spontaneous traditional session","A rehearsal","A protest song"],correct:1,explain:"A seisiún is an informal gathering of traditional musicians. Zero tickets. Anyone with an instrument can pull up a chair. Pure Irish magic."},
        {q:"In 1759, Arthur Guinness signed his brewery lease for how long?",a:["100 years","500 years","9,000 years","Forever"],correct:2,explain:"At £45/year, the lease runs until the year 10,759! Still producing 1.8 billion pints annually."},
        {q:"Why does Ireland have ZERO native snakes?",a:["St Patrick banished them","They died out in the Ice Age and couldn't return before the land bridge flooded","They migrated to the UK","The climate is too cold"],correct:1,explain:"Ireland was glaciated until ~10,000 years ago. Snakes never had time to repopulate before rising seas cut Ireland off. The St Patrick story explained a real geological fact!"},
        {q:"June 16th is 'Bloomsday'. What must you do to celebrate properly?",a:["Drink Guinness all day","Dress in Edwardian clothes & retrace Leopold Bloom's walk through Dublin","Attend a trad session","Wear green"],correct:1,explain:"James Joyce's Ulysses is set on June 16, 1904. Every year, thousands worldwide dress as Edwardian Dubliners and retrace Bloom's footsteps through the city."},
      ]
    },
    cities:[
      {name:"Dublin",photo:"https://images.unsplash.com/photo-1549918864-48ac978761a4?w=600&q=80",desc:"Ireland's lively capital — Trinity College, Temple Bar nightlife, the Guinness Storehouse and Georgian squares.",population:"1.4 million",tags:["Capital","Culture","Nightlife","History"],bestFor:"City breaks, history, legendary pub culture",lat:53.349,lon:-6.260},
      {name:"Cork",photo:"https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=600&q=80",desc:"Ireland's rebel city — the English Market, Shandon bells, and a buzzing food scene.",population:"215,000",tags:["Food","Culture","Rebel City","Markets"],bestFor:"Food lovers, laid-back city vibe",lat:51.898,lon:-8.470},
      {name:"Galway",photo:"https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&q=80",desc:"Bohemian capital of the West — street performers, trad music in every pub, gateway to wild Connemara.",population:"82,000",tags:["Arts","Festival","Atlantic","Wild West"],bestFor:"Music, festivals, Connemara day trips",lat:53.274,lon:-9.049},
      {name:"Killarney",photo:"https://images.unsplash.com/photo-1564415315949-7a0c4c073d3a?w=600&q=80",desc:"Gateway to the Ring of Kerry — glacial lakes, ancient oak forests and Ireland's highest mountains.",population:"14,000",tags:["Nature","Lakes","Mountains","Ring of Kerry"],bestFor:"Hiking, cycling, scenic Ring of Kerry drive",lat:52.058,lon:-9.504},
      {name:"Cliffs of Moher",photo:"https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=600&q=80",desc:"Dramatic 214-metre sea cliffs stretching 8km along the Wild Atlantic Way.",population:"Attraction",tags:["Cliffs","UNESCO","Atlantic","Wild West"],bestFor:"Dramatic views, photography, coastal walks",lat:52.972,lon:-9.426},
      {name:"Dingle",photo:"https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=600&q=80",desc:"Ireland's most westerly town — Irish-speaking, colourful pubs, stunning Slea Head drive.",population:"1,900",tags:["Gaeltacht","Peninsula","Scenic","Authentic"],bestFor:"Rugged scenery, authentic Irish culture",lat:52.141,lon:-10.269},
      {name:"Waterford",photo:"https://images.unsplash.com/photo-1590945399528-bf7e5c56c0d1?w=600&q=80",desc:"Ireland's oldest city, founded by Vikings in 914 AD — Waterford Crystal, medieval Viking Triangle.",population:"53,000",tags:["Viking","Crystal","Medieval","History"],bestFor:"Viking history, crystal shopping, historic walls",lat:52.260,lon:-7.110},
      {name:"Limerick",photo:"https://images.unsplash.com/photo-1590945399528-bf7e5c56c0d1?w=600&q=80",desc:"City of culture on the River Shannon — King John's Castle, the Hunt Museum, European Capital of Culture.",population:"94,000",tags:["Castle","Shannon","Culture","Rugby"],bestFor:"History, rugby fans, gateway to the Burren",lat:52.668,lon:-8.630},
    ],
    webcams:[
      {title:"Cliffs of Moher Live",img:"https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=640&q=80",location:"County Clare",link:"https://www.cliffsofmoher.ie/visit/webcam/"},
      {title:"O'Connell Street, Dublin",img:"https://images.unsplash.com/photo-1549918864-48ac978761a4?w=640&q=80",location:"Dublin City Centre",link:"https://www.windy.com/webcams/ireland"},
    ]
  },

  "United Kingdom": {
    mascot:"", greeting:"Cheerio!", greetingMeaning:"The quintessential British hello!",
    tagline:"Where tea, Shakespeare, double-deckers and drizzle collide",
    weatherContext:{climate:"Temperate maritime — famously unpredictable",avgSummer:"☀️ 20°C",avgWinter:" 5°C",rainyDays:"🌧 ~150 days/year",bestTime:"🗓 June – August",tip:"☔ Bring an umbrella even if it says sunny — this is Britain."},
    facts:[
      {emoji:"",title:"Britain's Tea Obsession Is Very Recent",body:"Tea became popular only in the 1660s when Charles II's wife brought it from Portugal. Before tea, the British mostly drank beer — including at breakfast. Tea was initially so expensive only the wealthy could afford it."},
      {emoji:"",title:"Shakespeare Invented Words We Use Daily",body:"Over 1,700 English words appear first in Shakespeare's plays — including 'bedroom', 'generous', 'obscene', 'lonely', 'negotiate' and 'eyeball'. Next time you say 'bedazzled', thank him."},
      {emoji:"",title:"The Tower's Ravens Must Stay Or The Kingdom Falls",body:"Six ravens must be kept at the Tower of London by royal decree. If they leave, the Kingdom will fall. Each raven has a name, a Ravenmaster, and is technically a member of the armed forces."},
      {emoji:"",title:"The World's First Postage Stamp",body:"Britain invented the first adhesive stamp in 1840 (the Penny Black). Before this, recipients paid on delivery — meaning you could refuse letters you didn't want, leaving the sender out of pocket."},
    ],
    game:{
      title:"🇬🇧 British Culture — Fancy a quiz?",
      questions:[
        {q:"By royal decree, how many ravens must always be at the Tower of London?",a:["1 raven","3 ravens","6 ravens","12 ravens"],correct:2,explain:"Six ravens (plus two spares for illness!) by royal decree. Each has a name and rank in the armed forces. Legend says if they leave, the Crown will fall."},
        {q:"Before tea became popular, what did the British mostly drink at breakfast?",a:["Coffee","Water","Milk","Beer"],correct:3,explain:"Until the 1660s, beer was the safe drink because water was often contaminated. Even children drank 'small beer'. Tea only arrived when Charles II's Portuguese wife brought her habit."},
        {q:"Which everyday word did Shakespeare NOT invent?",a:["Bedroom","Eyeball","Generous","Sandwich"],correct:3,explain:"Sandwich was named after the 4th Earl of Sandwich in 1762 — a century after Shakespeare. But Shakespeare really did invent 'bedroom', 'eyeball', 'generous', 'lonely' and over 1,700 more words."},
        {q:"Who originally paid for a letter before the Penny Black stamp?",a:["The sender","The Royal Mail","The King","The recipient — on delivery"],correct:3,explain:"Before 1840, recipients paid varying rates on delivery. You could refuse letters you didn't want! The stamp system fixed this by making senders pre-pay."},
      ]
    },
    cities:[
      {name:"London",photo:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",desc:"One of the world's greatest cities — Big Ben, Tower of London, Notting Hill, Tate Modern, West End theatre and 300 languages.",population:"9 million",tags:["Capital","Culture","Theatre","Diversity"],bestFor:"World-class museums, theatre, history",lat:51.507,lon:-0.128},
      {name:"Edinburgh",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80",desc:"Scotland's dramatic capital — medieval Old Town, a castle on volcanic rock, Arthur's Seat and the world's most famous arts festival.",population:"540,000",tags:["Castle","Arts Festival","UNESCO","Scotland"],bestFor:"History, dramatic scenery, the August Festival",lat:55.953,lon:-3.189},
      {name:"Bath",photo:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",desc:"England's most elegant city — Roman baths built 2,000 years ago, Georgian honey-stone architecture and Jane Austen connections.",population:"94,000",tags:["Roman","UNESCO","Georgian","Jane Austen"],bestFor:"History, architecture, a very civilised weekend",lat:51.381,lon:-2.360},
      {name:"Oxford",photo:"https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=600&q=80",desc:"City of Dreaming Spires — world's oldest university, the Bodleian Library, pubs frequented by Tolkien and C.S. Lewis.",population:"157,000",tags:["University","History","Harry Potter","Tolkien"],bestFor:"Academia, Harry Potter locations, punting",lat:51.752,lon:-1.257},
      {name:"Liverpool",photo:"https://images.unsplash.com/photo-1594904351111-a072f80b1a71?w=600&q=80",desc:"The city that gave the world The Beatles — incredible waterfront, world-famous football clubs and a UNESCO waterfront.",population:"496,000",tags:["Beatles","Football","UNESCO","Music"],bestFor:"Beatles pilgrimage, football, waterfront",lat:53.408,lon:-2.991},
      {name:"Cotswolds",photo:"https://images.unsplash.com/photo-1529936088-89e77b46e8c7?w=600&q=80",desc:"England's most picturesque region — honey-coloured limestone villages, thatched cottages and rolling hills.",population:"~100,000",tags:["Villages","Countryside","Thatched Roofs","Idyllic"],bestFor:"The quintessential English countryside experience",lat:51.840,lon:-1.790},
      {name:"Manchester",photo:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",desc:"The original industrial city reinvented — world-famous football, a thriving music scene and outstanding curry mile.",population:"553,000",tags:["Football","Music","Industrial","Curry Mile"],bestFor:"Football, music, buzzing nightlife",lat:53.483,lon:-2.244},
      {name:"Glasgow",photo:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80",desc:"Scotland's largest city — world-class free museums, stunning Charles Rennie Mackintosh architecture and Scotland's friendliest people.",population:"635,000",tags:["Scotland","Free Museums","Architecture","Friendly"],bestFor:"Free museums, architecture, Scottish humour",lat:55.864,lon:-4.252},
    ],
    webcams:[
      {title:"Big Ben & Westminster",img:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=640&q=80",location:"London",link:"https://www.windy.com/webcams/united-kingdom"},
      {title:"Edinburgh Castle",img:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=640&q=80",location:"Edinburgh, Scotland",link:"https://www.windy.com/webcams/united-kingdom"},
    ]
  },

  "France": {
    mascot:"", greeting:"Bonjour!", greetingMeaning:"Good day!",
    tagline:"Liberté, Égalité, Fraternité — and 1,200 types of cheese",
    weatherContext:{climate:"Varied — oceanic north, continental east, Mediterranean south",avgSummer:" 25°C Paris / 30°C Nice",avgWinter:"❄️ 5°C Paris / 12°C Nice",rainyDays:"🌧 ~111 days/year (Paris)",bestTime:"🗓 April–June or September–October",tip:"🍷 Visit the South in September — beach weather, no crowds, and grape harvest season!"},
    facts:[
      {emoji:"",title:"The Eiffel Tower Was Supposed to Be Demolished",body:"Built for the 1889 World's Fair, it was designed as a temporary structure to be torn down after 20 years. It was saved purely because its height made it a brilliant radio antenna. It also grows 15cm taller in summer as the iron expands."},
      {emoji:"",title:"Baguettes Are Protected By Law",body:"A genuine 'baguette de tradition française' must be made by hand on the premises and sold the same day. Freezing or pre-baking is illegal. France takes its bread so seriously that bakers must notify authorities before going on holiday."},
      {emoji:"",title:"France Eats 40,000 Tonnes of Snails Every Year",body:"France is the world's largest consumer of snails (escargots) — roughly 600 million per year, about 9 per person. They're considered a delicacy, usually served with garlic butter. Most are now imported because France can't farm enough of its own."},
      {emoji:"",title:"The Cheese Governance Problem",body:"Charles de Gaulle once asked: 'How can anyone govern a nation that has 246 varieties of cheese?' Today France has over 1,200. There are entire shops, sommelier courses and university degrees dedicated solely to French cheese."},
    ],
    game:{
      title:" France — sacré bleu, do you know us?",
      questions:[
        {q:"The Eiffel Tower wasn't supposed to still be standing. What saved it from demolition in 1909?",a:["The public loved it","It became a world symbol","Its height made it a perfect radio antenna","Napoleon III said to keep it"],correct:2,explain:"Genuinely scheduled for demolition 20 years after the 1889 World's Fair. It survived only because its 330m height made it ideal for wireless telegraph transmissions."},
        {q:"How much taller does the Eiffel Tower get in summer?",a:["3 cm","8 cm","15 cm — about the length of your hand","40 cm"],correct:2,explain:"Iron expands with heat. The temperature varies by ~40°C across seasons, causing the structure to expand by up to 15cm in summer. It also leans slightly away from the sun on hot days."},
        {q:"French law bans something specific about baguettes. What?",a:["Selling them after 7pm","Adding too much salt","Freezing or pre-baking them","Making them longer than 80cm"],correct:2,explain:"The 1993 'bread decree' says a 'baguette de tradition française' must be made on-site, by hand, from basic ingredients, and sold the same day."},
        {q:"Which city is considered the gastronomic capital of France — beating even Paris?",a:["Bordeaux","Marseille","Lyon","Strasbourg"],correct:2,explain:"Lyon is often called the gastronomic capital of the world. It has more Michelin-starred restaurants per capita than anywhere else. The legendary Paul Bocuse spent his whole career here."},
      ]
    },
    cities:[
      {name:"Paris",photo:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",desc:"La Ville Lumière — the Eiffel Tower, the Louvre, Montmartre's cobbled streets, world-class cafés and the most romantic bridges in Europe.",population:"11 million",tags:["Capital","Romance","Art","Fashion","Cuisine"],bestFor:"First-time visitors, art lovers, romantics",lat:48.856,lon:2.352},
      {name:"Nice",photo:"https://images.unsplash.com/photo-1491166617655-0723a0462ef0?w=600&q=80",desc:"Jewel of the Côte d'Azur — the azure Mediterranean, the Promenade des Anglais, Vieux-Nice old town and day trips to Monaco.",population:"340,000",tags:["Riviera","Beach","Mediterranean","Monaco"],bestFor:"Sun, sea, beautiful people, Monaco day trip",lat:43.710,lon:7.262},
      {name:"Lyon",photo:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",desc:"The gastronomic capital of the world — UNESCO-listed Vieux Lyon with Renaissance traboules (secret passages) and where the Lumière brothers invented cinema.",population:"518,000",tags:["Food","Cinema","UNESCO","Renaissance"],bestFor:"Best food in France, off the tourist trail",lat:45.764,lon:4.835},
      {name:"Bordeaux",photo:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",desc:"The world wine capital — 18th-century neoclassical architecture, the wine road to legendary châteaux and the Cité du Vin museum.",population:"257,000",tags:["Wine","Architecture","Châteaux","Cycling"],bestFor:"Wine lovers, architecture fans, cyclists",lat:44.837,lon:-0.579},
      {name:"Mont Saint-Michel",photo:"https://images.unsplash.com/photo-1566908829550-e6551b00979b?w=600&q=80",desc:"One of the world's most jaw-dropping sights — a medieval Gothic abbey perched on a tidal island in Normandy, rising from the sea twice a day.",population:"50 residents",tags:["UNESCO","Medieval","Tidal Island","Abbey"],bestFor:"Unforgettable photography, medieval history",lat:48.636,lon:-1.511},
      {name:"Versailles",photo:"https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?w=600&q=80",desc:"Louis XIV's astonishing palace — the Hall of Mirrors, 800 hectares of formal gardens and the spot where the Treaty of Versailles was signed in 1919.",population:"87,000",tags:["Palace","Gardens","Louis XIV","History"],bestFor:"Royal excess, gardens, the Hall of Mirrors",lat:48.805,lon:2.120},
      {name:"Marseille",photo:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",desc:"France's oldest city and most vibrant port — the Vieux-Port, bouillabaisse, the stunning Calanques national park and the most multicultural city in France.",population:"870,000",tags:["Port","Bouillabaisse","Calanques","Multicultural"],bestFor:"Seafood, dramatic coastal landscapes, real France",lat:43.296,lon:5.381},
      {name:"Strasbourg",photo:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",desc:"Where France meets Germany — a stunning medieval old town, the European Parliament, Alsatian tarte flambée and the most beautiful Christmas market in Europe.",population:"285,000",tags:["Alsace","Christmas Market","European Parliament","Medieval"],bestFor:"Christmas markets, European architecture, Alsatian food",lat:48.573,lon:7.752},
    ],
    webcams:[
      {title:"Eiffel Tower Panorama",img:"https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=640&q=80",location:"Champ de Mars, Paris",link:"https://www.windy.com/webcams/france"},
      {title:"Nice Promenade des Anglais",img:"https://images.unsplash.com/photo-1491166617655-0723a0462ef0?w=640&q=80",location:"Nice, Côte d'Azur",link:"https://www.windy.com/webcams/france"},
    ]
  },

  "Japan": {
    mascot:"", greeting:"いらっしゃいませ!", greetingMeaning:"Welcome! (Irasshaimase)",
    tagline:"Where 1,300-year-old temples stand next to robot restaurants",
    weatherContext:{climate:"Temperate — 4 very distinct seasons",avgSummer:"30°C (Tokyo)",avgWinter:" 5°C (Tokyo), snow in Hokkaido",rainyDays:"🌧 Rainy season (tsuyu) June–July",bestTime:" March–May cherry blossom /  Oct–Nov autumn leaves",tip:" Book 6 months ahead for cherry blossom — it sells out completely!"},
    facts:[
      {emoji:"",title:"The Train That Has Never Killed a Passenger",body:"Japan's Shinkansen bullet train has operated since 1964 — over 60 years — with zero passenger fatalities from derailment or collision. It runs at 320 km/h. The average annual delay is 54 seconds."},
      {emoji:"",title:"Cherry Blossom Season Is a National Event",body:"The government tracks the 'Sakura Front' northward progression like a weather forecast. Office workers take afternoons off. Blankets are laid under trees weeks in advance to reserve spots for hanami parties."},
      {emoji:"",title:"Japan Gave the World Its Gaming Industry",body:"Nintendo, Sony PlayStation, Pokémon, Super Mario, Zelda, Final Fantasy, Street Fighter, Pac-Man — nearly every icon of 1980-2000s gaming came from Japan. The Japanese video game industry is worth $20 billion annually."},
      {emoji:"",title:"Vending Machine Civilisation",body:"Japan has 5.5 million vending machines — one for every 23 people. They sell hot ramen, fresh flowers, umbrellas, beer, surgical masks, bait worms and neckties. In rural areas they help elderly who can't travel far."},
    ],
    game:{
      title:" Japan — test your knowledge!",
      questions:[
        {q:"Japan's Shinkansen has operated since 1964. How many passenger deaths from crashes in 60+ years?",a:["12 deaths","47 deaths","Zero — none at all","Statistics unavailable"],correct:2,explain:"Zero passenger fatalities from crash or derailment in over 60 years. Runs at 320 km/h. The average annual delay across the entire network is 54 seconds. The safest high-speed rail system ever built."},
        {q:"In Japan, 'hanami' is a centuries-old tradition. What is it?",a:["A martial arts ceremony","Gathering under cherry trees to view blossoms and eat & drink","A formal tea ceremony","A lantern festival"],correct:1,explain:"Hanami (花見) means 'flower viewing'. It dates to the 8th century when the Emperor held parties under cherry trees. People reserve spots weeks in advance. Companies cancel meetings for it."},
        {q:"Tokyo vs Paris in Michelin-starred restaurants?",a:["About the same","Slightly more","Double","More than Paris AND New York combined"],correct:3,explain:"Tokyo has over 230 Michelin-starred restaurants — more than Paris and New York combined. Japan as a whole has more starred restaurants than any other country."},
        {q:"Japanese vending machines sell hot ramen and bait worms. What do they NOT sell?",a:["Fresh flowers","Surgical face masks","Neckties","Live puppies"],correct:3,explain:"Japanese vending machines sell ramen, beer, umbrellas, flowers, bait worms, warm socks, surgical masks and neckties. But not live animals — though the variety is genuinely astonishing."},
      ]
    },
    cities:[
      {name:"Tokyo",photo:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",desc:"The world's largest metropolis — neon-lit Shinjuku, ancient Senso-ji in Asakusa, the Shibuya crossing and 13 Michelin stars in one street.",population:"37 million",tags:["Capital","Futuristic","Food","Temples","Anime"],bestFor:"Everything — the most stimulating city on Earth",lat:35.689,lon:139.692},
      {name:"Kyoto",photo:"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",desc:"Japan's ancient imperial capital — 1,600 Buddhist temples, 400 Shinto shrines, golden pavilions, geisha districts and bamboo groves.",population:"1.46 million",tags:["Temples","Geisha","Zen","UNESCO"],bestFor:"Traditional Japan, temples, cherry blossom",lat:35.011,lon:135.768},
      {name:"Osaka",photo:"https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?w=600&q=80",desc:"Japan's kitchen and comedy capital — birthplace of instant noodles, Takoyaki octopus balls, Dotonbori neon river.",population:"19 million",tags:["Food","Nightlife","Friendly","Neon"],bestFor:"Street food, nightlife, best food city in Japan",lat:34.693,lon:135.502},
      {name:"Hiroshima",photo:"https://images.unsplash.com/photo-1561108756-76b57a94d8d2?w=600&q=80",desc:"A city reborn from tragedy — the Peace Memorial and atomic bomb dome stand as a reminder of 1945.",population:"1.2 million",tags:["Peace","History","Memorial","Resilience"],bestFor:"Profound historical experience, peace gardens",lat:34.385,lon:132.455},
      {name:"Nara",photo:"https://images.unsplash.com/photo-1575993985471-bd003e70f669?w=600&q=80",desc:"Japan's first capital — 1,000+ wild sika deer roam freely, bow to visitors and steal your snacks. Plus the world's largest bronze Buddha.",population:"361,000",tags:["Deer","Ancient Capital","Giant Buddha","Parks"],bestFor:"Being bowed at by wild deer, Todai-ji temple",lat:34.685,lon:135.805},
      {name:"Hokkaido",photo:"https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&q=80",desc:"Japan's wild north — lavender fields in summer, world-class ski resorts in winter, fresh seafood and the Snow Festival in Sapporo.",population:"5.2 million",tags:["Ski","Lavender","Bears","Snow Festival"],bestFor:"Skiing, nature, lavender, seafood heaven",lat:43.064,lon:141.347},
      {name:"Kanazawa",photo:"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",desc:"Japan's most underrated city — Kenroku-en garden, beautifully preserved samurai and geisha districts, outstanding seafood.",population:"466,000",tags:["Garden","Samurai","Seafood","Preserved"],bestFor:"Traditional Japan without Tokyo's crowds",lat:36.561,lon:136.657},
      {name:"Fukuoka",photo:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",desc:"Japan's southernmost major city — famous for Hakata ramen, outdoor yatai food stalls, stunning beaches.",population:"1.6 million",tags:["Ramen","Yatai","Beach","Kyushu"],bestFor:"Hakata ramen, beach, day trips to South Korea",lat:33.590,lon:130.402},
    ],
    webcams:[
      {title:"Tokyo Shibuya Crossing",img:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=640&q=80",location:"Shibuya, Tokyo",link:"https://www.windy.com/webcams/japan"},
      {title:"Mount Fuji View",img:"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=640&q=80",location:"Yamanashi Prefecture",link:"https://www.windy.com/webcams/japan"},
    ]
  },

  "Italy": {
    mascot:"", greeting:"Benvenuto!", greetingMeaning:"Welcome!",
    tagline:"Where every side street leads to a masterpiece or a perfect espresso",
    weatherContext:{climate:"Mediterranean — hot dry summers, mild winters in the south",avgSummer:" 32°C (Rome)",avgWinter:"❄️ 8°C (Rome)",rainyDays:"🌧 ~90 days/year",bestTime:"🗓 April–June or September–October",tip:"🌡 Avoid Rome and Florence in July–August — 38°C heat and massive crowds. Spring is divine."},
    facts:[
      {emoji:"",title:"Pizza Was Invented For Poor People",body:"Pizza originated in Naples in the late 18th century as cheap fast food for the city's poor. Sold on the street, folded in quarters and eaten standing up. The Margherita was created in 1889 to honour Queen Margherita of Savoy."},
      {emoji:"",title:"The Holy Triangle of Supercars",body:"Ferrari, Lamborghini, Maserati and Ducati motorcycles are all made within 100km of each other in Emilia-Romagna. Lamborghini was started by a tractor manufacturer who was annoyed by a complaint he made to Enzo Ferrari."},
      {emoji:"",title:"You're Not Supposed to Keep That Coin",body:"Visitors throw about €1 million into the Trevi Fountain every year. By Roman law this cannot be pocketed — it's collected nightly and donated to Caritas, Rome's Catholic charity."},
      {emoji:"",title:"Michelangelo Painted Standing, Not Lying Down",body:"Michelangelo painted the Sistine Chapel ceiling standing on a scaffold, leaning his head back — not lying on his back as often depicted. He wrote a sonnet complaining about the physical strain. It took 4 years (1508-1512)."},
    ],
    game:{
      title:"🇮🇹 Italy — mamma mia, let's see what you know!",
      questions:[
        {q:"Lamborghini is a luxury supercar brand. But what did its founder originally make?",a:["Motorcycles","Yachts","Tractors","Furniture"],correct:2,explain:"Ferruccio Lamborghini made tractors and was wealthy from it. He complained to Enzo Ferrari about his car's clutch. Ferrari allegedly told him a tractor maker had no business telling him how to build sports cars. Lamborghini started building supercars out of spite."},
        {q:"How much money is thrown into Rome's Trevi Fountain every year?",a:["€50,000","€250,000","€1 million","€5 million"],correct:2,explain:"Around €1 million per year, collected every night by Rome's Caritas charity to help the poor. The fountain was made famous worldwide by the 1960 film La Dolce Vita."},
        {q:"Italy has more UNESCO World Heritage Sites than any other country. How many?",a:["32","44","58","71"],correct:2,explain:"58 UNESCO World Heritage Sites — more than China (57), Spain (50) or France (52). They range from the Dolomites and Pompeii to historic city centres and vineyards."},
        {q:"How did Michelangelo actually paint the Sistine Chapel ceiling?",a:["Lying on his back on a scaffold","Standing and leaning his head back on a scaffold","From a wheelchair-type device","Hanging from ropes"],correct:1,explain:"He stood on a scaffold and leaned his head back — not lying down. He wrote a famous sonnet complaining: 'My beard toward Heaven, I feel the back of my brain upon my neck...' He lost sight in one eye temporarily."},
      ]
    },
    cities:[
      {name:"Rome",photo:"https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&q=80",desc:"The Eternal City — the Colosseum, Vatican City, the Pantheon (world's best-preserved ancient building), the Trevi Fountain.",population:"4.2 million",tags:["Capital","Ancient","Vatican","UNESCO"],bestFor:"Ancient history, art, wandering with gelato",lat:41.902,lon:12.496},
      {name:"Florence",photo:"https://images.unsplash.com/photo-1541370976299-4d24be5a7c80?w=600&q=80",desc:"The cradle of the Renaissance — the Uffizi Gallery, Michelangelo's David, Brunelleschi's cathedral dome.",population:"380,000",tags:["Renaissance","Art","UNESCO","Tuscany"],bestFor:"Art lovers, the best gelato in Italy, Tuscany day trips",lat:43.769,lon:11.256},
      {name:"Venice",photo:"https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80",desc:"A city built on water — 118 islands, 400 bridges, no cars, gondoliers singing at sunset and the Grand Canal lined with palaces.",population:"260,000",tags:["Canals","Carnival","Gondolas","Unique"],bestFor:"Once-in-a-lifetime experience, get lost in it",lat:45.440,lon:12.336},
      {name:"Naples",photo:"https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80",desc:"The birthplace of pizza — chaotic, noisy, passionate city at the foot of Vesuvius with the best street food in Europe.",population:"3 million",tags:["Pizza","Vesuvius","Pompeii","Authentic"],bestFor:"Real Italian street food, Pompeii day trip",lat:40.853,lon:14.268},
      {name:"Cinque Terre",photo:"https://images.unsplash.com/photo-1474690455603-a369ec1293a9?w=600&q=80",desc:"Five impossibly colourful fishing villages clinging to dramatic coastal cliffs in Liguria, connected by clifftop hiking trails.",population:"~4,000",tags:["Coastal","Hiking","Colourful","UNESCO"],bestFor:"Clifftop hikes, photography, coastal scenery",lat:44.128,lon:9.737},
      {name:"Tuscany",photo:"https://images.unsplash.com/photo-1499678329028-101435549a4e?w=600&q=80",desc:"Cypress-lined roads, rolling vineyards, hilltop towns like Siena and San Gimignano, olive groves and Chianti wine.",population:"3.7 million",tags:["Wine","Countryside","Siena","Chianti"],bestFor:"Road trips, wine tasting, living la dolce vita",lat:43.416,lon:11.024},
      {name:"Amalfi Coast",photo:"https://images.unsplash.com/photo-1474690455603-a369ec1293a9?w=600&q=80",desc:"The most dramatic coastline in Europe — clifftop villages, crystal-clear turquoise water, limoncello and the narrow road with a thousand hairpin bends.",population:"~20,000",tags:["Coastline","Positano","Limoncello","UNESCO"],bestFor:"Dramatic scenery, boat trips, Italian glamour",lat:40.634,lon:14.602},
      {name:"Sicily",photo:"https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&q=80",desc:"The Mediterranean's largest island — Greek temples older than Rome, Mount Etna still erupting, the world's best arancini and a complex history of every Mediterranean civilisation.",population:"5 million",tags:["Greek Temples","Etna","Arancini","History"],bestFor:"Ancient ruins, Mount Etna, the best street food in Italy",lat:37.600,lon:14.015},
    ],
    webcams:[
      {title:"The Colosseum, Rome",img:"https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=640&q=80",location:"Rome, Italy",link:"https://www.windy.com/webcams/italy"},
      {title:"Venice Grand Canal",img:"https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=640&q=80",location:"Venice, Italy",link:"https://www.windy.com/webcams/italy"},
    ]
  },

  "United States": {
    mascot:"", greeting:"Howdy! Welcome!", greetingMeaning:"The most American welcome we've got!",
    tagline:"Land of jazz, national parks, Route 66 and the world's best road trips",
    weatherContext:{climate:"Extreme variety — Arctic Alaska to tropical Hawaii to desert Southwest",avgSummer:" 35°C (Phoenix) / 28°C (NYC)",avgWinter:"❄️ -10°C (Minneapolis) / 14°C (Miami)",rainyDays:"🌧 Varies wildly by region",bestTime:"🗓 Spring (April–May) and Fall (Sept–Oct)",tip:" The US is HUGE — New York to LA is the same as Dublin to Tehran. Plan accordingly!"},
    facts:[
      {emoji:"",title:"The Statue of Liberty Has a Secret",body:"The Statue arrived from France in 350 crates in 1885. The torch arm was displayed in Philadelphia in 1876 — you could climb to the torch for 50 cents. The famous Emma Lazarus poem 'Give me your tired, your poor…' was added in 1903."},
      {emoji:"",title:"America Invented the Soundtrack of Modern Life",body:"Jazz (New Orleans, 1890s), Blues (Mississippi Delta, 1900s), Rock and Roll (Memphis, 1950s), Hip-Hop (Bronx, 1970s) — four of the world's most influential music genres, three of them born in African American communities."},
      {emoji:"",title:"America Invented the National Park",body:"Yellowstone (1872) was the world's first national park — the radical idea that wild landscapes should be preserved for public enjoyment, not sold. It inspired every national park system in the world. The US now has 63."},
      {emoji:"",title:"12 Humans Have Stood on the Moon",body:"All 12 people who have ever walked on the Moon were American, 1969-1972. They left retroreflectors you can still bounce laser beams off today — confirming the Moon is moving away from Earth at exactly 3.8cm per year."},
    ],
    game:{
      title:" USA — stars, stripes and tricky questions!",
      questions:[
        {q:"What was displayed at a Philadelphia exhibition in 1876 — years before the Statue's rest arrived?",a:["The full statue","Just the torch and arm","Just the face","The whole head"],correct:1,explain:"The torch and arm were displayed in 1876. Visitors could climb to the torch for 50 cents! The rest didn't arrive until 1885, in 350 crates, and wasn't dedicated until 1886."},
        {q:"Yellowstone (1872) was world's first national park. What made the idea so radical?",a:["No one had ever preserved wilderness","The idea that wild land should not be sold but kept public forever","Presidents weren't involved in land decisions","It was built on a volcano"],correct:1,explain:"In an era of westward expansion, preserving 2.2 million acres purely for public enjoyment was genuinely revolutionary. It inspired every national park system in the world."},
        {q:"The 12 Moon-walking astronauts left something you can still use today. What?",a:["A flag that still waves","Retroreflectors — bounce laser beams off them","A time capsule for 2069","A live radio transmitter"],correct:1,explain:"Corner cube retroreflectors are still used by observatories today — laser beams confirm the Moon's distance to millimetre accuracy, proving it moves away at 3.8cm per year."},
        {q:"Four iconic music genres were born in the USA. Which has more Scots-Irish than African American roots?",a:["Jazz","Blues","Rock and Roll","Country"],correct:3,explain:"Country music evolved from Appalachian folk music brought by Scots-Irish settlers. Jazz, Blues, Rock & Roll and Hip-Hop all have deep roots in African American culture and communities."},
      ]
    },
    cities:[
      {name:"New York City",photo:"https://images.unsplash.com/photo-1485871981521-5b1fd3805795?w=600&q=80",desc:"The city that never sleeps — Manhattan's skyline, Central Park, the Statue of Liberty, Times Square, world-class museums and 800 languages spoken.",population:"8.3 million",tags:["Capital of the World","Culture","Skyline","Pizza"],bestFor:"First-time visitors, culture, everything",lat:40.713,lon:-74.006},
      {name:"Los Angeles",photo:"https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=600&q=80",desc:"Entertainment capital of the world — Hollywood, Venice Beach, the Getty Center, world-class art and the eternal LA traffic.",population:"4 million",tags:["Hollywood","Beach","Tacos","Sunshine"],bestFor:"Entertainment, beaches, road trip base",lat:34.052,lon:-118.244},
      {name:"New Orleans",photo:"https://images.unsplash.com/photo-1571042176366-6d35e7a4c678?w=600&q=80",desc:"The most unique city in America — birthplace of jazz, Mardi Gras, gumbo and beignets. The French Quarter never truly stops partying.",population:"390,000",tags:["Jazz","Mardi Gras","Food","Culture"],bestFor:"Music, food, the most un-American city in America",lat:29.951,lon:-90.072},
      {name:"Grand Canyon",photo:"https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=600&q=80",desc:"One of the Seven Natural Wonders — 277 miles long, 18 miles wide, 6,093 feet deep and 2 billion years of geological history.",population:"Natural Wonder",tags:["Grand Canyon","Arizona","UNESCO","Hiking"],bestFor:"The most overwhelming landscape in North America",lat:36.107,lon:-112.113},
      {name:"Nashville",photo:"https://images.unsplash.com/photo-1509335035496-c47fc6b65fd6?w=600&q=80",desc:"Music City USA — home of country music, the Grand Ole Opry, Broadway honky-tonks and the best live music scene in America.",population:"689,000",tags:["Country Music","Hot Chicken","Honky Tonks","Music City"],bestFor:"Country music fans, live music, bachelorette parties",lat:36.162,lon:-86.781},
      {name:"San Francisco",photo:"https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80",desc:"The city on the bay — the Golden Gate Bridge, Alcatraz, cable cars, Victorian painted ladies and the best sourdough on Earth.",population:"883,000",tags:["Golden Gate","Tech","Bay Area","Sourdough"],bestFor:"Bridge views, tech culture, incredible food scene",lat:37.774,lon:-122.419},
      {name:"Chicago",photo:"https://images.unsplash.com/photo-1485871981521-5b1fd3805795?w=600&q=80",desc:"The Windy City — the world's greatest skyline, deep dish pizza, blues and jazz clubs, the magnificent bean sculpture.",population:"2.7 million",tags:["Skyline","Deep Dish","Blues","Architecture"],bestFor:"Architecture, deep dish pizza, the blues scene",lat:41.878,lon:-87.630},
      {name:"Yellowstone",photo:"https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80",desc:"The world's first national park — built on a supervolcano. Old Faithful erupts every 91 minutes. Bison and grizzly bears roam freely.",population:"Wildlife",tags:["Geysers","Bison","Bears","Supervolcano"],bestFor:"Wildlife, geysers, the oldest national park on Earth",lat:44.428,lon:-110.589},
    ],
    webcams:[
      {title:"Times Square, New York",img:"https://images.unsplash.com/photo-1485871981521-5b1fd3805795?w=640&q=80",location:"Midtown Manhattan",link:"https://www.earthcam.com/usa/newyork/timessquare/"},
      {title:"Hollywood Sign, LA",img:"https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=640&q=80",location:"Hollywood Hills, Los Angeles",link:"https://www.windy.com/webcams/usa"},
    ]
  },

  "Australia": {
    mascot:"", greeting:"G'day mate!", greetingMeaning:"Good day, friend!",
    tagline:"World's most venomous animals, friendliest people, most beautiful beaches",
    weatherContext:{climate:"Reversed seasons — summer in December, winter in June",avgSummer:" 35°C (Sydney Dec–Feb)",avgWinter:" 13°C (Sydney June–Aug)",rainyDays:"🌧 Tropical north: monsoon Nov–April",bestTime:"🗓 Sept–Nov (spring) or March–May (autumn) in the south",tip:" Sun protection is NOT optional — UV is stronger here than almost anywhere!"},
    facts:[
      {emoji:"",title:"More Kangaroos Than People",body:"Australia has ~50 million kangaroos — nearly double the human population of 26 million. Red kangaroos reach 70km/h and cover 8 metres in a single jump. They can't walk backwards — hence appearing on the coat of arms, symbolising only moving forward."},
      {emoji:"",title:"The Platypus: Nature's Weirdest Animal",body:"When Europeans first sent a platypus to Britain, scientists thought someone was pranking them. It's one of only 5 egg-laying mammals. Males have venomous spurs. They detect prey with electroreception (like sharks). They have no stomach. And they glow under UV light."},
      {emoji:"",title:"Terrifying Wildlife — In Context",body:"Australia has 21 of the world's 25 most venomous snakes. Yet statistically you're more likely to die from a bee sting than a snake bite. Many Australians live their whole lives without encountering dangerous wildlife."},
      {emoji:"",title:"The Great Barrier Reef Is Alive",body:"World's largest living structure — 2,300km long, larger than the UK, made of 2,900+ individual reefs, home to 1,500 fish species and the only living thing visible from space."},
    ],
    game:{
      title:" Australia — crikey, it's a quiz!",
      questions:[
        {q:"What can a kangaroo NOT do?",a:["Jump 8 metres in one bound","Reach 70 km/h","Walk backwards","Swim in open water"],correct:2,explain:"Kangaroos cannot walk backwards — their large hind legs make reverse locomotion impossible. This is why they appear on the coat of arms alongside an emu (also can't walk backwards). Symbolises only moving forward."},
        {q:"When the first platypus arrived in Britain in 1799, what did scientists think?",a:["It was a new otter","Someone was pranking them","It was from another planet","It was a baby"],correct:1,explain:"Biologist George Shaw immediately reached for scissors, convinced someone had stitched a duck's beak onto a beaver. It's venomous, egg-laying, hunts via electroreception and glows under UV light."},
        {q:"Australia has 21 of the world's 25 most venomous snakes. What actually kills most Australians?",a:["Crocodiles","Sharks","Bee stings and car accidents — not wildlife","Spider bites"],correct:2,explain:"Snake bites kill ~2 Australians per year. Bee stings kill 2-3 via anaphylaxis. The wildlife is genuinely lethal — just rarely encountered."},
        {q:"The Great Barrier Reef is the only living thing visible from space. What is it made of?",a:["Algae","Dead coral skeletons","Tiny polyps — living coral animals","Seaweed beds"],correct:2,explain:"Built by coral polyps — tiny animals related to jellyfish. Each polyp builds a calcium carbonate skeleton. Bleaching (caused by warming seas) kills the polyps, leaving white skeletons."},
      ]
    },
    cities:[
      {name:"Sydney",photo:"https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&q=80",desc:"Australia's iconic harbour city — the Opera House, Harbour Bridge, Bondi Beach, ferry rides across the world's most beautiful urban harbour.",population:"5.3 million",tags:["Opera House","Harbour","Bondi Beach","Cosmopolitan"],bestFor:"First-time visitors, beaches, harbour views",lat:-33.868,lon:151.209},
      {name:"Melbourne",photo:"https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=600&q=80",desc:"Australia's cultural capital — world-class coffee, laneway street art, the MCG cricket ground, a thriving arts scene.",population:"5 million",tags:["Coffee","Culture","AFL Football","Art"],bestFor:"Food, coffee, art, sport — best coffee in the world",lat:-37.813,lon:144.963},
      {name:"The Great Barrier Reef",photo:"https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",desc:"World's largest living structure — snorkel or dive among 1,500 fish species, sea turtles, sharks and 400 coral types.",population:"Marine park",tags:["UNESCO","Diving","Snorkelling","Sea Turtles"],bestFor:"Once-in-a-lifetime diving and snorkelling",lat:-18.286,lon:147.700},
      {name:"Uluru (Ayers Rock)",photo:"https://images.unsplash.com/photo-1529797531234-f3df2dd2eb62?w=600&q=80",desc:"Spiritual heart of Australia — a sandstone monolith sacred to the Anangu people, glowing blood-orange at sunset. 600 million years old.",population:"Sacred site",tags:["Aboriginal","Sacred","Outback","Sunrise"],bestFor:"Cultural experience, sunrise photography, outback immersion",lat:-25.344,lon:131.036},
      {name:"The Whitsundays",photo:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",desc:"74 tropical islands inside the Great Barrier Reef — Whitehaven Beach consistently voted one of the world's most beautiful.",population:"Tourism base",tags:["Islands","Beach","Sailing","Reef"],bestFor:"Sailing, beaches, the world's whitest sand",lat:-20.278,lon:149.032},
      {name:"Tasmania",photo:"https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=600&q=80",desc:"Australia's wild southern island — 40% national park, Cradle Mountain, world's cleanest air and the endangered Tasmanian devil.",population:"540,000",tags:["Wilderness","Tasmanian Devil","Clean Air","Art"],bestFor:"Wilderness, wildlife, MONA art museum, clean air",lat:-42.021,lon:146.593},
      {name:"Brisbane",photo:"https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&q=80",desc:"Queensland's capital and gateway to the Gold Coast — riverside dining, South Bank precinct and 283 sunny days a year.",population:"2.5 million",tags:["Gold Coast","Sunshine","Outdoor","2032 Olympics"],bestFor:"Sunshine, Gold Coast beaches, Olympic city 2032",lat:-27.470,lon:153.026},
      {name:"Perth",photo:"https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&q=80",desc:"World's most isolated major city — crystal-clear beaches rivalling the Maldives and Rottnest Island's famous quokkas.",population:"2.1 million",tags:["Beaches","Quokkas","Isolated","Sunshine"],bestFor:"Beaches, quokka selfies, pristine ocean",lat:-31.952,lon:115.861},
    ],
    webcams:[
      {title:"Sydney Opera House & Harbour",img:"https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=640&q=80",location:"Sydney, NSW",link:"https://www.windy.com/webcams/australia"},
      {title:"Bondi Beach",img:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=640&q=80",location:"Bondi, Sydney",link:"https://www.windy.com/webcams/australia"},
    ]
  },

  "Brazil": {
    mascot:"", greeting:"Bem-vindo!", greetingMeaning:"Welcome!",
    tagline:"Samba, football, the Amazon and the most diverse country on Earth",
    weatherContext:{climate:"Tropical and subtropical — enormous variety",avgSummer:"☀️ 30°C (Rio) / 35°C (Amazon)",avgWinter:"❄️ 20°C (Rio)",rainyDays:"🌧 Amazon: heavy rain most of the year",bestTime:"🗓 June–September (dry season). Carnival is February/March",tip:"🎭 For Carnival — book accommodation a YEAR in advance. Pure glorious chaos!"},
    facts:[
      {emoji:"",title:"The Amazon: Running Out of Time",body:"The Amazon covers 5.5 million km² and produces 20% of Earth's oxygen. Scientists warn that at 25% deforestation, it could tip into permanent dry savanna, altering global climate irreversibly."},
      {emoji:"",title:"Rio Carnival: Organised Chaos at Massive Scale",body:"For 4 days every February, ~2 million people dance in Rio's streets daily. Samba schools spend the entire year and millions of dollars on a 60-80 minute performance — judged on 10 technical categories."},
      {emoji:"",title:"Football Is a Brazilian Religion",body:"Brazil has won the FIFA World Cup 5 times — more than any country. The national team (Seleção) is the only team to have played in every World Cup since 1930."},
      {emoji:"",title:"Brazil's Staggering Biodiversity",body:"Brazil contains ~10% of all species on Earth — more biodiversity than any other country. The Amazon alone has more tree species per hectare than the entirety of Europe."},
    ],
    game:{
      title:"🇧🇷 Brazil — carnaval, café e conhecimento!",
      questions:[
        {q:"Scientists warn the Amazon could 'tip' if deforestation reaches 25%. What would happen?",a:["It would flood permanently","It would turn into permanent dry savanna, altering world climate","Nothing significant","It would regrow faster"],correct:1,explain:"The Amazon creates its own rainfall through 'flying rivers'. Lose too many trees and this system collapses — the forest converts to dry savanna, releasing its stored carbon and devastating global climate."},
        {q:"Samba schools spend all year preparing for Carnival. What are they actually scored on?",a:["Just dancing","Only costumes and floats","A technical system scoring theme, floats, costumes, dancing and singing","Who attracts the most spectators"],correct:2,explain:"Carnival judging is incredibly technical — 40 judges score 10 categories including theme coherence, float quality, costume luxury, samba-enredo and percussion. Losing by 0.1 points causes teams to weep openly."},
        {q:"What's unique about Brazil's FIFA World Cup record?",a:["They've never lost a penalty shootout","They're the only team to have played in every World Cup since 1930","They've never conceded 3 goals","They always score in every match"],correct:1,explain:"Brazil is the only national team to have qualified for and played in every World Cup since 1930 — a remarkable 94-year consecutive record. Also won the most (5 times: 1958, 1962, 1970, 1994, 2002)."},
        {q:"Brazil contains roughly what percentage of all species on Earth?",a:["2%","5%","10%","20%"],correct:2,explain:"~10% of all species on Earth live in Brazil — more biodiversity than any other country. The Amazon alone has more tree species per hectare than all of Europe combined."},
      ]
    },
    cities:[
      {name:"Rio de Janeiro",photo:"https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80",desc:"The Cidade Maravilhosa — Christ the Redeemer, Sugarloaf Mountain, Copacabana and Ipanema beaches, samba schools and Carnival.",population:"6.7 million",tags:["Carnival","Beaches","Christ the Redeemer","Samba"],bestFor:"Carnival, beaches, the most beautiful harbour in the world",lat:-22.906,lon:-43.172},
      {name:"São Paulo",photo:"https://images.unsplash.com/photo-1559564099-7d08f7dd1d35?w=600&q=80",desc:"South America's largest city — 22 million people, best Japanese food outside Japan, incredible street art and relentless energy.",population:"22 million",tags:["Megacity","Business","Japanese Food","Art"],bestFor:"Food (best Japanese outside Japan), art, urban energy",lat:-23.550,lon:-46.633},
      {name:"The Amazon",photo:"https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80",desc:"Earth's greatest ecosystem — pink river dolphins, piranhas, jaguars, anacondas, indigenous communities and a forest that creates its own weather.",population:"Wild",tags:["Rainforest","Wildlife","Indigenous","River"],bestFor:"Wildlife, river expeditions, indigenous culture",lat:-3.465,lon:-62.215},
      {name:"Salvador",photo:"https://images.unsplash.com/photo-1583795128727-6ec3642408f8?w=600&q=80",desc:"Brazil's most African city — the Pelourinho colonial district, candomblé ceremonies, capoeira on every corner.",population:"2.9 million",tags:["Afro-Brazilian","Capoeira","Colonial","Candomblé"],bestFor:"Afro-Brazilian culture, music, colonial architecture",lat:-12.977,lon:-38.501},
      {name:"Iguazu Falls",photo:"https://images.unsplash.com/photo-1584738766473-61c083514bf4?w=600&q=80",desc:"The world's largest waterfall system — 275 individual falls, 2.7km wide. Eleanor Roosevelt said: 'Poor Niagara!'",population:"Natural Wonder",tags:["UNESCO","Waterfalls","Argentina border","Rainbows"],bestFor:"The most overwhelming natural sight in South America",lat:-25.694,lon:-54.436},
      {name:"Fortaleza",photo:"https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80",desc:"Northeast Brazil's sun city — 25km of urban beaches, world-class kitesurfing and the freshest lobster you'll ever eat.",population:"2.7 million",tags:["Beach","Carnival","Kitesurfing","Lobster"],bestFor:"Beach holidays, Northeast food culture, kitesurfing",lat:-3.717,lon:-38.543},
    ],
    webcams:[
      {title:"Copacabana Beach, Rio",img:"https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=640&q=80",location:"Rio de Janeiro",link:"https://www.windy.com/webcams/brazil"},
    ]
  },

  "India": {
    mascot:"", greeting:"नमस्ते! (Namaste!)", greetingMeaning:"I bow to the divine in you",
    tagline:"Spices, spirituality, tigers, Bollywood and a billion stories",
    weatherContext:{climate:"Enormous range — Himalayan snow, desert, tropical, temperate",avgSummer:" 42°C (Delhi) / 33°C (Mumbai)",avgWinter:" 14°C (Delhi) / 26°C (Goa)",rainyDays:" Monsoon June–September affects most of India",bestTime:"🗓 October–March in the north; November–April in the south",tip:"🌡 Avoid Delhi in May–June (45°C). October–November: perfect Taj Mahal light."},
    facts:[
      {emoji:"",title:"Chess Is An Indian Invention",body:"Chess was invented in India as 'Chaturanga' in the 6th century. The pieces — king, elephant, horse, boat — evolved into today's king, bishop, knight and rook. It spread to Persia, then the Arab world, then Europe."},
      {emoji:"",title:"India Invented the Number Zero",body:"The concept of zero as a number was formalised by mathematician Brahmagupta in 628 AD. Combined with the decimal system (also Indian), this enabled all higher mathematics. Without zero, there is no computing, no modern physics."},
      {emoji:"",title:"India's Tigers Are Coming Back",body:"In 2010, only 1,800 wild tigers remained. Today there are over 3,000 — India now has 75% of the world's entire wild tiger population. Saved by 'Project Tiger' reserves with core zones completely off-limits to humans."},
      {emoji:"",title:"The Taj Mahal Changes Colour Four Times a Day",body:"Built from white Makrana marble, the Taj appears pinkish at dawn, blinding white at noon, golden at sunset and blue-grey in moonlight. It took 20 years, 22,000 workers and 1,000 elephants to build."},
    ],
    game:{
      title:" India — namaste and test yourself!",
      questions:[
        {q:"India invented something in 628 AD that modern computers couldn't exist without. What?",a:["The algorithm","The decimal system and concept of zero as a number","Binary code","Electronic switches"],correct:1,explain:"Brahmagupta (628 AD) formalised zero as a number with its own mathematical rules. Combined with India's decimal place-value system, this enabled all higher mathematics. Binary code is built on 0 and 1."},
        {q:"The Taj Mahal changes colour. What colour does it appear at SUNSET?",a:["Bright white","Deep pink","Golden orange","Blue-grey"],correct:2,explain:"The Taj appears pinkish at dawn, white at noon, and golden-orange at sunset — due to the angle of sunlight hitting the white Makrana marble. At night under moonlight, it glows blue-grey."},
        {q:"India's wild tiger population went from 1,800 in 2010 to over 3,000 today. What saved them?",a:["International breeding programmes","Project Tiger — reserves with core zones completely off-limits","Genetic engineering","Relocating from zoos"],correct:1,explain:"Project Tiger created inviolate core zones with no human activity at all. India now has 75% of the world's wild tiger population. A genuine conservation miracle."},
        {q:"Chess was invented in India as 'Chaturanga'. Which piece evolved into the modern 'Bishop'?",a:["The King (Raja)","The Elephant (Gaja)","The Horse (Ashva)","The Chariot (Ratha)"],correct:1,explain:"The Elephant (Gaja) became the Bishop. Europeans mistranslated the piece and thought it looked like a bishop's mitre. The chariot became the rook, the horse the knight."},
      ]
    },
    cities:[
      {name:"Delhi & Agra",photo:"https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80",desc:"India's layered capital meets the Taj Mahal — Mughal Red Fort, Humayun's Tomb, chaotic Old Delhi bazaars.",population:"32M + 2M",tags:["Capital","Taj Mahal","Mughal","History"],bestFor:"Mughal monuments, gateway to Rajasthan",lat:28.613,lon:77.209},
      {name:"Jaipur — The Pink City",photo:"https://images.unsplash.com/photo-1477587458883-47145ed6979e?w=600&q=80",desc:"Rajasthan's royal capital — Amber Fort, the Hawa Mahal's honeycomb façade, bustling bazaars.",population:"3.1 million",tags:["Pink City","Forts","Rajasthan","Textiles"],bestFor:"Fort palaces, royal Rajasthan, crafts shopping",lat:26.912,lon:75.787},
      {name:"Mumbai",photo:"https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&q=80",desc:"The City of Dreams — Bollywood, Gateway of India, Marine Drive at night, the world's most sophisticated lunch delivery system (dabbawallahs).",population:"20 million",tags:["Bollywood","Finance","Colonial","Vada Pav"],bestFor:"Urban energy, film industry, extraordinary street food",lat:19.076,lon:72.877},
      {name:"Varanasi",photo:"https://images.unsplash.com/photo-1561101058-c24cecae35ca?w=600&q=80",desc:"The world's oldest continuously inhabited city — Hinduism's holiest site. Ghats at dawn, the Ganga Aarti fire ceremony at dusk.",population:"1.5 million",tags:["Sacred","Ganges","Ghats","Oldest City"],bestFor:"Spiritual experience unlike any other — transformative",lat:25.317,lon:82.974},
      {name:"Kerala — God's Own Country",photo:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",desc:"Backwater houseboats drifting through rice paddies, Ayurvedic spa retreats, spice plantations and coconut-everything cuisine.",population:"35 million",tags:["Backwaters","Spices","Ayurveda","Houseboats"],bestFor:"Relaxation, backwater cruises, Ayurveda",lat:9.931,lon:76.267},
      {name:"Rajasthan Desert",photo:"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80",desc:"The Great Thar Desert — camel safaris at sunset, golden Jaisalmer rising from the dunes, spectacular stars.",population:"68 million",tags:["Desert","Camels","Jaisalmer","Stars"],bestFor:"Camel safari, desert camping, golden forts",lat:26.930,lon:70.916},
      {name:"Goa",photo:"https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&q=80",desc:"India's party coast — Portuguese colonial architecture, 100km of white-sand beaches, world-class beach parties and the freshest seafood.",population:"1.5 million",tags:["Beach","Portuguese","Seafood","Nightlife"],bestFor:"Beach parties, seafood, relaxed beach vibe",lat:15.299,lon:74.124},
      {name:"Kolkata",photo:"https://images.unsplash.com/photo-1477587458883-47145ed6979e?w=600&q=80",desc:"India's cultural soul — birthplace of Tagore, the stunning Victoria Memorial, the largest book fair in Asia.",population:"14.9 million",tags:["Culture","Literature","Colonial","Street Food"],bestFor:"Culture, literature, the best Indian street food",lat:22.572,lon:88.363},
    ],
    webcams:[
      {title:"India Gate, Delhi",img:"https://images.unsplash.com/photo-1587474260584-136574528ed5?w=640&q=80",location:"New Delhi",link:"https://www.windy.com/webcams/india"},
    ]
  },

};

const DEFAULT_CULTURE = {
  mascot:"", greeting:"Hello!", greetingMeaning:"Welcome!",
  tagline:"A fascinating country waiting to be explored",
  weatherContext:{climate:"Varies by season",avgSummer:"—",avgWinter:"—",rainyDays:"—",bestTime:"Research locally",tip:"Always check the best season before booking!"},
  facts:[{emoji:"",title:"Every Country Has a Story",body:"Full culture data for this country is coming soon. Explore the Weather, Map and Flights tabs!"}],
  game:null, cities:[], webcams:[],
};

function getCultureData(countryName) {
  return CULTURE_DATA[countryName] || DEFAULT_CULTURE;
}