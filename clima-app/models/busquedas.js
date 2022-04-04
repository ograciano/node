const fs = require('fs');

const axios = require('axios');

class Busquedas {
    historial = [];
    dbPath = './db/database.json';

    constructor() {
        this.leerDB();
        // TODO: leer bd si existe
    }

    get historialCapitalizado(){
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(' ')
        })
    }

    get paramsMapBox(){
        return {
            "language": "es",
            "limit":5,
            "access_token": process.env.MAPBOX_KEY
        }
    }

    // https://api.openweathermap.org/data/2.5/weather?
    // lat=24.02278&lon=-104.65444&appid=27138b685a8596df231f3f10d623e287&units=metric&lang=es

    get paramsWeather() {
        return {
            'appid':process.env.OPENWEATHER_KEY,
            'units':'metric',
            'lang' :'es'
            
        }
    }
    

    async ciudad(lugar = ''){
        try {
            // peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            })
            const resp = await instance.get();
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))
        } catch (error) {
            return [];
        }
    }

    async climaLugar(lat, lon) {
        try {
            // peticion http
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
                params: this.paramsWeather
            })

            // resp.data
            const resp = await instance.get();
            // console.log(resp.data);
            return {
                desc: resp.data.weather[0].description,
                min: resp.data.main.temp_min,
                max:resp.data.main.temp_max,
                temp:resp.data.main.temp
    
            }
        } catch (err) {
            console.log(err);
        }
    }

    agregarHistorial(lugar=''){
        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }
        this.historial.unshift(lugar.toLocaleLowerCase());
        this.guardarDB();
    }

    guardarDB(){
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerDB(){

        if (fs.existsSync(this.dbPath)) null;
        const info = JSON.parse(fs.readFileSync(this.dbPath,{encoding: 'utf-8'}));
        this.historial = info.historial;
        
        

    }
}

module.exports = Busquedas;