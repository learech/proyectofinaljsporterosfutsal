import { carritoIndex } from "./components/carrito/carritoIndex.js";
import { getData } from "./controllers/getData.js";

export const mostrarProductos = async () => {
  const contenedorProductos = document.getElementById("producto-contenedor");
  const productos = await getData();

  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML += `<div class="card-image">
                      <a class="btn-floating halfway-fab wabes-effect waves-light blue" id=boton${producto.id}><i class="material-icons right">add_shopping_cart</i></a>
                      <img src=${producto.img}>
                      <span class="card-title">${producto.nombre}</span>
                      <div class="card-content">
                        <p>${producto.desc}</p>
                        <br>
                        <p class="precio">Precio $ ${producto.precio}</p>
                      </div>
                   `;
    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      carritoIndex(producto.id);
      Toastify({

        text: "PRODUCTO AGREGADO",
        
        duration: 2000
        
        }).showToast();
    });
  });
};
