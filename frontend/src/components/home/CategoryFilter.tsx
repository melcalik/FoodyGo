import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { RestaurantCategory } from '../../types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';

const CATEGORIES: { key: RestaurantCategory | 'all'; emoji: string; labelKey: string }[] = [
  { key: 'all', emoji: '🍽️', labelKey: 'home.allCategories' },
  { key: 'sweet', emoji: '🍰', labelKey: 'home.sweet' },
  { key: 'homemade', emoji: '🍲', labelKey: 'home.homemade' },
  { key: 'pizza', emoji: '🍕', labelKey: 'home.pizza' },
  { key: 'burger', emoji: '🍔', labelKey: 'home.burger' },
  { key: 'kebab', emoji: '🌯', labelKey: 'home.kebab' },
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
            <Text style={styles.pillEmoji}>{cat.emoji}</Text>
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
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  pillEmoji: { fontSize: 16 },
  pillLabel: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  pillLabelActive: {
    color: Colors.white,
    fontWeight: FontWeight.semibold,
  },
});
