import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RestaurantCategory } from '../../types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';

const CATEGORIES: { key: RestaurantCategory | 'all'; icon: string; labelKey: string }[] = [
  { key: 'all', icon: 'restaurant', labelKey: 'home.allCategories' },
  { key: 'sweet', icon: 'ice-cream', labelKey: 'home.sweet' },
  { key: 'homemade', icon: 'nutrition', labelKey: 'home.homemade' },
  { key: 'pizza', icon: 'pizza', labelKey: 'home.pizza' },
  { key: 'burger', icon: 'fast-food', labelKey: 'home.burger' },
  { key: 'kebab', icon: 'flame', labelKey: 'home.kebab' },
];

interface CategoryFilterProps {
  selected: RestaurantCategory | 'all';
  onSelect: (cat: RestaurantCategory | 'all') => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const { t } = useTranslation();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {CATEGORIES.map(cat => {
        const isActive = selected === cat.key;
        return (
          <TouchableOpacity
            key={cat.key}
            style={[styles.pill, isActive && styles.pillActive]}
            onPress={() => onSelect(cat.key)}
            activeOpacity={0.8}
          >
            <Ionicons name={cat.icon} size={18} color={isActive ? Colors.primary : Colors.textSecondary} />
            <Text style={[styles.pillLabel, isActive && styles.pillLabelActive]}>
              {t(cat.labelKey)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: 8,
    flexDirection: 'row',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.full,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    gap: 6,
  },
  pillActive: {
    borderColor: Colors.primary,
  },
  pillLabel: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  pillLabelActive: {
    color: Colors.primary,
    fontWeight: FontWeight.semibold,
  },
});
