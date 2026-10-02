import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';

const items = [
  { label: 'Mis datos', icon: '👤' },
  { label: 'Direcciones', icon: '📍' },
  { label: 'Métodos de pago', icon: '💳' },
  { label: 'Notificaciones', icon: '🔔' },
  { label: 'Ayuda', icon: '❓' },
];

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useApp();

  const onLogout = () => {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6b1a1a" />
      <View style={styles.header}>
        <Text style={styles.avatar}>👩</Text>
        <Text style={styles.name}>{user ? user.name : 'Invitado'}</Text>
        <Text style={styles.email}>{user ? user.email : 'sin sesión'}</Text>
        <Text style={styles.edit}>Editar perfil</Text>
      </View>

      <View style={{ padding: 16, gap: 10 }}>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Pedidos')}>
          <Text style={styles.rowText}>📦 Mis pedidos</Text>
          <Text>›</Text>
        </TouchableOpacity>
        {items.map((it) => (
          <TouchableOpacity key={it.label} style={styles.row} onPress={() => Alert.alert(it.label, 'Pantalla de ejemplo (simulada)')}>
            <Text style={styles.rowText}>{it.icon} {it.label}</Text>
            <Text>›</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.row} onPress={onLogout}>
          <Text style={[styles.rowText, { color: '#8c1d0d' }]}>⏻ Cerrar sesión</Text>
          <Text>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBE9D0' },
  header: { backgroundColor: '#6b1a1a', paddingTop: 50, paddingBottom: 20, alignItems: 'center' },
  avatar: { fontSize: 70, backgroundColor: '#d4580b', borderRadius: 45, padding: 6 },
  name: { color: '#FBE9D0', fontSize: 20, fontWeight: 'bold', marginTop: 8 },
  email: { color: '#d4a574', fontSize: 13 },
  edit: { color: '#FBE9D0', fontStyle: 'italic', marginTop: 4 },
  row: { backgroundColor: '#F5D7B8', borderRadius: 10, padding: 14, flexDirection: 'row', justifyContent: 'space-between' },
  rowText: { color: '#4a1008', fontWeight: 'bold' },
});
