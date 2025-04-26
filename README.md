# Bitácora App

Bitácora App es una aplicación móvil diseñada para gestionar bitácoras de mantenimiento de aeronaves. Permite registrar información de vuelos, crear nuevas bitácoras, y administrar actividades relacionadas con el mantenimiento de aeronaves.

## Estructura del Proyecto

```
bitacoraApp/
├── BITACORAFRONTEND/    # Frontend React Native
│   ├── src/            # Código fuente del frontend
│   ├── package.json    # Dependencias del frontend
│   └── README.md       # Documentación del frontend
├── BITACORABACKEND/    # Backend Node.js
│   ├── src/           # Código fuente del backend
│   └── package.json   # Dependencias del backend
├── README.md          # Documentación general
└── LICENSE            # Licencia del proyecto
```

## Funcionalidades Actuales

1. **Pantalla de Bienvenida**: Muestra un mensaje de bienvenida y permite iniciar el flujo de creación de una nueva bitácora.
2. **Crear Nueva Bitácora**: Permite registrar información básica como nombre, matrícula y referencia.
3. **Bitácora de Mantenimiento**: Registro de datos específicos de la aeronave, como tipo, matrícula, organismo y folio.
4. **Información de Vuelo**: 
   - Registro de datos del vuelo, como lugar de salida, lugar de llegada, tipo de vuelo, eventos de torque, carga de aceite y fecha.
   - Segunda parte del registro de vuelo con información adicional y específica.
   - Gestión de órdenes de trabajo relacionadas con el vuelo.
5. **Firmas Digitales**:
   - Registro de firma de quien entrega la aeronave.
   - Registro de firma de quien realiza el trabajo.
   - Registro de firma de quien emite la orden.
6. **Observaciones y Comentarios**: Sección dedicada para registrar observaciones y comentarios relevantes sobre el mantenimiento.
7. **Estado de Bitácoras**: Visualización del estado de las aeronaves con alertas basadas en las horas de vuelo.
8. **Navegación**: Flujo de navegación entre pantallas utilizando `react-router-native`.

## Componentes Nuevos

1. **DropdownButton**: Componente para selección de opciones mediante menú desplegable.
2. **SegmentedInput**: Componente para entrada de datos segmentada.
3. **SmallButton**: Versión compacta del botón para acciones secundarias.
4. **LayoutPage y LayoutScrollViewPage**: Componentes base para la estructura de las páginas con soporte para scroll.

## Requisitos Previos

- Node.js (versión 14 o superior)
- Expo CLI instalado globalmente (`npm install -g expo-cli`)
- EAS CLI instalado globalmente (`npm install -g eas-cli`)

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/bitacoraApp.git
   cd bitacoraApp
   ```

2. Instala las dependencias del frontend:
   ```bash
   cd BITACORAFRONTEND
   npm install
   ```

3. Instala las dependencias del backend:
   ```bash
   cd ../BITACORABACKEND
   npm install
   ```

## Ejecución del Proyecto

1. Inicia el backend:
   ```bash
   cd BITACORABACKEND
   npm start
   ```

2. Inicia el frontend:
   ```bash
   cd ../BITACORAFRONTEND
   npm start
   ```

3. Escanea el código QR con la aplicación Expo Go en tu dispositivo móvil o selecciona una opción para ejecutar en un emulador.

## Construcción de Producción

Para generar builds de producción del frontend:

1. Iniciar sesión en Expo:
   ```bash
   cd BITACORAFRONTEND
   eas login
   ```

2. Configurar el proyecto para builds:
   ```bash
   eas build:configure
   ```

3. Generar builds de producción:
   - Para web:
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

## Licencia

Este proyecto está licenciado bajo la [GNU General Public License v3.0](./LICENSE).
