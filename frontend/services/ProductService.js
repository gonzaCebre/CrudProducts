class ProductService {

    constructor(){
        this.URI = '/api/products'
    }

    async getProducts() {
        const response = await fetch(this.URI); //Consulta los datos del backend. Si no especifico un metodo, por defecto es GET
        const products = await response.json(); //Convierte la respuesta en un json para que pueda ser interpretado
        return products;
    }

    async postProduct(product) {
        const res = await fetch(this.URI, {
            method: 'POST', //Especifica el metodo para crear un dato nuevo
            body: product //Lo enviado va a ser un producto
        });
        const data = await res.json(); //Convierte la respuesta en un json
        
    }

    async deleteProduct(productId) {
        const res = await fetch(`${this.URI}/${productId}`, {
            headers: {
                'Content-Type': 'aplication/json' //Lo enviado va a ser solo datos
            },
            method: 'DELETE'
        });
        const data = await res.json();
    }

}

export default ProductService;