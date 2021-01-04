//Va a contener el modelo de los productos

const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({ //Aca van a ir todos los parametros que queremos que tengan los productos
    title: { type: String, required: true},
    price: { type: Number, required: true},
    description: { type: String, required: true},
    imagePath: { type: String}, //Contiene la url donde esta realmente almacenada la imagen
    createdAt: { type: Date, default: Date.now }
}); //Cualquier nuevo producto se va a comparar con este esquema de datos

module.exports = model('Product', ProductSchema); 