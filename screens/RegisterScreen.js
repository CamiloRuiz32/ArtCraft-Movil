import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  StatusBar, Alert, ScrollView,
} from 'react-native';
import { useApp } from '../context/AppContext';

export default function RegisterScreen({ navigation }) {
  const { register } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const onRegister = () => {
    const res = register(name, email, password, confirm);
    if (res.ok) {
      Alert.alert('¡Listo!', 'Cuenta creada (simulación)', [
        { text: 'OK', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Main' }] }) },
      ]);
    } else {
      Alert.alert('Error', res.error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, paddingTop: 50 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5C89A" />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Crear Cuenta</Text>
      <Text style={styles.subtitle}>Únete a Art Craft</Text>

      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Nombre completo" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirmar contraseña" value={confirm} onChangeText={setConfirm} secureTextEntry />

        <TouchableOpacity style={styles.button} onPress={onRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <Text style={styles.or}>— O continúa con —</Text>
        <TouchableOpacity style={styles.googleButton} onPress={onRegister}>
          <Text style={styles.googleText}>🔵 Google</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5C89A' },
  back: { fontSize: 22, color: '#8c1d0d', marginBottom: 8 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#8c1d0d' },
  subtitle: { fontSize: 13, color: '#4a1008', marginBottom: 20 },
  card: { backgroundColor: '#E8853D', borderRadius: 16, padding: 16 },
  input: { backgroundColor: '#FBE9D0', borderRadius: 10, padding: 12, marginTop: 10 },
  button: { backgroundColor: '#F5C89A', borderRadius: 20, padding: 12, marginTop: 16, alignItems: 'center' },
  buttonText: { color: '#8c1d0d', fontWeight: 'bold' },
  or: { textAlign: 'center', color: '#4a1008', marginVertical: 12, fontSize: 12 },
  googleButton: { backgroundColor: '#FBE9D0', borderRadius: 20, padding: 10, alignItems: 'center' },
  googleText: { color: '#4a1008', fontWeight: 'bold' },
  loginText: { textAlign: 'center', marginTop: 20, color: '#8c1d0d', fontWeight: 'bold' },
});
