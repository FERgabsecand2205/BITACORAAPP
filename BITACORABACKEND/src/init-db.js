const mongoose = require('mongoose');
const Bitacora = require('./models/Bitacora');
require('dotenv').config();

const initDB = async () => {
    try {
        console.log('=== Inicializando Base de Datos ===');
        
        // Conectar a MongoDB
        console.log('Conectando a MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bitacora');
        console.log('✅ Conexión exitosa a MongoDB');

        // Limpiar colección existente
        console.log('Limpiando colección de bitácoras...');
        await Bitacora.deleteMany({});
        console.log('✅ Colección limpiada');

        // Crear índices
        console.log('Creando índices...');
        await Bitacora.collection.createIndex({ folio: 1 }, { unique: true });
        console.log('✅ Índices creados');

        // Crear bitácora de prueba
        console.log('Creando bitácora de prueba...');
        const bitacoraPrueba = new Bitacora({
            tipoAeronave: 'Prueba',
            matricula: 'TEST-001',
            organismo: 'Test',
            folio: 'TEST-001',
            lugarSalida: '',
            lugarLlegada: '',
            tipoVuelo: '',
            eventosTorque: '',
            cargaAceiteMotores: '',
            cargaAceiteAPU: '',
            fecha: new Date(),
            categoria: '',
            observaciones: '',
            correcciones: [],
            componentes: [],
            ordenTrabajo: '',
            ordenSuministro: '',
            ordenConcentracion: '',
            solicitudComponente: '',
            signatureIssuing: null,
            signatureDoer: null,
            signatureDelivery: null
        });

        await bitacoraPrueba.save();
        console.log('✅ Bitácora de prueba creada');

        console.log('=== Inicialización completada ===');
        process.exit(0);
    } catch (error) {
        console.error('Error durante la inicialización:', error);
        process.exit(1);
    }
};

initDB(); 