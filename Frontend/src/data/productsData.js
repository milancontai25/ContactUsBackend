export const MAIN_CATEGORIES = [
  {
    id: 'organic',
    pill: 'OUR PRODUCTS',
    title: 'Organic & Non-Organic Products',
    desc: 'At Ramsam Trends, we specialize in the export and import of premium organic and agricultural products, connecting wellness-focused brands and retailers with trusted global suppliers.',
    subcategories: [
      {
        id: 'organic-spices',
        name: 'Organic & Spices',
        img: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/1%20Organic%20SpicesOrganic%20Spices.png'
      },
      {
        id: 'pulses-rice',
        name: 'Pulses & Rice',
        img: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/Pulses%20and%20Rice.png'
      },
      {
        id: 'edible-oils',
        name: 'Edible Oils',
        img: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/3%20edible%20oils.jpeg'
      },
      {
        id: 'seeds-herbs',
        name: 'Seeds & Herbs',
        img: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/Seeds%20%26%20Herbs.png'
      }
    ]
  },
  {
    id: 'perishable',
    pill: 'OUR PRODUCTS',
    title: 'Perishable & Non-Perishable Products',
    desc: 'Ramsam Trends specializes in the seamless export and import of both perishable and non-perishable goods, delivering freshness, safety, and reliability across borders.',
    subcategories: [
      {
        id: 'dry-fruits-nuts',
        name: 'Dry Fruits & Nuts',
        img: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?q=80&w=600'
      },
      {
        id: 'beverage-raw-materials',
        name: 'Beverage Raw Materials',
        img: 'https://images.unsplash.com/photo-1597481499750-3e6b22687e12?q=80&w=600'
      },
      {
        id: 'bulk-commodities',
        name: 'Bulk Commodities Supply',
        img: 'https://images.unsplash.com/photo-1587049352847-4d4b126a61b5?q=80&w=600'
      },
      {
        id: 'animal-feed',
        name: 'Animal Feed & Feed Ingredients',
        img: 'https://images.unsplash.com/photo-1584346853240-3b10ec87db8c?q=80&w=600'
      }
    ]
  },
  {
    id: 'industrial',
    pill: 'OUR PRODUCTS',
    title: 'Energy, Metals & Industrial Commodities',
    desc: 'Ramsam Trends offers comprehensive export-import services for a wide range of industrial and non-industrial products, serving businesses across manufacturing, infrastructure, retail, and more.',
    subcategories: [
      {
        id: 'energy-products',
        name: 'Energy Products',
        img: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=600'
      },
      {
        id: 'base-metals',
        name: 'Base Metals',
        img: 'https://images.unsplash.com/photo-1518542331925-4e91e9aa0074?q=80&w=600'
      },
      {
        id: 'scrap-metals',
        name: 'Scrap Metals',
        img: 'https://images.unsplash.com/photo-1620023447999-528205d210ba?q=80&w=600'
      },
      {
        id: 'industrial-raw-materials',
        name: 'Industrial Raw Materials',
        img: 'https://images.unsplash.com/photo-1621685718712-4f35e8cc74c7?q=80&w=600'
      }
    ]
  }
];


