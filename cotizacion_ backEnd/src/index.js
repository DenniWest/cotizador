const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const path = require('path');

const { moongose } = require('./database');

const app = express();

// Settings
app.set( 'port', process.env.PORT || 3777 );

const corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200
    }

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// Routes
app.use('/api/cotizacion/',require('./routes/cotizacion.routes'));


// Static files
app.use(express.static(path.join(__dirname, 'public')));


// Starting server
app.listen(app.get('port'), () =>{
        console.log(`Sevidor ejecutandose en el puerto ${app.get('port')}`);
});