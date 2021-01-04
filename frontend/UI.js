//Va a contener el codigo referido a la interface. Va a interactuar con el navegador

import ProductService from './services/ProductService';
const productService = new ProductService(); //Importa la clase con los metodos

import { format } from 'timeago.js'; //Este metodo toma una fecha y la formatea correctamente

class UI {

    async renderProducts() {
        const products = await productService.getProducts(); //Llama los productos desde el backend
        const productsCardContainer = document.getElementById('products-cards'); //Instancia el contenedor de los productos
        productsCardContainer.innerHTML = ''; //El contenedor va a estar vacio cada vez que se cargue la app
        products.forEach(product => {
            const div = document.createElement('div'); //Va a crear un nuevo contenedor
            div.className = '';
            div.innerHTML = `
                <div class="card m-2">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${product.imagePath}" class="img-fluid" alt="">
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title">${product.title}</h4>
                                <p class="card-text">${product.price}</p>
                                <a href="#" class="btn btn-danger delete" _id="${product._id}">X</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer w-100 text-muted">
                        ${format(product.created_at)}
                    </div>
                </div>
            `;
            productsCardContainer.appendChild(div); //Este div creado pasa a formar parte del contenedor
        });
    }

    async addANewProduct(product) {
        await productService.postProduct(product);
        this.clearProductForm(); //Llama al metodo para resetear el formulario
        this.renderProducts(); //Refresca la pagina para incluir el nuevo producto
    }

    clearProductForm() {
        document.getElementById('product-form').reset(); //Borra los datos del formulario
    }

    renderMessage(message, colorMessage, secondsToRemove) {
        const div = document.createElement('div');
        div.className = `alert alert-${colorMessage} message`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.col-md-4'); //Selecciona el contenedor principal
        const productForm = document.querySelector('#product-form');

        container.insertBefore(div, productForm); //Va a insertar el nuevo elemento dentro de container, antes del formulario
        setTimeout(() => { //Timer para que desaparezca el mensaje
            document.querySelector('.message').remove(); //Va a remover todos los elementos con clase 'message'
        }, secondsToRemove);
    }

    async deleteProduct(productId) {
        await productService.deleteProduct(productId);
        this.renderProducts();
    }

}

export default UI;