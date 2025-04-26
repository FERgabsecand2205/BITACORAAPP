# Bitácora App - Frontend

Aplicación móvil para el registro y seguimiento de bitácoras.

## Estructura del Proyecto

```
BITACORAFRONTEND/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/          # Páginas principales
│   ├── utils/          # Utilidades y configuraciones
│   └── assets/         # Recursos estáticos
├── package.json        # Dependencias y scripts
└── README.md          # Documentación
```

## Requisitos

- Node.js
- Expo CLI
- React Native
- EAS CLI (para builds de producción)

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Instalar EAS CLI globalmente:
```bash
npm install -g eas-cli
```

3. Iniciar el servidor de desarrollo:
```bash
npm start
```

## Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run android` - Ejecuta la app en Android
- `npm run ios` - Ejecuta la app en iOS
- `npm run web` - Ejecuta la app en web

## Construcción de Producción

Para generar builds de producción, sigue estos pasos:

1. Iniciar sesión en Expo:
```bash
eas login
```

2. Configurar el proyecto para builds:
```bash
eas build:configure
```

3. Generar builds de producción:

   - Para web (similar a build de Vite):
   ```bash
   eas build --platform web
   ```

   - Para Android:
   ```bash
   eas build --platform android
   ```

   - Para iOS:
   ```bash
   eas build --platform ios
   ```

   - Para todas las plataformas:
   ```bash
   eas build --platform all
   ```

## Conexión con el Backend

La aplicación se conecta al backend en `http://localhost:3001`. Asegúrate de que el servidor backend esté en ejecución. 