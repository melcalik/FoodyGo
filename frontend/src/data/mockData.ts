import { Restaurant, SurpriseBox, Review, Order } from '../types';

// ─── Restaurant Images ───────────────────────────────────────────────────────
const Images = {
  restaurants: {
    sweet: require('../assets/images/restaurants/sweet.png'),
    homemade: require('../assets/images/restaurants/homemade.png'),
    pizza: require('../assets/images/restaurants/pizza.png'),
    burger: require('../assets/images/restaurants/burger.png'),
    kebab: require('../assets/images/restaurants/kebab.png'),
  },
};

// ─── Mock Restaurants ────────────────────────────────────────────────────────
export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'Pasta Dünyası',
    category: 'sweet',
    rating: 4.8,
    reviewCount: 142,
    address: 'Bağcılar Mah. No:14, Kadıköy',
    distance: '0.8 km',
    image: Images.restaurants.sweet,
    isOpen: true,
    deliveryTime: '19:00 - 21:00',
    suspendedCount: 12,
  },
  {
    id: 'r2',
    name: 'Annem Gibi',
    category: 'homemade',
    rating: 4.6,
    reviewCount: 89,
    address: 'Moda Cad. No:55, Kadıköy',
    distance: '1.2 km',
    image: Images.restaurants.homemade,
    isOpen: true,
    deliveryTime: '18:30 - 20:30',
    suspendedCount: 5,
  },
  {
    id: 'r3',
    name: 'Forno Napoli',
    category: 'pizza',
    rating: 4.7,
    reviewCount: 213,
    address: 'İstiklal Cad. No:87, Beyoğlu',
    distance: '2.1 km',
    image: Images.restaurants.pizza,
    isOpen: true,
    deliveryTime: '20:00 - 22:00',
    suspendedCount: 8,
  },
  {
    id: 'r4',
    name: 'Smash Bros. Burger',
    category: 'burger',
    rating: 4.5,
    reviewCount: 176,
    address: 'Abdi İpekçi Cad. No:12, Nişantaşı',
    distance: '3.4 km',
    image: Images.restaurants.burger,
    isOpen: true,
    deliveryTime: '21:00 - 23:00',
    suspendedCount: 3,
  },
  {
    id: 'r5',
    name: 'Ustanın Döneri',
    category: 'kebab',
    rating: 4.9,
    reviewCount: 308,
    address: 'Bağlarbaşı Mah. No:3, Üsküdar',
    distance: '1.7 km',
    image: Images.restaurants.kebab,
    isOpen: true,
    deliveryTime: '20:30 - 22:30',
    suspendedCount: 15,
  },
  {
    id: 'r6',
    name: 'Güllüoğlu Baklava',
    category: 'sweet',
    rating: 4.9,
    reviewCount: 421,
    address: 'Karaköy Mah. No:3, Beyoğlu',
    distance: '4.2 km',
    image: Images.restaurants.sweet,
    isOpen: false,
    deliveryTime: '18:00 - 20:00',
    suspendedCount: 22,
  },
];

// ─── Mock Surprise Boxes ─────────────────────────────────────────────────────
export const MOCK_BOXES: SurpriseBox[] = [
  // Pasta Dünyası
  {
    id: 'b1',
    restaurantId: 'r1',
    name: 'Tatlı Sürpriz Kutu',
    description: 'Günün bakiye tatlılarından oluşan mix kutu',
    originalPrice: 180,
    discountedPrice: 65,
    stock: 4,
    emoji: '🍰',
    contents: ['2-3 çeşit tatlı', 'Baklava veya sütlaç', 'Revani dilimi'],
  },
  {
    id: 'b2',
    restaurantId: 'r1',
    name: 'Mini Börek Kutusu',
    description: 'Taze pişmiş böreklerden oluşan kutu',
    originalPrice: 120,
    discountedPrice: 45,
    stock: 2,
    emoji: '🥐',
    contents: ['3-4 adet börek', 'Sigara ve su böreği karışık'],
  },
  // Annem Gibi
  {
    id: 'b3',
    restaurantId: 'r2',
    name: 'Ev Yemeği Seti',
    description: 'Günlük ana yemek + çorba + pilav seti',
    originalPrice: 200,
    discountedPrice: 75,
    stock: 3,
    emoji: '🍲',
    contents: ['Ana yemek (kuru fasulye veya nohut)', 'Mercimek çorbası', 'Pilav'],
  },
  {
    id: 'b4',
    restaurantId: 'r2',
    name: 'Böyle Kutu',
    description: 'Günün bakiyesinden sürpriz tabldot',
    originalPrice: 150,
    discountedPrice: 55,
    stock: 5,
    emoji: '🥘',
    contents: ['Tabldot yemek', '1 çeşit salata', 'Ekmek'],
  },
  // Forno Napoli
  {
    id: 'b5',
    restaurantId: 'r3',
    name: 'Pizza Sürpriz',
    description: '2 dilim artisan pizza + içecek',
    originalPrice: 220,
    discountedPrice: 80,
    stock: 6,
    emoji: '🍕',
    contents: ['2 dilim pizza (malzeme sürpriz)', '1 kutu gazlı içecek'],
  },
  // Smash Bros.
  {
    id: 'b6',
    restaurantId: 'r4',
    name: 'Burger Kutusu',
    description: 'Smash burger + patates kızartması',
    originalPrice: 280,
    discountedPrice: 110,
    stock: 2,
    emoji: '🍔',
    contents: ['1 smash burger', 'Orta boy patates', '1 sos'],
  },
  // Ustanın Döneri
  {
    id: 'b7',
    restaurantId: 'r5',
    name: 'Döner Dürüm Seti',
    description: 'Tavuk veya et döner dürüm + ayran',
    originalPrice: 160,
    discountedPrice: 60,
    stock: 8,
    emoji: '🌯',
    contents: ['1 dürüm döner (et veya tavuk)', '1 ayran veya şalgam'],
  },
  {
    id: 'b8',
    restaurantId: 'r5',
    name: 'Tabak Set',
    description: 'Döner tabak + salata + ekmek',
    originalPrice: 200,
    discountedPrice: 75,
    stock: 4,
    emoji: '🍽️',
    contents: ['Porsiyon döner tabak', 'Mevsim salatası', 'Lavaş ekmek'],
  },
];

