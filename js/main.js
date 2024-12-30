const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contadorCarrito = document.querySelector(".contador");
contadorCarrito.textContent = carrito.length