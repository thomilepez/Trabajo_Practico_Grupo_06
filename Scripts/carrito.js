let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

window.cursoYaAdquirido = function(idCurso) {
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActual || !Array.isArray(usuarioActual.cursosComprados)) {
        return false;
    }
    return usuarioActual.cursosComprados.some(id => String(id) === String(idCurso));
};

window.agregarAlCarrito = function(idCurso) {
    if (cursoYaAdquirido(idCurso)) {
        mostrarNotificacion("Ya tenés este curso adquirido en tu cuenta.", "advertencia");
        return;
    }

    const cursoEncontrado = catalogoCursosDetalle.find(c => String(c.id) === String(idCurso));
    if (!cursoEncontrado) {
        console.error("No se encontró el curso con ID:", idCurso);
        return;
    }

    const enCarrito = carrito.find(item => String(item.id) === String(idCurso));
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
};

function guardarYActualizar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

function renderizarCarrito() {
    const contenedorCarrito = document.getElementById("contenedor-carrito");
    const resumenCarrito = document.getElementById("resumen-carrito");
    const carritoFiltrado = carrito.filter(item => !cursoYaAdquirido(item.id));

    if (carritoFiltrado.length !== carrito.length) {
    carrito = carritoFiltrado;
    localStorage.setItem("carrito", JSON.stringify(carrito));
     }

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
            <img src="${item.imagen}" alt="${item.nombre}" style="width: 80px; height: 50px; object-fit: cover; border-radius: 6px;">
            <div>
                <h3>${item.nombre}</h3>
                <p>$${item.precio.toLocaleString("es-AR")} ARS</p>
                <button type="button" class="boton-eliminar" onclick="eliminarDelCarrito('${item.id}')">Eliminar</button>
            </div>
        `;
        contenedorCarrito.appendChild(divItem);
    });

    resumenCarrito.innerHTML = `
        <p>Total a pagar: <strong>$${total.toLocaleString("es-AR")} ARS</strong></p>
        <button type="button" class="boton-curso" id="btn-avanzar-pago">Avanzar al pago</button>
    `;

    const btnPagar = document.getElementById("btn-avanzar-pago");
    if (btnPagar) {
        btnPagar.addEventListener("click", () => {
            const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
            if (!usuarioActivo) {
                window.location.href = "../Usuario/iniciar-sesion.html";
                return;
            }
            window.location.href = "../tienda-carrito/resumen-pago.html";
        });
    }
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
    if (alertaExistente) {
        alertaExistente.remove();
    }

    const alerta = document.createElement("div");
    alerta.className = `alerta-flotante ${tipo}`;
    alerta.textContent = mensaje;

    document.body.appendChild(alerta);
    setTimeout(() => {
        alerta.classList.add("visible");
    }, 50);
    setTimeout(() => {
        alerta.classList.remove("visible");
        setTimeout(() => {
            if (alerta.parentNode) {
                alerta.remove();
            }
        }, 300);
    }, 3000);
}

function cursoYaAdquirido(idCurso) {
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActual || !Array.isArray(usuarioActual.cursosComprados)) {
        return false;
    }
    return usuarioActual.cursosComprados.some(id => String(id) === String(idCurso));
}