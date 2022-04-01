require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

console.clear();

const main = async() => {

    let opt = '';

    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB)
    }

    do {
        
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
            break;

            case '2':
                // console.log(tareas.listadoArr); 
                tareas.ListadoCompleto();
            break;

            case '3':
                // console.log(tareas.listadoArr); 
                tareas.listarPendientesCompletadas(true);
                break;
                
            case '4':
                // console.log(tareas.listadoArr); 
                tareas.listarPendientesCompletadas(false);
            break;

            case '5':
                // console.log(tareas.listadoArr); 
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;

            case '6':
                // console.log(tareas.listadoArr); 
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0'){
                    const ok = await confirmar('Esta seguro?');
                    if(ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada');
                    }
                }
            break;
        }

        guardarDB(tareas.listadoArr);
        if(opt !== '0') await pausa();
        
    } while (opt !== '0');
    
}

main();