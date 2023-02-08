const express = require("express");
const app = express();
const path = require('path');
const AppError = require("../UTILS/appError.js");
//configuración
app.set('port',process.env.PORT || 3000);
app.use(express.json());

//rutas 
app.use(require('./MODELS/user'));
/*app.use(require('./ROUTES/services'));
app.use(require('./ROUTES/purchase'));
app.use(require('./ROUTES/items'));*/

//inicio
app.listen(app.get('port'), () => console.log("Servidor en ejecución en el puerto 3000",app.get('port')));


