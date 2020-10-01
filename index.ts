/*
Cuando se cree la aplicacion de produccion de nuestro servidor, buscara este archivo
*/

import Server from './classes/server';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoutes from './routes/usuario';
import contactoRoutes from './routes/contacto';

const server = new Server();

//Body parser
server.app.use( bodyParser.urlencoded({extended: true}) );
server.app.use( bodyParser.json() );

//Configurar CORS
server.app.use( cors({ origin: true, credentials: true }) );

//Rutas de mi app
server.app.use( '/user', userRoutes );
server.app.use( '/contactos', contactoRoutes );

//Conectar Base de datos
mongoose.connect('mongodb://localhost:27017/SIApp', 
    {
        useNewUrlParser: true,
        useCreateIndex: true 
    },
    ( error ) => {
        if ( error ) throw error;
        console.log('Base de datos ONLINE');
    }
);

//Levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto: ${ server.port }`);
});