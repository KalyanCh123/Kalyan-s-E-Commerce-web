const products = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    brand: "Apple",
    sku: "APL-IP15P-001",
    price: 999,
    originalPrice: 1099,
    discount: 10,
    stock: 12,
    category: "Mobiles",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484f23d2",
      "https://images.unsplash.com/photo-1603899122567-1b9f9c7c8d45",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    ],
    rating: 4.8,
    reviews: 342,
    sale: true,
    description: "The latest iPhone 15 Pro with A17 chip, titanium body, and advanced camera system.",
    reviewList: [
      { rating: 5, comment: "Amazing performance and camera quality!" },
      { rating: 4, comment: "Battery life is solid and display is beautiful." }
    ],
    related: [2, 7]
  },

  {
    id: 2,
    title: "Samsung Galaxy S24",
    brand: "Samsung",
    sku: "SMS-S24-002",
    price: 899,
    originalPrice: 999,
    discount: 10,
    stock: 8,
    category: "Mobiles",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97"
    ],
    rating: 4.6,
    reviews: 210,
    description: "Flagship Galaxy S24 with stunning AMOLED display and powerful processor.",
    reviewList: [
      { rating: 5, comment: "Best Android phone right now." },
      { rating: 4, comment: "Great camera and smooth UI." }
    ],
    related: [1, 7]
  },

  {
    id: 3,
    title: "Gaming Laptop",
    brand: "Asus",
    sku: "ASU-GL-003",
    price: 1500,
    originalPrice: 1700,
    discount: 12,
    stock: 5,
    category: "Electronics",
    sale: true,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      "https://images.unsplash.com/photo-1587202372775-9897c86b0f13",
      "https://images.unsplash.com/photo-1593642634367-d91a135587b5"
    ],
    rating: 4.5,
    reviews: 180,
    description: "High-performance gaming laptop with RTX graphics and 16GB RAM.",
    reviewList: [
      { rating: 5, comment: "Runs all AAA games smoothly!" },
      { rating: 4, comment: "Powerful but slightly heavy." }
    ],
    related: [7]
  },

  {
    id: 6,
    title: "Nike Running Shoes",
    brand: "Nike",
    sku: "NKE-RUN-006",
    price: 120,
    originalPrice: 150,
    discount: 20,
    stock: 20,
    category: "Shoes",
    sale: true,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5"
    ],
    rating: 4.7,
    reviews: 260,
    description: "Lightweight running shoes designed for comfort and durability.",
    reviewList: [
      { rating: 5, comment: "Super comfortable for long runs." },
      { rating: 4, comment: "Very breathable material." }
    ],
    related: [3]
  },
  {
    id: 7,
    title: "Bluetooth Headphones",
    brand: "Bluetooth",
    sku: "NKE-006",
    price: 199,
    originalPrice: 250,
    discount: 20,
    stock: 20,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1580894908361-967195033215",
    rating: 4.4,
    reviews: 150,
    description: "Wireless Bluetooth headphones with noise cancellation feature.",
    reviewList: [
      { rating: 5, comment: "Sound quality is amazing!" }
    ]
  },
  {
    id: 8,
    title: "Smart Watch",
    brand: "Smart watch",
    sku: "Watch-1506",
    price: 250,
    originalPrice: 300,
    discount: 20,
    stock: 20,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
    rating: 4.2,
    reviews: 134,
    description: "Smartwatch with heart rate monitor and fitness tracking features.",
    reviewList: [
      { rating: 4, comment: "Good fitness tracking features." }
    ]
  }
];

export default products;
