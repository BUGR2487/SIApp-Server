import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Contacto } from '../models/contacto.model';

const contactoRoutes = Router();

//Obtener contactos
contactoRoutes.get('/', async (req: any, res: Response) => {

    const contactos = await Contacto.find()
                                    .populate('usuario', '-password')
                                    .exec();

    res.json({
        ok: true,
        contactos
    });

});


//Crear contactos
contactoRoutes.post('/', [ verificaToken ], (req: any, res: Response) => {

    const body = req.body;
    body.usuario = req.usuario._id;

    Contacto.create( body ).then( async contactoDB => {

        await contactoDB.populate('usuario', '-password').execPopulate();

        res.json({
            ok: true,
            contacto: contactoDB
        });

    }).catch( error => {
        res.json(error)
    });

});

export default contactoRoutes;