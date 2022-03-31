const argv = require('yargs')
                .option('b', {
                    alias: 'base',
                    type: 'number',
                    demandOption: true,
                    describe: 'Es la base de la tabla de multiplicar'
                })
                .option('h', {
                    alias: 'hasta',
                    type: 'number',
                    describe: 'Es la longitud de la tabla de multiplicar',
                    default: 10
                })
                .option('l', {
                    alias: 'list',
                    type: 'boolean',
                    demandOption: false,
                    default: false,
                    describe: 'Muestra la tabla en consola'
                })
                .check((argv, options) => {
                    if(isNaN(argv.b)){
                        throw 'La base tiene que ser un numero'
                    }
                    return true;
                })
                .argv;

module.exports = argv;