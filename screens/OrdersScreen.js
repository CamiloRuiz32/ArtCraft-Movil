import React from 'react';
import {
  View, Text, StyleSheet, FlatList, StatusBar, TouchableOpacity,
} from 'react-native';
import { formatCOP } from '../data/mock';
import { useApp } from '../context/AppContext';

const tabs = ['Todos', 'En camino', 'Entregados', 'Cancelados'];

export default function OrdersScreen({ navigation }) {
  const { orders } = useApp();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6b1a1a" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Text style={{ fontSize: 20, color: '#FBE9D0' }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis pedidos</Text>
        <View style={{ width: 20 }} />
      </View>

      <View style={{ flexDirection: 'row', gap: 16, padding: 14 }}>
        {tabs.map((t, i) => (
          <Text key={t} style={{ color: i === 0 ? '#8c1d0d' : '#999', fontWeight: i === 0 ? 'bold' : 'normal', fontSize: 12 }}>{t}</Text>
        ))}
      </View>

      <FlatList
        data={orders}
        keyExtractor={(o) => o.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 60, color: '#8c1d0d' }}>
            Aún no tienes pedidos. ¡Compra algo!
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.title}>Pedido {item.id}</Text>
              <Text style={styles.status}>{item.status} ›</Text>
            </View>
            <Text style={styles.date}>{item.date}</Text>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
              {item.items.map((it) => (
                <View key={it.product.id} style={styles.thumb}>
                  <Text style={{ fontSize: 22 }}>{it.product.emoji}</Text>
                </View>
              ))}
              <Text style={styles.total}>{formatCOP(item.total)}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBE9D0' },
  header: { backgroundColor: '#6b1a1a', paddingTop: 40, paddingBottom: 12, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#FBE9D0', fontSize: 18, fontWeight: 'bold' },
  card: { backgroundColor: '#E8853D', borderRadius: 12, padding: 14 },
  title: { color: '#4a1008', fontWeight: 'bold' },
  status: { color: '#2b7a0b', fontWeight: 'bold' },
  date: { color: '#4a1008', fontSize: 12 },
  thumb: { width: 44, height: 44, backgroundColor: '#d4580b', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  total: { marginLeft: 'auto', color: '#4a1008', fontWeight: 'bold', alignSelf: 'center' },
});
