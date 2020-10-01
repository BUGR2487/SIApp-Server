"use strict";
/*
Cuando se cree la aplicacion de produccion de nuestro servidor, buscara este archivo
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const contacto_1 = __importDefault(require("./routes/contacto"));
const server = new server_1.default();
//Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Configurar CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
//Rutas de mi app
server.app.use('/user', usuario_1.default);
server.app.use('/contactos', contacto_1.default);
//Conectar Base de datos
mongoose_1.default.connect('mongodb://localhost:27017/SIApp', {
    useNewUrlParser: true,
    useCreateIndex: true
}, (error) => {
    if (error)
        throw error;
    console.log('Base de datos ONLINE');
});
//Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto: ${server.port}`);
});
