import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, TextInput, Image, Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatCOP } from '../data/mock';
import { useApp } from '../context/AppContext';

export default function HomeScreen({ navigation }) {
  const { products, categories, favorites, toggleFavorite } = useApp();
  const [searchText, setSearchText] = useState('');
  const [cat, setCat] = useState(null);

  const q = searchText.trim().toLowerCase();
  const filtrados = products
    .filter((p) => (cat ? p.category === cat : true))
    .filter((p) =>
      q
        ? [p.name, p.category, p.description].some((v) => v && v.toLowerCase().includes(q))
        : true
    );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6b1a1a" />

      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar artesanías..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => Keyboard.dismiss()}
            returnKeyType="search"
          />
          {searchText.length > 0 && (
            <TouchableOpacity style={styles.searchClear} onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={20} color="#8c1d0d" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.searchButton} onPress={() => Keyboard.dismiss()}>
            <Ionicons name="search" size={18} color="#FBE9D0" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Artesanías{'\n'}que cuentan{'\n'}historia</Text>
          <Image
            source={require('../assets/images/BannerInicio.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
        >
          <TouchableOpacity
            style={[styles.chip, !cat && styles.chipActive]}
            onPress={() => setCat(null)}
          >
            <Text style={!cat ? styles.chipTextActive : styles.chipText}>Todos los productos</Text>
          </TouchableOpacity>

          {categories.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={[styles.chip, cat === c.name && styles.chipActive]}
              onPress={() => setCat(c.name)}
            >
              <Text style={cat === c.name ? styles.chipTextActive : styles.chipText}>
                {c.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{cat || 'Todos los productos'}</Text>
            <Text style={styles.count}>{filtrados.length}</Text>
          </View>

          {filtrados.length === 0 ? (
            <Text style={styles.noResult}>
              {q
                ? 'No encontramos artesanías con esa búsqueda.'
                : 'No hay productos en esta categoría.'}
            </Text>
          ) : (
            <View style={styles.grid}>
              {filtrados.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.card}
                  onPress={() => navigation.navigate('Producto', { product: item })}
                >
                  <Image source={item.image} style={styles.cardImage} />
                  <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.cardPrice}>{formatCOP(item.price)}</Text>
                  <TouchableOpacity
                    onPress={() => toggleFavorite(item.id)}
                    style={{ alignSelf: 'flex-end' }}
                  >
                    <Ionicons
                      name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
                      size={18}
                      color="#8c1d0d"
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBE9D0' },
  header: {
    backgroundColor: '#6b1a1a',
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  searchContainer: { flexDirection: 'row', alignItems: 'center' },
  searchInput: {
    flex: 1,
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 28,
    paddingHorizontal: 18,
    fontSize: 15,
    color: '#333',
  },
  searchClear: { height: 56, justifyContent: 'center', paddingHorizontal: 6 },
  searchButton: {
    width: 48,
    height: 48,
    backgroundColor: '#8c1d0d',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  heroSection: {
    backgroundColor: '#6b1a1a',
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 16,
    padding: 16,
  },
  heroTitle: { color: '#FBE9D0', fontSize: 24, fontWeight: 'bold', lineHeight: 32, marginBottom: 14 },
  heroImage: { width: '100%', aspectRatio: 1600 / 900, borderRadius: 12 },
  chipsRow: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 6, gap: 8 },
  chip: {
    backgroundColor: '#F5D7B8',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e0b98f',
  },
  chipActive: { backgroundColor: '#8c1d0d', borderColor: '#8c1d0d' },
  chipText: { color: '#4a1008', fontSize: 12 },
  chipTextActive: { color: '#FBE9D0', fontSize: 12, fontWeight: 'bold' },
  section: { paddingHorizontal: 16, marginTop: 10 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: { color: '#4a1008', fontSize: 20, fontWeight: 'bold' },
  count: { color: '#8c1d0d', fontSize: 13, fontWeight: 'bold' },
  noResult: { color: '#4a1008', fontSize: 13, fontStyle: 'italic', lineHeight: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: {
    width: '47%',
    flexGrow: 1,
    backgroundColor: '#E8853D',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: { width: '100%', height: 100, borderRadius: 10, backgroundColor: '#d4580b', marginBottom: 8 },
  cardName: { color: '#4a1008', fontWeight: 'bold', fontSize: 14 },
  cardPrice: { color: '#8c1d0d', fontWeight: 'bold', marginTop: 2 },
});
