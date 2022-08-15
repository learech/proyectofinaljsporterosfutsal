import { actualizarCarrito } from "./components/carrito/actualizarCarrito.js";
import { mostrarProductos } from "./App.js";
import { eliminarProductoCarrito, obtenerCarritoStorage} from "./components/carrito/carritoIndex.js";

const contenedorCarrito = document.getElementById('carrito-contenedor');
let carritoStorage = [];


document.addEventListener("DOMContentLoaded", () => {

  mostrarProductos();

  if (localStorage.getItem("carrito")) {
    carritoStorage = obtenerCarritoStorage();
    carritoStorage.map((producto) => {
      let div = document.createElement('div');
      div.classList.add('productoEnCarrito');
      div.innerHTML = ` <p>${producto.nombre}</p>
                        <p>Precio:${producto.precio}</p>
                        <p id=cantidad${producto.id}>Cantidad:${producto.cantidad}</p>
                        <button id=eliminar${producto.id} class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                      `
      contenedorCarrito.appendChild(div);

      actualizarCarrito(carritoStorage);
      eliminarProductoCarrito(producto.id, producto.nombre)
    })
  }
})