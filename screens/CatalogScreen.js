import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar,
} from 'react-native';
import { products, formatCOP } from '../data/mock';
import { useApp } from '../context/AppContext';

export default function CatalogScreen({ navigation }) {
  const { favorites, toggleFavorite } = useApp();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6b1a1a" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Catálogo</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Carrito')}>
          <Text style={{ fontSize: 20 }}>🛒</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(i) => i.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
        contentContainerStyle={{ gap: 12, paddingVertical: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Producto', { product: item })}
          >
            <View style={styles.image}>
              <Text style={{ fontSize: 44 }}>{item.emoji}</Text>
            </View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{formatCOP(item.price)}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={{ alignSelf: 'flex-end' }}>
              <Text style={{ fontSize: 18 }}>{favorites.includes(item.id) ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBE9D0' },
  header: { backgroundColor: '#6b1a1a', paddingTop: 40, paddingBottom: 14, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#FBE9D0', fontSize: 20, fontWeight: 'bold' },
  card: { flex: 1, backgroundColor: '#E8853D', borderRadius: 12, padding: 10 },
  image: { height: 90, backgroundColor: '#d4580b', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  name: { color: '#4a1008', fontWeight: 'bold', fontSize: 14 },
  price: { color: '#8c1d0d', fontWeight: 'bold', marginTop: 2 },
});
