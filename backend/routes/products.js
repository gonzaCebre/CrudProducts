
//Llama al enrutador de express que nos permite definir y configurar las rutas que va a tener la app
const { Router } = require('express'); //Requiere el modulo Router de express
const router = Router(); //Lo guarda en una variable
const {unlink} = require('fs-extra'); //Se encarga de manejar archivos. Al ser -extra soporta promesas
const path = require('path');


const Product = require('../models/Product');


router.get('/', async (req,res) => {
    const products = await Product.find(); //Va a buscar los productos guardados en la base de datos y los va a guardar en una nueva constante 'products'
    res.json(products);
}); //Cuando exista una peticion get en la ruta '/', va a responder...

router.post('/', async (req, res) => {
    const { title, price, description } = req.body; //Desde req.body (lo que viene desde el frontend) voy a extraer esos datos y guardarlos en nuevas variables
    const imagePath = '/uploads/' +req.file.filename; //req.file contiene solo el valor de la imagen
    const newProduct = new Product({title, price, description, imagePath}) //Crea un nuevo producto con la info que le pasa el req.body
    await newProduct.save(); //Va a guardar ese nuevo producto en lla base de datos
    res.json({message: 'Product saved'});
});  //Cuando se realice una peticion post...

router.delete('/:id', async(req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id); //Obtiene el id del producto a eliminar y lo elimina de la base de datos
    unlink(path.resolve('./backend/public' + product.imagePath)) //Resolve indica que va a la carpeta incio del proyecto. Este fragmento es para eliminar las imagenes
    res.json({message: "Product Deleted"});
});

module.exports = router;