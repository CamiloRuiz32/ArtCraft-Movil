/**
 * Configuración del inicio de sesión con Google (web).
 *
 * Cómo obtener tu Client ID:
 * 1. Entra a https://console.cloud.google.com/apis/credentials
 * 2. Crea un proyecto (o usa uno existente).
 * 3. Pulsa "Crear credenciales" → "ID de cliente de OAuth" → tipo "Aplicación web".
 * 4. En "Orígenes de JavaScript autorizados" agrega:   http://localhost:8081
 *    En "URI de redireccionamiento autorizados" agrega: http://localhost:8081
 *    (usa el puerto que te muestre el navegador cuando ejecutes la app).
 * 5. Copia el Client ID y pégalo aquí abajo, o guárdalo en un archivo .env
 *    como EXPO_PUBLIC_GOOGLE_CLIENT_ID=tu-client-id
 * 6. Reinicia el servidor de Expo (npx expo start --web).
 *
 * Nota: Google no permite este flujo dentro de Expo Go. En web funciona con
 * el Client ID de tipo "Aplicación web"; para celular se necesita un build
 * de desarrollo con Client IDs de Android/iOS.
 */

const fromEnv =
  typeof process !== 'undefined' ? process.env?.EXPO_PUBLIC_GOOGLE_CLIENT_ID : undefined;

export const GOOGLE_WEB_CLIENT_ID =
  fromEnv && fromEnv.trim().length > 0
    ? fromEnv.trim()
    : 'PEGA_AQUI_TU_CLIENT_ID.apps.googleusercontent.com';

// Solo es válido si tiene el formato real de Google (no el marcador de posición).
export const isGoogleConfigured =
  /^\d+-[a-zA-Z0-9_-]+\.apps\.googleusercontent\.com$/.test(GOOGLE_WEB_CLIENT_ID);
