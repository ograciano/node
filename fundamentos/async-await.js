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

const id = 1;

const getInfoUsuario = async (id) => {
    try {
        const empleado = await getEmpleados(id)
        const salario = await getSalario(id)
        return `El Empleado: ${empleado} tiene un salario de: ${salario}`;
    } catch (error) {
        throw error
    }
}

getInfoUsuario(id)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));
