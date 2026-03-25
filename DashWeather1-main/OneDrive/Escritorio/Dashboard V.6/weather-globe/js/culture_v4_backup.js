const CULTURE_DATA = {

  "Ireland": {
    mascot: "??",
    mascotName: "Clover the Leprechaun",
    greeting: "Céad Míle Fáilte!",
    greetingMeaning: "A hundred thousand welcomes!",
    colors: ["#169b62","#ff883e","#ffffff"],
    tagline: "Land of saints, scholars & storytellers",
    cultureVideo: { id: "YM4c3NL5bJE", title: "Ireland — Ancient Culture & Wild Landscapes" },
    funFacts: [
      "?? Ireland is the only country with a musical instrument — the harp — as its national symbol",
      "?? Ireland has more castles per square mile than almost any country in the world",
      "?? Guinness was invented in Dublin in 1759 — and Ireland exports it to 150 countries",
      "?? Ireland has produced 4 Nobel Prize winners in Literature — more per capita than any nation",
      "?? Halloween originated in ancient Ireland as the Celtic festival of Samhain",
    ],
    game: {
      type: "quiz",
      title: "?? Irish Culture Quiz",
      questions: [
        { q: "What instrument is on the Irish coat of arms?", a: ["?? Guitar","?? Accordion","?? Harp","?? Trumpet"], correct: 2 },
        { q: "What festival did Halloween come from?", a: ["Beltane","Samhain","Imbolc","Lughnasadh"], correct: 1 },
        { q: "What year was Guinness founded?", a: ["1659","1759","1859","1959"], correct: 1 },
        { q: "How many Nobel Literature prizes has Ireland won?", a: ["1","2","3","4"], correct: 3 },
      ]
    }
  },

  "United Kingdom": {
    mascot: "??",
    mascotName: "Leo the Lion",
    greeting: "Cheerio!",
    greetingMeaning: "The most British hello!",
    colors: ["#012169","#c8102e","#ffffff"],
    tagline: "Where tea, history and innovation meet",
    cultureVideo: { id: "mT3RKrEIoRM", title: "Britain — Culture, History & Icons" },
    funFacts: [
      "☕ The British drink approximately 165 million cups of tea every single day",
      "?? The UK invented the postage stamp — the Penny Black in 1840",
      "?? More #1 albums in US music charts came from the UK than any other country",
      "?? The London Eye carries 3.5 million passengers per year",
      "?? Shakespeare invented over 1,700 words still used in English today",
    ],
    game: {
      type: "quiz",
      title: "???? British Culture Quiz",
      questions: [
        { q: "How many cups of tea do Brits drink daily?", a: ["65 million","165 million","265 million","365 million"], correct: 1 },
        { q: "Who invented the postage stamp?", a: ["USA","France","Germany","UK"], correct: 3 },
        { q: "How many words did Shakespeare invent?", a: ["500","1000","1700","3000"], correct: 2 },
        { q: "Big Ben clock tower is officially named...?", a: ["Elizabeth Tower","Victoria Tower","St Stephen's Tower","Westminster Tower"], correct: 0 },
      ]
    }
  },

  "France": {
    mascot: "??",
    mascotName: "Gallic Rooster",
    greeting: "Bonjour!",
    greetingMeaning: "Good day!",
    colors: ["#002395","#ffffff","#ed2939"],
    tagline: "Liberté, Égalité, Fraternité & Cuisine",
    cultureVideo: { id: "SBcMpMVDtJI", title: "France — Art, Culture & Cuisine" },
    funFacts: [
      "?? The Eiffel Tower was meant to be demolished after 20 years — it was saved because it made a great radio antenna",
      "?? France produces over 8 billion bottles of wine per year",
      "?? French law protects the baguette — it must be made fresh daily and can't be frozen",
      "?? The Louvre is the world's most visited museum with 9 million visitors annually",
      "?? France is the world's top tourist destination — 90 million visitors per year",
    ],
    game: {
      type: "quiz",
      title: "???? French Culture Quiz",
      questions: [
        { q: "Why was the Eiffel Tower saved from demolition?", a: ["Too expensive to remove","Tourists loved it","Radio antenna use","Won a contest"], correct: 2 },
        { q: "How many wine bottles does France produce yearly?", a: ["1 billion","4 billion","8 billion","12 billion"], correct: 2 },
        { q: "What's the most visited museum on Earth?", a: ["MoMA","Tate Modern","The Louvre","Uffizi Gallery"], correct: 2 },
        { q: "The French motto 'Liberté, Égalité...' what's the third?", a: ["Amour","Solidarité","Fraternité","Victoire"], correct: 2 },
      ]
    }
  },

  "Japan": {
    mascot: "⛩️",
    mascotName: "Tori the Shrine Fox",
    greeting: "いらっしゃいませ!",
    greetingMeaning: "Welcome! (Irasshaimase)",
    colors: ["#bc002d","#ffffff"],
    tagline: "Where ancient tradition meets the future",
    cultureVideo: { id: "WoHRjbQ-r60", title: "Japan — Culture, Tradition & Innovation" },
    funFacts: [
      "?? Mt. Fuji is a sacred volcano that has been climbed by people since the 8th century",
      "?? Japan has more Michelin-starred restaurants than any other country in the world",
      "?? Japan has more robots than any country — 1 robot for every 10 factory workers",
      "?? Cherry blossom (Sakura) season lasts only 2 weeks — but draws millions of viewers",
      "?? Nintendo, Sony PlayStation, and Pokemon all come from Japan",
    ],
    game: {
      type: "quiz",
      title: "???? Japan Culture Quiz",
      questions: [
        { q: "Which country has the most Michelin-starred restaurants?", a: ["France","Italy","Spain","Japan"], correct: 3 },
        { q: "How long does cherry blossom season last?", a: ["1 week","2 weeks","1 month","3 months"], correct: 1 },
        { q: "What is the traditional Japanese theatre called?", a: ["Noh / Kabuki","Bunraku","Rakugo","Taiko"], correct: 0 },
        { q: "Japan's Shinkansen bullet train reaches speeds of:", a: ["150 km/h","200 km/h","320 km/h","500 km/h"], correct: 2 },
      ]
    }
  },

  "Italy": {
    mascot: "??",
    mascotName: "Romulus the Roman Wolf",
    greeting: "Benvenuto!",
    greetingMeaning: "Welcome!",
    colors: ["#009246","#ffffff","#ce2b37"],
    tagline: "La dolce vita — the sweet life",
    cultureVideo: { id: "_Cv_AYVQ_Bc", title: "Italy — Art, History & Food" },
    funFacts: [
      "?? Pizza was invented in Naples in the late 1700s — originally a food for the poor",
      "?? Italy has more UNESCO World Heritage Sites than any other country — 58!",
      "??️ Ferrari, Lamborghini, Maserati and Alfa Romeo all come from Italy",
      "⛲ Romans threw so many coins into the Trevi Fountain that €1 million is collected yearly",
      "?? Italy has over 350 different types of pasta shapes",
    ],
    game: {
      type: "quiz",
      title: "???? Italian Culture Quiz",
      questions: [
        { q: "How many UNESCO World Heritage Sites does Italy have?", a: ["28","38","48","58"], correct: 3 },
        { q: "Where was pizza invented?", a: ["Rome","Milan","Venice","Naples"], correct: 3 },
        { q: "How many pasta shapes exist in Italy?", a: ["50","150","250","350+"], correct: 3 },
        { q: "How much money is thrown into Trevi Fountain yearly?", a: ["€100K","€500K","€1 million","€5 million"], correct: 2 },
      ]
    }
  },

  "Spain": {
    mascot: "??",
    mascotName: "Osborne the Bull",
    greeting: "¡Bienvenido!",
    greetingMeaning: "Welcome!",
    colors: ["#c60b1e","#ffc400","#c60b1e"],
    tagline: "Passionate culture, siestas & flamenco",
    cultureVideo: { id: "wHxYQliqxlI", title: "Spain — Culture, Flamenco & Fiesta" },
    funFacts: [
      "?? Flamenco dancing was born in Andalusia — UNESCO declared it Intangible Cultural Heritage",
      "?? La Tomatina festival throws 150,000 tomatoes in one hour every August",
      "??️ Spain's Santiago Bernabéu holds 81,000 fans and is football's most famous stadium",
      "?? Picasso and Salvador Dalí were both Spanish — and both revolutionised modern art",
      "?? The Spanish tooth fairy is actually a mouse called Ratoncito Pérez",
    ],
    game: {
      type: "quiz",
      title: "???? Spanish Culture Quiz",
      questions: [
        { q: "What is Spain's famous tomato-throwing festival called?", a: ["La Fiesta Roja","La Tomatina","El Tomate","Feria del Tomate"], correct: 1 },
        { q: "Who is the Spanish 'tooth fairy'?", a: ["A fairy called Rosa","A mouse called Ratoncito","A dog called Perrito","An elf called Duende"], correct: 1 },
        { q: "Where did Flamenco originate?", a: ["Madrid","Barcelona","Seville / Andalusia","Valencia"], correct: 2 },
        { q: "Which famous artist is NOT Spanish?", a: ["Picasso","Dalí","Goya","Monet"], correct: 3 },
      ]
    }
  },

  "Germany": {
    mascot: "??",
    mascotName: "Adler the Eagle",
    greeting: "Willkommen!",
    greetingMeaning: "Welcome!",
    colors: ["#000000","#dd0000","#ffce00"],
    tagline: "Engineering, philosophy & Oktoberfest",
    cultureVideo: { id: "J6_0i8BFhRs", title: "Germany — Culture, Beer & History" },
    funFacts: [
      "?? Germany has over 1,300 breweries and produces 5,000 different beer brands",
      "?? Germany invented the car — Karl Benz patented the first automobile in 1886",
      "?? Germany has 20 million registered library card holders — the most in Europe",
      "?? Christmas trees, gingerbread, and Advent calendars were all invented in Germany",
      "?? Germany has 81 UNESCO-listed orchestras — more than any other nation",
    ],
    game: {
      type: "quiz",
      title: "???? German Culture Quiz",
      questions: [
        { q: "How many breweries does Germany have?", a: ["300","700","1300","2000"], correct: 2 },
        { q: "Who patented the first car in 1886?", a: ["Gottlieb Daimler","Rudolf Diesel","Karl Benz","Ferdinand Porsche"], correct: 2 },
        { q: "Germany invented which Christmas tradition?", a: ["Christmas Turkey","The Christmas Tree","Santa Claus","Christmas Crackers"], correct: 1 },
        { q: "The Berlin Wall fell in what year?", a: ["1987","1988","1989","1990"], correct: 2 },
      ]
    }
  },

  "Australia": {
    mascot: "??",
    mascotName: "Skippy the Kangaroo",
    greeting: "G'day mate!",
    greetingMeaning: "Good day, friend!",
    colors: ["#00008b","#ffffff","#ff0000"],
    tagline: "Land of surf, outback & unique wildlife",
    cultureVideo: { id: "gZ14HUP4w04", title: "Australia — Wildlife, Culture & Adventure" },
    funFacts: [
      "?? There are more kangaroos in Australia than people — approximately 50 million vs 26 million",
      "?? The Great Barrier Reef is visible from space and is the world's largest living structure",
      "??️ Australia has 21 of the world's 25 most venomous snakes",
      "?? Australia invented the modern lifeguard — the first surf lifesaving club was formed in 1906",
      "?? The platypus is one of only 5 mammals that lays eggs AND has a venomous spur",
    ],
    game: {
      type: "quiz",
      title: "?? Australian Culture Quiz",
      questions: [
        { q: "How many kangaroos live in Australia?", a: ["10 million","25 million","50 million","100 million"], correct: 2 },
        { q: "The Great Barrier Reef is visible from:", a: ["An airplane","The ISS / Space","A tall mountain","Nowhere outside it"], correct: 1 },
        { q: "Which Australian animal lays eggs AND is venomous?", a: ["Echidna","Platypus","Wombat","Quokka"], correct: 1 },
        { q: "What sport did Australia invent the lifeguard system for?", a: ["Swimming","Surfing","Sailing","Diving"], correct: 1 },
      ]
    }
  },

  "United States": {
    mascot: "??",
    mascotName: "Liberty the Eagle",
    greeting: "Welcome, partner!",
    greetingMeaning: "The American way!",
    colors: ["#3c3b6e","#ffffff","#b22234"],
    tagline: "Land of dreams, jazz, BBQ & baseball",
    cultureVideo: { id: "XGHEzXXMFoc", title: "United States — Culture, History & Icons" },
    funFacts: [
      "?? The Statue of Liberty was a gift from France — it arrived in 350 crates in 1885",
      "?? American music genres that changed the world: blues, jazz, rock, hip-hop all born in the USA",
      "?? NASA was founded in 1958 and has put humans on the Moon, Mars rovers, and beyond",
      "?? Americans eat 50 billion burgers per year — that's 3 burgers per person per week",
      "?? Hollywood produces more films than any country — about 700 feature films per year",
    ],
    game: {
      type: "quiz",
      title: "?? USA Culture Quiz",
      questions: [
        { q: "Which country gifted the Statue of Liberty to the USA?", a: ["UK","Canada","France","Germany"], correct: 2 },
        { q: "How many burgers do Americans eat per year?", a: ["10 billion","30 billion","50 billion","100 billion"], correct: 2 },
        { q: "Which music genre did NOT originate in the USA?", a: ["Jazz","Blues","Hip-Hop","Classical"], correct: 3 },
        { q: "In what year did Apollo 11 land on the Moon?", a: ["1965","1967","1969","1971"], correct: 2 },
      ]
    }
  },

  "Brazil": {
    mascot: "??",
    mascotName: "Zico the Macaw",
    greeting: "Bem-vindo!",
    greetingMeaning: "Welcome!",
    colors: ["#009c3b","#ffdf00","#002776"],
    tagline: "Carnaval, football, samba & the Amazon",
    cultureVideo: { id: "S33jIiCHZLI", title: "Brazil — Culture, Carnival & Amazon" },
    funFacts: [
      "?? The Amazon Rainforest produces 20% of the world's oxygen — it's called the Earth's lungs",
      "Brazil has won the FIFA World Cup 5 times — more than any other country",
      "?? Rio Carnival is the biggest festival on Earth — 2 million people dance in the streets daily",
      "Brazil is the world's largest coffee producer — growing 40% of the global supply",
      "?? Samba has roots in African rhythms brought to Brazil by enslaved people in the 1800s",
    ],
    game: {
      type: "quiz",
      title: "???? Brazil Culture Quiz",
      questions: [
        { q: "How many FIFA World Cups has Brazil won?", a: ["3","4","5","6"], correct: 2 },
        { q: "What % of the world's oxygen does the Amazon produce?", a: ["5%","10%","20%","30%"], correct: 2 },
        { q: "How many people dance daily at Rio Carnival?", a: ["500K","1 million","2 million","5 million"], correct: 2 },
        { q: "Brazil produces what % of world coffee supply?", a: ["10%","20%","30%","40%"], correct: 3 },
      ]
    }
  },

  "India": {
    mascot: "??",
    mascotName: "Ganesha the Elephant",
    greeting: "नमस्ते! (Namaste!)",
    greetingMeaning: "I bow to the divine in you",
    colors: ["#ff9933","#ffffff","#138808"],
    tagline: "Land of spices, yoga, Bollywood & diversity",
    cultureVideo: { id: "gCv6psf-oNQ", title: "India — Ancient Culture & Incredible Beauty" },
    funFacts: [
      "?? Yoga originated in India over 5,000 years ago — now practised by 300 million people worldwide",
      "?? Bollywood produces more films per year than Hollywood — about 1,800 films annually",
      "Chess was invented in India — originally called Chaturanga in the 6th century",
      "??️ India is the world's largest spice producer — growing 75% of the world's supply",
      "??️ India has the world's largest democracy — 900 million eligible voters",
    ],
    game: {
      type: "quiz",
      title: "???? India Culture Quiz",
      questions: [
        { q: "Where did yoga originate?", a: ["China","Tibet","India","Japan"], correct: 2 },
        { q: "What was chess originally called in India?", a: ["Shatranj","Chaturanga","Pachisi","Chakravyuha"], correct: 1 },
        { q: "How many films does Bollywood produce per year?", a: ["600","1000","1800","3000"], correct: 2 },
        { q: "India produces what % of the world's spices?", a: ["25%","50%","75%","90%"], correct: 2 },
      ]
    }
  },

  "China": {
    mascot: "??",
    mascotName: "Long the Dragon",
    greeting: "欢迎! (Huānyíng!)",
    greetingMeaning: "Welcome!",
    colors: ["#de2910","#ffde00"],
    tagline: "5000 years of civilisation & innovation",
    cultureVideo: { id: "1Wj0cqTIQ8c", title: "China — Ancient Culture & Modern Marvel" },
    funFacts: [
      "?? The Great Wall of China is NOT visible from space — that's a myth, but it is 21,196 km long",
      "?? China invented paper, printing, gunpowder, and the compass — the 4 great inventions",
      "?? Chinese chopsticks have been used for 5,000 years — and 45 billion pairs are used annually",
      "?? Giant Pandas are native only to China — there are fewer than 1,900 left in the wild",
      "?? China invented noodles 4,000 years ago — long before Italy had pasta",
    ],
    game: {
      type: "quiz",
      title: "???? China Culture Quiz",
      questions: [
        { q: "How long is the Great Wall of China?", a: ["5,000 km","13,000 km","21,196 km","30,000 km"], correct: 2 },
        { q: "Which of these did China NOT invent?", a: ["Paper","Printing","The telephone","Gunpowder"], correct: 2 },
        { q: "How many wild Giant Pandas remain?", a: ["Under 500","Under 1,000","Under 1,900","Under 3,000"], correct: 2 },
        { q: "China invented noodles roughly how long ago?", a: ["1,000 years","2,000 years","4,000 years","6,000 years"], correct: 2 },
      ]
    }
  },

  "South Africa": {
    mascot: "??",
    mascotName: "Ubuntu the Lion",
    greeting: "Sawubona!",
    greetingMeaning: "I see you (Zulu)",
    colors: ["#007a4d","#000000","#de3831","#002395","#ffb612","#ffffff"],
    tagline: "Rainbow Nation — 11 languages, 1 spirit",
    cultureVideo: { id: "Vc3jdw3xFB4", title: "South Africa — The Rainbow Nation" },
    funFacts: [
      "?? South Africa has 11 official languages — the most of any African country",
      "?? South Africa produces 75% of the world's diamonds and 40% of its gold",
      "?? The Big Five (lion, elephant, buffalo, leopard, rhino) are all found in South Africa",
      "South Africa hosted the FIFA World Cup in 2010 — first African country to do so",
      "??️ Nelson Mandela was imprisoned for 27 years before becoming president",
    ],
    game: {
      type: "quiz",
      title: "???? South Africa Culture Quiz",
      questions: [
        { q: "How many official languages does South Africa have?", a: ["5","7","9","11"], correct: 3 },
        { q: "What % of world diamonds does South Africa produce?", a: ["25%","50%","75%","90%"], correct: 2 },
        { q: "In what year did South Africa host the FIFA World Cup?", a: ["2006","2008","2010","2012"], correct: 2 },
        { q: "How long was Nelson Mandela imprisoned?", a: ["10 years","17 years","27 years","35 years"], correct: 2 },
      ]
    }
  },

};

const DEFAULT_CULTURE = {
  mascot: "??",
  mascotName: "Globe",
  greeting: "Hello!",
  greetingMeaning: "Welcome to this country!",
  colors: ["#00e5ff","#0055cc","#03070f"],
  tagline: "Explore culture, weather & more",
  cultureVideo: null,
  funFacts: [
    "?? This country is full of unique history and culture",
    "??️ Explore it by clicking the Map tab",
    "Find flights in the Flights tab",
  ],
  game: null,
};

function getCultureData(countryName) {
  return CULTURE_DATA[countryName] || DEFAULT_CULTURE;
}
