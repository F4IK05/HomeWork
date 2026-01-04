import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';
import { Coffee } from '@/app/types/coffee-data-types';

interface CoffeeCardProps {
  coffee: Coffee;
  onPress?: () => void;
}

export default function CoffeeCard({ coffee, onPress }: CoffeeCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={coffee.image}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.footer}>
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {coffee.title}
          </Text>
          <Text style={styles.price}>
            ${coffee.price.toFixed(2)}
          </Text>
        </View>

        <Pressable 
          style={styles.addButton} 
          onPress={onPress}
        >
          <Plus color="#8B4513" size={20} strokeWidth={3} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A2433',
    borderRadius: 24,
    padding: 12,
    width: 160,
    height: 220,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  image: {
    width: '90%',
    height: '60%',
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    width: '100%',
    paddingBottom: 4,
  },
  infoContainer: {
    flex: 1,
    marginRight: 8,
  },
  price: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  title: {
    color: '#BDC3C7',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 2,
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#8B4513',
    borderRadius: 12,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});