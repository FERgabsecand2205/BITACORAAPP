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
        default: ''
    },
    lugarLlegada: {
        type: String,
        default: ''
    },
    tipoVuelo: {
        type: String,
        default: ''
    },
    eventosTorque: {
        type: String,
        default: ''
    },
    cargaAceiteMotores: {
        type: String,
        default: ''
    },
    cargaAceiteAPU: {
        type: String,
        default: ''
    },
    fecha: {
        type: Date,
        default: null
    },
    categoria: {
        type: String,
        default: ''
    },
    observaciones: {
        type: String,
        default: ''
    },
    // Campos de InfoFlightPt2 (no requeridos inicialmente)
    correcciones: [{
        texto: String,
        fecha: Date,
        usuario: String
    }],
    // Campos de InfoFlightComponents (no requeridos inicialmente)
    componentes: [{
        nombre: String,
        cantidad: Number,
        unidad: String
    }],
    // Campos de InfoFlightOrders (no requeridos inicialmente)
    ordenTrabajo: {
        type: String,
        default: ''
    },
    ordenSuministro: {
        type: String,
        default: ''
    },
    ordenConcentracion: {
        type: String,
        default: ''
    },
    solicitudComponente: {
        type: String,
        default: ''
    },
    // Datos de la firma de emisión
    signatureIssuing: {
        grado: {
            type: String,
            required: false
        },
        nombre: {
            type: String,
            required: false
        },
        matricula: {
            type: String,
            required: false
        },
        firma: {
            data: {
                type: String,
                required: false
            },
            type: {
                type: String,
                required: false
            }
        },
        fecha: {
            type: Date,
            default: null
        }
    },
    // Datos de la firma de realización
    signatureDoer: {
        grado: {
            type: String,
            required: false
        },
        nombre: {
            type: String,
            required: false
        },
        matricula: {
            type: String,
            required: false
        },
        mel: {
            type: String,
            required: false
        },
        firma: {
            data: {
                type: String,
                required: false
            },
            type: {
                type: String,
                required: false
            }
        },
        fecha: {
            type: Date,
            default: null
        }
    },
    // Datos de la firma de entrega
    signatureDelivery: {
        grado: {
            type: String,
            required: false
        },
        nombre: {
            type: String,
            required: false
        },
        matricula: {
            type: String,
            required: false
        },
        firma: {
            data: {
                type: String,
                required: false
            },
            type: {
                type: String,
                required: false
            }
        },
        fecha: {
            type: Date,
            default: null
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bitacora', bitacoraSchema); 