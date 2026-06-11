export const Colors = {
  // Brand
  primary: '#FF6B35',
  primaryLight: '#FF8A5B',
  primaryDark: '#E55A26',

  // Teal — askıda yemek
  teal: '#2EC4B6',
  tealLight: '#4DD9CC',
  tealDark: '#22A99D',

  // Background
  background: '#0F0F0F',
  surface: '#1A1A1A',
  surfaceElevated: '#242424',
  surfaceBorder: '#2E2E2E',

  // Typography
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  textMuted: '#606060',
  textInverse: '#0F0F0F',

  // Semantic
  success: '#22C55E',
  successLight: '#16A34A20',
  warning: '#F59E0B',
  warningLight: '#F59E0B20',
  error: '#EF4444',
  errorLight: '#EF444420',
  info: '#3B82F6',

  // Utility
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(0,0,0,0.6)',
  cardShadow: 'rgba(0,0,0,0.4)',
  star: '#FFD700',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 12,
  },
};
