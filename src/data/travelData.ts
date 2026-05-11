// ──────────────── DATA SOURCE ────────────────
// This file is the single source of truth for the website's content.
// Changing images or text here will update the website immediately.

export const HERO_SLIDES = [
  { 
    img: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1920", 
    tag: "✦ Wonder of the World ✦", 
    title: "Where Ancient Stories", 
    title2: "Meet Modern Souls" 
  },
  { 
    img: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=1920", 
    tag: "✦ The Golden City ✦", 
    title: "Lose Yourself in", 
    title2: "Desert Sunsets" 
  },
  { 
    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1920", 
    tag: "✦ God's Own Country ✦", 
    title: "Drift Through", 
    title2: "Emerald Backwaters" 
  },
];

export interface Place {
  id: string;
  name: string;
  stateSlug: string;
  city: string;
  category: string;
  image: string;
  description: string;
  bestTime: string;
  timing: string;
  entry: string;
  nearby: string;
  // Coordinates for Google Maps (destination)
  destination: string; // human-readable destination for Maps query
}

export interface State {
  slug: string;
  name: string;
  region: string;
  capital: string;
  tags: string[];
  image: string;
  description: string;
  longDescription: string;
}

export const states: State[] = [
  {
    slug: "rajasthan",
    name: "Rajasthan",
    region: "North",
    capital: "Jaipur",
    tags: ["Heritage", "Desert", "Forts"],
    image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=1280",
    description: "The Land of Kings — majestic forts, golden deserts, vibrant culture, and royal palaces.",
    longDescription:
      "Rajasthan, the Land of Kings, is a kaleidoscope of regal forts, golden dunes, vivid bazaars, and palaces that whisper stories of valour. From the pink avenues of Jaipur to the golden glow of Jaisalmer and the blue lanes of Jodhpur, every city is a living postcard.",
  },
  {
    slug: "kerala",
    name: "Kerala",
    region: "South",
    capital: "Thiruvananthapuram",
    tags: ["Backwaters", "Nature", "Ayurveda"],
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1280",
    description: "God's Own Country — emerald backwaters, spice gardens, and pristine beaches.",
    longDescription:
      "Kerala is a tropical symphony of palm-lined backwaters, misty tea hills, ancient temples and a coastline kissed by the Arabian Sea. Glide through Alleppey on a houseboat, sip cardamom-scented chai in Munnar, and discover Ayurvedic traditions older than memory.",
  },
  {
    slug: "uttar-pradesh",
    name: "Uttar Pradesh",
    region: "North",
    capital: "Lucknow",
    tags: ["Heritage", "Religious", "Mughal"],
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1280",
    description: "Home to the Taj Mahal and Varanasi — the heartland of Indian civilisation.",
    longDescription:
      "Uttar Pradesh is the soul of India — where the Taj Mahal stands timeless in Agra, the Ganga flows through eternal Varanasi, and Lucknow's Nawabi grace lingers in every kebab and chikan thread.",
  },
  {
    slug: "himachal-pradesh",
    name: "Himachal Pradesh",
    region: "North",
    capital: "Shimla",
    tags: ["Mountains", "Adventure", "Snow"],
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1280",
    description: "A mountain paradise — snow-capped peaks and exhilarating adventure sports.",
    longDescription:
      "Himachal Pradesh cradles the Himalayas in apple orchards, deodar forests and crisp pine-scented air. Trek to Triund, ski in Solang, meditate in Dharamshala, or simply lose yourself in the stillness of Spiti's moonscape.",
  },
  {
    slug: "goa",
    name: "Goa",
    region: "West",
    capital: "Panaji",
    tags: ["Beach", "Nightlife", "Portuguese"],
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1280",
    description: "Sun-soaked beaches, Portuguese architecture, and vibrant markets.",
    longDescription:
      "Goa is a sunlit cocktail of Portuguese cathedrals, candle-lit beach shacks, feni-fuelled nights and quiet Anjuna mornings. From Baga's beats to Old Goa's basilicas, it's two worlds in one.",
  },
  {
    slug: "karnataka",
    name: "Karnataka",
    region: "South",
    capital: "Bengaluru",
    tags: ["Heritage", "Nature", "Tech"],
    image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Jog_Roarer.JPG",
    description: "From the ruins of Hampi to the coffee estates of Coorg.",
    longDescription:
      "Karnataka spans the surreal boulders of Hampi, the misty plantations of Coorg, the palace lights of Mysuru and the cosmopolitan pulse of Bengaluru. A state of layered contrasts.",
  },
  {
    slug: "tamil-nadu",
    name: "Tamil Nadu",
    region: "South",
    capital: "Chennai",
    tags: ["Temples", "Culture", "Classical"],
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Statue_of_Thiruvalluvar.jpg",
    description: "Towering gopurams, classical Bharatanatyam, and timeless Dravidian heritage.",
    longDescription:
      "Tamil Nadu is the cradle of Dravidian civilisation. Marvel at Madurai's Meenakshi Temple, walk Mahabalipuram's shore temples, and unwind in the cool greens of Ooty and Kodaikanal.",
  },
  {
    slug: "west-bengal",
    name: "West Bengal",
    region: "East",
    capital: "Kolkata",
    tags: ["Culture", "Heritage", "Wildlife"],
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Victoria_Memorial_Illuminated_at_Night.jpg",
    description: "Colonial grandeur, Sundarbans mangroves and Darjeeling tea gardens.",
    longDescription:
      "West Bengal pairs Kolkata's literary cafés and tram-clanged streets with Darjeeling's toy train, Sundarbans tigers, and Durga Puja's electric devotion.",
  },
  {
    slug: "meghalaya",
    name: "Meghalaya",
    region: "Northeast",
    capital: "Shillong",
    tags: ["Nature", "Waterfalls", "Caves"],
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Nohkalikai_Falls_Cherrapunji.JPG",
    description: "The Abode of Clouds — living root bridges and the wettest place on earth.",
    longDescription:
      "Meghalaya is rain-drenched magic — living root bridges of Cherrapunji, the crystal pools of Dawki, and Shillong's cafés humming with indie music.",
  },
  { slug: "madhya-pradesh", name: "Madhya Pradesh", region: "Central", capital: "Bhopal", tags: ["Wildlife", "Heritage", "Temples"], image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Khajuraho.KandariyaMahadeva.jpg", description: "Heart of India — Khajuraho temples, tigers of Kanha, and Sanchi stupas.", longDescription: "Madhya Pradesh sits at India's heart with Khajuraho's intricate temples, tiger reserves of Kanha and Bandhavgarh, and the meditative ghats of Maheshwar." },
  { slug: "gujarat", name: "Gujarat", region: "West", capital: "Gandhinagar", tags: ["Heritage", "Wildlife", "Crafts"], image: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Fort_Palace_-_Jaisalmer_%288029457852%29.jpg", description: "Land of the Asiatic Lion and the white salt desert of Kutch.", longDescription: "Gujarat dazzles with the Rann of Kutch's white desert, Gir's lions, Dwarka's temples, and the world's tallest Statue of Unity." },
  { slug: "jammu-kashmir", name: "Jammu & Kashmir", region: "North", capital: "Srinagar", tags: ["Mountains", "Nature", "Shikara"], image: "https://upload.wikimedia.org/wikipedia/commons/3/37/Rohtang_pass_snowy_valley01.jpg", description: "Paradise on Earth — houseboats, ski slopes, Mughal Gardens.", longDescription: "Kashmir is Dal Lake's shikaras, Gulmarg's slopes, saffron fields of Pampore, and the verdant valleys of Pahalgam and Sonmarg." },
  { slug: "assam", name: "Assam", region: "Northeast", capital: "Dispur", tags: ["Wildlife", "Tea", "River"], image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Beauty_of_Kaziranga_National_Park.jpg", description: "Home of the one-horned rhino and lush tea gardens.", longDescription: "Assam unfolds along the Brahmaputra — Kaziranga's wildlife, Majuli's river island culture, and tea estates that brew the world's morning cup." },
  { slug: "maharashtra", name: "Maharashtra", region: "West", capital: "Mumbai", tags: ["Heritage", "Beaches", "Caves"], image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Ajanta_%2863%29.jpg", description: "Mumbai's energy meets Ajanta-Ellora's rock-cut wonders.", longDescription: "Maharashtra ranges from Mumbai's vibrant chaos to Ajanta-Ellora's masterpieces, the Konkan coast, and the Sahyadri's misty forts." },
  { slug: "sikkim", name: "Sikkim", region: "Northeast", capital: "Gangtok", tags: ["Mountains", "Buddhist", "Flowers"], image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Buddha_statue_at_Buddha_Park_of_Ravangla%2C_Sikkim%2C_India_%281%29.jpg", description: "Views of Kangchenjunga, monasteries and rhododendron valleys.", longDescription: "Sikkim is India's most pristine Himalayan jewel — Tsomgo Lake, Yumthang's Valley of Flowers, and ancient monasteries like Rumtek and Pemayangtse." },
  { slug: "odisha", name: "Odisha", region: "East", capital: "Bhubaneswar", tags: ["Temples", "Beach", "Tribal"], image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Konarka_Temple.jpg", description: "Puri's Jagannath, Konark's Sun Temple, Chilika's flamingos.", longDescription: "Odisha is the temple state — Puri, Konark and Bhubaneswar form the Golden Triangle of ancient stone architecture, with tribal art still vibrant in Bastar." },
  { slug: "andhra-pradesh", name: "Andhra Pradesh", region: "South", capital: "Amaravati", tags: ["Religious", "Coast", "Caves"], image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg", description: "Tirupati Balaji, Araku Valley, and Borra caves.", longDescription: "Andhra Pradesh holds Tirupati — among the world's most visited temples — alongside the coffee-scented Araku Valley and the long Bay of Bengal coast." },
  { slug: "telangana", name: "Telangana", region: "South", capital: "Hyderabad", tags: ["Architecture", "History", "Lakes"], image: "https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg", description: "Land of the Nizams — Charminar, biryani, and pearl bazaars.", longDescription: "Telangana centres on Hyderabad's Charminar, Golconda Fort, Hussain Sagar's lake-city pulse, and a culinary legacy crowned by Hyderabadi biryani." },
  { slug: "punjab", name: "Punjab", region: "North", capital: "Chandigarh", tags: ["Religious", "Farms", "Food"], image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Golden_Temple%2C_Amritsar_03.jpg", description: "The land of five rivers and the Golden Temple.", longDescription: "Punjab pulses with the Golden Temple's serenity, the Wagah border ceremony's energy, mustard fields, bhangra beats and food that travels the world." },
  { slug: "bihar", name: "Bihar", region: "East", capital: "Patna", tags: ["Buddhist", "Spiritual", "History"], image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Mahabodhi_temple_complex.jpg", description: "Birthplace of Buddhism, home to Bodh Gaya and Nalanda.", longDescription: "Bihar is sacred ground — Bodh Gaya where the Buddha attained enlightenment, the ancient Nalanda University ruins, and the bustling ghats of Patna." },
  { slug: "arunachal-pradesh", name: "Arunachal Pradesh", region: "Northeast", capital: "Itanagar", tags: ["Dawn-lit", "Tribal", "Nature"], image: "https://upload.wikimedia.org/wikipedia/commons/9/92/TawangMonastery.jpg", description: "Land of the rising sun, Tawang monastery, hidden valleys.", longDescription: "Arunachal Pradesh is India's last frontier — Tawang's giant monastery, Ziro Valley's Apatani tribes, and dawn breaking first across the country." },
  { slug: "nagaland", name: "Nagaland", region: "Northeast", capital: "Kohima", tags: ["Tribal", "Hornbill", "Culture"], image: "https://upload.wikimedia.org/wikipedia/commons/1/12/Doyang_Lake_House.jpg", description: "Land of festivals — the Hornbill Festival is a tribal spectacle.", longDescription: "Nagaland is sixteen tribes weaving a vivid cultural tapestry, the December Hornbill Festival, and rolling Dzükou Valley meadows." },
];

// ──────────────── CATEGORIES ────────────────
export interface Category {
  slug: string;
  name: string;
  count: string;
  image: string;
  description: string;
}

export const categories: Category[] = [
  { slug: "Heritage", name: "Heritage", count: "200+ Sites", image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Taj_Mahal_Front.JPG", description: "Step back in time and explore India's magnificent forts, palaces, and UNESCO World Heritage sites." },
  { slug: "Nature", name: "Nature", count: "180+ Parks", image: "https://upload.wikimedia.org/wikipedia/commons/4/43/The_Backwaters_of_Kerala.JPG", description: "Pristine landscapes, mountains, and serene backwaters across the subcontinent." },
  { slug: "Religious", name: "Religious", count: "250+ Temples", image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Lord_Shiva_statue_at_Murudeshwara.jpg", description: "A spiritual journey across ancient temples, sacred ghats, and peaceful monasteries." },
  { slug: "Adventure", name: "Adventure", count: "120+ Spots", image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Dandeli_river_rafting.jpg", description: "Thrilling treks, water sports, and Himalayan expeditions." },
  { slug: "Beach", name: "Beaches", count: "90+ Beaches", image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Baga_Beach-India_Goa-Andres_Larin.jpg", description: "Sun-kissed shores, turquoise waters, and coastal magic." },
  { slug: "Wildlife", name: "Wildlife", count: "54+ Reserves", image: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Black_Panther_-_India.jpg", description: "Majestic tigers, one-horned rhinos and rare species in their natural habitats." },
];

// ──────────────── FESTIVALS ────────────────
export interface Festival {
  name: string;
  month: string;
  location: string;
  description: string;
  image: string;
}

export const festivals: Festival[] = [
  { name: "Holi", month: "MARCH", location: "Mathura & Vrindavan", description: "The festival of colours that paints the entire nation in vivid hues of joy.", image: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Lathmar_Holi_2022_in_Nandgaon%2C_Uttar_Pradesh_%28edited%29.jpg" },
  { name: "Diwali", month: "OCT–NOV", location: "Varanasi & Jaipur", description: "The festival of lights — millions of diyas create a breathtaking spectacle.", image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Fireworks_Diwali_Chennai_India_November_2013_b.jpg" },
  { name: "Durga Puja", month: "OCTOBER", location: "Kolkata, West Bengal", description: "Kolkata transforms into an open-air art gallery — a UNESCO cultural celebration.", image: "https://upload.wikimedia.org/wikipedia/commons/0/07/Durga_puja_in_Dhakeshwari_temple.jpg" },
  { name: "Mysore Dasara", month: "OCTOBER", location: "Mysore, Karnataka", description: "Mysore Dasara is the 10-day Nada Habba (state festival) of Karnataka celebrating the victory of Goddess Chamundeshwari over Mahishasura.", image: "https://upload.wikimedia.org/wikipedia/commons/0/00/Mysore_palace_illuminated.jpg" },
  { name: "Christmas", month: "DECEMBER", location: "India", description: "Christmas is an annual festival celebrated on December 25th to commemorate the birth of Jesus Christ.", image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/NativityChristmasLights2.jpg" },
  { name: "Pushkar Fair", month: "NOVEMBER", location: "Pushkar, Rajasthan", description: "One of the world's largest camel fairs — folk music, trading and races in the desert.", image: "https://upload.wikimedia.org/wikipedia/commons/2/29/%281%29_Pushkar_Fair%2C_Camel_Festival%2C_I_love_my_camel.jpg" },
];

// ──────────────── TRAVEL TIPS ────────────────
export const travelTips = [
  { icon: "🌤️", title: "Best Time to Visit", desc: "October to March is ideal for most of India. Hill stations shine in summer; Kerala & Goa glow in monsoon." },
  { icon: "🚂", title: "Getting Around", desc: "India's rail network connects every state — book on IRCTC. For remote areas, hire local guides with 4x4s." },
  { icon: "🍛", title: "Food & Culture", desc: "Try local cuisine in every state — it changes dramatically. Remove footwear at temples; dress modestly." },
  { icon: "💊", title: "Health & Safety", desc: "Drink bottled or filtered water. Carry basic medicines. Travel insurance is strongly recommended." },
  { icon: "💰", title: "Budget Planning", desc: "From ₹500/day backpacker trips to luxury palace hotels — India caters to every budget." },
];

export const placesByCategory = (cat: string) =>
  places.filter((p) => p.category.toLowerCase().includes(cat.toLowerCase()));

export const places: Place[] = [
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    stateSlug: "uttar-pradesh",
    city: "Agra",
    category: "UNESCO World Heritage",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1280",
    description:
      "An ivory-white marble mausoleum built by Mughal Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal. A timeless symbol of love and one of the Seven Wonders of the World.",
    bestTime: "October to March",
    timing: "Sunrise to Sunset (Closed Fridays)",
    entry: "₹50 (Indians) · ₹1,100 (Foreigners)",
    nearby: "Agra Fort, Fatehpur Sikri, Mathura, Vrindavan",
    destination: "Taj Mahal, Agra, Uttar Pradesh",
  },
  {
    id: "varanasi-ghats",
    name: "Varanasi Ghats",
    stateSlug: "uttar-pradesh",
    city: "Varanasi",
    category: "Religious · Spiritual",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg",
    description:
      "Eighty-eight stone ghats line the Ganga in the world's oldest living city. Witness the mesmerising evening Aarti at Dashashwamedh Ghat — fire, incense and unbroken devotion.",
    bestTime: "October to March",
    timing: "All Day (Aarti 6:00–7:30 PM)",
    entry: "Free (Boat rides ₹100–500)",
    nearby: "Sarnath, Ramnagar Fort, Vindhyachal",
    destination: "Dashashwamedh Ghat, Varanasi",
  },
  {
    id: "kerala-backwaters",
    name: "Kerala Backwaters",
    stateSlug: "kerala",
    city: "Alleppey",
    category: "Nature · Houseboat",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1280",
    description:
      "A 900 km network of canals, lakes and lagoons threading through coconut groves and paddy fields. Drift on a kettuvallam houseboat through one of India's most iconic landscapes.",
    bestTime: "September to March",
    timing: "Year round",
    entry: "Houseboat ₹7,000–25,000 / night",
    nearby: "Kumarakom, Vembanad Lake, Kochi",
    destination: "Alleppey Backwaters, Kerala",
  },
  {
    id: "munnar",
    name: "Munnar Tea Hills",
    stateSlug: "kerala",
    city: "Munnar",
    category: "Hill Station",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/63/Tea_plantations_in_Munnar_-_panoramio.jpg",
    description:
      "Endless emerald tea plantations roll across the Western Ghats at 1,600m. Cool air, colonial bungalows and the rare Neelakurinji bloom every twelve years.",
    bestTime: "September to March",
    timing: "Year round",
    entry: "Free (Tea Museum ₹100)",
    nearby: "Eravikulam Park, Mattupetty Dam, Top Station",
    destination: "Munnar, Kerala",
  },
  {
    id: "jaisalmer-fort",
    name: "Jaisalmer Fort",
    stateSlug: "rajasthan",
    city: "Jaisalmer",
    category: "Heritage · Desert",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/46/Jaisalmer_Fort.jpg",
    description:
      "Rising from the Thar like a mirage of honey-coloured sandstone, the 12th-century Sonar Quila is one of the world's few living forts — thousands still call it home.",
    bestTime: "November to February",
    timing: "9:00 AM – 6:00 PM",
    entry: "₹50 (Indians) · ₹250 (Foreigners)",
    nearby: "Sam Sand Dunes, Patwon ki Haveli, Gadisar Lake",
    destination: "Jaisalmer Fort, Rajasthan",
  },
  {
    id: "city-palace-jaipur",
    name: "City Palace, Jaipur",
    stateSlug: "rajasthan",
    city: "Jaipur",
    category: "Heritage · Royal",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Chandra_Mahal%2C_City_Palace%2C_Jaipur%2C_20191218_0951_9043.jpg",
    description:
      "A breathtaking blend of Rajput, Mughal and European architecture in the heart of the Pink City. Wander through Mubarak Mahal, the Peacock Gate, and royal armouries.",
    bestTime: "October to March",
    timing: "9:30 AM – 5:00 PM",
    entry: "₹200 (Indians) · ₹700 (Foreigners)",
    nearby: "Hawa Mahal, Jantar Mantar, Amer Fort",
    destination: "City Palace, Jaipur, Rajasthan",
  },
  {
    id: "hampi-ruins",
    name: "Hampi Ruins",
    stateSlug: "karnataka",
    city: "Hampi",
    category: "UNESCO · Ancient City",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Wide_angle_of_the_Galigopuram_in_Achyutaraya_complex.jpg",
    description:
      "The boulder-strewn capital of the Vijayanagara Empire — 500+ monuments scattered across 26 sq km, including the iconic Virupaksha and Vittala Temples.",
    bestTime: "October to February",
    timing: "Sunrise to Sunset",
    entry: "₹40 (Indians) · ₹600 (Foreigners)",
    nearby: "Vittala Temple, Matanga Hill, Tungabhadra Dam",
    destination: "Hampi, Karnataka",
  },
  {
    id: "coorg",
    name: "Coorg Coffee Estates",
    stateSlug: "karnataka",
    city: "Madikeri",
    category: "Hill Station · Nature",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Irrigation_in_Coffee_Plantations_9.jpg",
    description:
      "The Scotland of India — mist-wrapped coffee plantations, cardamom forests, Tibetan monasteries and the Cauvery's gentle headwaters.",
    bestTime: "October to March",
    timing: "Year round",
    entry: "Free",
    nearby: "Abbey Falls, Raja's Seat, Dubare Elephant Camp",
    destination: "Madikeri, Coorg, Karnataka",
  },
  {
    id: "shimla-mall-road",
    name: "Shimla Mall Road",
    stateSlug: "himachal-pradesh",
    city: "Shimla",
    category: "Hill Station · Colonial",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Mall_Road_Shimla_1.jpg",
    description:
      "The colonial summer capital's beating heart — strolling cafés, Christ Church spires, and panoramic Himalayan views from Scandal Point.",
    bestTime: "March to June, December for snow",
    timing: "All day",
    entry: "Free",
    nearby: "Kufri, Jakhu Temple, Chail",
    destination: "Mall Road, Shimla, Himachal Pradesh",
  },
  {
    id: "manali",
    name: "Manali Valley",
    stateSlug: "himachal-pradesh",
    city: "Manali",
    category: "Adventure · Mountains",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/03/Manali_City.jpg",
    description:
      "Apple orchards, the rushing Beas, snow-tipped Solang slopes and the gateway to Spiti and Ladakh. A perennial favourite for honeymooners and trekkers alike.",
    bestTime: "October to June",
    timing: "Year round",
    entry: "Free",
    nearby: "Solang Valley, Rohtang Pass, Old Manali",
    destination: "Manali, Himachal Pradesh",
  },
  {
    id: "baga-beach",
    name: "Baga Beach",
    stateSlug: "goa",
    city: "North Goa",
    category: "Beach · Nightlife",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Baga_Beach-India_Goa-Andres_Larin.jpg",
    description:
      "Goa's most lively stretch of sand — water sports by day, world-famous shacks like Britto's and Tito's by night.",
    bestTime: "November to February",
    timing: "All day",
    entry: "Free",
    nearby: "Calangute, Anjuna, Sinquerim",
    destination: "Baga Beach, Goa",
  },
  {
    id: "old-goa-basilica",
    name: "Basilica of Bom Jesus",
    stateSlug: "goa",
    city: "Old Goa",
    category: "UNESCO · Religious",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Front_Elevation_of_Basilica_of_Bom_Jesus.jpg",
    description:
      "A 16th-century baroque masterpiece holding the relics of St. Francis Xavier. UNESCO-listed and a soul-stirring counterpoint to Goa's beaches.",
    bestTime: "November to March",
    timing: "9:00 AM – 6:30 PM",
    entry: "Free",
    nearby: "Se Cathedral, Church of St. Cajetan, Panjim",
    destination: "Basilica of Bom Jesus, Old Goa",
  },
  {
    id: "meenakshi-temple",
    name: "Meenakshi Temple",
    stateSlug: "tamil-nadu",
    city: "Madurai",
    category: "Temple · Heritage",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/65/India_Meenakshi_Temple.jpg",
    description:
      "A riot of 33,000 sculptures across 14 towering gopurams — Madurai's living heart of Dravidian devotion for over 2,500 years.",
    bestTime: "October to March",
    timing: "5:00 AM – 12:30 PM, 4:00 – 9:30 PM",
    entry: "Free",
    nearby: "Thirumalai Nayakkar Palace, Gandhi Museum",
    destination: "Meenakshi Amman Temple, Madurai",
  },
  {
    id: "darjeeling-toy-train",
    name: "Darjeeling Toy Train",
    stateSlug: "west-bengal",
    city: "Darjeeling",
    category: "UNESCO · Heritage Railway",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/de/DarjeelingTrainFruitshopCrop.JPG",
    description:
      "Chuff through the clouds on the UNESCO-listed Himalayan Railway — past tea estates, with Kanchenjunga peeking in the distance.",
    bestTime: "March to May, October to November",
    timing: "Daily joy rides",
    entry: "Joy ride ₹1,500 approx",
    nearby: "Tiger Hill, Batasia Loop, Happy Valley Tea Estate",
    destination: "Darjeeling Himalayan Railway, Darjeeling",
  },
];

export const getStateBySlug = (slug: string) => states.find((s) => s.slug === slug);
export const getPlacesByState = (slug: string) => places.filter((p) => p.stateSlug === slug);
export const getPlaceById = (id: string) => places.find((p) => p.id === id);
