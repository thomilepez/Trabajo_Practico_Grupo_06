
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
function agregarAlCarrito(idCurso) {
    const cursoEncontrado = catalogoCursosDetalle.find(c => c.id === idCurso);
    
    if (!cursoEncontrado) return;

    const enCarrito = carrito.find(item => item.id === idCurso);

    if (enCarrito) {
        mostrarNotificacion("Este curso ya está en tu carrito.", "advertencia");
    } else {
        carrito.push({
            id: cursoEncontrado.id,
            nombre: cursoEncontrado.nombre,
            precio: cursoEncontrado.precio,
            imagen: cursoEncontrado.imagen
        });
        guardarYActualizar();
        mostrarNotificacion(`¡"${cursoEncontrado.nombre}" se agregó al carrito!`, "exito");
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

function mostrarNotificacion(mensaje, tipo = "exito") {
    const alertaExistente = document.querySelector(".alerta-flotante");
    if (alertaExistente) alertaExistente.remove();

    const alerta = document.createElement("div");
    alerta.className = `alerta-flotante ${tipo}`;
    alerta.textContent = mensaje;

    document.body.appendChild(alerta);
    setTimeout(() => alerta.classList.add("visible"), 10);

    setTimeout(() => {
        alerta.classList.remove("visible");
        setTimeout(() => alerta.remove(), 300);
    }, 3000);
}