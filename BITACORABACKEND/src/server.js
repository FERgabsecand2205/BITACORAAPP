const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/database');
const Bitacora = require('./models/Bitacora');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

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
    try {
        console.log('=== POST /api/bitacora ===');
        console.log('Datos recibidos:', req.body);
        
    const data = req.body;
    
    // Validar solo los campos de la primera página
    if (!data.tipoAeronave || !data.matricula || !data.organismo || !data.folio) {
            console.log('Error: Faltan campos requeridos');
            return res.status(400).json({ 
                error: 'Todos los campos de la primera página son requeridos',
                details: {
                    tipoAeronave: !data.tipoAeronave,
                    matricula: !data.matricula,
                    organismo: !data.organismo,
                    folio: !data.folio
                }
            });
        }

        // Verificar si ya existe una bitácora con el mismo folio
        console.log('Verificando folio duplicado:', data.folio);
        const existingBitacora = await Bitacora.findOne({ folio: data.folio });
        if (existingBitacora) {
            console.log('Error: Folio duplicado encontrado');
            return res.status(400).json({ 
                error: 'Ya existe una bitácora con este folio',
                details: { folio: data.folio }
            });
        }

        // Crear nueva bitácora con valores iniciales
        console.log('Creando nueva bitácora...');
        const bitacora = new Bitacora({
            tipoAeronave: data.tipoAeronave.trim(),
            matricula: data.matricula.trim(),
            organismo: data.organismo.trim(),
            folio: data.folio.trim(),
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
            solicitudComponente: '',
            // Inicializar campos de firma como null
            signatureIssuing: null,
            signatureDoer: null,
            signatureDelivery: null
        });

        // Guardar la bitácora
        console.log('Guardando bitácora...');
        const savedBitacora = await bitacora.save();
        console.log('Bitácora guardada:', savedBitacora._id);

        // Actualizar archivo de respaldo
        console.log('Actualizando archivo de respaldo...');
        await updateBackupFile();
        console.log('Archivo de respaldo actualizado');

        res.status(201).json({ 
            message: 'Bitácora creada exitosamente',
            folio: savedBitacora.folio,
            _id: savedBitacora._id
        });
    } catch (error) {
        console.error('Error al crear la bitácora:', error);
        res.status(500).json({ 
            error: 'Error al crear la bitácora',
            details: error.message,
            stack: error.stack
        });
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
        if (req.body.componentes !== undefined) updateData.componentes = req.body.componentes;
        if (req.body.ordenTrabajo !== undefined) updateData.ordenTrabajo = req.body.ordenTrabajo;
        if (req.body.ordenSuministro !== undefined) updateData.ordenSuministro = req.body.ordenSuministro;
        if (req.body.ordenConcentracion !== undefined) updateData.ordenConcentracion = req.body.ordenConcentracion;
        if (req.body.solicitudComponente !== undefined) updateData.solicitudComponente = req.body.solicitudComponente;

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
                bitacora: {
                    ...bitacora.toObject(),
                    _id: bitacora._id
                }
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

// Endpoint para guardar datos de firma de emisión
app.post('/api/bitacora/signature-issuing', async (req, res) => {
  try {
    console.log('=== POST /api/bitacora/signature-issuing ===');
    console.log('Datos recibidos:', {
      ...req.body,
      firma: req.body.firma ? {
        ...req.body.firma,
        data: req.body.firma.data.substring(0, 50) + '...'
      } : null
    });

    const { grado, nombre, matricula, firma, bitacoraId } = req.body;

    // Validar campos requeridos
    if (!grado || !nombre || !matricula || !firma || !bitacoraId) {
      return res.status(400).json({
        error: 'Faltan campos requeridos',
        details: 'Se requieren: grado, nombre, matricula, firma y bitacoraId'
      });
    }

    // Validar formato de la firma
    if (!firma.data || !firma.type) {
      return res.status(400).json({
        error: 'Formato de firma inválido',
        details: 'La firma debe contener data y type'
      });
    }

    // Buscar la bitácora
    const bitacora = await Bitacora.findById(bitacoraId);
    if (!bitacora) {
      return res.status(404).json({
        error: 'Bitácora no encontrada',
        details: `No se encontró la bitácora con ID: ${bitacoraId}`
      });
    }

    // Crear objeto de firma con el formato correcto
    const signatureData = {
      grado: grado.trim(),
      nombre: nombre.trim(),
      matricula: matricula.trim(),
      firma: {
        data: firma.data,
        type: firma.type
      },
      fecha: new Date()
    };

    console.log('Datos de firma a guardar:', {
      ...signatureData,
      firma: {
        ...signatureData.firma,
        data: signatureData.firma.data.substring(0, 50) + '...'
      }
    });

    // Actualizar la bitácora
    bitacora.signatureIssuing = signatureData;
    const savedBitacora = await bitacora.save();
    console.log('Bitácora actualizada:', savedBitacora._id);

    // Actualizar archivo de respaldo
    await updateBackupFile();

    res.json({
      message: 'Datos de firma guardados correctamente',
      bitacora: savedBitacora
    });
  } catch (error) {
    console.error('Error al guardar los datos de firma:', error);
    res.status(500).json({
      error: 'Error al guardar los datos',
      details: error.message,
      stack: error.stack
    });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 