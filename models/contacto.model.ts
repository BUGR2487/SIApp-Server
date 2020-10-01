import { Schema, Document, model } from 'mongoose';

const contactoSchema = new Schema({

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
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe de existir una referencia a un usuario' ]
    }

});

interface IContacto extends Document 
{
    nombre: string;
    apellido: string;
    telefono: string;
    edad: string;
    email: string;
    parentesco: string;
    calle: string;
    numExterior: string;
    numeroInterior: string;
    colonia: string;
    referencia: string;
    codigopostal: string;
    estado: string;
    ciudad: string;
}

export const Contacto = model<IContacto>('Contacto', contactoSchema);
