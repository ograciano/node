require('dotenv').config()
const { leerInput, inquirerMenu, pausa, listarLugares} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async () => {
    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu()
        switch (opt) {
            case 1:
                // Mostrar Mensaje
                const lugar = await leerInput("Ciudad: ")
                // Buscarlos lugares
                const lugares = await busquedas.ciudad(lugar);
                
                // Seleccionar el lugar
                const id = await listarLugares(lugares)
                if(id==='0') continue;
                const lugarSel = lugares.find(l => l.id === id);

                //Guardar en base de datos
                busquedas.agregarHistorial(lugarSel.nombre);

                // clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

                // Mostrar Resultados
                console.log('\nInformacion de la ciudad\n');
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:',lugarSel.lat);
                console.log('Lng:',lugarSel.lng);
                console.log('Temperatura:',clima.temp);
                console.log('Minima:',clima.min);
                console.log('Maxima:',clima.max);
                console.log('Como esta el clima:', clima.desc);
            break;

            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${lugar}`);
                })
                // const hist = busquedas.leerDB()
                // console.log(hist);
            break;
        }
        if(opt !== 0) await pausa();
    } while (opt !== 0);
}


main();