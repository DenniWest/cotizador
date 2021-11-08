const mongoose = require('mongoose');
const { intersects } = require('semver');

// Esquema de moongose, para esquema de los datos
const { Schema } = mongoose;

const CotizacionSchema = new Schema({

    departamento_origen: { type: String, require: true },
    ciudad_origen: { type: String, require: true },
    departamento_destino: { type: String, require: true },
    ciudad_destino: { type: String, require: true },
    flete_total: { type: Number, require: true }

});

module.exports =  mongoose.model('cotizacion', CotizacionSchema);