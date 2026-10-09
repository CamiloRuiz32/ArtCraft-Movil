import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, Switch, ScrollView, StatusBar, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export default function ProfileMenuScreen({ route, navigation }) {
  const { section } = route.params;
  const { user, updateProfile, addresses, addAddress, cards, addCard, notifications, toggleNotification } = useApp();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [newItem, setNewItem] = useState('');

  const titles = {
    data: 'Mis datos',
    direcciones: 'Direcciones',
    pagos: 'Métodos de pago',
    notificaciones: 'Notificaciones',
    ayuda: 'Ayuda',
  };

  const onSaveProfile = () => {
    const res = updateProfile(name, email);
    Alert.alert(res.ok ? 'Guardado' : 'Error', res.ok ? 'Perfil actualizado' : res.error);
  };

  const onAdd = (add) => {
    if (!newItem.trim()) return Alert.alert('Vacío', 'Escribe algo primero');
    add(newItem.trim());
    setNewItem('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FBE9D0' }}>
      <StatusBar barStyle="light-content" backgroundColor="#6b1a1a" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#FBE9D0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{titles[section]}</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {section === 'data' && (
          <View style={styles.card}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
            <Text style={styles.label}>Correo</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />
            <TouchableOpacity style={styles.button} onPress={onSaveProfile}>
              <Text style={styles.buttonText}>Guardar cambios</Text>
            </TouchableOpacity>
          </View>
        )}

        {section === 'direcciones' && (
          <View style={styles.card}>
            {addresses.map((a, i) => (
              <Text key={i} style={styles.listItem}>📍 {a}</Text>
            ))}
            <TextInput style={styles.input} placeholder="Nueva dirección" value={newItem} onChangeText={setNewItem} />
            <TouchableOpacity style={styles.button} onPress={() => onAdd(addAddress)}>
              <Text style={styles.buttonText}>Agregar dirección</Text>
            </TouchableOpacity>
          </View>
        )}

        {section === 'pagos' && (
          <View style={styles.card}>
            {cards.map((c, i) => (
              <Text key={i} style={styles.listItem}>💳 {c}</Text>
            ))}
            <TextInput style={styles.input} placeholder="Nueva tarjeta (ej: Mastercard terminada 5678)" value={newItem} onChangeText={setNewItem} />
            <TouchableOpacity style={styles.button} onPress={() => onAdd(addCard)}>
              <Text style={styles.buttonText}>Agregar tarjeta</Text>
            </TouchableOpacity>
          </View>
        )}

        {section === 'notificaciones' && (
          <View style={styles.card}>
            {[
              ['pedidos', 'Estado de pedidos'],
              ['promos', 'Promociones'],
              ['noticias', 'Noticias'],
            ].map(([key, label]) => (
              <View key={key} style={styles.switchRow}>
                <Text style={{ color: '#4a1008', fontWeight: 'bold' }}>{label}</Text>
                <Switch value={notifications[key]} onValueChange={() => toggleNotification(key)} trackColor={{ true: '#8c1d0d' }} />
              </View>
            ))}
          </View>
        )}

        {section === 'ayuda' && (
          <View style={styles.card}>
            <Text style={styles.listItem}>📧 contacto@artcraft.com</Text>
            <Text style={styles.listItem}>📞 +57 300 123 4567</Text>
            <Text style={styles.listItem}>🕘 Lun a Sáb, 8am - 6pm</Text>
            <Text style={[styles.listItem, { marginTop: 8, fontWeight: 'bold' }]}>Preguntas frecuentes:</Text>
            <Text style={styles.listItem}>• ¿Hacen envíos? Sí, a todo Colombia.</Text>
            <Text style={styles.listItem}>• ¿Cómo pago? Tarjeta, PSE o contra entrega.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: '#6b1a1a', paddingTop: 40, paddingBottom: 12, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#FBE9D0', fontSize: 18, fontWeight: 'bold' },
  card: { backgroundColor: '#F5D7B8', borderRadius: 12, padding: 14 },
  label: { color: '#4a1008', fontWeight: 'bold', marginTop: 8 },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 10, marginTop: 6 },
  button: { backgroundColor: '#8c1d0d', borderRadius: 10, padding: 12, marginTop: 14, alignItems: 'center' },
  buttonText: { color: '#FBE9D0', fontWeight: 'bold' },
  listItem: { color: '#4a1008', fontSize: 14, marginBottom: 8 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
});
