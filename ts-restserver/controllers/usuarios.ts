import { Request, Response } from "express";
import Usuario from "../models/usuario";


export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await Usuario.findAll();
    res.json({usuarios})
}

export const getUsuario = async (req: Request, res: Response) => {
    const {id} = req.params;
    const usuario = await Usuario.findByPk(id);
    if(usuario){
        res.json(usuario)
    } else {
        res.status(404).json({msg: `ǹo existe un usuario con in id ${id}`})
    }

}

export const postUsuario = async (req: Request, res: Response) => {
    const {body} = req;

    try {

        const existEmail = await Usuario.findOne({
            where: {email: body.email}
        });

        if(existEmail) {
            return res.status(400).json({msg: 'ya existe un usuario con el email: ' + body.email});
        }
        const usuario = Usuario.build(body);
        await usuario.save()
        res.json(usuario);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hable con el Administrador'})
        
    }
}

export const putUsuario = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {body} = req;

    try {

        const usuario = await Usuario.findByPk(id);
        if(!usuario) {
            return res.json({msg: 'No existe un usuario con el id: ' + id});
        }

        await usuario.update(body);

        res.json(usuario);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hable con el Administrador'})   
    }
}

export const deleteUsuario = (req: Request, res: Response) => {
    const {id} = req.params;
    res.json({msg: 'deleteUsuario Listo', id})
}