export const DETAILED_PRODUCTS = [
  // ==========================================
  // 1. EDIBLE OILS (Kept original as requested)
  // ==========================================
  {
    id: 101,
    subcategoryId: 'edible-oils',
    name: 'Premium Sunflower Oil',
    category: 'Edible Oils',
    description: '100% pure refined sunflower oil, perfectly suited for high-temperature cooking, frying, and baking.',
    image_url: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/1%20%20sunflower%20oil.png',
    origin: 'Ukraine',
    specifications: { Grade: 'Refined A', Purity: '100%', Packaging: '1L, 5L, Bulk Flexitanks' }
  },
  {
    id: 102,
    subcategoryId: 'edible-oils',
    name: 'Refined Soybean Oil',
    category: 'Edible Oils',
    description: 'High-quality extracted soybean oil rich in polyunsaturated fats. Neutral flavor profile ideal for culinary applications.',
    image_url: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/2%20Refined%20Soybean%20Oil.png',
    origin: 'Brazil',
    specifications: { Grade: 'Food Grade', Extraction: 'Cold Pressed', Packaging: 'Pet Bottles / Bulk' }
  },
  {
    id: 103,
    subcategoryId: 'edible-oils',
    name: 'RBD Palm Oil',
    category: 'Edible Oils',
    description: 'Refined, Bleached, and Deodorized Palm Oil. Highly stable and versatile for food manufacturing and commercial kitchens.',
    image_url: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/3%20RBD%20Palm%20Oil.png',
    origin: 'Malaysia',
    specifications: { FFA: '0.1% Max', Moisture: '0.1% Max', Packaging: 'Jerry Cans / Drums' }
  },
  {
    id: 104,
    subcategoryId: 'edible-oils',
    name: 'Pure Rapeseed Oil',
    category: 'Edible Oils',
    description: 'High-grade rapeseed oil known for its low saturated fat content and excellent stability at high temperatures.',
    image_url: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/4%20Pure%20Rapeseed%20Oil.png',
    origin: 'Canada',
    specifications: { Type: 'Refined', Smoke_Point: '230°C', Packaging: 'IBC Tanks' }
  },
  {
    id: 105,
    subcategoryId: 'edible-oils',
    name: 'Canola Oil',
    category: 'Edible Oils',
    description: 'Premium light canola oil, ideal for dressings, baking, and sautéing, with zero trans fats.',
    image_url: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/5%20Canola%20Oil.png',
    origin: 'Canada',
    specifications: { Processing: 'Refined', Acidity: 'Low', Packaging: '1L, 5L, 20L' }
  },
  {
    id: 106,
    subcategoryId: 'edible-oils',
    name: 'Virgin Coconut Oil',
    category: 'Edible Oils',
    description: 'Unrefined, cold-pressed coconut oil retaining its natural aroma and nutritional benefits.',
    image_url: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/6%20Virgin%20Coconut%20Oil.png',
    origin: 'Philippines',
    specifications: { Type: 'Cold Pressed', Grade: 'Virgin', Packaging: 'Glass Jars / Bulk' }
  },
  {
    id: 107,
    subcategoryId: 'edible-oils',
    name: 'Extra Virgin Olive Oil',
    category: 'Edible Oils',
    description: 'First cold-pressed extra virgin olive oil with rich, robust flavor and high antioxidant content.',
    image_url: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/7%20Virgin%20Coconut%20Oil.png',
    origin: 'Spain',
    specifications: { Acidity: '< 0.8%', Pressing: 'Cold Pressed', Packaging: 'Glass / Tins' }
  },

  // ==========================================
  // 2. ORGANIC & SPICES
  // ==========================================
  { 
    id: 201, subcategoryId: 'organic-spices', name: 'Black Pepper', category: 'Spices', 
    description: 'Premium bold black pepper seeds (Tellicherry/Malabar), highly aromatic with intense pungency. Mechanically cleaned and sorted.', 
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600', 
    origin: 'India / Vietnam', specifications: { Grade: 'Asta / 500 GL', Moisture: '12% Max', Packaging: '25kg PP Bags' } 
  },
  { 
    id: 202, subcategoryId: 'organic-spices', name: 'Cardamom', category: 'Spices', 
    description: 'A-grade whole green cardamom pods with vibrant color, intense aroma, and rich essential oil content.', 
    image_url: 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?q=80&w=600', 
    origin: 'Guatemala / India', specifications: { Size: '8mm+', Color: 'Deep Green', Packaging: '5kg Carton' } 
  },
  { 
    id: 203, subcategoryId: 'organic-spices', name: 'Cloves', category: 'Spices', 
    description: 'Hand-selected aromatic Lal Pari cloves, rich in eugenol oil, perfect for culinary and medicinal extraction.', 
    image_url: 'https://images.unsplash.com/photo-1599909695627-14d2325b77ea?q=80&w=600', 
    origin: 'Indonesia / Madagascar', specifications: { Grade: 'Premium Lal Pari', Essential_Oil: '15% Min', Moisture: '12% Max' } 
  },
  { 
    id: 204, subcategoryId: 'organic-spices', name: 'Cinnamon', category: 'Spices', 
    description: 'Authentic Ceylon and Cassia cinnamon sticks, offering a warm, sweet, and woody flavor profile.', 
    image_url: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?q=80&w=600', 
    origin: 'Sri Lanka / Vietnam', specifications: { Type: 'Ceylon / Cassia', Length: '3 to 5 inches', Packaging: 'Carton Box' } 
  },
  { 
    id: 205, subcategoryId: 'organic-spices', name: 'Nutmeg', category: 'Spices', 
    description: 'Premium whole nutmeg with shell and without shell, renowned for its warm, spicy aroma and high oil content.', 
    image_url: 'https://images.unsplash.com/photo-1611077543884-25a666e6b528?q=80&w=600', 
    origin: 'Indonesia / India', specifications: { Grade: 'ABCD', Moisture: '10% Max', Processing: 'Sun Dried' } 
  },
  { 
    id: 206, subcategoryId: 'organic-spices', name: 'Turmeric Powder', category: 'Spices', 
    description: 'Finely ground, bright yellow turmeric powder with high curcumin content, sourced directly from organic farms.', 
    image_url: 'https://images.unsplash.com/photo-1615486171448-4fd1ff965df4?q=80&w=600', 
    origin: 'India', specifications: { Curcumin: '5-7%', Moisture: '10% Max', Mesh_Size: '60-80 Mesh' } 
  },
  { 
    id: 207, subcategoryId: 'organic-spices', name: 'Chili Powder', category: 'Spices', 
    description: 'Vibrant red, highly pungent chili powder milled from premium sun-dried chilies (Teja/Guntur varieties).', 
    image_url: 'https://images.unsplash.com/photo-1596647285603-0c15c26b6fb5?q=80&w=600', 
    origin: 'India', specifications: { Heat_Level: '30,000 - 50,000 SHU', Color: 'ASTA 60-80', Purity: '100%' } 
  },
  { 
    id: 208, subcategoryId: 'organic-spices', name: 'Coriander Powder', category: 'Spices', 
    description: 'Freshly milled coriander powder providing a citrusy, nutty flavor essential for spice blending and cooking.', 
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600', 
    origin: 'India', specifications: { Moisture: '10% Max', Purity: '99%', Packaging: '25kg Paper Bags' } 
  },
  { 
    id: 209, subcategoryId: 'organic-spices', name: 'Organic Ashwagandha', category: 'Herbs & Spices', 
    description: 'Premium dried Ashwagandha (Withania Somnifera) roots and powder, prized in Ayurvedic medicine for wellness supplements.', 
    image_url: 'https://images.unsplash.com/photo-1608681283626-d6215c0e1819?q=80&w=600', 
    origin: 'India', specifications: { Grade: 'Organic Certified', Form: 'Roots / Powder', Moisture: '8% Max' } 
  },
  { 
    id: 210, subcategoryId: 'organic-spices', name: 'Turmeric Fingers', category: 'Spices', 
    description: 'Polished and unpolished raw turmeric fingers, naturally sun-dried to preserve their deep color and essential oils.', 
    image_url: 'https://images.unsplash.com/photo-1606325515227-2c9eab410d8a?q=80&w=600', 
    origin: 'India', specifications: { Type: 'Salem / Nizamabad', Curcumin: '4-6%', Polish: 'Single / Double' } 
  },
  { 
    id: 211, subcategoryId: 'organic-spices', name: 'Organic Dry Ginger', category: 'Spices', 
    description: 'High-quality organic dried ginger (whole and split), offering a sharp, spicy flavor for culinary and herbal tea use.', 
    image_url: 'https://images.unsplash.com/photo-1599909695420-562db4bd9da6?q=80&w=600', 
    origin: 'India / Nigeria', specifications: { Form: 'Whole Dried', Moisture: '12% Max', Oil_Content: '1.5% Min' } 
  },

  // ==========================================
  // 3. PULSES & RICE
  // ==========================================
  { 
    id: 301, subcategoryId: 'pulses-rice', name: '1121 Basmati Rice', category: 'Rice', 
    description: 'Extra-long grain premium export Basmati rice, renowned for its exquisite fragrance, non-sticky texture, and exceptional elongation upon cooking.', 
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600', 
    origin: 'India', specifications: { Grain_Length: '8.35mm+', Broken: '1% Max', Moisture: '12.5% Max' } 
  },
  { 
    id: 302, subcategoryId: 'pulses-rice', name: 'Pusa Basmati Rice', category: 'Rice', 
    description: 'A highly aromatic, long-grain Basmati variant known for its soft texture, rich flavor, and excellent cooking qualities.', 
    image_url: 'https://images.unsplash.com/photo-1594315590298-328fca9ccbce?q=80&w=600', 
    origin: 'India', specifications: { Grain_Length: '7.50mm+', Sortex: '100% Clean', Moisture: '13% Max' } 
  },
  { 
    id: 303, subcategoryId: 'pulses-rice', name: 'Golden Sella Basmati Rice', category: 'Rice', 
    description: 'Parboiled Basmati rice with a characteristic golden hue. The parboiling process ensures the grains never stick and absorb flavors perfectly.', 
    image_url: 'https://images.unsplash.com/photo-1611599537845-1c7ce0070c68?q=80&w=600', 
    origin: 'India', specifications: { Type: 'Parboiled', Grain_Length: '8.30mm+', Color: 'Golden' } 
  },
  { 
    id: 304, subcategoryId: 'pulses-rice', name: 'White Sella Basmati Rice', category: 'Rice', 
    description: 'Premium parboiled white Basmati rice. Highly preferred in catering and commercial kitchens for its high yield and separation of grains.', 
    image_url: 'https://images.unsplash.com/photo-1568051243851-f9b15330ce18?q=80&w=600', 
    origin: 'India', specifications: { Type: 'Parboiled', Grain_Length: '8.30mm+', Color: 'Creamy White' } 
  },
  { 
    id: 305, subcategoryId: 'pulses-rice', name: 'IR64 Non-Basmati Rice', category: 'Rice', 
    description: 'Widely exported long-grain white rice, favored globally for its affordability, good taste, and volume expansion after cooking.', 
    image_url: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?q=80&w=600', 
    origin: 'India / Thailand', specifications: { Broken: '5% / 25%', Grain_Length: '6.0mm+', Moisture: '14% Max' } 
  },
  { 
    id: 306, subcategoryId: 'pulses-rice', name: 'Sona Masoori Rice', category: 'Rice', 
    description: 'Lightweight, aromatic medium-grain rice with low starch content, highly popular for daily dietary consumption.', 
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600', 
    origin: 'India', specifications: { Grain_Type: 'Medium', Sortex: '100% Clean', Admixture: '1% Max' } 
  },
  { 
    id: 307, subcategoryId: 'pulses-rice', name: 'Swarna Rice', category: 'Rice', 
    description: 'Healthy short-grain rice variety that is highly economical, easy to digest, and a staple for global bulk imports.', 
    image_url: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?q=80&w=600', 
    origin: 'India', specifications: { Grain_Type: 'Short', Broken: '5% Max', Moisture: '14% Max' } 
  },
  { 
    id: 308, subcategoryId: 'pulses-rice', name: 'Masoor Dal (Red Lentils)', category: 'Pulses', 
    description: 'Premium quality split red lentils, sortex cleaned, fast-cooking, and packed with dietary fiber and plant-based protein.', 
    image_url: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=600', 
    origin: 'Canada / Australia', specifications: { Purity: '99.5%', Foreign_Matter: '0.5% Max', Moisture: '12% Max' } 
  },
  { 
    id: 309, subcategoryId: 'pulses-rice', name: 'Moong Dal (Yellow Lentils)', category: 'Pulses', 
    description: 'Easily digestible split and skinned yellow lentils, essential for soups, curries, and savory snacks.', 
    image_url: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=600', 
    origin: 'India / Myanmar', specifications: { Purity: '99%', Sortex: 'Color Sorted', Packaging: '50kg PP Bags' } 
  },
  { 
    id: 310, subcategoryId: 'pulses-rice', name: 'Urad Dal (Black Gram)', category: 'Pulses', 
    description: 'Whole and split black gram, rich in protein and widely used for traditional batters and heavy curries.', 
    image_url: 'https://images.unsplash.com/photo-1581452296796-03f538ee591f?q=80&w=600', 
    origin: 'India', specifications: { Form: 'Whole / Split / Washed', Purity: '99%', Foreign_Matter: '1% Max' } 
  },
  { 
    id: 311, subcategoryId: 'pulses-rice', name: 'Kabuli Chana (White Chickpeas)', category: 'Pulses', 
    description: 'Large, uniform white chickpeas with a creamy texture, highly nutritious and perfect for hummus and culinary dishes.', 
    image_url: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=600', 
    origin: 'Russia / India', specifications: { Caliber: '8mm / 9mm / 12mm', Moisture: '12% Max', Broken: '2% Max' } 
  },
  { 
    id: 312, subcategoryId: 'pulses-rice', name: 'Desi Chana (Black Chickpeas)', category: 'Pulses', 
    description: 'Smaller, darker, and rough-coated chickpeas known for their intense nutty flavor and high dietary fiber content.', 
    image_url: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=600', 
    origin: 'India / Australia', specifications: { Purity: '99%', Size: 'Medium', Packaging: '25kg / 50kg Bags' } 
  },
  { 
    id: 313, subcategoryId: 'pulses-rice', name: 'Kidney Beans (Rajma)', category: 'Pulses', 
    description: 'Premium dark red and speckled kidney beans, retaining their shape perfectly during cooking while absorbing deep flavors.', 
    image_url: 'https://images.unsplash.com/photo-1581452296796-03f538ee591f?q=80&w=600', 
    origin: 'China / India', specifications: { Type: 'Dark Red / Light Speckled', Moisture: '14% Max', Purity: '99.5%' } 
  },

  // ==========================================
  // 4. SEEDS & HERBS
  // ==========================================
  { 
    id: 401, subcategoryId: 'seeds-herbs', name: 'Natural & Hulled Sesame Seeds', category: 'Seeds', 
    description: 'Premium white and black sesame seeds, rich in oil content and perfectly suited for bakery, confectionery, and oil extraction.', 
    image_url: 'https://images.unsplash.com/photo-1536640751936-7c0879ea933c?q=80&w=600', 
    origin: 'India / Africa', specifications: { Purity: '99.9%', Oil_Content: '48% Min', Moisture: '6% Max' } 
  },
  { 
    id: 402, subcategoryId: 'seeds-herbs', name: 'Flax Seeds (Linseed)', category: 'Seeds', 
    description: 'High-quality brown and golden flax seeds, rich in Omega-3 fatty acids and dietary fiber. Sortex cleaned for maximum purity.', 
    image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600', 
    origin: 'Russia / India', specifications: { Purity: '99.5%', Moisture: '8% Max', Form: 'Whole Seeds' } 
  },
  { 
    id: 403, subcategoryId: 'seeds-herbs', name: 'Cumin Seeds', category: 'Seeds', 
    description: 'Aromatic, machine-cleaned whole cumin seeds essential for global spice blending, culinary uses, and essential oil distillation.', 
    image_url: 'https://images.unsplash.com/photo-1589153579978-005d54a93dc6?q=80&w=600', 
    origin: 'India / Syria', specifications: { Grade: 'Singapore / Europe', Purity: '99%', Moisture: '9% Max' } 
  },
  { 
    id: 404, subcategoryId: 'seeds-herbs', name: 'Coriander Seeds', category: 'Seeds', 
    description: 'Sun-dried whole coriander seeds providing a citrusy, nutty flavor. Available in Eagle and Parrot grades.', 
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600', 
    origin: 'India / Bulgaria', specifications: { Purity: '99%', Split: '5% Max', Moisture: '9% Max' } 
  },
  { 
    id: 405, subcategoryId: 'seeds-herbs', name: 'Fennel Seeds', category: 'Seeds', 
    description: 'Sweet and highly aromatic green fennel seeds, widely used in culinary dishes, herbal teas, and natural medicine formulations.', 
    image_url: 'https://images.unsplash.com/photo-1606821588265-6677f2400e99?q=80&w=600', 
    origin: 'India / Egypt', specifications: { Purity: '99%', Color: 'Natural Green', Moisture: '10% Max' } 
  },
  { 
    id: 406, subcategoryId: 'seeds-herbs', name: 'Dried Basil Leaves', category: 'Herbs', 
    description: 'Premium dried sweet basil leaves, carefully processed and rubbed to retain their vibrant aroma and essential oils.', 
    image_url: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=600', 
    origin: 'Egypt / Turkey', specifications: { Form: 'Dried Rubbed', Moisture: '10% Max', Color: 'Bright Green' } 
  },
  { 
    id: 407, subcategoryId: 'seeds-herbs', name: 'Dried Mint Leaves', category: 'Herbs', 
    description: 'Refreshing dried peppermint and spearmint leaves, ideal for herbal teas, extracts, and culinary garnishes.', 
    image_url: 'https://images.unsplash.com/photo-1596541223130-5d56a7a9cc65?q=80&w=600', 
    origin: 'Egypt / India', specifications: { Form: 'Crushed / Whole', Essential_Oil: '1.5% Min', Purity: '99%' } 
  },
  { 
    id: 408, subcategoryId: 'seeds-herbs', name: 'Neem Leaves', category: 'Herbs', 
    description: 'Organic dried neem leaves, heavily utilized in Ayurvedic medicine, natural cosmetics, and agricultural extracts.', 
    image_url: 'https://images.unsplash.com/photo-1615486511484-92e172caf4fe?q=80&w=600', 
    origin: 'India', specifications: { Grade: 'A-Grade', Drying: 'Shadow Dried', Packaging: 'Bales / Cartons' } 
  },
  { 
    id: 409, subcategoryId: 'seeds-herbs', name: 'Curry Leaves', category: 'Herbs', 
    description: 'Aromatic dried curry leaves, meticulously processed to preserve their distinct flavor for authentic Asian and Indian cuisines.', 
    image_url: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=600', 
    origin: 'India', specifications: { Form: 'Dried Whole Leaves', Color: 'Natural Green', Moisture: '8% Max' } 
  },
  { 
    id: 410, subcategoryId: 'seeds-herbs', name: 'Organic Ashwagandha', category: 'Herbs', 
    description: 'Premium dried Ashwagandha (Withania Somnifera) roots and leaves, prized globally as a powerful adaptogen for wellness supplements.', 
    image_url: 'https://images.unsplash.com/photo-1608681283626-d6215c0e1819?q=80&w=600', 
    origin: 'India', specifications: { Grade: 'Organic Certified', Form: 'Roots / Cut', Moisture: '8% Max' } 
  },
  { 
    id: 411, subcategoryId: 'seeds-herbs', name: 'Tulsi (Holy Basil)', category: 'Herbs', 
    description: 'Sacred Tulsi leaves (Rama, Krishna, and Vana varieties), sun-dried to maintain their therapeutic properties for herbal infusions.', 
    image_url: 'https://images.unsplash.com/photo-1596485890069-4e78ab08778f?q=80&w=600', 
    origin: 'India', specifications: { Variety: 'Rama / Krishna / Vana', Drying: 'Sun Dried', Moisture: '10% Max' } 
  },
  { 
    id: 412, subcategoryId: 'seeds-herbs', name: 'Senna Leaves & Pods', category: 'Herbs', 
    description: 'High-grade Senna leaves and pods (Cassia Angustifolia), widely utilized in the pharmaceutical industry for digestive health products.', 
    image_url: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?q=80&w=600', 
    origin: 'India', specifications: { Sennoside: '2.5% Min', Purity: '99%', Packaging: 'Compressed Bales' } 
  },
  { 
    id: 413, subcategoryId: 'seeds-herbs', name: 'Chia Seeds', category: 'Seeds', 
    description: 'Nutrient-dense black and white chia seeds, packed with plant-based protein, dietary fiber, and Omega-3 fatty acids.', 
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600', 
    origin: 'South America', specifications: { Purity: '99.9%', Moisture: '8% Max', Packaging: '25kg Kraft Bags' } 
  },
  { 
    id: 414, subcategoryId: 'seeds-herbs', name: 'Pumpkin Seeds (Pepitas)', category: 'Seeds', 
    description: 'Premium AA-grade pumpkin seed kernels, raw or roasted, excellent for retail snacking, baking, and health food formulations.', 
    image_url: 'https://images.unsplash.com/photo-1596647285603-0c15c26b6fb5?q=80&w=600', 
    origin: 'China / Eastern Europe', specifications: { Grade: 'AA / A', Purity: '99.9%', Moisture: '7.5% Max' } 
  },
  { 
    id: 415, subcategoryId: 'seeds-herbs', name: 'Sunflower Seeds', category: 'Seeds', 
    description: 'High-quality striped and black sunflower seeds, available in-shell or as bakery-grade hulled kernels.', 
    image_url: 'https://images.unsplash.com/photo-1556910110-a5a63dfd393c?q=80&w=600', 
    origin: 'Ukraine / Bulgaria', specifications: { Type: 'Kernels / In-shell', Purity: '99.9%', Moisture: '8% Max' } 
  },

  // ==========================================
  // 5. DRY FRUITS & NUTS
  // ==========================================
  { 
    id: 501, subcategoryId: 'dry-fruits-nuts', name: 'Almonds (All Grades)', category: 'Nuts', 
    description: 'High-grade nonpareil almonds, rich in protein and ideal for snacking or commercial roasting.', 
    image_url: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?q=80&w=600', 
    origin: 'USA', specifications: { Size: '23/25 per Oz', Type: 'Nonpareil', Packaging: '25lbs / 50lbs Carton' } 
  },
  { 
    id: 502, subcategoryId: 'dry-fruits-nuts', name: 'Cashew Nuts (Processed & Raw)', category: 'Nuts', 
    description: 'Premium white whole cashew nuts, carefully processed for maximum crunch and flavor.', 
    image_url: 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?q=80&w=600', 
    origin: 'Vietnam / Africa', specifications: { Grade: 'W320 / W240', Moisture: '5% Max', Packaging: 'Vacuum Tins' } 
  },
  { 
    id: 503, subcategoryId: 'dry-fruits-nuts', name: 'Walnuts & Kernels', category: 'Nuts', 
    description: 'Light halves and pieces of premium walnuts, loaded with Omega-3 and natural oils.', 
    image_url: 'https://images.unsplash.com/photo-1581452296796-03f538ee591f?q=80&w=600', 
    origin: 'Chile / USA', specifications: { Color: 'Extra Light', Type: 'Halves (80%)', Packaging: '10kg Cartons' } 
  },
  { 
    id: 504, subcategoryId: 'dry-fruits-nuts', name: 'Raisins (All Varieties)', category: 'Dry Fruits', 
    description: 'Sun-dried, naturally sweet raisins. Thoroughly washed and laser sorted.', 
    image_url: 'https://images.unsplash.com/photo-1528659550796-1070e633d74f?q=80&w=600', 
    origin: 'Afghanistan / India', specifications: { Size: 'Jumbo', Moisture: '15% Max', Processing: 'Stemless' } 
  },

  // ==========================================
  // 6. BEVERAGE RAW MATERIALS
  // ==========================================
  { 
    id: 601, subcategoryId: 'beverage-raw-materials', name: 'Tea (Bulk & Premium)', category: 'Tea', 
    description: 'Rich, full-bodied black tea leaves sourced directly from high-altitude estates.', 
    image_url: 'https://images.unsplash.com/photo-1597481499750-3e6b22687e12?q=80&w=600', 
    origin: 'India / Kenya', specifications: { Type: 'CTC / Dust / Leaf', Infusion: 'Bright Red', Packaging: 'Paper Sacks' } 
  },
  { 
    id: 602, subcategoryId: 'beverage-raw-materials', name: 'Coffee (Beans & Powder)', category: 'Coffee', 
    description: 'Single-origin green coffee beans, ready for commercial roasting with distinct flavor profiles.', 
    image_url: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=600', 
    origin: 'Colombia / Vietnam', specifications: { Grade: 'AA / Screen 18', Moisture: '11% Max', Processing: 'Washed / Unwashed' } 
  },
  { 
    id: 603, subcategoryId: 'beverage-raw-materials', name: 'Herbal Tea & Infusions', category: 'Herbal', 
    description: 'Bulk organic herbs like Chamomile, Peppermint, and Hibiscus for specialty tea blending.', 
    image_url: 'https://images.unsplash.com/photo-1576092762791-dd9e2220dac1?q=80&w=600', 
    origin: 'Global', specifications: { Cut: 'TBC (Tea Bag Cut)', Purity: '99%', Certified: 'Organic' } 
  },

  // ==========================================
  // 7. BULK COMMODITIES SUPPLY
  // ==========================================
  { 
    id: 701, subcategoryId: 'bulk-commodities', name: 'Refined & Raw Sugar (ICUMSA Grades)', category: 'Sugar', 
    description: 'Sparkling white highly refined sugar suitable for human consumption and beverage manufacturing.', 
    image_url: 'https://images.unsplash.com/photo-1587049352847-4d4b126a61b5?q=80&w=600', 
    origin: 'Brazil / India', specifications: { Color: 'ICUMSA 45 Max', Polarization: '99.80% Min', Moisture: '0.04% Max' } 
  },
  { 
    id: 702, subcategoryId: 'bulk-commodities', name: 'Edible & Industrial Salt', category: 'Salt', 
    description: 'Pure refined salt for food processing, as well as raw sea salt and rock salt for industrial applications.', 
    image_url: 'https://images.unsplash.com/photo-1518110925485-6447e1329d2f?q=80&w=600', 
    origin: 'Egypt / India', specifications: { NaCl: '99% Min', Iodine: 'Optional (Food Grade)', Packaging: '50kg / Jumbo Bags' } 
  },
  { 
    id: 703, subcategoryId: 'bulk-commodities', name: 'Wheat & Wheat Products', category: 'Grains', 
    description: 'Hard and soft wheat varieties intended for human consumption, flour milling, and bakeries.', 
    image_url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600', 
    origin: 'Russia / Australia', specifications: { Protein: '11.5% - 12.5%', Moisture: '13% Max', Test_Weight: '78 kg/hl Min' } 
  },
  { 
    id: 704, subcategoryId: 'bulk-commodities', name: 'Maize (Corn) Products', category: 'Grains', 
    description: 'High-grade yellow corn for food processing, starch extraction, and human consumption.', 
    image_url: 'https://images.unsplash.com/photo-1601646845347-19d854497678?q=80&w=600', 
    origin: 'Brazil / USA', specifications: { Moisture: '14% Max', Broken: '3% Max', Aflatoxin: '20ppb Max' } 
  },
  { 
    id: 705, subcategoryId: 'bulk-commodities', name: 'Barley & Feed Grains', category: 'Grains', 
    description: 'Bulk barley suitable for malting, brewing, and animal feed manufacturing. Cleaned and graded for export.', 
    image_url: 'https://images.unsplash.com/photo-1582285513220-41bf8f6bdf1a?q=80&w=600', 
    origin: 'Ukraine / Australia', specifications: { Protein: '10% - 11.5%', Moisture: '13% Max', Plump_Grains: '85% Min' } 
  },
  { 
    id: 706, subcategoryId: 'bulk-commodities', name: 'Animal Feed & Agro Byproducts', category: 'Byproducts', 
    description: 'Bulk agricultural byproducts including Corn DDGS, Wheat Bran, and beet pulp pellets for high-efficiency livestock feeding.', 
    image_url: 'https://images.unsplash.com/photo-1595166318970-13f5367b6fcf?q=80&w=600', 
    origin: 'USA / India', specifications: { Protein: 'Varied (15-28%)', Fiber: 'High', Form: 'Pellets / Meal' } 
  },

  // ==========================================
  // 8. ANIMAL FEED & FEED INGREDIENTS
  // ==========================================
  { 
    id: 801, subcategoryId: 'animal-feed', name: 'Soybean Meal (SBM 46%)', category: 'Feed', 
    description: 'High-protein soybean meal primarily used as a highly digestible staple in poultry, swine, and livestock feed formulations.', 
    image_url: 'https://images.unsplash.com/photo-1584346853240-3b10ec87db8c?q=80&w=600', 
    origin: 'USA / Argentina', specifications: { Protein: '46% Min', Fiber: '3.5% Max', Moisture: '12% Max' } 
  },
  { 
    id: 802, subcategoryId: 'animal-feed', name: 'Yellow Maize (Feed Grade)', category: 'Feed', 
    description: 'Bulk yellow corn specifically sorted and graded for animal feed production, providing essential energy for livestock.', 
    image_url: 'https://images.unsplash.com/photo-1588607147775-f0bfb1ff0881?q=80&w=600', 
    origin: 'Brazil / Ukraine', specifications: { Moisture: '14.5% Max', Damage: '5% Max', Protein: '8% Min' } 
  },
  { 
    id: 803, subcategoryId: 'animal-feed', name: 'Rice Bran (Raw & De-oiled)', category: 'Feed', 
    description: 'Highly nutritious raw and De-Oiled Rice Bran (DORB), serving as an excellent source of bypass protein and fiber for cattle and poultry.', 
    image_url: 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?q=80&w=600', 
    origin: 'India / Thailand', specifications: { Protein: '16% Min (DORB)', Sand_Silica: '2.5% Max', Moisture: '10% Max' } 
  },
  { 
    id: 804, subcategoryId: 'animal-feed', name: 'Sunflower Meal', category: 'Feed', 
    description: 'Extracted sunflower meal available in pelleted or loose form, providing a cost-effective, high-fiber protein source for ruminants.', 
    image_url: 'https://images.unsplash.com/photo-1595844730298-b960ff885b11?q=80&w=600', 
    origin: 'Ukraine / Russia', specifications: { Protein: '35% Min', Fiber: '14% Max', Form: 'Pellets / Meal' } 
  },
  { 
    id: 805, subcategoryId: 'animal-feed', name: 'Corn Gluten Meal (60% Protein)', category: 'Feed', 
    description: 'Premium corn gluten meal offering exceptionally high protein content, rich in amino acids for aquafeed, poultry, and pet food.', 
    image_url: 'https://images.unsplash.com/photo-1627909543329-8f9f2dd0a56f?q=80&w=600', 
    origin: 'USA / China', specifications: { Protein: '60% Min', Moisture: '10% Max', Fat: '2.5% Max' } 
  },

  // ==========================================
  // 9. ENERGY PRODUCTS
  // ==========================================
  { 
    id: 901, subcategoryId: 'energy-products', name: 'EN 590 Diesel (10PPM)', category: 'Energy', 
    description: 'Ultra-low sulfur diesel fuel compliant with strict European standards, ideal for modern automotive and industrial machinery.', 
    image_url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=600', 
    origin: 'Middle East / USA', specifications: { Sulfur: '10 ppm Max', Cetane_Index: '51 Min', Density: '0.82-0.845 g/cm³' } 
  },
  { 
    id: 902, subcategoryId: 'energy-products', name: 'Aviation Turbine Fuel (Jet A1)', category: 'Energy', 
    description: 'Kerosene-type aviation fuel manufactured to rigorous international specifications for commercial airlines.', 
    image_url: 'https://images.unsplash.com/photo-1559087316-6b27308e53f6?q=80&w=600', 
    origin: 'Global', specifications: { Flash_Point: '38°C Min', Freezing_Point: '-47°C Max', Sulfur: '0.3% Max' } 
  },
  { 
    id: 903, subcategoryId: 'energy-products', name: 'Liquefied Petroleum Gas (LPG)', category: 'Energy', 
    description: 'Clean-burning LPG mixture of propane and butane for residential heating, cooking, and industrial applications.', 
    image_url: 'https://images.unsplash.com/photo-1601002360525-4b087095c10a?q=80&w=600', 
    origin: 'Qatar / USA', specifications: { Propane: 'Mixed', Vapor_Pressure: 'Standard', Supply: 'Pressurized Vessels' } 
  },

  // ==========================================
  // 10. BASE METALS
  // ==========================================
  { 
    id: 1001, subcategoryId: 'base-metals', name: 'Aluminium Ingots (A7, A8, A9)', category: 'Metals', 
    description: 'High-purity primary aluminium ingots widely used in automotive, aerospace, and construction manufacturing.', 
    image_url: 'https://images.unsplash.com/photo-1518542331925-4e91e9aa0074?q=80&w=600', 
    origin: 'UAE / Malaysia', specifications: { Purity: '99.7% Min (A7)', Weight: '20-25kg / Ingot', Form: 'Solid Ingot' } 
  },
  { 
    id: 1002, subcategoryId: 'base-metals', name: 'Copper Cathodes (99.99%)', category: 'Metals', 
    description: 'Grade A non-LME registered copper cathodes, the primary raw material for wire drawing and electrical components.', 
    image_url: 'https://images.unsplash.com/photo-1534063224213-ce311b1db2d5?q=80&w=600', 
    origin: 'Africa / Chile', specifications: { Purity: '99.99% Min', Dimension: '914x914x12mm', Weight: '125kg approx' } 
  },
  { 
    id: 1003, subcategoryId: 'base-metals', name: 'Zinc Ingots', category: 'Metals', 
    description: 'Special High-Grade (SHG) zinc ingots, extensively utilized for galvanizing steel, die-casting, and brass manufacturing.', 
    image_url: 'https://images.unsplash.com/photo-1611082531355-6b8015707de1?q=80&w=600', 
    origin: 'Australia / Peru', specifications: { Purity: '99.995% Min', Grade: 'SHG', Weight: '25kg approx' } 
  },
  { 
    id: 1004, subcategoryId: 'base-metals', name: 'Lead Ingots', category: 'Metals', 
    description: 'High-purity refined lead ingots, essential for lead-acid battery manufacturing, radiation shielding, and cable sheathing.', 
    image_url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600', 
    origin: 'Global', specifications: { Purity: '99.97% Min', Form: 'Ingot', Weight: '25kg - 40kg' } 
  },
  { 
    id: 1005, subcategoryId: 'base-metals', name: 'Nickel Metal', category: 'Metals', 
    description: 'High-grade nickel metal available in cathodes or briquettes. Crucial for producing stainless steel, superalloys, and EV batteries.', 
    image_url: 'https://images.unsplash.com/photo-1541887019808-0e9e4f5537ee?q=80&w=600', 
    origin: 'Russia / Canada', specifications: { Purity: '99.8% Min', Form: 'Cathodes / Briquettes', Grade: 'LME Grade' } 
  },

  // ==========================================
  // 11. SCRAP METALS
  // ==========================================
  { 
    id: 1101, subcategoryId: 'scrap-metals', name: 'Copper Scrap', category: 'Scrap', 
    description: 'Mixed copper scrap including pipes, tubes, and sheets, carefully sorted and ready for industrial smelting and refining.', 
    image_url: 'https://images.unsplash.com/photo-1558235214-257545b7db5b?q=80&w=600', 
    origin: 'Global', specifications: { Cu_Content: '95% - 99%', Form: 'Mixed Scrap', Impurities: 'Low' } 
  },
  { 
    id: 1102, subcategoryId: 'scrap-metals', name: 'Copper Millberry Scrap (ISRI BERRY)', category: 'Scrap', 
    description: 'Clean, untinned, uncoated, unalloyed copper wire and cable, completely free of brittle burnt wire.', 
    image_url: 'https://images.unsplash.com/photo-1620023447999-528205d210ba?q=80&w=600', 
    origin: 'Europe / USA', specifications: { ISRI_Code: 'BERRY', Cu_Content: '99.9% Min', Impurities: '0.1% Max' } 
  },
  { 
    id: 1103, subcategoryId: 'scrap-metals', name: 'Aluminium UBC Scrap (ISRI TALC)', category: 'Scrap', 
    description: 'Used Beverage Cans (UBC) pressed into dense briquettes or bales for highly efficient aluminium recycling.', 
    image_url: 'https://images.unsplash.com/photo-1533038590840-1cbea976a55e?q=80&w=600', 
    origin: 'Global', specifications: { ISRI_Code: 'TALC', Purity: '98%', Moisture: '2% Max' } 
  },
  { 
    id: 1104, subcategoryId: 'scrap-metals', name: 'HMS 1 & 2 Scrap (ISRI 200-206)', category: 'Scrap', 
    description: 'Heavy Melting Steel scrap (Ratio 80/20), widely used globally as a primary raw material in electric arc furnaces.', 
    image_url: 'https://images.unsplash.com/photo-1502422312891-b3b3e2b20245?q=80&w=600', 
    origin: 'UK / USA', specifications: { Ratio: '80/20', Density: 'High', Thickness: '1/4 inch Min' } 
  },
  { 
    id: 1105, subcategoryId: 'scrap-metals', name: 'Brass Honey Scrap (ISRI HONEY)', category: 'Scrap', 
    description: 'Clean yellow brass scrap consisting of castings, rolled brass, and rod brass, free from iron and non-metallic impurities.', 
    image_url: 'https://images.unsplash.com/photo-1541887019808-0e9e4f5537ee?q=80&w=600', 
    origin: 'Global', specifications: { ISRI_Code: 'HONEY', Condition: 'Clean', Fe_Content: 'Free of Iron' } 
  },
  { 
    id: 1106, subcategoryId: 'scrap-metals', name: 'Stainless Steel Scrap (SS 304 / 316)', category: 'Scrap', 
    description: 'High-grade stainless steel scrap sorted by grade (304 and 316), processed and ready for direct foundry application.', 
    image_url: 'https://images.unsplash.com/photo-1601370216672-04414eb1afbf?q=80&w=600', 
    origin: 'Global', specifications: { SS_Grades: '304 / 316', Form: 'Solids / Turnings', Condition: 'Clean' } 
  }

  // ==========================================
  // 12. INDUSTRIAL RAW MATERIALS
  // ==========================================
  { 
    id: 1201, subcategoryId: 'industrial-raw-materials', name: 'Sulphur (Granular / Lump)', category: 'Raw Materials', 
    description: 'High purity bright yellow elemental sulfur, an essential raw material for fertilizer production and sulfuric acid manufacturing.', 
    image_url: 'https://images.unsplash.com/photo-1580974852861-c381510bc98a?q=80&w=600', 
    origin: 'Middle East / Canada', specifications: { Purity: '99.5% Min', Form: 'Granular / Lumps', Ash: '0.05% Max' } 
  },
  { 
    id: 1202, subcategoryId: 'industrial-raw-materials', name: 'Petroleum Coke (Petcoke)', category: 'Raw Materials', 
    description: 'A carbon-rich solid material derived from oil refining, used heavily as a primary fuel in cement kilns and power generation.', 
    image_url: 'https://images.unsplash.com/photo-1621685718712-4f35e8cc74c7?q=80&w=600', 
    origin: 'USA / Saudi Arabia', specifications: { Sulfur: '6% Max', Ash: '1% Max', Volatile_Matter: '10% Max' } 
  },
  { 
    id: 1203, subcategoryId: 'industrial-raw-materials', name: 'Caustic Soda (Flakes / Liquid)', category: 'Raw Materials', 
    description: 'Industrial grade Sodium Hydroxide, a highly versatile alkali used extensively in water treatment, paper making, and textile manufacturing.', 
    image_url: 'https://images.unsplash.com/photo-1616263595462-0e318d1eeef8?q=80&w=600', 
    origin: 'China / India', specifications: { Purity: '99% Min', Form: 'Flakes / Liquid', Packaging: '25kg Bags / IBC Tanks' } 
  },
  { 
    id: 1204, subcategoryId: 'industrial-raw-materials', name: 'Paraffin Wax', category: 'Raw Materials', 
    description: 'Fully refined and semi-refined paraffin wax offering excellent thermal stability for packaging, candle making, and cosmetics.', 
    image_url: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=600', 
    origin: 'China / Middle East', specifications: { Melting_Point: '58-60°C', Oil_Content: '0.5% Max', Form: 'Slabs / Pellets' } 
  },
  { 
    id: 1205, subcategoryId: 'industrial-raw-materials', name: 'Soda Ash (Light / Dense)', category: 'Raw Materials', 
    description: 'High-quality Sodium Carbonate (Soda Ash), a fundamental industrial chemical for glass manufacturing, detergents, and metallurgy.', 
    image_url: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=600', 
    origin: 'USA / China', specifications: { Purity: '99.2% Min', Form: 'Light / Dense Powder', Packaging: '50kg / Bulk Bags' } 
  }
];