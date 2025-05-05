const mongoose = require('mongoose');

const bitacoraSchema = new mongoose.Schema({
    // Campos de la primera página
    tipoAeronave: String,
    matricula: String,
    organismo: String,
    folio: String,
    // Campos de InfoFlight (no requeridos inicialmente)
    lugarSalida: String,
    lugarLlegada: String,
    tipoVuelo: String,
    eventosTorque: String,
    cargaAceiteMotores: String,
    cargaAceiteAPU: String,
    fecha: Date,
    categoria: String,
    observaciones: String,
    // Campos de InfoFlightPt2 (no requeridos inicialmente)
    correcciones: [{
        type: mongoose.Schema.Types.Mixed
    }],
    // Campos de InfoFlightComponents (no requeridos inicialmente)
    componentes: [{
        type: mongoose.Schema.Types.Mixed
    }],
    // Campos de InfoFlightOrders (no requeridos inicialmente)
    ordenTrabajo: String,
    ordenSuministro: String,
    ordenConcentracion: String,
    solicitudComponente: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Bitacora', bitacoraSchema); 