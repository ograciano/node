const lblOline = document.querySelector('#lblOline');
const lblOffline = document.querySelector('#lblOffline');

const txtMensaje = document.querySelector('#txtMensaje'); 
const btnEnviar = document.querySelector('#btnEnviar');



const socket = io();


socket.on('connect', () => {
    // console.log('conectado');

    lblOline.style.display = ''
    lblOffline.style.display = 'none'
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    lblOline.style.display = 'none'
    lblOffline.style.display = ''
});

socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
})

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('desde el server:', id);
    })
});