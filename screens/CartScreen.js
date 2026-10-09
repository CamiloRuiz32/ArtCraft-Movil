import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar, Alert, Image,
} from 'react-native';
import { formatCOP } from '../data/mock';
import { useApp } from '../context/AppContext';

export default function CartScreen({ navigation }) {
  const { cart, changeQty, cartTotal } = useApp();
  const shipping = 30000;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6b1a1a" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 20, color: '#FBE9D0' }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Carrito de compras</Text>
        <View style={{ width: 20 }} />
      </View>

      <FlatList
        data={cart}
        keyExtractor={(i) => i.product.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 60, color: '#8c1d0d' }}>
            Tu carrito está vacío.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.image}>
              <Image source={item.product.image} style={{ width: 60, height: 60, borderRadius: 8 }} />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              <Text style={styles.name}>{item.product.name}</Text>
              <Text style={styles.price}>{formatCOP(item.product.price)}</Text>
              <View style={styles.qtyRow}>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => changeQty(item.product.id, -1)}>
                  <Text>−</Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold' }}>{item.qty}</Text>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => changeQty(item.product.id, 1)}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {cart.length > 0 && (
        <View style={styles.summary}>
          <Text style={styles.sumRow}>Subtotal: {formatCOP(cartTotal)}</Text>
          <Text style={styles.sumRow}>Envío: {formatCOP(shipping)}</Text>
          <Text style={styles.total}>Total: {formatCOP(cartTotal + shipping)}</Text>
          <TouchableOpacity style={styles.payButton} onPress={() => navigation.navigate('Pago')}>
            <Text style={styles.payText}>Ir a pagar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBE9D0' },
  header: { backgroundColor: '#6b1a1a', paddingTop: 40, paddingBottom: 12, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#FBE9D0', fontSize: 18, fontWeight: 'bold' },
  card: { backgroundColor: '#E8853D', borderRadius: 12, padding: 10, flexDirection: 'row', alignItems: 'center' },
  image: { width: 70, height: 70, backgroundColor: '#d4580b', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  name: { color: '#4a1008', fontWeight: 'bold' },
  price: { color: '#8c1d0d', fontWeight: 'bold' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 6 },
  qtyBtn: { backgroundColor: '#FBE9D0', width: 24, height: 24, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  summary: { backgroundColor: '#F5D7B8', padding: 16 },
  sumRow: { color: '#4a1008', fontSize: 13 },
  total: { color: '#8c1d0d', fontWeight: 'bold', fontSize: 17, marginTop: 4 },
  payButton: { backgroundColor: '#8c1d0d', borderRadius: 10, padding: 14, marginTop: 10, alignItems: 'center' },
  payText: { color: '#FBE9D0', fontWeight: 'bold' },
});
