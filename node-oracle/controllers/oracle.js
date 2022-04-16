const { response, request } = require("express");
const {dgo} = require('../database/connection');
// const LlamadasReales = require("../models/llamadas_reales");


const prueba = async (req=request, res=response) => {
    const {desde, hasta} = req.body; 
    const llamadas = await dgo.query(`SELECT motivo_telefonista, count(distinct(folio_llamada))total
                                    FROM LLAMADAS_REALES 
                                    WHERE FECHA_HORA_INICIO_LLAMADA BETWEEN 
                                    To_Date('${desde} 11:00:00', 'dd/mm/yyyy hh24:mi:ss') AND 
                                    To_Date('${hasta} 11:59:59', 'dd/mm/yyyy hh24:mi:ss')
                                    GROUP BY  
                                    motivo_telefonista 
                                    ORDER BY 
                                    total desc`,{
                                        type: dgo.QueryTypes.SELECT

                                    })
    res.json(llamadas)
}


module.exports = {
    prueba
}