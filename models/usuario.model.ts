import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new Schema({

    nombres: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    apellidos: {
        type: String,
        required: [ true, 'El apellido es necesario' ]
    },
    telefono: {
        type: String,
        required: [ true, 'El telefono es necesario' ]
    },
    fechaNacimiento: {
        type: Date,
        required: [ true, 'La fecha de nacimiento es necesaria' ]
    },
    edad: {
        type: String,
        required: [ true, 'La edad es necesaria' ]
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
        required: [ true, 'La direccion es necesaria' ]
    },
    referencias: {
        type: String,
        required: [ true, 'Las referencias son necesarias' ]
    },
    estado: {
        type: String,
        required: [ true, 'El estado es necesario' ]
    },
    ciudad: {
        type: String,
        required: [ true, 'La ciudad es necesaria' ]
    },
    codigoPostal: {
        type: String,
        required: [ true, 'El codigo postal es necesario' ]
    },
    codigoSeguridad: {
        type: String,
        required: [ true, 'El codigo de seguridad es necesario' ]
    },
    fotoPerfil: {
        type: String,
        default: 'usuario.png'
    }

});

usuarioSchema.method('compararPassword', function( password: string = '' ): boolean {

    if( bcrypt.compareSync( password, this.password ) ) {
        return true;
    }
    else {
        return false;
    }

});

interface IUsuario extends Document {
    
    nombres             : String;
    apellidos           : String;
    telefono            : String;
    fechaNacimiento     : Date;
    edad                : String;
    email               : String;
    password            : String;
    direccion           : String;
    referencias         : String;
    estado              : String;
    ciudad              : String;
    codigoPostal        : String;
    codigoSeguridad     : String;
    fotoPerfil          : String;

    compararPassword( password: string ): boolean;

}

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);