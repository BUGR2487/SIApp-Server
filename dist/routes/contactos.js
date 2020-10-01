"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const contacto_model_1 = require("../models/contacto.model");
const contactosRouts = express_1.Router();
//Obtener contactos
contactosRouts.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contactos = yield contacto_model_1.Contacto.find()
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        contactos
    });
}));
//Crear contactos
contactosRouts.post('/', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    contacto_model_1.Contacto.create(body).then((contactoDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield contactoDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            contacto: contactoDB
        });
    })).catch(error => {
        res.json(error);
    });
});
exports.default = contactosRouts;
