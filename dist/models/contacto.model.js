"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contacto = void 0;
const mongoose_1 = require("mongoose");
const contactoSchema = new mongoose_1.Schema({
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    telefono: {
        type: String
    },
    edad: {
        type: String
    },
    email: {
        type: String
    },
    parentesco: {
        type: String
    },
    calle: {
        type: String
    },
    numExterior: {
        type: String
    },
    numeroInterior: {
        type: String
    },
    colonia: {
        type: String
    },
    referencia: {
        type: String
    },
    codigoPostal: {
        type: String
    },
    estado: {
        type: String
    },
    ciudad: {
        type: String
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un usuario']
    }
});
exports.Contacto = mongoose_1.model('Contacto', contactoSchema);
