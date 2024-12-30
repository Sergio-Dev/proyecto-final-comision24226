const urlApi = "../js/productos.json";

fetch(urlApi)
    .then((res) => res.json())
    .then((productos) => { 

        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('productId');

        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const listadoProductos = document.querySelector(".pruducts-details");

        const contadorCarrito = document.querySelector(".contador");
        contadorCarrito.textContent = carrito.length

        listadoProductos.innerHTML = "";

        const producto = productos.find(product => product.id == productId);

        if (producto) {
            listadoProductos.innerHTML = `
                <article class="product product-details" data-id="${producto.id}">
                    
                    <div class="product-details-img">
                        <img class="" src="../img/${producto.url}" alt="${producto.descripcion}">
                    </div>

                    <div class="product-details-text">
                        <span class="details-marca">${producto.marca}</span>
                        <h3 class="details-nombre">${producto.nombre}</h3>
                        <p class="details-stock">Stock disponible: ${producto.stock}</p>
                        <p class="details-precio">Precio: $ ${producto.precio}</p>
                        <p class="details-cuotas">12 cuotas sin interés</p>
                        
                        <button class="details-btn agregar">
                            <i class="fa-solid fa-cart-shopping"></i>Agregar al carrito
                        </button>
                    </div>
                </article>
                `;
          } else {
            listadoProductos.innerHTML = "<p>Producto no encontrado.</p>";
          }

        document.addEventListener('click', (event)=>{
            if(event.target.classList.contains('agregar')){
                const id = event.target.closest('article').dataset.id
                const index = carrito.findIndex((item) => item.id == id)

                if( index == -1 ){
                    const item = productos.find( (producto) => producto.id == id )
                    const {nombre, precio} = item;

                    const producto = {
                        id:id,
                        nombre: nombre,
                        precio: precio,
                        cantidad: 1
                    }

                    carrito.push(producto);
                    alert("Se agrego el producto correctamente.");
                }else{
                    const producto = carrito[index];
                    producto.cantidad++;
                }

                localStorage.setItem("carrito", JSON.stringify(carrito))
                contadorCarrito.textContent = carrito.length
            }
        })
    })
    .catch((error) => {
        console.log(error)
    })