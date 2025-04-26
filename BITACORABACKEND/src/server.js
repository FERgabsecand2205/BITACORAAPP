const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/database');
const Bitacora = require('./models/Bitacora');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar a MongoDB
connectDB();

// Función para actualizar el archivo JSON de respaldo
const updateBackupFile = async () => {
    try {
        const bitacoras = await Bitacora.find({}, { __v: 0, createdAt: 0, updatedAt: 0 });
        const filePath = path.join(__dirname, 'data', 'bitacoras.json');
        fs.writeFileSync(filePath, JSON.stringify(bitacoras, null, 2));
    } catch (error) {
        console.error('Error al actualizar archivo de respaldo:', error);
    }
};

// Ruta para crear una nueva bitácora
app.post('/api/bitacora', async (req, res) => {
    const data = req.body;
    
    // Validar solo los campos de la primera página
    if (!data.tipoAeronave || !data.matricula || !data.organismo || !data.folio) {
        return res.status(400).json({ error: 'Todos los campos de la primera página son requeridos' });
    }

    try {
        // Verificar si ya existe una bitácora con el mismo folio
        const existingBitacora = await Bitacora.findOne({ folio: data.folio });
        if (existingBitacora) {
            return res.status(400).json({ error: 'Ya existe una bitácora con este folio' });
        }

        // Crear nueva bitácora
        const bitacora = new Bitacora({
            tipoAeronave: data.tipoAeronave,
            matricula: data.matricula,
            organismo: data.organismo,
            folio: data.folio,
            // Inicializar campos vacíos
            lugarSalida: '',
            lugarLlegada: '',
            tipoVuelo: '',
            eventosTorque: '',
            cargaAceiteMotores: '',
            cargaAceiteAPU: '',
            fecha: null,
            categoria: '',
            observaciones: '',
            correcciones: [],
            componentes: [],
            ordenTrabajo: '',
            ordenSuministro: '',
            ordenConcentracion: '',
            solicitudComponente: ''
        });

        // Guardar la bitácora
        await bitacora.save();

        // Actualizar archivo de respaldo
        await updateBackupFile();

        res.status(201).json({ 
            message: 'Bitácora creada exitosamente',
            folio: bitacora.folio,
            _id: bitacora._id
        });
    } catch (error) {
        console.error('Error al crear la bitácora:', error);
        res.status(500).json({ error: 'Error al crear la bitácora' });
    }
});

// Ruta para actualizar una bitácora existente por ID
app.put('/api/bitacora/id/:id', async (req, res) => {
    try {
        // Validar que el ID sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const updateData = {};
        
        // Solo actualizar los campos que se proporcionan
        if (req.body.lugarSalida !== undefined) updateData.lugarSalida = req.body.lugarSalida;
        if (req.body.lugarLlegada !== undefined) updateData.lugarLlegada = req.body.lugarLlegada;
        if (req.body.tipoVuelo !== undefined) updateData.tipoVuelo = req.body.tipoVuelo;
        if (req.body.eventosTorque !== undefined) updateData.eventosTorque = req.body.eventosTorque;
        if (req.body.cargaAceiteMotores !== undefined) updateData.cargaAceiteMotores = req.body.cargaAceiteMotores;
        if (req.body.cargaAceiteAPU !== undefined) updateData.cargaAceiteAPU = req.body.cargaAceiteAPU;
        if (req.body.fecha !== undefined) updateData.fecha = req.body.fecha;
        if (req.body.categoria !== undefined) updateData.categoria = req.body.categoria;
        if (req.body.observaciones !== undefined) updateData.observaciones = req.body.observaciones;

        console.log('=== Backend - Intentando actualizar bitácora ===');
        console.log('ID recibido:', req.params.id);
        console.log('Datos a actualizar:', updateData);

        const bitacora = await Bitacora.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true, select: { __v: 0, createdAt: 0, updatedAt: 0 } }
        );

        if (bitacora) {
            console.log('=== Backend - Bitácora actualizada exitosamente ===');
            console.log('Bitácora actualizada:', bitacora);
            // Actualizar archivo de respaldo
            await updateBackupFile();
            res.json({ 
                message: 'Bitácora actualizada exitosamente',
                bitacora: bitacora
            });
        } else {
            console.log('=== Backend - Bitácora no encontrada ===');
            console.log('ID buscado:', req.params.id);
            res.status(404).json({ error: 'Bitácora no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la bitácora:', error);
        res.status(500).json({ error: 'Error al actualizar la bitácora' });
    }
});

