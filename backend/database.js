//Va a contener la conexion con la base de datos

const mongoose = require('mongoose'); //Requiere mongoose para poder utilizar mongodb



mongoose.connect(process.env.MONGODB_URI, { //Se va a conectar a la base de datos de mongodb 'javascriptdb'
    useNewUrlParser: true, //Evita que nos tire un error
    useUnifiedTopology: true
})
    .then(db => console.log('DB is connected')) //Si sale todo bien
    .catch(err => console.error(err)); //Si hay un error, lo captura y lo muestra

//process.env.MONGODB_URI //Trae informacion del sistema operativo. De las variables de entorno