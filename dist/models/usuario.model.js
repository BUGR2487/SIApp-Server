"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuarioSchema = new mongoose_1.Schema({
    nombres: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    apellidos: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es necesario']
    },
    fechaNacimiento: {
        type: Date,
        required: [true, 'La fecha de nacimiento es necesaria']
    },
    edad: {
        type: String,
        required: [true, 'La edad es necesaria']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es necesaria']
    },
    referencias: {
        type: String,
        required: [true, 'Las referencias son necesarias']
    },
    estado: {
        type: String,
        required: [true, 'El estado es necesario']
    },
    ciudad: {
        type: String,
        required: [true, 'La ciudad es necesaria']
    },
    codigoPostal: {
        type: String,
        required: [true, 'El codigo postal es necesario']
    },
    codigoSeguridad: {
        type: String,
        required: [true, 'El codigo de seguridad es necesario']
    },
    fotoPerfil: {
        type: String,
        default: 'usuario.png'
    }
});
usuarioSchema.method('compararPassword', function (password = '') {
    if (bcrypt_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.Usuario = mongoose_1.model('Usuario', usuarioSchema);
