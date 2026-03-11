const COUNTRY_CITIES = {

  "Ireland": {
    cities: [
      { name: "Dublin",    photo: "https://images.unsplash.com/photo-1505764761634-a61ddb02b49b?w=600&q=80", desc: "Ireland's vibrant capital on the River Liffey — home to Trinity College, Temple Bar, and iconic Georgian architecture.", population: "1.4M", tags: ["Capital","Culture","History"], lat: 53.349, lon: -6.260 },
      { name: "Cork",      photo: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=600&q=80", desc: "Ireland's rebel city — a foodie paradise on the Lee River with the bustling English Market.", population: "215K", tags: ["Food","Culture","Port"], lat: 51.898, lon: -8.470 },
      { name: "Galway",    photo: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&q=80", desc: "The bohemian capital of the West — a UNESCO City of Film packed with street performers and wild Atlantic scenery.", population: "82K",  tags: ["Arts","Festival","West Coast"], lat: 53.274, lon: -9.049 },
      { name: "Killarney", photo: "https://images.unsplash.com/photo-1564415315949-7a0c4c073d3a?w=600&q=80", desc: "Gateway to the Ring of Kerry — nestled between stunning lakes and the MacGillycuddy's Reeks mountains.", population: "14K",  tags: ["Nature","Lakes","Mountains"], lat: 52.058, lon: -9.504 },
      { name: "Limerick",  photo: "https://images.unsplash.com/photo-1599673603754-c48e3d71e0b2?w=600&q=80", desc: "City of culture on the River Shannon — King John's Castle and a thriving arts scene.", population: "94K",  tags: ["History","Shannon","Culture"], lat: 52.668, lon: -8.630 },
    ],
    webcams: [
      { title: "Dublin City Centre",  img: "https://images.unsplash.com/photo-1549918864-48ac978761a4?w=640&q=80", location: "O'Connell Street, Dublin", link: "https://www.windy.com/webcams/ireland" },
      { title: "Cliffs of Moher",     img: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=640&q=80", location: "County Clare",            link: "https://www.cliffsofmoher.ie/visit/webcam/" },
      { title: "Galway Bay",          img: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=640&q=80", location: "Galway City",             link: "https://www.windy.com/webcams/ireland" },
      { title: "Ring of Kerry",       img: "https://images.unsplash.com/photo-1564415315949-7a0c4c073d3a?w=640&q=80", location: "County Kerry",            link: "https://www.discoverireland.ie" },
    ]
  },

  "United Kingdom": {
    cities: [
      { name: "London",     photo: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80", desc: "Global capital of culture, finance, and history — spanning the Thames with landmarks from Tower Bridge to Big Ben.", population: "9.6M", tags: ["Capital","Culture","Finance"], lat: 51.507, lon: -0.127 },
      { name: "Edinburgh",  photo: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?w=600&q=80", desc: "Scotland's dramatic capital — medieval Old Town, a volcanic castle, and world-famous Fringe festival.", population: "530K", tags: ["Castle","Festival","History"], lat: 55.952, lon: -3.196 },
      { name: "Manchester", photo: "https://images.unsplash.com/photo-1563461660947-507ef49e9c47?w=600&q=80", desc: "The beating heart of Northern England — birthplace of the Industrial Revolution and two legendary football clubs.", population: "557K", tags: ["Football","Music","Industry"], lat: 53.480, lon: -2.242 },
      { name: "Bath",       photo: "https://images.unsplash.com/photo-1577086664693-894d8405334a?w=600&q=80", desc: "Roman elegance meets Georgian grandeur — UNESCO World Heritage city famous for thermal spas.", population: "94K",  tags: ["Roman","Heritage","Spa"], lat: 51.381, lon: -2.360 },
    ],
    webcams: [
      { title: "Big Ben & Westminster", img: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=640&q=80", location: "Westminster, London",  link: "https://www.windy.com/webcams/united-kingdom" },
      { title: "Edinburgh Castle",      img: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?w=640&q=80", location: "Edinburgh, Scotland", link: "https://www.windy.com/webcams/united-kingdom" },
      { title: "Tower Bridge",          img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=640&q=80", location: "Southwark, London",   link: "https://www.windy.com/webcams/united-kingdom" },
    ]
  },

  "France": {
    cities: [
      { name: "Paris",    photo: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80", desc: "La Ville Lumière — the city of love, art, and gastronomy. From the Eiffel Tower to the Louvre.", population: "11M",  tags: ["Capital","Art","Romance"],       lat: 48.856, lon:  2.352 },
      { name: "Nice",     photo: "https://images.unsplash.com/photo-1491166617655-0723a0462ef0?w=600&q=80", desc: "The jewel of the French Riviera — azure blue seas and belle époque architecture.",              population: "340K", tags: ["Riviera","Beach","Mediterranean"], lat: 43.710, lon:  7.262 },
      { name: "Lyon",     photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", desc: "France's gastronomic capital — renowned for bouchon restaurants and silk history.",               population: "518K", tags: ["Food","Silk","History"],           lat: 45.764, lon:  4.835 },
      { name: "Bordeaux", photo: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80", desc: "The world's wine capital — elegant 18th-century architecture along the Garonne river.",          population: "257K", tags: ["Wine","Heritage","Architecture"],  lat: 44.837, lon: -0.579 },
    ],
    webcams: [
      { title: "Eiffel Tower",          img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=640&q=80", location: "Champ de Mars, Paris",  link: "https://www.windy.com/webcams/france" },
      { title: "Promenade des Anglais", img: "https://images.unsplash.com/photo-1491166617655-0723a0462ef0?w=640&q=80", location: "Nice, Côte d'Azur",     link: "https://www.windy.com/webcams/france" },
    ]
  },

  "Germany": {
    cities: [
      { name: "Berlin",  photo: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&q=80", desc: "Germany's raw, creative capital — world-class museums, street art, and legendary nightlife.", population: "3.7M", tags: ["Capital","Art","History"], lat: 52.520, lon: 13.405 },
      { name: "Munich",  photo: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=600&q=80", desc: "Bavaria at its best — baroque palaces, English Garden, Marienplatz, and Oktoberfest.",       population: "1.5M", tags: ["Beer","Bavaria","Culture"],  lat: 48.137, lon: 11.576 },
      { name: "Hamburg", photo: "https://images.unsplash.com/photo-1539536816519-c2c0c7e5e461?w=600&q=80", desc: "Germany's gateway to the world — a vibrant port city with Speicherstadt warehouse district.",  population: "1.9M", tags: ["Port","Music","Maritime"],   lat: 53.550, lon:  9.993 },
    ],
    webcams: [
      { title: "Brandenburg Gate", img: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=640&q=80", location: "Mitte, Berlin",      link: "https://www.windy.com/webcams/germany" },
      { title: "Marienplatz",      img: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=640&q=80", location: "Munich City Centre", link: "https://www.windy.com/webcams/germany" },
    ]
  },

  "Italy": {
    cities: [
      { name: "Rome",      photo: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80", desc: "The Eternal City — 3000 years of art. From the Colosseum to the Trevi Fountain.",         population: "2.9M", tags: ["Capital","Ancient","Art"],   lat: 41.902, lon: 12.496 },
      { name: "Venice",    photo: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80", desc: "A floating masterpiece — 118 islands connected by 400 bridges and timeless canals.",    population: "255K", tags: ["Canals","Gondola","Unique"], lat: 45.440, lon: 12.315 },
      { name: "Florence",  photo: "https://images.unsplash.com/photo-1541370976299-4d24be63f9de?w=600&q=80", desc: "The cradle of the Renaissance — Uffizi Gallery and Brunelleschi's iconic dome.",          population: "372K", tags: ["Renaissance","Art","Tuscany"], lat: 43.769, lon: 11.255 },
      { name: "Amalfi",    photo: "https://images.unsplash.com/photo-1633321088355-4a8c13b38cce?w=600&q=80", desc: "Cliffside villages tumbling into the turquoise Tyrrhenian Sea — Italy's most dramatic coast.", population: "5K",   tags: ["Coastal","Cliffs","UNESCO"],  lat: 40.634, lon: 14.602 },
    ],
    webcams: [
      { title: "Piazza Venezia", img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=640&q=80", location: "Rome City Centre", link: "https://www.windy.com/webcams/italy" },
      { title: "Grand Canal",    img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=640&q=80", location: "Venice",           link: "https://www.windy.com/webcams/italy" },
    ]
  },

  "Spain": {
    cities: [
      { name: "Barcelona", photo: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80", desc: "Gaudí's magical city on the Mediterranean — Sagrada Família and the most vibrant nightlife in Europe.", population: "1.6M", tags: ["Gaudí","Beach","Architecture"], lat: 41.385, lon:  2.173 },
      { name: "Madrid",    photo: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&q=80", desc: "Spain's passionate capital — Prado Museum, Retiro Park, and world-class tapas.",                     population: "3.3M", tags: ["Capital","Art","Football"],     lat: 40.416, lon: -3.703 },
      { name: "Seville",   photo: "https://images.unsplash.com/photo-1588181831729-f1f06ef6d4f8?w=600&q=80", desc: "The flamenco soul of Andalusia — gothic cathedral and Moorish Alcázar palace.",                     population: "690K", tags: ["Flamenco","Moorish","Culture"],  lat: 37.389, lon: -5.984 },
    ],
    webcams: [
      { title: "Sagrada Família", img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=640&q=80", location: "Barcelona",         link: "https://www.windy.com/webcams/spain" },
      { title: "Puerta del Sol",  img: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=640&q=80", location: "Madrid City Centre", link: "https://www.windy.com/webcams/spain" },
    ]
  },

  "Japan": {
    cities: [
      { name: "Tokyo",     photo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80", desc: "The neon metropolis — ancient temples stand next to towering skyscrapers in every neighbourhood.", population: "13.9M", tags: ["Capital","Neon","Tech"],    lat: 35.689, lon: 139.692 },
      { name: "Kyoto",     photo: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80", desc: "Japan's spiritual heart — 1600 Buddhist temples, golden pavilions, geisha districts.", population: "1.5M",  tags: ["Temples","Geisha","Zen"],   lat: 35.011, lon: 135.768 },
      { name: "Osaka",     photo: "https://images.unsplash.com/photo-1589452271712-64b8a66c7b78?w=600&q=80", desc: "Japan's kitchen — Dotonbori neon river and world-famous street food.",                   population: "2.7M",  tags: ["Food","Nightlife","Castle"], lat: 34.693, lon: 135.502 },
      { name: "Hiroshima", photo: "https://images.unsplash.com/photo-1601976584729-49c42e97b0d3?w=600&q=80", desc: "A city reborn — the Peace Memorial Park stands as a powerful reminder of resilience.",    population: "1.2M",  tags: ["Peace","History","Memorial"], lat: 34.385, lon: 132.455 },
    ],
    webcams: [
      { title: "Shibuya Crossing", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=640&q=80", location: "Shibuya, Tokyo", link: "https://www.windy.com/webcams/japan" },
      { title: "Kinkaku-ji Temple",img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=640&q=80", location: "Kyoto",          link: "https://www.windy.com/webcams/japan" },
    ]
  },

  "Australia": {
    cities: [
      { name: "Sydney",    photo: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80", desc: "Opera House, Harbour Bridge, Bondi Beach — year-round outdoor lifestyle.",    population: "5.3M", tags: ["Harbour","Beach","Opera"],    lat: -33.868, lon: 151.209 },
      { name: "Melbourne", photo: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=600&q=80", desc: "Australia's cultural capital — world-class coffee, street art, and AFL football.", population: "5.1M", tags: ["Coffee","Culture","Sport"],  lat: -37.813, lon: 144.963 },
      { name: "Brisbane",  photo: "https://images.unsplash.com/photo-1566734904496-9309bb1798ae?w=600&q=80", desc: "Sunny Queensland's riverside capital — gateway to the Great Barrier Reef.",      population: "2.5M", tags: ["Sunshine","River","Gateway"], lat: -27.468, lon: 153.028 },
    ],
    webcams: [
      { title: "Sydney Harbour", img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=640&q=80", location: "Sydney Harbour, NSW", link: "https://www.windy.com/webcams/australia" },
      { title: "Bondi Beach",    img: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=640&q=80", location: "Bondi, Sydney",        link: "https://www.windy.com/webcams/australia" },
    ]
  },

  "United States": {
    cities: [
      { name: "New York",      photo: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80", desc: "The city that never sleeps — Manhattan skyline, Central Park, Times Square.", population: "8.3M", tags: ["Skyline","Culture","Finance"],   lat: 40.712, lon:  -74.005 },
      { name: "Los Angeles",   photo: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=600&q=80", desc: "City of Angels — Hollywood Hills, Venice Beach, and the entertainment capital.", population: "3.9M", tags: ["Hollywood","Beach","Film"],       lat: 34.052, lon: -118.243 },
      { name: "Chicago",       photo: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80", desc: "The Windy City — breathtaking architecture, deep-dish pizza, Lake Michigan.",   population: "2.7M", tags: ["Architecture","Jazz","Food"],     lat: 41.878, lon:  -87.629 },
      { name: "San Francisco", photo: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80", desc: "Fog-wrapped hills, Golden Gate Bridge, and Silicon Valley dreams.",              population: "873K", tags: ["Golden Gate","Tech","Hills"],     lat: 37.774, lon: -122.419 },
    ],
    webcams: [
      { title: "Times Square",        img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=640&q=80", location: "Manhattan, New York",  link: "https://www.windy.com/webcams/usa" },
      { title: "Golden Gate Bridge",  img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=640&q=80", location: "San Francisco, CA",     link: "https://www.windy.com/webcams/usa" },
    ]
  },

  "Brazil": {
    cities: [
      { name: "Rio de Janeiro",  photo: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80", desc: "Cidade Maravilhosa — Christ the Redeemer, Copacabana beach, and carnival spirit.", population: "6.7M", tags: ["Beach","Carnival","Christ"], lat: -22.906, lon: -43.172 },
      { name: "São Paulo",       photo: "https://images.unsplash.com/photo-1547720974-1b46d39c7edd?w=600&q=80", desc: "South America's megacity — business, cuisine, arts, and nightlife.",              population: "12M",  tags: ["Megacity","Business","Arts"], lat: -23.549, lon: -46.633 },
      { name: "Florianópolis",   photo: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=600&q=80", desc: "The Magic Island — 42 beaches, lagoons, sand dunes, and surf culture.",          population: "500K", tags: ["Island","Surf","Beaches"],    lat: -27.597, lon: -48.549 },
    ],
    webcams: [
      { title: "Copacabana Beach", img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=640&q=80", location: "Rio de Janeiro", link: "https://www.windy.com/webcams/brazil" },
    ]
  },

  "India": {
    cities: [
      { name: "New Delhi", photo: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80", desc: "India's sprawling capital — Red Fort, Qutb Minar, Humayun's Tomb.", population: "32M", tags: ["Capital","History","Mughal"],    lat: 28.613, lon:  77.209 },
      { name: "Mumbai",    photo: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&q=80", desc: "The City of Dreams — Bollywood, Marine Drive, Gateway of India.",    population: "20M", tags: ["Bollywood","Finance","Colonial"], lat: 19.076, lon:  72.877 },
      { name: "Jaipur",    photo: "https://images.unsplash.com/photo-1477587458883-47145ed6979e?w=600&q=80", desc: "The Pink City — Amber Fort, Hawa Mahal, most photogenic in Asia.",    population: "3.1M",tags: ["Pink City","Forts","Rajasthan"],  lat: 26.912, lon:  75.787 },
    ],
    webcams: [
      { title: "India Gate",    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=640&q=80", location: "New Delhi", link: "https://www.windy.com/webcams/india" },
      { title: "Marine Drive",  img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=640&q=80", location: "Mumbai",    link: "https://www.windy.com/webcams/india" },
    ]
  },

  "China": {
    cities: [
      { name: "Beijing",   photo: "https://images.unsplash.com/photo-1508804052814-cd3ba865a116?w=600&q=80", desc: "5000 years of civilisation — Forbidden City, Great Wall, Temple of Heaven.", population: "21M", tags: ["Capital","Ancient","Great Wall"], lat: 39.904, lon: 116.407 },
      { name: "Shanghai",  photo: "https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=600&q=80", desc: "China's dazzling skyline — the Bund's colonial waterfront facing Pudong's towers.", population: "26M", tags: ["Skyline","Finance","Bund"],       lat: 31.230, lon: 121.473 },
      { name: "Hong Kong", photo: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=600&q=80", desc: "Where East meets West — Victoria Harbour and one of the world's most dramatic skylines.", population: "7.5M",tags: ["Harbour","Finance","Dim Sum"],  lat: 22.319, lon: 114.169 },
    ],
    webcams: [
      { title: "The Bund",       img: "https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=640&q=80", location: "Shanghai",   link: "https://www.windy.com/webcams/china" },
      { title: "Victoria Peak",  img: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=640&q=80", location: "Hong Kong",  link: "https://www.windy.com/webcams/china" },
    ]
  },

  "South Africa": {
    cities: [
      { name: "Cape Town",     photo: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80", desc: "The Mother City — Table Mountain, Cape of Good Hope, and world-class wine estates.", population: "4.6M", tags: ["Table Mountain","Wine","Penguins"], lat: -33.924, lon: 18.424 },
      { name: "Johannesburg",  photo: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=600&q=80", desc: "Joburg — Africa's economic powerhouse, Apartheid Museum, and thriving arts scene.",    population: "5.6M", tags: ["Finance","History","Arts"],         lat: -26.204, lon: 28.045 },
    ],
    webcams: [
      { title: "Table Mountain", img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=640&q=80", location: "Cape Town", link: "https://www.windy.com/webcams/south-africa" },
    ]
  },

};

function getCountryData(countryName) {
  return COUNTRY_CITIES[countryName] || null;
}
