"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../models/usuario.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
const userRoutes = express_1.Router();
userRoutes.post('/create', (req, res) => {
    const user = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        telefono: req.body.telefono,
        fechaNacimiento: req.body.fechaNacimiento,
        edad: req.body.edad,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        direccion: req.body.direccion,
        referencias: req.body.referencias,
        estado: req.body.estado,
        ciudad: req.body.ciudad,
        codigoPostal: req.body.codigoPostal,
        codigoSeguridad: bcrypt_1.default.hashSync(req.body.codigoSeguridad, 10),
        fotoPerfil: req.body.fotoPerfil
    };
    //Login
    userRoutes.post('/login', (req, res) => {
        const body = req.body;
        usuario_model_1.Usuario.findOne({ email: body.email }, (error, userDB) => {
            if (error)
                throw error;
            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: 'Usuario / Contraseña no son correctos'
                });
            }
            if (userDB.compararPassword(body.password)) {
                const tokenUser = token_1.default.getJwtToken({
                    _id: userDB._id,
                    nombres: userDB.nombres,
                    apellidos: userDB.apellidos,
                    fechaNacimiento: userDB.fechaNacimiento,
                    email: userDB.email
                });
                res.json({
                    ok: true,
                    token: tokenUser
                });
            }
            else {
                return res.json({
                    ok: false,
                    mensaje: 'Usuario / Contraseña no son correctos ***'
                });
            }
        });
    });
    //Crear usuario
    usuario_model_1.Usuario.create(user).then(userDB => {
        const tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            nombres: userDB.nombres,
            apellidos: userDB.apellidos,
            fechaNacimiento: userDB.fechaNacimiento,
            email: userDB.email
        });
        res.json({
            ok: true,
            token: tokenUser
        });
    }).catch(error => {
        res.json({
            ok: false,
            error
        });
    });
});
//Actualizar usuario
userRoutes.post('/update', autenticacion_1.verificaToken, (req, res) => {
    const user = {
        nombres: req.body.nombres || req.usuario.nombres,
        apellidos: req.body.apellidos || req.usuario.apellidos,
        telefono: req.body.telefono || req.usuario.telefono,
        fechaNacimiento: req.body.fechaNacimiento || req.usuario.fechaNacimiento,
        edad: req.body.edad || req.usuario.edad,
        email: req.body.email || req.usuario.email,
        password: req.body.password || req.usuario.password,
        direccion: req.body.direccion || req.usuario.direccion,
        referencias: req.body.referencias || req.usuario.referencias,
        estado: req.body.estado || req.usuario.estado,
        ciudad: req.body.ciudad || req.usuario.ciudad,
        codigoPostal: req.body.codigoPostal || req.usuario.codigoPostal,
        codigoSeguridad: req.body.codigoSeguridad || req.usuario.codigoSeguridad,
        fotoPerfil: req.body.fotoPerfil || req.usuario.fotoPerfil
    };
    usuario_model_1.Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, (error, userDB) => {
        if (error)
            throw error;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        const tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            nombres: userDB.nombres,
            apellidos: userDB.apellidos,
            fechaNacimiento: userDB.fechaNacimiento,
            email: userDB.email
        });
        res.json({
            ok: true,
            token: tokenUser
        });
    });
});
userRoutes.get('/', [autenticacion_1.verificaToken], (req, res) => {
    const usuario = req.usuario;
    res.json({
        ok: true,
        usuario
    });
});
exports.default = userRoutes;
