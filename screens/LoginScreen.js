import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  StatusBar, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useApp } from '../context/AppContext';
import ConfirmDialog from '../components/ConfirmDialog';
import { GOOGLE_WEB_CLIENT_ID, isGoogleConfigured } from '../config/googleAuth';

// Necesario para que el popup de Google cierre la sesión correctamente en web.
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const { login, loginWithGoogle } = useApp();
  const [email, setEmail] = useState('muselen10@gmail.com');
  const [password, setPassword] = useState('********');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [dialog, setDialog] = useState(null);

  const [, , promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_WEB_CLIENT_ID,
    webClientId: GOOGLE_WEB_CLIENT_ID,
    scopes: ['profile', 'email'],
  });

  const goToApp = (role) =>
    navigation.reset({
      index: 0,
      routes: [{ name: role === 'admin' ? 'Admin' : 'Main' }],
    });

  const onLogin = () => {
    const res = login(email, password);
    if (res.ok) {
      goToApp(res.role);
    } else {
      setDialog({ title: 'No pudimos iniciar sesión', message: res.error });
    }
  };

  const showGoogleHelp = () =>
    setDialog({
      title: 'Falta configurar Google',
      message:
        'Para entrar con Google necesitas un Client ID:\n\n' +
        '1. Entra a console.cloud.google.com/apis/credentials\n' +
        '2. Crea un "ID de cliente de OAuth" tipo "Aplicación web".\n' +
        '3. En "Orígenes de JavaScript autorizados" y en "URI de redireccionamiento autorizados" agrega:\n' +
        'http://localhost:8081\n' +
        '4. Copia el Client ID y pégalo en config/googleAuth.js (o en un archivo .env como EXPO_PUBLIC_GOOGLE_CLIENT_ID).\n' +
        '5. Reinicia Expo con: npx expo start --web',
    });

  const onGoogleLogin = async () => {
    if (!isGoogleConfigured) {
      showGoogleHelp();
      return;
    }

    setGoogleLoading(true);
    try {
      const result = await promptAsync();

      if (result?.type === 'success') {
        const accessToken = result.authentication?.accessToken;
        if (!accessToken) throw new Error('Sin token de acceso');

        const info = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        }).then((r) => r.json());

        if (!info?.email) throw new Error('Sin correo en la cuenta de Google');

        const res = loginWithGoogle({
          name: info.name,
          email: info.email,
          picture: info.picture,
        });

        if (!res.ok) {
          setDialog({ title: 'Cuenta no disponible', message: res.error });
          return;
        }
        goToApp(res.role);
      } else if (result?.type === 'error') {
        setDialog({
          title: 'No se pudo iniciar sesión con Google',
          message:
            'Revisa que el Client ID y la URL de redirección estén bien configurados en Google Cloud.\n\n' +
            'Detalle: ' + (result.error?.message || 'error de autorización'),
        });
      }
      // type "dismiss" / "cancel": el usuario cerró el popup, no hacemos nada.
    } catch (error) {
      setDialog({
        title: 'No se pudo iniciar sesión con Google',
        message:
          'Ocurrió un error al conectar con Google. Verifica que las ventanas emergentes estén permitidas e intenta de nuevo.\n\n' +
          'Detalle: ' + (error?.message || String(error)),
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FBE9D0" />
      <Text style={styles.title}>¡Bienvenido!</Text>
      <Text style={styles.subtitle}>
        Iniciar sesión para descubrir lo mejor de nuestras artesanías
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={() =>
            setDialog({
              title: 'Recuperar contraseña',
              message: 'Se envió un correo de recuperación (simulado).',
            })
          }
        >
          <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <Text style={styles.or}>— O continúa con —</Text>
        <TouchableOpacity
          style={[styles.googleButton, googleLoading && styles.googleButtonDisabled]}
          onPress={onGoogleLogin}
          disabled={googleLoading}
        >
          {googleLoading ? (
            <ActivityIndicator color="#4a1008" />
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="logo-google" size={18} color="#4a1008" />
              <Text style={styles.googleText}>Continuar con Google</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.registerText}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>

      <ConfirmDialog
        visible={!!dialog}
        title={dialog?.title || ''}
        message={dialog?.message}
        confirmText="Entendido"
        destructive={false}
        showCancel={false}
        onConfirm={() => setDialog(null)}
        onCancel={() => setDialog(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5C89A', padding: 20, paddingTop: 60 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#8c1d0d', marginBottom: 8 },
  subtitle: { fontSize: 13, color: '#4a1008', marginBottom: 20 },
  card: { backgroundColor: '#E8853D', borderRadius: 16, padding: 16 },
  label: { color: '#4a1008', fontWeight: 'bold', marginTop: 8 },
  input: { backgroundColor: '#FBE9D0', borderRadius: 10, padding: 12, marginTop: 4 },
  link: { color: '#4a1008', fontStyle: 'italic', marginTop: 8, fontSize: 12 },
  button: { backgroundColor: '#F5C89A', borderRadius: 20, padding: 12, marginTop: 16, alignItems: 'center' },
  buttonText: { color: '#8c1d0d', fontWeight: 'bold' },
  or: { textAlign: 'center', color: '#4a1008', marginVertical: 12, fontSize: 12 },
  googleButton: { backgroundColor: '#FBE9D0', borderRadius: 20, padding: 10, alignItems: 'center' },
  googleButtonDisabled: { opacity: 0.7 },
  googleText: { color: '#4a1008', fontWeight: 'bold' },
  registerText: { textAlign: 'center', marginTop: 20, color: '#8c1d0d', fontWeight: 'bold' },
});
