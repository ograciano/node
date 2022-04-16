const express = require('express');
const cors = require('cors');
const db = require('../database/connection');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.appRoutes = {
            oracle: '/api/oracle'
        }
        this.dbConn();
        this.middlewares();
        this.routes()

    }

    routes() {
        this.app.use(this.appRoutes.oracle, require('../routes/oracle'));
    }

    async dbConn(){
        await db.dgo.authenticate()
            .then( () => console.log('Conectado a la base de datos Durango'))
            .catch((e) => console.log(`Error al conectar => ${e}`))
        await db.gp.authenticate()
            .then( () => console.log('Conectado a la base de datos Gomez'))
            .catch((e) => console.log(`Error al conectar => ${e}`))
        await db.sp.authenticate()
            .then( () => console.log('Conectado a la base de datos Santiago'))
            .catch((e) => console.log(`Error al conectar => ${e}`))
        await db.es.authenticate()
            .then( () => console.log('Conectado a la base de datos El Salto'))
            .catch((e) => console.log(`Error al conectar => ${e}`))
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    listen(){
        this.app.listen(this.port, () => console.log(`Servidor corriendo en el puerto ${this.port}`));
    }   
}

module.exports = Server;