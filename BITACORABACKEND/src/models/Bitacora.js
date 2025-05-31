const mongoose = require('mongoose');

const bitacoraSchema = new mongoose.Schema({
    // Campos requeridos de la primera página
    tipoAeronave: {
        type: String,
        required: true,
        trim: true
    },
    matricula: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    organismo: {
        type: String,
        required: true,
        trim: true
    },
    // Campo opcional de la primera página
    folio: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    // Campos de InfoFlight (todos opcionales)
    lugarSalida: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    lugarLlegada: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    tipoVuelo: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    eventosTorque: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    cargaAceiteMotores: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    cargaAceiteAPU: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    fecha: {
        type: Date,
        required: false,
        default: null
    },
    categoria: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    observaciones: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    // Campos de InfoFlightPt2 (todos opcionales)
    correcciones: [{
        fechaCorreccion: {
            type: Date,
            required: false,
            default: Date.now
        },
        codigoATA: {
            type: String,
            required: false,
            trim: true,
            default: ''
        },
        mmReferencia: {
            type: String,
            required: false,
            trim: true,
            default: ''
        }
    }],
    observacionesInfoFlightPt2: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    // Campos de InfoFlightComponents (todos opcionales)
    componentes: [{
        numeroParte: {
            type: String,
            required: false,
            trim: true,
            default: ''
        },
        posicion: {
            type: String,
            required: false,
            trim: true,
            default: ''
        },
        numeroSerieOFF: {
            type: String,
            required: false,
            trim: true,
            default: ''
        },
        numeroSerieON: {
            type: String,
            required: false,
            trim: true,
            default: ''
        },
        nomenclatura: {
            type: String,
            required: false,
            trim: true,
            default: ''
        }
    }],
    // Campos de InfoFlightOrders (todos opcionales)
    ordenTrabajo: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    ordenSuministro: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    ordenConcentracion: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    solicitudComponente: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    categoriaInfoFlightOrders: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    observacionesInfoFlight: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    observacionesComments: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    // Campos de firma (todos opcionales)
    signatureIssuing: {
        grado: {
            type: String,
            required: false,
            trim: true
        },
        nombre: {
            type: String,
            required: false,
            trim: true
        },
        matricula: {
            type: String,
            required: false,
            trim: true
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
            required: false,
            default: null
        }
    },
    signatureDoer: {
        grado: {
            type: String,
            required: false,
            trim: true
        },
        nombre: {
            type: String,
            required: false,
            trim: true
        },
        matricula: {
            type: String,
            required: false,
            trim: true
        },
        mel: {
            type: String,
            required: false,
            trim: true
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
            required: false,
            default: null
        }
    },
    signatureDelivery: {
        grado: {
            type: String,
            required: false,
            trim: true
        },
        nombre: {
            type: String,
            required: false,
            trim: true
        },
        matricula: {
            type: String,
            required: false,
            trim: true
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
            required: false,
            default: null
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bitacora', bitacoraSchema); 