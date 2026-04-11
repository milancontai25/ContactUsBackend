export const MAIN_CATEGORIES = [
  {
    id: 'organic',
    pill: 'OUR PRODUCTS',
    title: 'Organic & Non-Organic Products',
    desc: 'At Ramsam Trends, we specialize in the export and import of premium organic and agricultural products, connecting wellness-focused brands and retailers with trusted global suppliers.',
    subcategories: [
      { id: 'organic-spices', name: 'Organic Spices', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600' },
      { id: 'pulses-grains', name: 'Pulses and Grains', img: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=600' },
      { id: 'edible-oils', name: 'Edible Oils', img: 'https://images.unsplash.com/photo-1474625121024-7595bfbc57ac?q=80&w=600' },
      { id: 'dry-fruits', name: 'Dry Fruits', img: 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?q=80&w=600' },
    ]
  },
  {
    id: 'perishable',
    pill: 'OUR PRODUCTS',
    title: 'Perishable & Non-Perishable Products',
    desc: 'Ramsam Trends specializes in the seamless export and import of both perishable and non-perishable goods, delivering freshness, safety, and reliability across borders.',
    subcategories: [
      { id: 'dairy', name: 'Dairy (milk, cheese)', img: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=600' },
      { id: 'meat-poultry', name: 'Meat & Poultry', img: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=600' },
      { id: 'dried-fruits-nuts', name: 'Dried fruits & nuts', img: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?q=80&w=600' },
      { id: 'bottled-beverages', name: 'Bottled beverages', img: 'https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=600' },
    ]
  },
  {
    id: 'industrial',
    pill: 'OUR PRODUCTS',
    title: 'Industrial & Non-Industrial Products',
    desc: 'Ramsam Trends offers comprehensive export-import services for a wide range of industrial and non-industrial products, serving businesses across manufacturing, infrastructure, retail, and more.',
    subcategories: [
      { id: 'en-590', name: 'EN 590', img: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=600' },
      { id: 'jet-fuel', name: 'JET A1 FUEL', img: 'https://images.unsplash.com/photo-1559087316-6b27308e53f6?q=80&w=600' },
      { id: 'aluminium-ingots', name: 'Aluminium Ingots A7,A8,A9', img: 'https://images.unsplash.com/photo-1518542331925-4e91e9aa0074?q=80&w=600' },
      { id: 'scraps', name: 'COPPER & ALUMINIUM SCRAPS', img: 'https://images.unsplash.com/photo-1620023447999-528205d210ba?q=80&w=600' },
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
    image_url: 'https://www.kraftchemical.com/wp-content/uploads/2023/09/benefits-of-sunflower-oil.jpg', 
    origin: 'Ukraine', 
    specifications: { Grade: 'Refined A', Purity: '100%', Packaging: '1L, 5L, Bulk Flexitanks' } 
  },
  { 
    id: 102, 
    subcategoryId: 'edible-oils', 
    name: 'Refined Soybean Oil', 
    category: 'Edible Oils', 
    description: 'High-quality extracted soybean oil rich in polyunsaturated fats. Neutral flavor profile ideal for culinary applications.', 
    image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRBnFh4-9dTssfDpUzW5CwaigDdBNHQj_kiQ&s', 
    origin: 'Brazil', 
    specifications: { Grade: 'Food Grade', Extraction: 'Cold Pressed', Packaging: 'Pet Bottles / Bulk' } 
  },
  { 
    id: 103, 
    subcategoryId: 'edible-oils', 
    name: 'RBD Palm Oil', 
    category: 'Edible Oils', 
    description: 'Refined, Bleached, and Deodorized Palm Oil. Highly stable and versatile for food manufacturing and commercial kitchens.', 
    image_url: 'https://5.imimg.com/data5/NL/HO/AT/SELLER-80273244/palm-oil-500x500.jpg', 
    origin: 'Malaysia', 
    specifications: { FFA: '0.1% Max', Moisture: '0.1% Max', Packaging: 'Jerry Cans / Drums' } 
  },
  { 
    id: 104, 
    subcategoryId: 'edible-oils', 
    name: 'Pure Rapeseed Oil', 
    category: 'Edible Oils', 
    description: 'High-grade rapeseed oil known for its low saturated fat content and excellent stability at high temperatures.', 
    image_url: 'https://www.bhf.org.uk/-/media/images/information-support/heart-matters/2024/november-2024/nutrition/rapeseed-oil/rapeseed-oil-ssnoexp-620x400.jpg?rev=6d4b9f68416044c8ada70dabb1c77db6', 
    origin: 'Canada', 
    specifications: { Type: 'Refined', Smoke_Point: '230°C', Packaging: 'IBC Tanks' } 
  },
  { 
    id: 105, 
    subcategoryId: 'edible-oils', 
    name: 'Canola Oil', 
    category: 'Edible Oils', 
    description: 'Premium light canola oil, ideal for dressings, baking, and sautéing, with zero trans fats.', 
    image_url: 'https://www.naturzindustries.com/wp-content/uploads/2024/01/canola-oil-768x511.jpg.webp', 
    origin: 'Canada', 
    specifications: { Processing: 'Refined', Acidity: 'Low', Packaging: '1L, 5L, 20L' } 
  },
  { 
    id: 106, 
    subcategoryId: 'edible-oils', 
    name: 'Virgin Coconut Oil', 
    category: 'Edible Oils', 
    description: 'Unrefined, cold-pressed coconut oil retaining its natural aroma and nutritional benefits.', 
    image_url: 'https://www.vitaman.com/cdn/shop/articles/benefits_of_coconut_oil.jpg?v=1692182954', 
    origin: 'Philippines', 
    specifications: { Type: 'Cold Pressed', Grade: 'Virgin', Packaging: 'Glass Jars / Bulk' } 
  },
  { 
    id: 107, 
    subcategoryId: 'edible-oils', 
    name: 'Extra Virgin Olive Oil', 
    category: 'Edible Oils', 
    description: 'First cold-pressed extra virgin olive oil with rich, robust flavor and high antioxidant content.', 
    image_url: 'https://www.greendna.in/cdn/shop/products/oliveoil5_1200x1200.jpg?v=1627216046', 
    origin: 'Spain', 
    specifications: { Acidity: '< 0.8%', Pressing: 'Cold Pressed', Packaging: 'Glass / Tins' } 
  },

  // ─── SPICES (From earlier) ───
  { 
    id: 1, 
    subcategoryId: 'organic-spices', 
    name: 'Premium Turmeric Powder', 
    category: 'Spices', 
    description: 'High curcumin content turmeric sourced directly from organic farms. Perfect for culinary and wellness applications.', 
    image_url: 'https://images.unsplash.com/photo-1615486171448-4fd1ff965df4?q=80&w=600', 
    origin: 'India', 
    specifications: { purity: '99%', curcumin: '5-7%', packaging: 'Bulk / Custom' } 
  }
];