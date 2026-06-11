/**
 * Maps backend image filename strings to local React Native require() assets.
 * Centralised here to avoid duplication across stores and screens.
 */
export const restaurantImageMap: Record<string, any> = {
  'sweet.png': require('../assets/images/restaurants/sweet.png'),
  'homemade.png': require('../assets/images/restaurants/homemade.png'),
  'pizza.png': require('../assets/images/restaurants/pizza.png'),
  'burger.png': require('../assets/images/restaurants/burger.png'),
  'kebab.png': require('../assets/images/restaurants/kebab.png'),
};
