import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, TextInput, FlatList, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { categories, products, formatCOP } from '../data/mock';

export default function HomeScreen({ navigation, setTab }) {
  const destacados = products.slice(0, 4);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6b1a1a" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../assets/images/Logo.png')}
            style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#fff' }}
          />
          <Text style={styles.headerTitle}>Art Craft</Text>
        </View>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('Carrito')}>
          <Ionicons name="cart-outline" size={18} color="#FBE9D0" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Buscar artesanías..." placeholderTextColor="#999" />
          <TouchableOpacity style={styles.searchButton} onPress={() => setTab('Catálogo')}>
            <Ionicons name="search" size={18} color="#FBE9D0" />
          </TouchableOpacity>
        </View>

        <View style={styles.heroSection}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>Artesanías{'\n'}que cuentan{'\n'}historia</Text>
            <TouchableOpacity style={styles.heroButton} onPress={() => setTab('Catálogo')}>
              <Text style={styles.heroButtonText}>Ver opciones</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require('../assets/images/MochilasInicio.png')}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorías</Text>
            <TouchableOpacity onPress={() => setTab('Catálogo')}>
              <Text style={styles.sectionLink}>VER TODAS</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={categories}
            keyExtractor={(i) => i.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.categoryCard} onPress={() => setTab('Catálogo')}>
                <View style={styles.categoryImage}>
                  <Image source={item.image} style={{ width: 50, height: 50, resizeMode: 'cover', borderRadius: 8 }} />
                </View>
                <Text style={styles.categoryName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destacados</Text>
          <FlatList
            horizontal
            data={destacados}
            keyExtractor={(i) => i.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.productCard} onPress={() => navigation.navigate('Producto', { product: item })}>
                <View style={styles.productImage}>
                  <Image source={item.image} style={{ width: 120, height: 100, borderRadius: 10 }} />
                </View>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{formatCOP(item.price)}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBE9D0' },
  header: { backgroundColor: '#6b1a1a', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 40, paddingBottom: 12, paddingHorizontal: 16 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerLogoText: { fontSize: 24 },
  headerTitle: { color: '#FBE9D0', fontSize: 20, fontWeight: 'bold' },
  headerIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#8c1d0d', alignItems: 'center', justifyContent: 'center' },
  headerIconText: { fontSize: 16 },
  searchContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#6b1a1a' },
  searchInput: { flex: 1, height: 42, backgroundColor: '#fff', borderRadius: 21, paddingHorizontal: 16, fontSize: 14, color: '#333' },
  searchButton: { width: 42, height: 42, backgroundColor: '#8c1d0d', borderRadius: 21, alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
  searchButtonText: { fontSize: 16 },
  heroSection: { flexDirection: 'row', backgroundColor: '#6b1a1a', marginHorizontal: 16, marginTop: 12, borderRadius: 16, padding: 20 },
  heroTitle: { color: '#FBE9D0', fontSize: 24, fontWeight: 'bold', lineHeight: 32, marginBottom: 16 },
  heroButton: { backgroundColor: '#d4580b', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, alignSelf: 'flex-start' },
  heroButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  heroEmoji: { fontSize: 60, alignSelf: 'center' },
  section: { marginTop: 24, paddingHorizontal: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { color: '#4a1008', fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  sectionLink: { color: '#8c1d0d', fontSize: 13, fontWeight: 'bold' },
  categoryCard: { width: 110, backgroundColor: '#8c1d0d', borderRadius: 12, padding: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 4 },
  categoryImage: { width: 70, height: 70, backgroundColor: '#d4580b', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  categoryName: { color: '#FBE9D0', fontSize: 13, fontWeight: 'bold' },
  productCard: { width: 150, backgroundColor: '#8c1d0d', borderRadius: 12, padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 4 },
  productImage: { width: '100%', height: 100, backgroundColor: '#d4580b', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  productName: { color: '#FBE9D0', fontSize: 14, fontWeight: 'bold' },
  productPrice: { color: '#ffc26a', fontSize: 16, fontWeight: 'bold', marginTop: 4 },
});
