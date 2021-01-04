import './styles/app.css';

import UI from './UI';

document.addEventListener('DOMContentLoaded', () => { //Una vez cargue el DOM...
    const ui = new UI();
    ui.renderProducts();
})

document.getElementById('product-form') //Llama al formulario de nuevo producto
    .addEventListener('submit', e => {  //Agrega una escucha en el evento submit
        const title = document.getElementById('title').value; //Guarda cada valor en una nueva variable
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;
        const image = document.getElementById('image').files;

        const formData = new FormData(); //Es como un formulario virtual donde se van a guardar los datos ingresados
        formData.append('image', image[0]);
        formData.append('title', title);
        formData.append('price', price);
        formData.append('description', description);

        const ui = new UI(); //Llama a la clase
        ui.addANewProduct(formData); //utiliza el metodo de la clase
        ui.renderMessage('New Product Added', 'success', 3000);//Cuando se cree el nuevo producto va a parecer ese mensaje

        e.preventDefault(); //Evita que se refresque la pagina cuando das submit
    });

    document.getElementById('products-cards')
        .addEventListener('click', e => { //Cuando exista un click
            if (e.target.classList.contains('delete')) { //Si el click es sobre un elemento con clase 'delete'
                const ui = new UI();
                ui.deleteProduct(e.target.getAttribute('_id'))
                ui.renderMessage('Product removed', 'danger', 2000);
            }
            e.preventDefault();
        });