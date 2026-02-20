// ===========================
// PRODUCTS DATABASE
// ===========================

const PRODUCTS_DATABASE = [
  {
    id: 'roadster-200',
    name: 'Roadster 200',
    category: 'road',
    price: 699,
    image: 'https://source.unsplash.com/800x600/?road+bike,1',
    description: 'Lightweight and fast for long-distance rides',
    specs: {
      frame: 'Aluminum',
      weight: '8.5 kg',
      gears: '21-speed',
      brakes: 'Dual Pivot Caliper'
    },
    inStock: true,
    reviews: 4.5,
    reviewCount: 23
  },
  {
    id: 'summit-mtn',
    name: 'Summit Mountain',
    category: 'mountain',
    price: 849,
    image: 'https://source.unsplash.com/800x600/?mountain+bike,1',
    description: 'Perfect for off-road adventures and trails',
    specs: {
      frame: 'Steel',
      weight: '12 kg',
      gears: '18-speed',
      brakes: 'V-Brakes'
    },
    inStock: true,
    reviews: 4.7,
    reviewCount: 45
  },
  {
    id: 'city-hybrid',
    name: 'City Hybrid',
    category: 'hybrid',
    price: 529,
    image: 'https://source.unsplash.com/800x600/?city+bike',
    description: 'Versatile bike for city commuting',
    specs: {
      frame: 'Aluminum',
      weight: '10.5 kg',
      gears: '21-speed',
      brakes: 'Rim Brakes'
    },
    inStock: true,
    reviews: 4.3,
    reviewCount: 34
  },
  {
    id: 'pro-racer-x',
    name: 'Pro Racer X',
    category: 'road',
    price: 1299,
    image: 'https://source.unsplash.com/800x600/?road+bike,2',
    description: 'Carbon fiber frame for ultimate performance',
    specs: {
      frame: 'Carbon Fiber',
      weight: '6.5 kg',
      gears: '27-speed',
      brakes: 'Disc Brakes'
    },
    inStock: true,
    reviews: 4.9,
    reviewCount: 67
  },
  {
    id: 'trail-explorer',
    name: 'Trail Explorer',
    category: 'mountain',
    price: 999,
    image: 'https://source.unsplash.com/800x600/?mountain+bike,2',
    description: 'Full suspension for rough terrain',
    specs: {
      frame: 'Steel',
      weight: '13 kg',
      gears: '21-speed',
      brakes: 'Hydraulic Disc Brakes'
    },
    inStock: true,
    reviews: 4.6,
    reviewCount: 52
  },
  {
    id: 'urban-classic',
    name: 'Urban Classic',
    category: 'hybrid',
    price: 649,
    image: 'https://source.unsplash.com/800x600/?hybrid+bike',
    description: 'Stylish and comfortable for everyday riding',
    specs: {
      frame: 'Aluminum',
      weight: '10 kg',
      gears: '21-speed',
      brakes: 'Dual Pivot Caliper'
    },
    inStock: true,
    reviews: 4.4,
    reviewCount: 28
  },
  {
    id: 'speedster-elite',
    name: 'Speedster Elite',
    category: 'road',
    price: 1499,
    image: 'https://source.unsplash.com/800x600/?racing+bike',
    description: 'Professional-grade racing bike',
    specs: {
      frame: 'Carbon Fiber',
      weight: '6.2 kg',
      gears: '30-speed',
      brakes: 'Hydraulic Disc Brakes'
    },
    inStock: true,
    reviews: 4.8,
    reviewCount: 89
  },
  {
    id: 'beast-terrain',
    name: 'Beast Terrain',
    category: 'mountain',
    price: 1199,
    image: 'https://source.unsplash.com/800x600/?mountain+bike,3',
    description: 'Heavy-duty mountain bike for extreme terrain',
    specs: {
      frame: 'Steel Reinforced',
      weight: '14.5 kg',
      gears: '24-speed',
      brakes: 'Hydraulic Disc Brakes'
    },
    inStock: true,
    reviews: 4.7,
    reviewCount: 41
  },
  {
    id: 'comfort-cruiser',
    name: 'Comfort Cruiser',
    category: 'hybrid',
    price: 579,
    image: 'https://source.unsplash.com/800x600/?comfort+bike',
    description: 'Relaxed geometry for comfortable rides',
    specs: {
      frame: 'Steel',
      weight: '11.5 kg',
      gears: '18-speed',
      brakes: 'Rim Brakes'
    },
    inStock: true,
    inventory: 25,
    reviews: 4.2,
    reviewCount: 19
  }
];

// ===========================
// INVENTORY STORAGE
// ===========================

const INVENTORY_DATABASE = {
  'roadster-200': 30,
  'summit-mtn': 15,
  'city-hybrid': 40,
  'pro-racer-x': 8,
  'trail-explorer': 12,
  'urban-classic': 22,
  'speedster-elite': 5,
  'beast-terrain': 10,
  'comfort-cruiser': 25
};
