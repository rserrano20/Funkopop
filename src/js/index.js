import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';

leerProductos();

function leerProductos() {
	if (localStorage.length > 0) {
		let listaProductos = JSON.parse(localStorage.getItem('funkopopKey'));

		//borrar las cards

		let catalogo = document.getElementById('catalogo');

		//crear las cards
		let codHTML = '';
		for (let i in listaProductos) {
			codHTML = `<div class="col-sm-12 col-md-4 col-lg-3">
            <div class="card">
              <img src="img/productos/${listaProductos[i].imagen}" class="card-img-top" alt="funkopop${listaProductos[i]
				.nombre}">
              <div class="card-body">
                <h5 class="card-title">${listaProductos[i].nombre}</h5>
                <p class="card-text">${listaProductos[i].descripcion}</p>
                <a href="#" class="btn btn-secondary disabled">ver mas</a>
              </div>
            </div>
          </div>`;

			catalogo.innerHTML += codHTML;
		}
	}
}
