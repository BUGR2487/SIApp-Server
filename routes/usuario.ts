import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from "../classes/token";
import { verificaToken } from "../middlewares/autenticacion";

const userRoutes = Router();

userRoutes.post('/create', ( req: Request, res: Response ) => {

    const user = {
        
        nombres             : req.body.nombres,
        apellidos           : req.body.apellidos,
        telefono            : req.body.telefono,
        fechaNacimiento     : req.body.fechaNacimiento,
        edad                : req.body.edad,
        email               : req.body.email,
        password            : bcrypt.hashSync( req.body.password, 10 ),
        direccion           : req.body.direccion,
        referencias         : req.body.referencias,
        estado              : req.body.estado,
        ciudad              : req.body.ciudad,
        codigoPostal        : req.body.codigoPostal,
        codigoSeguridad     : bcrypt.hashSync( req.body.codigoSeguridad, 10 ),
        fotoPerfil          : req.body.fotoPerfil

    };

    //Login
    userRoutes.post('/login', ( req: Request, res: Response ) => {

        const body = req.body;

        Usuario.findOne({ email: body.email }, ( error, userDB ) => {

            if ( error ) throw error;

            if( !userDB ) {
                return res.json({
                    ok: false,
                    mensaje: 'Usuario / Contraseña no son correctos'
                });
            }

            if( userDB.compararPassword( body.password ) ) {

                const tokenUser = Token.getJwtToken({
                    
                    _id             : userDB._id,
                    nombres         : userDB.nombres,
                    apellidos       : userDB.apellidos,
                    fechaNacimiento : userDB.fechaNacimiento,
                    email           : userDB.email

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
    Usuario.create( user ).then( userDB => {
        
        const tokenUser = Token.getJwtToken({
                    
            _id             : userDB._id,
            nombres         : userDB.nombres,
            apellidos       : userDB.apellidos,
            fechaNacimiento : userDB.fechaNacimiento,
            email           : userDB.email

        });

        res.json({
            ok: true,
            token: tokenUser
        });

    }).catch( error => {

        res.json({
            ok: false,
            error
        });

    });

});

//Actualizar usuario
userRoutes.post('/update', verificaToken, ( req: any, res: Response ) => {

    const user = {
        
        nombres             : req.body.nombres          || req.usuario.nombres,
        apellidos           : req.body.apellidos        || req.usuario.apellidos,
        telefono            : req.body.telefono         || req.usuario.telefono,
        fechaNacimiento     : req.body.fechaNacimiento  || req.usuario.fechaNacimiento,
        edad                : req.body.edad             || req.usuario.edad,
        email               : req.body.email            || req.usuario.email,
        password            : req.body.password         || req.usuario.password,
        direccion           : req.body.direccion        || req.usuario.direccion,
        referencias         : req.body.referencias      || req.usuario.referencias,
        estado              : req.body.estado           || req.usuario.estado,
        ciudad              : req.body.ciudad           || req.usuario.ciudad,
        codigoPostal        : req.body.codigoPostal     || req.usuario.codigoPostal,
        codigoSeguridad     : req.body.codigoSeguridad  || req.usuario.codigoSeguridad,
        fotoPerfil          : req.body.fotoPerfil       || req.usuario.fotoPerfil
        
    }

    Usuario.findByIdAndUpdate( req.usuario._id, user, { new: true }, ( error, userDB ) => {

        if( error ) throw error;

        if( !userDB ) {

            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });

        }

        const tokenUser = Token.getJwtToken({
                    
            _id             : userDB._id,
            nombres         : userDB.nombres,
            apellidos       : userDB.apellidos,
            fechaNacimiento : userDB.fechaNacimiento,
            email           : userDB.email

        });

        res.json({
            ok: true,
            token: tokenUser
        });

    });

});

userRoutes.get('/', [ verificaToken ], (req: any, res: Response) => {
    
    const usuario = req.usuario;

    res.json({
        ok: true,
        usuario
    });

});

export default userRoutes;