// Ruta para actualizar una bitácora existente por folio
app.put('/api/bitacora/:folio', async (req, res) => {
    try {
        const updateData = {};
        
        // Solo actualizar los campos que se proporcionan
        if (req.body.lugarSalida !== undefined) updateData.lugarSalida = req.body.lugarSalida;
        if (req.body.lugarLlegada !== undefined) updateData.lugarLlegada = req.body.lugarLlegada;
        if (req.body.tipoVuelo !== undefined) updateData.tipoVuelo = req.body.tipoVuelo;
        if (req.body.eventosTorque !== undefined) updateData.eventosTorque = req.body.eventosTorque;
        if (req.body.cargaAceiteMotores !== undefined) updateData.cargaAceiteMotores = req.body.cargaAceiteMotores;
        if (req.body.cargaAceiteAPU !== undefined) updateData.cargaAceiteAPU = req.body.cargaAceiteAPU;
        if (req.body.fecha !== undefined) updateData.fecha = req.body.fecha;
        if (req.body.categoria !== undefined) updateData.categoria = req.body.categoria;
        if (req.body.observaciones !== undefined) updateData.observaciones = req.body.observaciones;
        if (req.body.correcciones !== undefined) updateData.correcciones = req.body.correcciones;

        console.log('=== Backend - Intentando actualizar bitácora ===');
        console.log('Folio recibido:', req.params.folio);
        console.log('Datos a actualizar:', updateData);

        const bitacora = await Bitacora.findOneAndUpdate(
            { folio: req.params.folio },
            { $set: updateData },
            { new: true, select: { __v: 0, createdAt: 0, updatedAt: 0 } }
        );

        if (bitacora) {
            console.log('=== Backend - Bitácora actualizada exitosamente ===');
            console.log('Bitácora actualizada:', bitacora);
            // Actualizar archivo de respaldo
            await updateBackupFile();
            res.json({ 
                message: 'Bitácora actualizada exitosamente',
                bitacora: bitacora
            });
        } else {
            console.log('=== Backend - Bitácora no encontrada ===');
            console.log('Folio buscado:', req.params.folio);
            res.status(404).json({ error: 'Bitácora no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la bitácora:', error);
        res.status(500).json({ error: 'Error al actualizar la bitácora' });
    }
});

// Ruta para obtener todas las bitácoras
app.get('/api/bitacoras', async (req, res) => {
    try {
        const bitacoras = await Bitacora.find({}, { __v: 0, createdAt: 0, updatedAt: 0 });
        res.json(bitacoras);
    } catch (error) {
        console.error('Error al obtener las bitácoras:', error);
        res.status(500).json({ error: 'Error al obtener las bitácoras' });
    }
});

// Ruta para obtener una bitácora específica por ID
app.get('/api/bitacora/id/:id', async (req, res) => {
    try {
        const bitacora = await Bitacora.findById(req.params.id, { __v: 0, createdAt: 0, updatedAt: 0 });
        
        if (bitacora) {
            res.json(bitacora);
        } else {
            res.status(404).json({ error: 'Bitácora no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la bitácora:', error);
        res.status(500).json({ error: 'Error al obtener la bitácora' });
    }
});

// Ruta para agregar una corrección a una bitácora existente
app.patch('/api/bitacora/:folio/correcciones', async (req, res) => {
    try {
        console.log('=== Backend - Intentando agregar corrección ===');
        console.log('Folio recibido:', req.params.folio);
        console.log('Datos de corrección:', req.body);

        // Validar que se proporcione una corrección
        if (!req.body.correccion || req.body.correccion.trim() === '') {
            return res.status(400).json({ error: 'La corrección es requerida' });
        }

        const bitacora = await Bitacora.findOneAndUpdate(
            { folio: req.params.folio },
            { 
                $push: { 
                    correcciones: {
                        texto: req.body.correccion,
                        fecha: new Date(),
                        usuario: req.body.usuario || 'Sistema'
                    }
                } 
            },
            { new: true, select: { __v: 0, createdAt: 0, updatedAt: 0 } }
        );

        if (bitacora) {
            console.log('=== Backend - Corrección agregada exitosamente ===');
            console.log('Bitácora actualizada:', bitacora);
            // Actualizar archivo de respaldo
            await updateBackupFile();
            res.json({ 
                message: 'Corrección agregada exitosamente',
                bitacora: bitacora
            });
        } else {
            console.log('=== Backend - Bitácora no encontrada ===');
            console.log('Folio buscado:', req.params.folio);
            res.status(404).json({ error: 'Bitácora no encontrada' });
        }
    } catch (error) {
        console.error('Error al agregar la corrección:', error);
        res.status(500).json({ error: 'Error al agregar la corrección' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 