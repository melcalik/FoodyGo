export type RestaurantCategory =
  | 'sweet'
  | 'homemade'
  | 'pizza'
  | 'burger'
  | 'kebab';

export type OrderStatus = 'preparing' | 'confirmed' | 'ready' | 'pickedUp' | 'cancelled';
export type OrderType = 'normal' | 'suspended' | 'claimedSuspended';

export interface Restaurant {
  id: string;
  name: string;
  category: RestaurantCategory;
  rating: number;
  reviewCount: number;
  address: string;
  distance: string;
  image: any;
  isOpen: boolean;
  deliveryTime: string;
  suspendedCount: number;
  boxNames?: string[];
}

export interface SurpriseBox {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  stock: number;
  image?: any;
  emoji?: string;
  contents?: string[];
}

export interface CartItem {
  box: SurpriseBox;
  restaurant: Restaurant;
  quantity: number;
  isSuspended: boolean;
  isClaimingMealId?: string;
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: any;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  type: OrderType;
  createdAt: Date;
  updatedAt: Date;
  isReviewed?: boolean;
}

export interface OrderItem {
  boxId: string;
  boxName: string;
  quantity: number;
  unitPrice: number;
  isSuspended: boolean;
}

export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  orderId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  orderItems?: string[];
}

export interface SuspendedMeal {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImageUrl: string;
  boxId: string;
  boxName: string;
  donorName: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface PaymentMethod {
  id: string;
  cardName: string;
  cardNumber: string;
  cardHolderName: string;
  expiry: string;
  cvv: string;
  isLastUsed: boolean;
}
