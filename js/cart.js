let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const btnFinalizarCompra = document.querySelector(".check-btn");

btnFinalizarCompra.addEventListener("click", ()=>{
    if(carrito.length > 0){
        localStorage.setItem("carrito", JSON.stringify([]));
        alert("¡Gracias por tu compra! Estamos procesando tu pedido, te enviaremos una confirmacion por correo electronico.");
        window.location.href = "../index.html"; 
    } else{
        alert("Tu carrito está vacío. Serás redirigido a la página de productos para que puedas agregar algo a tu carrito.");
        window.location.href = "./products.html"; 
    }
})

const items = document.querySelector(".cart");

function actualizarLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function calcularTotal() {
    let total = 0;

    carrito.forEach((item) => {
        total += item.precio * item.cantidad;
    });

    return total;
}

function obtenerTemplate(item){
    const template = `
            <div class="cart-item" data-id="${item.id}">
                <div class="item-nombre">${item.nombre}</div>
                <div class="item-cantidad">
                    <span class="btn minus"><i class="fa-solid fa-minus"></i></span>
                    <span class="display-cantidad">${item.cantidad}</span>
                    <span class="btn add"><i class="fa-solid fa-plus"></i></span>
                </div>
                <div class="item-precio">Precio: $ ${item.precio}</div>
                <div class="item-subtotal">Subtotal: $ ${item.precio * item.cantidad}</div>
                <div class="item-eliminar">
                    <span class="btn delete"><i class="fa-solid fa-trash-can"></i></span>
                </div>
            </div>
        `
    return template
}

function renderizarCarrito() {
    const contadorCarrito = document.querySelector(".contador");
    contadorCarrito.textContent = carrito.length

    items.innerHTML = "";

    carrito.forEach((item) => {
        const html = obtenerTemplate(item);
        items.innerHTML += html;
    });

    document.querySelectorAll(".cart-item").forEach((cartItem) => {
        const id = cartItem.getAttribute("data-id");

        cartItem.querySelector(".minus").addEventListener("click", () => {
            const producto = carrito.find((item) => item.id === id);

            if (producto && producto.cantidad > 1) {
                producto.cantidad--;
                actualizarLocalStorage();
                renderizarCarrito();
            }
        });

        cartItem.querySelector(".add").addEventListener("click", () => {
            const producto = carrito.find((item) => item.id === id);

            if (producto) {
                producto.cantidad++;
                actualizarLocalStorage();
                renderizarCarrito();
            }
        });

        cartItem.querySelector(".delete").addEventListener("click", () => {
            carrito = carrito.filter((item) => item.id !== id);
            actualizarLocalStorage();
            renderizarCarrito(); 
        });
    });

    const total = calcularTotal();
    const textTotal = document.querySelector(".text-check");    
    textTotal.innerHTML = total;
}

renderizarCarrito();