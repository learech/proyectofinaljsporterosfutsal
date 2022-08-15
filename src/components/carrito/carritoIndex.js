import { actualizarCarrito } from "./actualizarCarrito.js";
import { productos } from "../../data/stock.js";

const contenedorCarrito = document.getElementById("carrito-contenedor");
let carritoDeCompras = [];

export const carritoIndex = (productoId) => {
  if (localStorage.getItem("carrito")) {
    carritoDeCompras = obtenerCarritoStorage() ;
  }
  let productoRepetido = carritoDeCompras.find(
    (producto) => producto.id == productoId
  );
  contarProductosRepetidos(productoRepetido, productoId);
  eliminarProductoCarrito(productoId);
};

export const eliminarProductoCarrito = (productoId) => {
  if (localStorage.getItem("carrito")) {
    carritoDeCompras = obtenerCarritoStorage();
  }
  let botonEliminar = document.getElementById(`eliminar${productoId}`);
  botonEliminar.addEventListener('click', () => {
        botonEliminar.parentElement.remove();
        carritoDeCompras = carritoDeCompras.filter(el => el.id != productoId);
        actualizarCarrito(carritoDeCompras);
        Toastify({

          text: "PRODUCTO ELIMINADO",
          
          duration: 2000
          
          }).showToast();
  })
};

const contarProductosRepetidos = (prodRepetido, productoId) => {
  if (prodRepetido) {
    prodRepetido.cantidad++
    document.getElementById(`cantidad${prodRepetido.id}`).innerHTML = `<p id=cantidad${prodRepetido.id}>Cantidad:${prodRepetido.cantidad}</p>`;
    actualizarCarrito(carritoDeCompras);
  } else {
    renderProductosCarrito(productoId);
  }
}

const renderProductosCarrito = (productoId) => {
  const producto = productos.find((producto) => producto.id == productoId);
  carritoDeCompras.push(producto);
  producto.cantidad = 1;
  let div = document.createElement("div");
  div.classList.add("productoEnCarrito");
  div.innerHTML = ` <p>${producto.nombre}</p>
                    <p>Precio:${producto.precio}</p>
                    <p id=cantidad${producto.id}>Cantidad:${producto.cantidad}</p>
                    <button id=eliminar${producto.id} class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                  `;
  contenedorCarrito.appendChild(div);
  actualizarCarrito(carritoDeCompras);
};

export const obtenerCarritoStorage = () => {
  const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
  return carritoStorage
}

