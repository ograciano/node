const express = require('express');
const hbs = require('hbs');

const app = express();
port = 8080

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/parials')

//Servir contenido estatico
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'Oscar Graciano',
        titulo: 'Curso de Node'
    })
})

app.get('/generic', (req, res) => {
    res.sendFile(__dirname + '/public/generic.html')
})

app.get('/generic', (req, res) => {
    res.sendFile(__dirname + '/public/elements.html')
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html')
})

app.listen(port , () => {
    console.log('Servidor corriendo en el puerto', port);
});