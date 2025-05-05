require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');
const Bitacora = require('../models/Bitacora');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        
        if (!uri) {
            throw new Error('MONGODB_URI no está definida en las variables de entorno');
        }

        await mongoose.connect(uri, {
            serverApi: {
                version: '1',
                strict: true,
                deprecationErrors: true,
            }
        });
        
        console.log('✅ MongoDB Atlas conectado exitosamente');
    } catch (error) {
        console.error('❌ Error conectando a MongoDB Atlas:', error);
        process.exit(1);
    }
};

const resetBitacorasFile = async () => {
    try {
        const initialDataPath = path.join(__dirname, '..', 'data', 'bitacoras.initial.json');
        const targetPath = path.join(__dirname, '..', 'data', 'bitacoras.json');
        
        console.log('🔄 Restaurando archivo bitacoras.json a su estado inicial...');
        const initialData = await fs.readFile(initialDataPath, 'utf8');
        await fs.writeFile(targetPath, initialData);
        console.log('✅ Archivo bitacoras.json restaurado exitosamente');
    } catch (error) {
        console.error('❌ Error restaurando archivo bitacoras.json:', error);
        throw error;
    }
};

const initDb = async () => {
    try {
        console.log('🔄 Iniciando proceso de inicialización de la base de datos...');
        
        // 1. Restaurar archivo bitacoras.json
        await resetBitacorasFile();
        
        // 2. Conectar a la base de datos
        await connectDB();
        
        // 3. Leer el archivo JSON
        const jsonPath = path.join(__dirname, '..', 'data', 'bitacoras.json');
        console.log('📂 Leyendo archivo desde:', jsonPath);
        
        const jsonData = await fs.readFile(jsonPath, 'utf8');
        const bitacoras = JSON.parse(jsonData);
        console.log(`📊 Se encontraron ${bitacoras.length} registros en el archivo JSON`);

        // 4. Limpiar la colección existente
        console.log('🧹 Limpiando colección existente...');
        const deleteResult = await Bitacora.deleteMany({});
        console.log(`🗑️ Se eliminaron ${deleteResult.deletedCount} documentos`);

        // 5. Insertar los datos
        console.log('📥 Insertando nuevos datos...');
        const insertResult = await Bitacora.insertMany(bitacoras);
        console.log(`✅ Se insertaron ${insertResult.length} documentos exitosamente`);

        // 6. Verificar la inserción
        const count = await Bitacora.countDocuments();
        console.log(`📊 Total de documentos en la colección: ${count}`);

        console.log('✨ Proceso completado exitosamente');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error durante la inicialización:', error);
        process.exit(1);
    }
};

initDb(); 