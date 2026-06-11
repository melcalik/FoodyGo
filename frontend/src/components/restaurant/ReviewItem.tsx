import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Review } from '../../types';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../../constants/theme';

interface ReviewItemProps {
  review: Review;
}

export default function ReviewItem({ review }: ReviewItemProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i < review.rating ? '⭐' : '☆');
  const dateStr = review.createdAt.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{review.userName[0]}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{review.userName}</Text>
          <Text style={styles.date}>{dateStr}</Text>
        </View>
        <View style={styles.starsRow}>
          {stars.map((s, i) => (
            <Text key={i} style={styles.star}>{s}</Text>
          ))}
        </View>
      </View>
      <Text style={styles.comment}>{review.comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primary + '33',
    borderWidth: 1,
    borderColor: Colors.primary + '55',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  headerInfo: { flex: 1 },
  name: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  date: { fontSize: FontSize.xs, color: Colors.textMuted },
  starsRow: { flexDirection: 'row' },
  star: { fontSize: 12 },
  comment: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
