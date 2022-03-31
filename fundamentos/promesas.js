const empleados = [{
    id: 1,
    nombre: 'Oscar'
}, {
    id: 2,
    nombre: 'Chris'
}, {
    id: 3,
    nombre: 'Danna'
}, ]
const salarios = [{
    id: 1,
    salario: 1000
}, {
    id: 2,
    salario: 2000
}, {
    id: 3
}, ]
const getEmpleados = (id) => {
    return new Promise((resolve, reject) => {
        const empleado = empleados.find(e => e.id === id)?.nombre;
        (empleado) ? resolve(empleado) :  reject(`No existe un empleado con id ${id}`); 
    })
}

const getSalario = (id) => {
    return new Promise((resolve, reject) => {
        const salario = salarios.find(e => e.id === id)?.salario;
        (salario) ? resolve(salario) :  reject(`No existe un salario con id ${id}`); 
    })
}

const id = 3
// getEmpleados(id)
//     .then( empleado => console.log(empleado))
//     .catch( err => console.log(err));

// getSalario(id)
//     .then( salario => console.log(salario))
//     .catch( err => console.log(err));

// getEmpleados(id)
//     .then((empleado) => {
//         getSalario(id)
//             .then((salario) => {
//                 console.log(`El Empleado: ${empleado} tiene un salario de ${salario} pesos`);
//             }).catch((err) => {
//                 console.log(err);
//             })
//         }).catch((err) => {
//             console.log(err);
//     });

let nombre;
getEmpleados(id)
    .then(empleado => {
        nombre = empleado;
        return getSalario(id);
    })
    .then(salario => console.log('El empleados:', nombre, 'tiene un salario de:', salario))
    .catch( err => console.log(err));