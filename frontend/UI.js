//Va a contener el codigo referido a la interface. Va a interactuar con el navegador

import ProductService from './services/ProductService';
const productService = new ProductService(); //Importa la clase con los metodos

import './styles/ui.css'

class UI {

    async renderProducts() {
        const products = await productService.getProducts(); //Llama los productos desde el backend
        const productsCardContainer = document.getElementById('products-cards'); //Instancia el contenedor de los productos
        productsCardContainer.innerHTML = ''; //El contenedor va a estar vacio cada vez que se cargue la app
        products.forEach(product => {
            const div = document.createElement('div'); //Va a crear un nuevo contenedor
            div.className = '';
            div.innerHTML = `
                
                    <div class="product">
                        <div class="img">
                            <img src="http://localhost:3000${product.imagePath}" alt="" class="img">
                        </div>
                        <div class="productDescription">
                            <div class="card-title">${product.title}</div>                            
                            <div class="card-description">${product.description}</div>
                            <div class="card-price">$${product.price}</div>
                            <a href="#"><button class="delete" _id="${product._id}">Delete product</button></a>
                          
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

    renderMessageAdd(message, secondsToRemove) {
        const div = document.createElement('div');
        div.className = 'messageAdd';
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.containerTwo'); //Selecciona el contenedor principal
        const productForm = document.querySelector('#product-form');

        container.insertBefore(div, productForm); //Va a insertar el nuevo elemento dentro de container, antes del formulario
        
        setTimeout(() => { //Timer para que desaparezca el mensaje
            document.querySelector('.messageAdd').remove(); //Va a remover todos los elementos con clase 'message'
        }, secondsToRemove);
        
    }

    renderMessageRemove(message, secondsToRemove) {
        const div = document.createElement('div');
        div.className = 'messageRemove';
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.containerTwo'); //Selecciona el contenedor principal
        const productForm = document.querySelector('#product-form');

        container.insertBefore(div, productForm); //Va a insertar el nuevo elemento dentro de container, antes del formulario
        
        setTimeout(() => { //Timer para que desaparezca el mensaje
            document.querySelector('.messageRemove').remove(); //Va a remover todos los elementos con clase 'message'
        }, secondsToRemove);
        
    }

    async deleteProduct(productId) {
        await productService.deleteProduct(productId);
        this.renderProducts();
    }

}

export default UI;