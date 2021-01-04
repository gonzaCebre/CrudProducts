//Va a inicializar la app. Aca se configura el servidor

if(process.env.NODE_ENV  !== 'production') {
    require('dotenv').config(); //Permite trabajar con las variables de entorno
}


const express = require('express');

//Requiriendo dependencias
const morgan = require('morgan')
const multer = require('multer')
const path = require('path'); 
const cors = require('cors'); //Permite conectar dos servidores

//Inicializaciones
const app = express(); //'app' va a ser el nombre del servidor, que es el que va a usar express
require('./database'); //Requiere la base de datos y la inicializa


//Settings
app.set('port', process.env.PORT || 3000); //Seteas el puerto en el que va a funcionar el server
    //port va a ser el nombre, 3000 el numero del puerto


//Middlewares - Todos los middlewares van a ser funciones
app.use(morgan('dev')); //Permite ver por consola las peticiones HTTP
const storage = multer.diskStorage({ //Configuracion necesaria para usar multer
    destination: path.join(__dirname, 'public/uploads'), //Direccion donde se van a guardar las imagenes
    filename(req, file, cb) { //req tiene la info del request, file la del archivo subido y cb va a ser el callback que se va a ejecutar luego de subir la imagen
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }  //Va a guardar el archivo en base a la fecha en que se subio y le va a concatenar la extension de la imagen
}); //Dentro del objeto que pasa como parametro van a ir todas las configuraciones
app.use(multer({storage}).single('image'));//Permite subir imagenes desde el frontend
    //.single le dice que se va a subir una sola imagen
    //'image' va a ser el input que debe supervisar
app.use(express.urlencoded({extended: false})); //Permite interpretar los datos provenientes de formularios desde el frontend como si fueran JSONs
app.use(express.json()); //Va a ser capaz de interpretar objetos JSON
app.use(cors());

//Routes
app.use('/api/products', require('./routes/products')); //Cuando se ingrese la direccion 'localhost:3000//api/products' va a responder con el archivo products


//Static Files
app.use(express.static(path.join(__dirname, 'public'))); //La carpeta 'public' va a ser publica y accesible por el nvegador siempre
 




//Start server
app.listen(app.get('port'), ()=>{ 
    console.log('Server on port', app.get('port')); //Cuando se inicialice va a mostrar este mensaje por consola
}); //El server va a estar escuchando al puerto seteado