// ─── Mock Reviews ────────────────────────────────────────────────────────────
export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rv1',
    restaurantId: 'r1',
    userId: 'u1',
    userName: 'Ayşe K.',
    rating: 5,
    comment: 'Harika bir deneyimdi! Baklava muhteşemdi, hem ekonomik hem lezzetli. Kesinlikle tekrar alacağım.',
    createdAt: new Date('2026-06-07'),
  },
  {
    id: 'rv2',
    restaurantId: 'r1',
    userId: 'u2',
    userName: 'Mehmet A.',
    rating: 4,
    comment: 'Güzel bir initiative. Tatlılar tazeydi ve kutu iyi dolu geldi. FoodyGo sayesinde hem tasarruf ettim hem israfı önledim.',
    createdAt: new Date('2026-06-05'),
  },
  {
    id: 'rv3',
    restaurantId: 'r3',
    userId: 'u1',
    userName: 'Ayşe K.',
    rating: 5,
    comment: 'Pizza mükemmeldi! Napoli usulü hamur gerçekten farklı. Fiyat/performans çok iyi.',
    createdAt: new Date('2026-06-08'),
  },
  {
    id: 'rv4',
    restaurantId: 'r5',
    userId: 'u3',
    userName: 'Zeynep T.',
    rating: 5,
    comment: 'Ustanın döneri başka! Et kalitesi ve baharatı gerçekten özenli. Sürpriz kutu alınır!',
    createdAt: new Date('2026-06-06'),
  },
];

// ─── Mock Orders ─────────────────────────────────────────────────────────────
export const MOCK_ORDERS: Order[] = [
  {
    id: 'o1',
    restaurantId: 'r5',
    restaurantName: 'Ustanın Döneri',
    restaurantImage: Images.restaurants.kebab,
    items: [
      { boxId: 'b7', boxName: 'Döner Dürüm Seti', quantity: 2, unitPrice: 60, isSuspended: false },
    ],
    totalAmount: 120,
    status: 'pickedUp',
    type: 'normal',
    createdAt: new Date('2026-06-08T19:30:00'),
    updatedAt: new Date('2026-06-08T20:15:00'),
  },
  {
    id: 'o2',
    restaurantId: 'r3',
    restaurantName: 'Forno Napoli',
    restaurantImage: Images.restaurants.pizza,
    items: [
      { boxId: 'b5', boxName: 'Pizza Sürpriz', quantity: 1, unitPrice: 80, isSuspended: false },
    ],
    totalAmount: 80,
    status: 'ready',
    type: 'normal',
    createdAt: new Date('2026-06-09T20:00:00'),
    updatedAt: new Date('2026-06-09T20:30:00'),
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
export const getBoxesByRestaurant = (restaurantId: string): SurpriseBox[] =>
  MOCK_BOXES.filter(b => b.restaurantId === restaurantId);

export const getReviewsByRestaurant = (restaurantId: string): Review[] =>
  MOCK_REVIEWS.filter(r => r.restaurantId === restaurantId);

export const getRestaurantById = (id: string): Restaurant | undefined =>
  MOCK_RESTAURANTS.find(r => r.id === id);

export const TOTAL_SUSPENDED_COUNT = MOCK_RESTAURANTS.reduce(
  (sum, r) => sum + r.suspendedCount,
  0,
);
