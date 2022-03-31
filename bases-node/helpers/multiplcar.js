const fs = require('fs');
const colors = require('colors');
const crearArchivo = async (base = 5, list=false, hasta=10) => {
    try {

        let salida = ''; 
        let consola = '';
        for(let i = 1; i<=hasta; i++) {
            salida += `${base} x ${i} = ${base * i}\n`;
            consola += `${base} ${'x'.blue} ${i} ${'='.blue} ${base * i}\n`;
        }
        
        if (list) {
            console.log('==================='.green);
            console.log('    Tabla del'.green, colors.blue(base));
            console.log('==================='.green);
            console.log(consola);
            
        }
    
        fs.writeFileSync(`out/tabla-${base}.txt`, salida);
        return `tabla-${base}.txt`;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    crearArchivo
}