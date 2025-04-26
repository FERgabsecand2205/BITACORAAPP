const mongoose = require('mongoose');

const bitacoraSchema = new mongoose.Schema({
    // Campos de la primera página
    tipoAeronave: {
        type: String,
        required: true
    },
    matricula: {
        type: String,
        required: true
    },
    organismo: {
        type: String,
        required: true
    },
    folio: {
        type: String,
        required: true,
        unique: true
    },
    // Campos de InfoFlight (no requeridos inicialmente)
    lugarSalida: {
        type: String,
        required: false
    },
    lugarLlegada: {
        type: String,
        required: false
    },
    tipoVuelo: {
        type: String,
        required: false
    },
    eventosTorque: {
        type: String,
        required: false
    },
    cargaAceiteMotores: {
        type: String,
        required: false
    },
    cargaAceiteAPU: {
        type: String,
        required: false
    },
    fecha: {
        type: Date,
        required: false
    },
    categoria: {
        type: String,
        required: false
    },
    observaciones: {
        type: String,
        required: false
    },
    // Campos de InfoFlightPt2 (no requeridos inicialmente)
    correcciones: [{
        fecha: {
            type: Date,
            required: false
        },
        codigoATA: {
            type: String,
            required: false
        },
        mmReferencia: {
            type: String,
            required: false
        },
        observaciones: {
            type: String,
            required: false
        }
    }],
    // Campos de InfoFlightComponents (no requeridos inicialmente)
    componentes: [{
        numeroParte: {
            type: String,
            required: false
        },
        posicion: {
            type: String,
            required: false
        },
        numeroSerieOFF: {
            type: String,
            required: false
        },
        numeroSerieON: {
            type: String,
            required: false
        },
        nomenclatura: {
            type: String,
            required: false
        }
    }],
    // Campos de InfoFlightOrders (no requeridos inicialmente)
    ordenTrabajo: {
        type: String,
        required: false
    },
    ordenSuministro: {
        type: String,
        required: false
    },
    ordenConcentracion: {
        type: String,
        required: false
    },
    solicitudComponente: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bitacora', bitacoraSchema); 