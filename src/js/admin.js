import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';
import Funko from './funko.js'

//inicializo variables
let productos = [];
leerProductos();

window.agregarProducto = function (event){
    event.preventDefault();
    console.log("desde agregar producto");
    //crear variables
    let codigo = document.getElementById('codigo'), 
        nombre = document.getElementById('nombre'),
        numSerie = document.getElementById('numSerie'),
        categoria = document.getElementById('categoria'),
        descripcion = document.getElementById('descripcion'),
        precio = document.getElementById('precio'),
        imagen = document.getElementById('imagen'),
        stock = document.getElementById('stock');

    //validar formulario
    if(validarNumeros(codigo) && campoRequerido(nombre) && campoRequerido(numSerie) && campoRequerido(categoria) && campoRequerido(descripcion) && validarNumeros(precio) && campoRequerido(imagen) && validarNumeros(stock)){
        // crear el objeto
        let productoFunko = new Funko(codigo.value, nombre.value, numSerie.value, categoria.value, descripcion.value, precio.value, stock.value, imagen.value );

        console.log(productoFunko);
        //guardo el objeto en el array
        productos.push(productoFunko)
        //guardar el array en localstorage
        localStorage.setItem("funkopopKey", JSON.stringify(productos));

        //limpiar formulario
        document.getElementById('formProducto').reset();

        leerProductos();
    }
}

//funciones para validar campos
window.campoRequerido = function (input) {
    if (input.value == "") {
        //si esta vacio el input
        input.className = "form-control is-invalid";
        return false;
    } else {
        //tiene datos
        input.className = "form-control is-valid";
        return true;
    }
}
window.validarNumeros = function (input) {
    //validar que no tome espacios vacios
    let numeros = input.value.trim()
    if (numeros != "" && !isNaN(numeros)) {
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}

function leerProductos(){
    //esta funcion lee los datos del localstorage
    if(localStorage.length > 0){
        let _productos = JSON.parse( localStorage.getItem("funkopopKey"));

        if(productos.length == 0){
            productos = _productos
        }

        //borrar filas
        borrarFilas();
        //dibujar las filas de la tabla
        dibujarFilas(_productos);
    }
}

function dibujarFilas(_productos){
    let tbody = document.getElementById('listaProductos');
    let codHtml = '';
    for(let i in _productos){
        codHtml= `<tr>
        <th scope="row">${_productos[i].codigo}</th>
        <td>${_productos[i].nombre}</td>
        <td>${_productos[i].numSerie}</td>
        <td>${_productos[i].categoria}</td>
        <td>${_productos[i].descripcion}</td>
        <td>${_productos[i].stock}</td>
        <td>$${_productos[i].precio}</td>
        <td>${_productos[i].imagen}</td>
        <td>
            <button class="btn btn-outline-info">Editar</button>
            <button class="btn btn-outline-danger" onclick="eliminarProducto(this)" id="${_productos[i].codigo}">Borrar</button>
        </td>
    </tr>`

    tbody.innerHTML += codHtml; 
    }
}

function borrarFilas(){
    let tbody =  document.getElementById('listaProductos');
    if(tbody.children.length > 0){
        while(tbody.firstChild){
            tbody.removeChild(tbody.firstChild);
        }
    }
}

window.eliminarProducto =  function (prod){
    console.log(prod);

    //buscar un objeto en el arreglo
    // for(let i in productos){
    //     if(productos[i].codigo == prod.id ){
    //         //objeto encontrado
    //     }
    // }

    let arregloFiltrado =  productos.filter( function (item){
        return item.codigo != prod.id;
    })

    localStorage.setItem("funkopopKey", JSON.stringify(arregloFiltrado));
    productos = arregloFiltrado;
    leerProductos();

    console.log(arregloFiltrado);
}