const express = require('express');
const router = express.Router();

const Cotizacion = require('../models/cotizacion');

// Obtener las cotizaciones
router.get('/', async (req, res) =>{
  const cotizacion =   await Cotizacion.find();
  res.json(cotizacion);   
});

// Obtener una cotización por id
router.get('/:id', async (req, res) =>{
    const cotizacion =   await Cotizacion.findById(req.params.id);
    res.json(cotizacion);   
  });

//Crear una cotización
router.post('/', async (req, res) =>{
        const { departamento_origen, ciudad_origen, departamento_destino,ciudad_destino, flete_total } = req.body;
        const cotizacion = new Cotizacion({ departamento_origen, ciudad_origen, departamento_destino,ciudad_destino, flete_total });
        await cotizacion.save();
        res.json({ status: 'cotizacion creada correctamente'});
});

// Actualizar una cotización
router.put('/:id', async(req, res) =>{
    const { departamento_origen, ciudad_origen, departamento_destino,ciudad_destino, flete_total } = req.body;
    const cotizacionUpdate =  { departamento_origen, ciudad_origen, departamento_destino,ciudad_destino, flete_total };
    await Cotizacion.findByIdAndUpdate(req.params.id, cotizacionUpdate);
    res.json({ status: 'cotizacion actualizada correctamente'});
});

// Borrar cotización
router.delete('/:id', async(req, res) =>{
    await Cotizacion.findByIdAndDelete(req.params.id);
    res.json({ status: `cotizacion eliminada correctamente ${ req.params.id }`});

});

module.exports = router; 