const express = require('express');
const router = express.Router();

// Variable para almacenar el último tiempo generado
let ultimoTiempo = null;
let ultimaConsulta = null;

// Ruta que devuelve un tiempo aleatorio entre 4 y 60 segundos
router.get('/', (req, res) => {
    const tiempo = Math.floor(Math.random() * (60 - 4 + 1)) + 4;
    
    ultimoTiempo = tiempo;
    ultimaConsulta = new Date();

    res.json({
        tiempo,
        timestamp: ultimaConsulta
    });
});

// Ruta para consultar el último tiempo generado (para el dashboard)
router.get('/status', (req, res) => {
    res.json({
        ultimoTiempo: ultimoTiempo || 0,
        ultimaConsulta: ultimaConsulta || null,
        proximaActualizacion: ultimoTiempo && ultimaConsulta 
            ? new Date(ultimaConsulta.getTime() + ultimoTiempo * 1000)
            : null
    });
});

module.exports = router;