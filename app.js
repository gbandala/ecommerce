
// 1.   Definir los elementos de trabajo del HTML
const contenedorProductos = document.getElementById('contenedor-productos');
let carrito = [];
let currency = Intl.NumberFormat('en-US');
// 2.   Si ya existe informacion de compras en el navegador, obtenerla
// del local storage
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        actualizarCarrito();
    }
});
//3. llenar el contenedor de productos con cada producto creado a partir del catalogo json
stockProductos.forEach((producto) => {
    //1.    crear un div y pegarle la clase css
    //2.    crear el contenido del div, toda la info de cada producto
    //3.    anidar el nuevo elemento al contenedor de productos
    //4.    crear el boton de cada producto
    //5.    generar el evento click al boton creado y asociarlo a la funcion agregar carrito  
    // ----------------------------------------------------------------------------------------------------------
    const div = document.createElement('div');
    div.classList.add('producto');
    div.insertAdjacentHTML("beforeend", "<img src=" + producto.img + ">");
    div.insertAdjacentHTML("beforeend", "<h3>" + producto.nombre + "</h3>");
    div.insertAdjacentHTML("beforeend", "<p>" + producto.desc + "</p>");
    div.insertAdjacentHTML("beforeend", "<p class='precioProducto'>Precio: $" + currency.format(producto.precio) + "</p>");
    div.insertAdjacentHTML("beforeend", "<button id=agregar" + producto.id + " class='boton-agregar'>Agregar <i class='fas fa-shopping-cart'></i></button>");
    contenedorProductos.appendChild(div);
    const boton = document.getElementById("agregar" + producto.id);
    boton.addEventListener('click', () => {
        // alert(producto.id);
        agregarAlCarrito(producto.id);
    });
});
//Funciones del carrito --------------------------------------------------------------------------------------------
//agregar producto al carrito
const agregarAlCarrito = (prodId) => {
    //1.    validar si el producto seleccionado ya existe, de ser asi aumentar la cantidad
    //2.    caso contrario agregamos el producto
    //3.    actualiza el arreglo del carrito
    const existe = carrito.some(prod => prod.id === prodId);
    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === prodId) {
                prod.cantidad++;
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId);
        carrito.push(item);
    }
    actualizarCarrito();
};
// actualizar el contenido del carrito
const actualizarCarrito = () => {
    // limpiar el contenedor antes de actualizar
    //recorrer el arreglo del carrito y crear cada elemento en html del arreglo
    //anidar el elemento creado al contendor del carrito
    //actualizar la cantidad del carrito
    //actualizar el precio total del carrito
    //guardar el local storage el contenido del carrito
    const contenedorCarrito = document.getElementById('carrito-contenedor');
    const contadorCarrito = document.getElementById('contadorCarrito');
    contadorCarrito.innerText = carrito.length;
    const precioTotal = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);
    contenedorCarrito.innerHTML = "";
    carrito.forEach((producto) => {
        const div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.insertAdjacentHTML("beforeend", "<p>" + producto.nombre + "</p>");
        div.insertAdjacentHTML("beforeend", "<p>$" +  currency.format(producto.precio) + "</p>");
        div.insertAdjacentHTML("beforeend", "<p>" + producto.cantidad + "</p>");
        div.insertAdjacentHTML("beforeend", "<button onclick='eliminarDelCarrito(" + producto.id + ")' class='boton-eliminar'><i class='fas fa-trash-alt'></i></button>");
        contenedorCarrito.appendChild(div);
    })
    const div2 = document.createElement('div');
    div2.insertAdjacentHTML("beforeend", "<p class='precioProducto'>Precio total: <span>$" +currency.format(precioTotal)  + "</span></p>");
    div2.insertAdjacentHTML("beforeend", "<button onclick='vaciarCarrito()' class='boton-agregar'>Vaciar carrito</button>");
    contenedorCarrito.appendChild(div2);
    localStorage.setItem('carrito', JSON.stringify(carrito));
};
//eliminar producto del carrito
const eliminarDelCarrito = (prodId) => {
    // 1.   busca el indice del producto y lo quita del arreglo del carrito
    // 2.   actualiza el carrito    
    const item = carrito.find((prod) => prod.id === prodId);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    // console.log('nuevo carrito> ',carrito);
    actualizarCarrito();
};
// vaciar todo el carrito
const vaciarCarrito = () => {
    // botonVaciar.addEventListener('click', () => {
    //1.    limpiar el arreglo carrito
    //2.    actualizar el carrito
    carrito.length = 0;
    actualizarCarrito();
};