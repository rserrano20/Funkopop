import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';
import Funko from './funko.js';
import $ from 'jquery';
import Swal from 'sweetalert2';
import '@fortawesome/fontawesome-free/js/all.min.js';

//inicializo variables
let productos = [];
leerProductos();

let productoExistente = false; // false = producto es nuevo; true= modificar producto

window.agregarProducto = function() {

	console.log('desde agregar producto');
	//crear variables
	let codigo = document.getElementById('codigo'),
		nombre = document.getElementById('nombre'),
		numSerie = document.getElementById('numSerie'),
		categoria = document.getElementById('categoria'),
		descripcion = document.getElementById('descripcion'),
		precio = document.getElementById('precio'),
		imagen = document.getElementById('imagen'),
		stock = document.getElementById('stock');

	
		// crear el objeto
		let productoFunko = new Funko(
			codigo.value,
			nombre.value,
			numSerie.value,
			categoria.value,
			descripcion.value,
			precio.value,
			stock.value,
			imagen.value
		);

		console.log(productoFunko);
		//guardo el objeto en el array
		productos.push(productoFunko);
		//guardar el array en localstorage
		localStorage.setItem('funkopopKey', JSON.stringify(productos));

		//limpiar formulario
		limpiarFormulario();
		leerProductos();

		let ventanaModal = document.getElementById('modalProducto');
		$(ventanaModal).modal('hide');
		
		Swal.fire(
			'Operacion exitosa',
			'Se agrego un nuevo producto al catalogo',
			'success'
		  )
};

//funciones para validar campos
window.campoRequerido = function(input) {
	if (input.value == '') {
		//si esta vacio el input
		input.className = 'form-control is-invalid';
		return false;
	} else {
		//tiene datos
		input.className = 'form-control is-valid';
		return true;
	}
};
window.validarNumeros = function(input) {
	//validar que no tome espacios vacios
	let numeros = input.value.trim();
	if (numeros != '' && !isNaN(numeros)) {
		input.className = 'form-control is-valid';
		return true;
	} else {
		input.className = 'form-control is-invalid';
		return false;
	}
};

function leerProductos() {
	//esta funcion lee los datos del localstorage
	if (localStorage.length > 0) {
		let _productos = JSON.parse(localStorage.getItem('funkopopKey'));

		if (productos.length == 0) {
			productos = _productos;
		}

		//borrar filas
		borrarFilas();
		//dibujar las filas de la tabla
		dibujarFilas(_productos);
	}
}

function dibujarFilas(_productos) {
	let tbody = document.getElementById('listaProductos');
	let codHtml = '';
	for (let i in _productos) {
		codHtml = `<tr>
        <th scope="row">${_productos[i].codigo}</th>
        <td>${_productos[i].nombre}</td>
        <td>${_productos[i].numSerie}</td>
        <td>${_productos[i].categoria}</td>
        <td>${_productos[i].descripcion}</td>
        <td>${_productos[i].stock}</td>
        <td>$${_productos[i].precio}</td>
        <td>${_productos[i].imagen}</td>
        <td>
			<button class="btn btn-outline-info" onclick="editarProducto(${_productos[i].codigo})">
			<i class="fas fa-edit"></i></button>
            <button class="btn btn-outline-danger" onclick="eliminarProducto(this)" id="${_productos[i]
				.codigo}"><i class="fas fa-trash"></i></button>
        </td>
    </tr>`;

		tbody.innerHTML += codHtml;
	}
}

function borrarFilas() {
	let tbody = document.getElementById('listaProductos');
	if (tbody.children.length > 0) {
		while (tbody.firstChild) {
			tbody.removeChild(tbody.firstChild);
		}
	}
}

window.eliminarProducto = function(prod) {
	console.log(prod);

	Swal.fire({
		title: 'Esta seguro de eliminar el producto?',
		text: "No puedes volver esta operacion atras",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Borrar'
	  }).then((result) => {
		if (result.value) {
			console.log(result.value);
			let arregloFiltrado = productos.filter(function(item) {
				return item.codigo != prod.id;
			});
		
			localStorage.setItem('funkopopKey', JSON.stringify(arregloFiltrado));
			productos = arregloFiltrado;
			leerProductos();
		
			console.log(arregloFiltrado);

		  Swal.fire(
			'Producto eliminado',
			'El producto fue eliminado satisfactoriamente',
			'success'
		  )
		}
	  })
	//buscar un objeto en el arreglo
	// for(let i in productos){
	//     if(productos[i].codigo == prod.id ){
	//         //objeto encontrado
	//     }
	// }


};

window.editarProducto = function(codigo) {
	console.log(codigo);
	let modalProducto = document.getElementById('modalProducto');
	//buscar producto

	let objetoEncontrado = productos.find(function(producto) {
		return producto.codigo == codigo;
	});

	console.log(objetoEncontrado);
	//cargar en el modal los datos del objeto que quiero editar
	document.getElementById('codigo').value = objetoEncontrado.codigo;
	document.getElementById('nombre').value = objetoEncontrado.nombre;
	document.getElementById('numSerie').value = objetoEncontrado.numSerie;
	document.getElementById('categoria').value = objetoEncontrado.categoria;
	document.getElementById('descripcion').value = objetoEncontrado.descripcion;
	document.getElementById('stock').value = objetoEncontrado.stock;
	document.getElementById('precio').value = objetoEncontrado.precio;
	document.getElementById('imagen').value = objetoEncontrado.imagen;

	//cambiar el valor  de la variable bandera
	productoExistente = true;
	//abrir la ventana modal
	$(modalProducto).modal('show');
};

window.guardarDatos = function(event) {
	event.preventDefault();
	//agregar validaciones
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
	if (
		validarNumeros(codigo) &&
		campoRequerido(nombre) &&
		campoRequerido(numSerie) &&
		campoRequerido(categoria) &&
		campoRequerido(descripcion) &&
		validarNumeros(precio) &&
		campoRequerido(imagen) &&
		validarNumeros(stock)
	) {
		if (productoExistente == false) {
			//agregar un nuevo producto
			agregarProducto();
		} else {
			//modificar el producto
			productoModificado();
		}
	}else{
		alert("completar todos los campos");
	}
};

function productoModificado() {

	console.log('guardando datos del producto');
	//tomar los datos modificados del form
	let codigo = document.getElementById('codigo').value,
		nombre = document.getElementById('nombre').value,
		numSerie = document.getElementById('numSerie').value,
		categoria = document.getElementById('categoria').value,
		descripcion = document.getElementById('descripcion').value,
		precio = document.getElementById('precio').value,
		imagen = document.getElementById('imagen').value,
		stock = document.getElementById('stock').value;

	//actualizar esos datos en el arreglo
	for (let i in productos) {
		if (productos[i].codigo == codigo) {
			//encontramos el producto
			productos[i].nombre = nombre;
			productos[i].numSerie = numSerie;
			productos[i].categoria = categoria;
			productos[i].descripcion = descripcion;
			productos[i].stock = stock;
			productos[i].precio = precio;
			productos[i].imagen = imagen;
		}
	}

	//actualizamos el localstorage
	localStorage.setItem('funkopopKey', JSON.stringify(productos));

	limpiarFormulario();
	//actualizar filas de la tabla
	leerProductos();

	let modalProducto = document.getElementById('modalProducto');
	$(modalProducto).modal('hide');
}

window.limpiarFormulario = function() {
	document.getElementById('formProducto').reset();
	productoExistente = false;
};
