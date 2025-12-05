const express = require('express');
const router = express.Router();

// Variables para almacenar el estado del intervalo
let ultimoTiempo = null;
let ultimaConsulta = null;
let proximaActualizacion = null;

// Ruta principal: devuelve un tiempo aleatorio entre 4 y 60 segundos
// Esta ruta es llamada por el ESP32 antes de cada lectura
router.get('/', (req, res) => {
    // Genera tiempo aleatorio entre 4 y 60 segundos
    const tiempo = Math.floor(Math.random() * (60 - 4 + 1)) + 4;
    
    // Guarda el tiempo y la hora actual
    ultimoTiempo = tiempo;
    ultimaConsulta = new Date();
    
    // Calcula cuándo será la próxima actualización
    proximaActualizacion = new Date(ultimaConsulta.getTime() + tiempo * 1000);

    console.log(`[UPDATE] Nuevo intervalo: ${tiempo}s - Próxima lectura: ${proximaActualizacion.toISOString()}`);

    // Responde al ESP32 con el tiempo a esperar
    res.json({
        tiempo,
        timestamp: ultimaConsulta
    });
});

// Ruta de estado: consulta el último tiempo generado (para el dashboard)
router.get('/status', (req, res) => {
    res.json({
        ultimoTiempo: ultimoTiempo || 0,
        ultimaConsulta: ultimaConsulta || null,
        proximaActualizacion: proximaActualizacion || null
    });
});

module.exports = router;