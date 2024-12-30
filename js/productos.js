const urlApi = "../js/productos.json";

fetch(urlApi)
    .then((res) => res.json())
    .then((productos) => { 
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const listadoProductos = document.querySelector(".products-grid");
        listadoProductos.innerHTML = "";

        const contadorCarrito = document.querySelector(".contador");
        contadorCarrito.textContent = carrito.length;

        productos.forEach((producto) => {
            const html = `
                <article class="product" data-id="${producto.id}">
                    <a href="/pages/product_details.html?productId=${producto.id}">
                    <img class="product-image" src="../img/${producto.url}" alt="${producto.descripcion}">

                    <div class="product-reviews">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <h3 class="product-title">${producto.nombre}</h3>
                    
                    <p>Precio:$ ${producto.precio}</p>
                    </a>
                    <button class="product-button agregar">
                        <i class="fa-solid fa-cart-shopping"></i>Comprar
                    </button>
                </article>
                `;
            listadoProductos.innerHTML += html;
        })

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
                    alert("Se agrego el producto correctamente.")
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