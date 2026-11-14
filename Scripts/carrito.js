
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
function agregarAlCarrito(idCurso) {
    const cursoEncontrado = catalogoCursosDetalle.find(c => c.id === idCurso);
    
    if (!cursoEncontrado) return;

    const enCarrito = carrito.find(item => item.id === idCurso);

    if (enCarrito) {
        alert("Este curso ya está en tu carrito.");
    } else {
        carrito.push({
            id: cursoEncontrado.id,
            nombre: cursoEncontrado.nombre,
            precio: cursoEncontrado.precio,
            imagen: cursoEncontrado.imagen
        });
        guardarYActualizar();
        alert(`¡"${cursoEncontrado.nombre}" se agregó al carrito!`);
    }
}

function guardarYActualizar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

function renderizarCarrito() {
    const contenedorCarrito = document.getElementById("contenedor-carrito");
    const resumenCarrito = document.getElementById("resumen-carrito");

    if (!contenedorCarrito || !resumenCarrito) return;

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>Tu carrito está vacío.</p>";
        resumenCarrito.innerHTML = "<p>$0 ARS</p>";
        return;
    }

    contenedorCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
        total += item.precio;
        const divItem = document.createElement("div");
        divItem.classList.add("item-carrito");
        divItem.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" style="width: 80px; height: 50px; object-fit: cover;">
            <div>
                <h3>${item.nombre}</h3>
                <p>$${item.precio.toLocaleString("es-AR")} ARS</p>
                <button type="button" onclick="eliminarDelCarrito('${item.id}')">Eliminar</button>
            </div>
        `;
        contenedorCarrito.appendChild(divItem);
    });

    resumenCarrito.innerHTML = `
        <p>Total a pagar: <strong>$${total.toLocaleString("es-AR")} ARS</strong></p>
        <button type="button" class="boton-pagar">Avanzar al pago</button>
    `;
}

function eliminarDelCarrito(idCurso) {
    carrito = carrito.filter(item => item.id !== idCurso);
    guardarYActualizar();
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
});