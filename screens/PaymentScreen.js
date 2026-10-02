import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Alert,
} from 'react-native';
import { formatCOP } from '../data/mock';
import { useApp } from '../context/AppContext';

const methods = ['Tarjeta de crédito', 'PSE', 'Contra entrega'];

export default function PaymentScreen({ navigation }) {
  const { cartTotal, checkout } = useApp();
  const [method, setMethod] = useState(0);
  const shipping = 30000;

  const onPay = () => {
    const order = checkout();
    if (!order) {
      Alert.alert('Carrito vacío', 'Agrega productos antes de pagar.');
      return;
    }
    Alert.alert('¡Pago exitoso!', `Pedido ${order.id} realizado.`, [
      { text: 'Ver pedidos', onPress: () => navigation.navigate('Pedidos') },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FBE9D0' }}>
      <StatusBar barStyle="light-content" backgroundColor="#6b1a1a" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 20, color: '#FBE9D0' }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pago</Text>
        <View style={{ width: 20 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.cardTitle}>Datos de envío</Text>
            <Text style={{ color: '#8c1d0d', fontStyle: 'italic' }}>Editar</Text>
          </View>
          <Text style={styles.cardText}>Pepito Pérez{'\n'}Calle 123 # 456-12 , Popayán, Colombia{'\n'}310456789</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Métodos de pago</Text>
          {methods.map((m, i) => (
            <TouchableOpacity key={m} style={styles.methodRow} onPress={() => setMethod(i)}>
              <View style={[styles.radio, method === i && { backgroundColor: '#8c1d0d' }]} />
              <Text style={{ color: '#4a1008' }}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumen</Text>
          <Text style={styles.cardText}>Sub total: {formatCOP(cartTotal)}</Text>
          <Text style={styles.cardText}>Envío: {formatCOP(shipping)}</Text>
          <Text style={[styles.cardText, { fontWeight: 'bold', color: '#8c1d0d' }]}>
            Total: {formatCOP(cartTotal + shipping)}
          </Text>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={onPay}>
          <Text style={styles.payText}>Pagar Ahora</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: '#6b1a1a', paddingTop: 40, paddingBottom: 12, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#FBE9D0', fontSize: 18, fontWeight: 'bold' },
  card: { backgroundColor: '#F5D7B8', borderRadius: 12, padding: 14 },
  cardTitle: { fontWeight: 'bold', color: '#4a1008', marginBottom: 6 },
  cardText: { color: '#4a1008', fontSize: 13, lineHeight: 20 },
  methodRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 },
  radio: { width: 16, height: 16, borderRadius: 8, borderWidth: 1, borderColor: '#8c1d0d' },
  payButton: { backgroundColor: '#8c1d0d', borderRadius: 10, padding: 16, alignItems: 'center' },
  payText: { color: '#FBE9D0', fontWeight: 'bold', fontSize: 16 },
});
