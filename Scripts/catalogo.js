const CLAVE_VISTA_CATALOGO = "catalogoVistaModo";

function obtenerClaveFavoritos() {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuarioActivo && (usuarioActivo.email || usuarioActivo.dni || usuarioActivo.nombre)) {
        const identificador = usuarioActivo.email || usuarioActivo.dni || usuarioActivo.nombre;
        return `favoritos_${identificador}`;
    }
    return "favoritos_invitado";
}

window.obtenerFavoritos = function () {
    const clave = obtenerClaveFavoritos();
    const datos = JSON.parse(localStorage.getItem(clave));
    return Array.isArray(datos) ? datos : [];
};

window.esFavorito = function (idCurso) {
    return window.obtenerFavoritos().some(id => String(id) === String(idCurso));
};

window.alternarFavorito = function (idCurso) {
    const clave = obtenerClaveFavoritos();
    let favoritos = window.obtenerFavoritos();
    const idStr = String(idCurso);
    const existe = favoritos.some(id => String(id) === idStr);

    if (existe) {
        favoritos = favoritos.filter(id => String(id) !== idStr);
    } else {
        favoritos.push(idCurso);
    }

    localStorage.setItem(clave, JSON.stringify(favoritos));
    return !existe;
};

function aplicarVistaCatalogo(modo, contenedor) {
    const esLista = modo === "lista";
    contenedor.classList.toggle("vista-lista", esLista);
    localStorage.setItem(CLAVE_VISTA_CATALOGO, esLista ? "lista" : "grilla");

    const btnGrilla = document.getElementById("btn-vista-grilla");
    const btnLista = document.getElementById("btn-vista-lista");

    if (btnGrilla && btnLista) {
        btnGrilla.classList.toggle("activo", !esLista);
        btnLista.classList.toggle("activo", esLista);
        btnGrilla.setAttribute("aria-pressed", String(!esLista));
        btnLista.setAttribute("aria-pressed", String(esLista));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const contenedorCatalogo = document.getElementById("contenedor-catalogo");
    if (!contenedorCatalogo) return;

    const vistaGuardada = localStorage.getItem(CLAVE_VISTA_CATALOGO) || "grilla";
    aplicarVistaCatalogo(vistaGuardada, contenedorCatalogo);

    const btnGrilla = document.getElementById("btn-vista-grilla");
    const btnLista = document.getElementById("btn-vista-lista");

    btnGrilla?.addEventListener("click", () => aplicarVistaCatalogo("grilla", contenedorCatalogo));
    btnLista?.addEventListener("click", () => aplicarVistaCatalogo("lista", contenedorCatalogo));

    contenedorCatalogo.innerHTML = "";

    catalogoCursosDetalle.forEach(curso => {
        const articulo = document.createElement("article");
        articulo.classList.add("tarjeta", "curso");
        articulo.dataset.id = curso.id;

        const yaComprado = typeof window.cursoYaAdquirido === "function"
            ? window.cursoYaAdquirido(curso.id)
            : false;

        const favorito = window.esFavorito(curso.id);

        const botonAccionHtml = yaComprado
            ? `
                <a href="../Usuario/mis-cursos.html?id=${curso.id}" class="boton-curso-adquirido">
                    <img src="../svg's/Iconos-SVG/whide/libro-abierto.svg" alt="Icono de reproducción">
                    Ir a mis clases
                </a>
              `
            : `
                <button type="button" class="boton-carrito" data-id="${curso.id}" aria-label="Agregar ${curso.nombre} al carrito">
                    <img src="../svg's/Iconos-SVG/whide/carrito-compras.svg" alt="Carrito de compra">
                </button>
              `;

        articulo.innerHTML = `
            <div class="portada-curso">
                <img src="${curso.imagen}" alt="${curso.alt}">
            </div>
            <div class="tarjeta-cuerpo">
                <h2>${curso.nombre}</h2>
                <p class="descripcion-curso">${curso.descripcion}</p>
                <span class="precio-curso">$${curso.precio.toLocaleString("es-AR")} ARS</span>
                <div class="botones-curso">
                    <a href="../Cursos/Detalle-curso.html?id=${curso.id}" class="boton-curso">Ver más</a>
                    ${botonAccionHtml}
                    <button
                        type="button"
                        class="boton-favorito ${favorito ? "favorito-activo" : ""}"
                        data-id="${curso.id}"
                        aria-pressed="${favorito}"
                        aria-label="${favorito ? "Quitar de favoritos" : "Agregar a favoritos"}"
                        title="${favorito ? "Quitar de favoritos" : "Agregar a favoritos"}"
                    >
                        <img src="../svg's/Iconos-SVG/whide/corazon.svg" alt="Favorito">
                    </button>
                </div>
            </div>
        `;

        contenedorCatalogo.appendChild(articulo);
    });

    contenedorCatalogo.querySelectorAll(".boton-carrito").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idCurso = e.currentTarget.dataset.id;
            if (typeof window.agregarAlCarrito === "function") {
                window.agregarAlCarrito(idCurso);
            }
        });
    });

    contenedorCatalogo.querySelectorAll(".boton-favorito").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const boton = e.currentTarget;
            const idCurso = boton.dataset.id;
            const ahoraEsFavorito = window.alternarFavorito(idCurso);

            boton.classList.toggle("favorito-activo", ahoraEsFavorito);
            boton.setAttribute("aria-pressed", String(ahoraEsFavorito));
            const label = ahoraEsFavorito ? "Quitar de favoritos" : "Agregar a favoritos";
            boton.setAttribute("aria-label", label);
            boton.setAttribute("title", label);

            if (typeof mostrarNotificacion === "function") {
                mostrarNotificacion(
                    ahoraEsFavorito ? "Agregado a favoritos." : "Quitado de favoritos.",
                    ahoraEsFavorito ? "exito" : "advertencia"
                );
            }
        });
    });
});