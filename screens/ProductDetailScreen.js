import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Alert, Image, FlatList, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatCOP } from '../data/mock';
import { useApp } from '../context/AppContext';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart, favorites, toggleFavorite } = useApp();
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(0);

  const colors = ['#c1572b', '#a83232', '#d98e2b', '#f2f2f2'];
  const [imgIndex, setImgIndex] = useState(0);
  const { width } = Dimensions.get('window');
  const gallery = product.images || [product.image];

  const onAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    Alert.alert('Agregado', `${product.name} x${qty} agregado al carrito`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FBE9D0' }}>
      <StatusBar barStyle="light-content" backgroundColor="#6b1a1a" />
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 20, color: '#FBE9D0' }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>Art Craft</Text>
        <TouchableOpacity onPress={() => toggleFavorite(product.id)}>
          <Ionicons name={favorites.includes(product.id) ? 'heart' : 'heart-outline'} size={20} color="#FBE9D0" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={gallery}
          keyExtractor={(_, i) => String(i)}
          onMomentumScrollEnd={(e) => setImgIndex(Math.round(e.nativeEvent.contentOffset.x / (width - 32)))}
          renderItem={({ item }) => (
            <View style={{ width: width - 32, alignItems: 'center' }}>
              <Image source={item} style={{ width: 260, height: 260, borderRadius: 12 }} resizeMode="contain" />
            </View>
          )}
        />
        <View style={styles.dots}>
          <Text style={styles.dot}>
            {gallery.map((_, i) => (i === imgIndex ? '● ' : '○ ')).join('')}
          </Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.name}>{product.name}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Ionicons key={s} name={s <= product.rating ? 'star' : 'star-outline'} size={14} color="#d4580b" />
              ))}
              <Text style={{ color: '#d4580b', marginLeft: 4 }}>{product.rating}.0</Text>
            </View>
            <Text style={styles.price}>{formatCOP(product.price)}</Text>
          </View>
          <Text style={styles.desc}>{product.description}</Text>

          <Text style={styles.label}>Color</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
            {colors.map((c, i) => (
              <TouchableOpacity
                key={c}
                onPress={() => setColor(i)}
                style={[styles.swatch, { backgroundColor: c }, color === i && { borderWidth: 2, borderColor: '#4a1008' }]}
              />
            ))}
          </View>

          <Text style={styles.label}>Cantidad</Text>
          <View style={styles.qtyRow}>
            <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))} style={styles.qtyBtn}>
              <Text>−</Text>
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{qty}</Text>
            <TouchableOpacity onPress={() => setQty(qty + 1)} style={styles.qtyBtn}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <Text style={styles.addButtonText}>Agregar al carrito</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: { backgroundColor: '#6b1a1a', paddingTop: 40, paddingBottom: 10, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  topTitle: { color: '#FBE9D0', fontWeight: 'bold', fontSize: 16 },
  imageBox: { backgroundColor: '#8c1d0d', margin: 16, borderRadius: 16, height: 260, alignItems: 'center', justifyContent: 'center' },
  dots: { alignItems: 'center', marginVertical: 8 },
  dot: { color: '#8c1d0d', letterSpacing: 2, fontSize: 12 },
  body: { backgroundColor: '#F5D7B8', margin: 16, borderRadius: 16, padding: 16 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#4a1008' },
  rating: { color: '#d4580b', marginTop: 4 },
  price: { color: '#8c1d0d', fontWeight: 'bold', fontSize: 18 },
  desc: { color: '#4a1008', fontSize: 12, marginTop: 8 },
  label: { fontWeight: 'bold', color: '#4a1008', marginTop: 14 },
  swatch: { width: 22, height: 22, borderRadius: 11 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 8 },
  qtyBtn: { backgroundColor: '#FBE9D0', width: 28, height: 28, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  addButton: { backgroundColor: '#8c1d0d', borderRadius: 10, padding: 14, marginTop: 18, alignItems: 'center' },
  addButtonText: { color: '#FBE9D0', fontWeight: 'bold' },
});
