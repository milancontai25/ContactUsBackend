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
        id: 'dairy',
        name: 'Dairy (milk, cheese)',
        img: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/5%20Dairy%20(milk,%20cheese).png'
      },
      {
        id: 'meat-poultry',
        name: 'Meat & Poultry',
        img: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/6%20Meat%20%26%20Poultry.png'
      },
      {
        id: 'dried-fruits-nuts',
        name: 'Dried fruits & nuts',
        img: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/7%20Dried%20fruits%20%26%20nuts.png'
      },
      {
        id: 'bottled-beverages',
        name: 'Bottled beverages',
        img: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/8%20Bottled%20beverages.png'
      }
    ]
  },
  {
    id: 'industrial',
    pill: 'OUR PRODUCTS',
    title: 'Industrial & Non-Industrial Products',
    desc: 'Ramsam Trends offers comprehensive export-import services for a wide range of industrial and non-industrial products, serving businesses across manufacturing, infrastructure, retail, and more.',
    subcategories: [
      {
        id: 'en-590',
        name: 'EN 590',
        img: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/9%20EN%20590.png'
      },
      {
        id: 'jet-fuel',
        name: 'JET A1 FUEL',
        img: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/10%20JET%20A1%20FUEL.jpeg'
      },
      {
        id: 'aluminium-ingots',
        name: 'Aluminium Ingots A7,A8,A9',
        img: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/11%20Aluminium%20Ingots%20A7,A8,A9.png'
      },
      {
        id: 'scraps',
        name: 'COPPER & ALUMINIUM SCRAPS',
        img: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/12%20COPPER%20%26%20ALUMINIUM%20SCRAPS.png'
      }
    ]
  }
];

export const DETAILED_PRODUCTS = [
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
  }
];