const getUsuarioById = (id, callback) => {
    const usuario = {
        id,
        nombre: 'Oscar'
    }

    setTimeout(() => {
        callback(usuario)
    }, 1500)
}

getUsuarioById(10, (res) => {
    console.log(res.id, res.nombre);
})