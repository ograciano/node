import express, { Application } from "express";
import userRoutes from '../routes/usuarios';
import cors from 'cors';
import db from "../db/connection";

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Metodos iniciales
        this.dbConnection()
        this.middlewares()
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Base de datos online');
        } catch (error) {
            console.log(error);
            throw new Error();

        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // lectura del body
        this.app.use(express.json());
        // Carpeta Publica
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => console.log('Servidor corriendo en el puerto:', this.port));
    }
}

export default Server;