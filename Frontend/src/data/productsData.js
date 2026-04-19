export const MAIN_CATEGORIES = [
  {
    id: 'organic',
    pill: 'OUR PRODUCTS',
    title: 'Organic & Non-Organic Products',
    desc: 'At Ramsam Trends, we specialize in the export and import of premium organic and agricultural products, connecting wellness-focused brands and retailers with trusted global suppliers.',
    subcategories: [
      { id: 'organic-spices', name: 'Organic & Spices', img: 'http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/1 Organic SpicesOrganic Spices.png' },
      { id: 'pulses-rice', name: 'Pulses & Rice', img: 'http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/Pulses and Rice.png' },
      { id: 'edible-oils', name: 'Edible Oils', img: 'http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/3 edible oils.jpeg' },
      // { id: 'dry-fruits', name: 'Dry Fruits', img: 'http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/4 dry ffruits.png' },
      { id: 'seeds-herbs', name: 'Seeds & Herbs', img: 'https://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/Seeds & Herbs.png' },
    ]
  },
  {
    id: 'perishable',
    pill: 'OUR PRODUCTS',
    title: 'Perishable & Non-Perishable Products',
    desc: 'Ramsam Trends specializes in the seamless export and import of both perishable and non-perishable goods, delivering freshness, safety, and reliability across borders.',
    subcategories: [
      { id: 'dairy', name: 'Dairy (milk, cheese)', img: 'http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/5 Dairy (milk, cheese).png' },
      { id: 'meat-poultry', name: 'Meat & Poultry', img: 'http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/6 Meat & Poultry.png' },
      { id: 'dried-fruits-nuts', name: 'Dried fruits & nuts', img: 'http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/7 Dried fruits & nuts.png' },
      { id: 'bottled-beverages', name: 'Bottled beverages', img: 'http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/8 Bottled beverages.png' },
    ]
  },
  {
    id: 'industrial',
    pill: 'OUR PRODUCTS',
    title: 'Industrial & Non-Industrial Products',
    desc: 'Ramsam Trends offers comprehensive export-import services for a wide range of industrial and non-industrial products, serving businesses across manufacturing, infrastructure, retail, and more.',
    subcategories: [
      { id: 'en-590', name: 'EN 590', img: 'http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/9 EN 590.png' },
      { id: 'jet-fuel', name: 'JET A1 FUEL', img: 'http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/10 JET A1 FUEL.jpeg' },
      { id: 'aluminium-ingots', name: 'Aluminium Ingots A7,A8,A9', img: 'http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/11 Aluminium Ingots A7,A8,A9.png' },
      { id: 'scraps', name: 'COPPER & ALUMINIUM SCRAPS', img: 'http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/12 COPPER & ALUMINIUM SCRAPS.png' },
    ]
  }
];

export const DETAILED_PRODUCTS = [
  // ─── EDIBLE OILS ───
  { 
    id: 101, 
    subcategoryId: 'edible-oils', 
    name: 'Premium Sunflower Oil', 
    category: 'Edible Oils', 
    description: '100% pure refined sunflower oil, perfectly suited for high-temperature cooking, frying, and baking.', 
    image_url: 'http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/1  sunflower oil.png', 
    origin: 'Ukraine', 
    specifications: { Grade: 'Refined A', Purity: '100%', Packaging: '1L, 5L, Bulk Flexitanks' } 
  },
  { 
    id: 102, 
    subcategoryId: 'edible-oils', 
    name: 'Refined Soybean Oil', 
    category: 'Edible Oils', 
    description: 'High-quality extracted soybean oil rich in polyunsaturated fats. Neutral flavor profile ideal for culinary applications.', 
    image_url: 'http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/2 Refined Soybean Oil.png', 
    origin: 'Brazil', 
    specifications: { Grade: 'Food Grade', Extraction: 'Cold Pressed', Packaging: 'Pet Bottles / Bulk' } 
  },
  { 
    id: 103, 
    subcategoryId: 'edible-oils', 
    name: 'RBD Palm Oil', 
    category: 'Edible Oils', 
    description: 'Refined, Bleached, and Deodorized Palm Oil. Highly stable and versatile for food manufacturing and commercial kitchens.', 
    image_url: 'http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/3 RBD Palm Oil.png', 
    origin: 'Malaysia', 
    specifications: { FFA: '0.1% Max', Moisture: '0.1% Max', Packaging: 'Jerry Cans / Drums' } 
  },
  { 
    id: 104, 
    subcategoryId: 'edible-oils', 
    name: 'Pure Rapeseed Oil', 
    category: 'Edible Oils', 
    description: 'High-grade rapeseed oil known for its low saturated fat content and excellent stability at high temperatures.', 
    image_url: 'http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/4 Pure Rapeseed Oil.png', 
    origin: 'Canada', 
    specifications: { Type: 'Refined', Smoke_Point: '230°C', Packaging: 'IBC Tanks' } 
  },
  { 
    id: 105, 
    subcategoryId: 'edible-oils', 
    name: 'Canola Oil', 
    category: 'Edible Oils', 
    description: 'Premium light canola oil, ideal for dressings, baking, and sautéing, with zero trans fats.', 
    image_url: 'http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/5 Canola Oil.png', 
    origin: 'Canada', 
    specifications: { Processing: 'Refined', Acidity: 'Low', Packaging: '1L, 5L, 20L' } 
  },
  { 
    id: 106, 
    subcategoryId: 'edible-oils', 
    name: 'Virgin Coconut Oil', 
    category: 'Edible Oils', 
    description: 'Unrefined, cold-pressed coconut oil retaining its natural aroma and nutritional benefits.', 
    image_url: 'http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/6 Virgin Coconut Oil.png', 
    origin: 'Philippines', 
    specifications: { Type: 'Cold Pressed', Grade: 'Virgin', Packaging: 'Glass Jars / Bulk' } 
  },
  { 
    id: 107, 
    subcategoryId: 'edible-oils', 
    name: 'Extra Virgin Olive Oil', 
    category: 'Edible Oils', 
    description: 'First cold-pressed extra virgin olive oil with rich, robust flavor and high antioxidant content.', 
    image_url: 'http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/7 Virgin Coconut Oil.png', 
    origin: 'Spain', 
    specifications: { Acidity: '< 0.8%', Pressing: 'Cold Pressed', Packaging: 'Glass / Tins' } 
  },

  // ─── SPICES (From earlier) ───
  // { 
  //   id: 1, 
  //   subcategoryId: 'organic-spices', 
  //   name: 'Premium Turmeric Powder', 
  //   category: 'Spices', 
  //   description: 'High curcumin content turmeric sourced directly from organic farms. Perfect for culinary and wellness applications.', 
  //   image_url: 'https://images.unsplash.com/photo-1615486171448-4fd1ff965df4?q=80&w=600', 
  //   origin: 'India', 
  //   specifications: { purity: '99%', curcumin: '5-7%', packaging: 'Bulk / Custom' } 
  // }
];