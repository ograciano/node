
const {crearArchivo} = require('./helpers/multiplcar');
const argv = require('./config/yargs');
require('colors');

console.clear();

// console.log(argv);

// const base = 8

crearArchivo(argv.b, argv.l, argv.h)
    .then(nombreArchivo => console.log(nombreArchivo.rainbow, 'creado'))
    .catch(err => {console.log(err)});