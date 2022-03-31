const empleados = [{
        id: 1,
        nombre: 'Oscar'
    },
    {
        id: 2,
        nombre: 'Chris'
    },
    {
        id: 3,
        nombre: 'Danna'
    },
]

const salarios = [{
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 2000
    },
    {
        id: 3
    },
]

const getEmpleados = (id, callback) => {
    const empleado = empleados.find(e => e.id === id)?.nombre;
    if(empleado) {
        callback(null, empleado);
    } else {
        callback(`El empleado con id: ${id} no existe.`);
    }
}

const getSalario = (id, callback) => {
    const salario = salarios.find(e => e.id === id)?.salario;
    if(salario) {
        callback(null, salario);
    } else {
        callback(`El slario con id: ${id} no existe.`);
    }
}

const id = 2
getEmpleados(id, (err, empleado) => {
    if(err) {
        console.log('Error');
        return console.log(err);
    }
    console.log('Empleado Existe');
    console.log(empleado);
    getSalario(id, (err, salario) => {
        if(err) {
            console.log('Error');
            return console.log(err);
        }
        console.log('El Empleado:', empleado, 'tiene un salario de:', salario);
    });
});
