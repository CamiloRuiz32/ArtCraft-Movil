import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, TextInput, FlatList } from 'react-native';

const categories = [
  { id: '1', name: 'Bisutería', emoji: '💎' },
  { id: '2', name: 'Mochilas', emoji: '👜' },
  { id: '3', name: 'Cerámica', emoji: '🏺' },
];

const products = [
  { id: '1', name: 'Adorno', price: '$120.000', emoji: '🏺' },
  { id: '2', name: 'Adorno', price: '$120.000', emoji: '🪬' },
];

const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6b1a1a" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerLogo}>
            <Text style={styles.headerLogoText}>🏺</Text>
          </View>
          <Text style={styles.headerTitle}>Art Craft</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Text style={styles.headerIconText}>🛒</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar artesanías..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroSection}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Artesanías{'\n'}que cuentan{'\n'}historia</Text>
            <TouchableOpacity style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Ver opciones</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.heroImageContainer}>
            <Text style={styles.heroEmoji}>🏺🪘</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorías</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>VER TODAS</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.categoryCard}>
                <View style={styles.categoryImage}>
                  <Text style={styles.categoryEmoji}>{item.emoji}</Text>
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
            data={products}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.productCard}>
                <View style={styles.productImage}>
                  <Text style={styles.productEmoji}>{item.emoji}</Text>
                </View>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIconActive}>🏠</Text>
          <Text style={styles.tabLabelActive}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>📋</Text>
          <Text style={styles.tabLabel}>Categoría</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>❤️</Text>
          <Text style={styles.tabLabel}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>👤</Text>
          <Text style={styles.tabLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBE9D0',
  },
  header: {
    backgroundColor: '#6b1a1a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8c1d0d',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  headerLogoText: {
    fontSize: 18,
  },
  headerTitle: {
    color: '#FBE9D0',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8c1d0d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconText: {
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#6b1a1a',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 42,
    backgroundColor: '#fff',
    borderRadius: 21,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#333',
  },
  searchButton: {
    width: 42,
    height: 42,
    backgroundColor: '#8c1d0d',
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  searchButtonText: {
    fontSize: 16,
  },
  heroSection: {
    flexDirection: 'row',
    backgroundColor: '#6b1a1a',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    padding: 20,
    overflow: 'hidden',
  },
  heroTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  heroTitle: {
    color: '#FBE9D0',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    marginBottom: 16,
  },
  heroButton: {
    backgroundColor: '#d4580b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  heroImageContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 60,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#4a1008',
    fontSize: 22,
    fontWeight: 'bold',
  },
  sectionLink: {
    color: '#8c1d0d',
    fontSize: 13,
    fontWeight: 'bold',
  },
  categoriesList: {
    gap: 12,
  },
  categoryCard: {
    width: 110,
    backgroundColor: '#8c1d0d',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  categoryImage: {
    width: 70,
    height: 70,
    backgroundColor: '#d4580b',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 32,
  },
  categoryName: {
    color: '#FBE9D0',
    fontSize: 13,
    fontWeight: 'bold',
  },
  productsList: {
    gap: 12,
  },
  productCard: {
    width: 150,
    backgroundColor: '#8c1d0d',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  productImage: {
    width: 120,
    height: 100,
    backgroundColor: '#d4580b',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  productEmoji: {
    fontSize: 40,
  },
  productName: {
    color: '#FBE9D0',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productPrice: {
    color: '#ffc26a',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#6b1a1a',
    paddingVertical: 8,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#8c1d0d',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: 2,
  },
  tabIconActive: {
    fontSize: 22,
    marginBottom: 2,
  },
  tabLabel: {
    color: '#d4a574',
    fontSize: 11,
  },
  tabLabelActive: {
    color: '#FBE9D0',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default Home;
