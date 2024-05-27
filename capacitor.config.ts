import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.playez.app',
  appName: 'PlayezPro',
  webDir: 'dist/client',
  server: {
    url: 'https://playezpro-server.onrender.com', // Cambia esto con la URL de tu servidor
    cleartext: true, // Si necesitas acceder a recursos HTTP (no seguro)
    allowNavigation: ['http://localhost:4200'] // Lista de dominios permitidos para redirección
  }
};

export default config;
