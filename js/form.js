const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contadorCarrito = document.querySelector(".contador");
contadorCarrito.textContent = carrito.length

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('.form');
    
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const nombre = document.getElementById('name').value;
        const correo = document.getElementById('mail').value;
        const mensaje = document.getElementById('message').value;

        let camposFaltantes = [];
        
        if (!nombre) {
            camposFaltantes.push('Nombre');
        }
        if (!correo) {
            camposFaltantes.push('Correo electrónico');
        } else {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(correo)) {
                camposFaltantes.push('Correo electrónico (formato inválido)');
            }
        }
        if (!mensaje) {
            camposFaltantes.push('Mensaje');
        }
        
        if (camposFaltantes.length > 0) {
            alert('Completa los siguientes campos: ' + camposFaltantes.join(', '));
        } else {
            formulario.submit();
        }
    });
});