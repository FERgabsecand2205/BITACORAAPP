# Bitácora App

Bitácora App es una aplicación móvil diseñada para gestionar bitácoras de mantenimiento de aeronaves. Permite registrar información de vuelos, crear nuevas bitácoras, y administrar actividades relacionadas con el mantenimiento de aeronaves.

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

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/bitacoraApp.git
   cd bitacoraApp
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución del Proyecto

1. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```

2. Escanea el código QR con la aplicación Expo Go en tu dispositivo móvil o selecciona una opción para ejecutar en un emulador.

## Estructura del Proyecto

- **`src/components`**: Contiene los componentes reutilizables como botones, encabezados y layouts.
- **`src/pages`**: Contiene las pantallas principales de la aplicación, como `WelcomePage`, `NewBitacora`, `InfoFlight`, y `HomePage`.
- **`src/themesBitacora.js`**: Define los estilos globales utilizados en la aplicación.
- **`App.js`**: Punto de entrada principal de la aplicación.

## Licencia

Este proyecto está licenciado bajo la [GNU General Public License v3.0](./LICENSE).
