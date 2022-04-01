const Tarea = require("./tarea");
require('colors')

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea)
        })
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    borrarTarea(id = '') {

        if(this._listado[id]) {
            delete this._listado[id]
        }
    }

    ListadoCompleto(){
        console.log();
        this.listadoArr.forEach( (tarea, i) => {
            let indice = i+1;
            console.log(`${(indice + '.').green} ${tarea.desc} :: ${tarea.completadoEn == null ? 'Pendiente'.red : 'Completada'.green}`)
  
        })
        
    }

    listarPendientesCompletadas(completadas = true){
        console.log();
        let contador = 0;
        this.listadoArr.forEach( (tarea) => {
            // console.log(tarea.completadoEn);
            const {desc, completadoEn} = tarea;
            if(completadas) {
                if(completadoEn) {
                    contador += 1
                    console.log(`${(contador.toString() + '.').green} ${desc} :: ${completadoEn.green}`)
                }
            } else {
                if (!completadoEn) {
                    contador += 1
                    console.log(`${(contador.toString() + '.').green} ${desc} :: ${completadoEn == null ? 'Pendiente'.red : 'Completada'.green}`)
                }
            }
  
        })
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();

            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null
            }
        })
    }
}

module.exports = Tareas;