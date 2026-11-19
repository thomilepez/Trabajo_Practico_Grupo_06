const CLAVE_VISTA_MIS_CURSOS = "misCursosVistaModo";

function obtenerClaveFavoritosUsuario() {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuarioActivo && (usuarioActivo.email || usuarioActivo.dni || usuarioActivo.nombre)) {
        const identificador = usuarioActivo.email || usuarioActivo.dni || usuarioActivo.nombre;
        return `favoritos_${identificador}`;
    }
    return "favoritos_invitado";
}

function leerFavoritosLocal() {
    if (typeof window.obtenerFavoritos === "function") {
        return window.obtenerFavoritos();
    }
    const clave = obtenerClaveFavoritosUsuario();
    const datos = JSON.parse(localStorage.getItem(clave));
    return Array.isArray(datos) ? datos : [];
}

function quitarFavoritoLocal(idCurso) {
    if (typeof window.alternarFavorito === "function") {
        if (typeof window.esFavorito === "function" && window.esFavorito(idCurso)) {
            window.alternarFavorito(idCurso);
        }
        return;
    }
    const clave = obtenerClaveFavoritosUsuario();
    const actual = leerFavoritosLocal().filter(id => String(id) !== String(idCurso));
    localStorage.setItem(clave, JSON.stringify(actual));
}

function aplicarVistaMisCursos(modo) {
    const esLista = modo === "lista";
    const contComprados = document.getElementById("listado-mis-cursos");
    const contFavoritos = document.getElementById("listado-favoritos-cursos");

    if (contComprados) contComprados.classList.toggle("vista-lista", esLista);
    if (contFavoritos) contFavoritos.classList.toggle("vista-lista", esLista);

    localStorage.setItem(CLAVE_VISTA_MIS_CURSOS, esLista ? "lista" : "grilla");

    const btnGrilla = document.getElementById("btn-mis-cursos-grilla");
    const btnLista = document.getElementById("btn-mis-cursos-lista");
    if (btnGrilla && btnLista) {
        btnGrilla.classList.toggle("activo", !esLista);
        btnLista.classList.toggle("activo", esLista);
        btnGrilla.setAttribute("aria-pressed", String(!esLista));
        btnLista.setAttribute("aria-pressed", String(esLista));
    }
}

function renderizarFavoritosEnContenedor(contenedorFav, catalogo) {
    if (!contenedorFav) return;

    const idsFavoritos = leerFavoritosLocal();
    contenedorFav.innerHTML = "";

    if (idsFavoritos.length === 0) {
        contenedorFav.innerHTML = `
            <div class="sin-cursos">
                <h3>Todavía no tenés cursos en favoritos</h3>
                <p>Marcá con el corazón los cursos que te interesen desde el catálogo.</p>
                <a href="../tienda-carrito/catalogo-cursos.html" class="boton-curso">Ir al catálogo</a>
            </div>
        `;
        return;
    }

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const compradosFallback = Array.isArray(usuarioActivo?.cursosComprados)
        ? usuarioActivo.cursosComprados.map(String)
        : [];

    idsFavoritos.forEach(idFav => {
        const curso = catalogo.find(c => String(c.id) === String(idFav));
        if (!curso) return;

        const yaAdquirido = typeof window.cursoYaAdquirido === "function"
            ? window.cursoYaAdquirido(curso.id)
            : compradosFallback.includes(String(curso.id));

        const precioHtml = yaAdquirido
            ? ""
            : `<span class="precio-curso">$${Number(curso.precio).toLocaleString("es-AR")} ARS</span>`;

        const article = document.createElement("article");
        article.className = "tarjeta curso";
        article.dataset.id = curso.id;

        article.innerHTML = `
            <div class="portada-curso">
                <img src="${curso.imagen}" alt="${curso.alt || curso.nombre}">
            </div>
            <div class="tarjeta-cuerpo">
                <h3>${curso.nombre}</h3>
                <p class="descripcion-curso">${curso.descripcion}</p>
                ${precioHtml}
                <div class="botones-curso">
                    <a href="../Cursos/Detalle-curso.html?id=${curso.id}" class="boton-curso">Ver más</a>
                    <button type="button" class="boton-eliminar btn-quitar-favorito" data-id="${curso.id}">
                        Quitar
                    </button>
                </div>
            </div>
        `;

        contenedorFav.appendChild(article);
    });

    contenedorFav.querySelectorAll(".btn-quitar-favorito").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idCurso = e.currentTarget.dataset.id;
            quitarFavoritoLocal(idCurso);
            renderizarFavoritosEnContenedor(contenedorFav, catalogo);
            if (typeof mostrarNotificacion === "function") {
                mostrarNotificacion("Quitado de favoritos.", "advertencia");
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo) {
        window.location.href = "iniciar-sesion.html";
        return;
    }

    const contenedorCursos = document.getElementById("listado-mis-cursos");
    const contenedorFavoritos = document.getElementById("listado-favoritos-cursos");

    const vistaGuardada = localStorage.getItem(CLAVE_VISTA_MIS_CURSOS) || "grilla";
    aplicarVistaMisCursos(vistaGuardada);

    document.getElementById("btn-mis-cursos-grilla")?.addEventListener("click", () => aplicarVistaMisCursos("grilla"));
    document.getElementById("btn-mis-cursos-lista")?.addEventListener("click", () => aplicarVistaMisCursos("lista"));

    if (typeof catalogoCursosDetalle === "undefined") {
        console.error("catalogoCursosDetalle no está definido. Revisá el orden de los <script> en mis-cursos.html.");
        if (contenedorCursos) {
            contenedorCursos.innerHTML = `<p class="error-curso">Error al cargar el catálogo de cursos.</p>`;
        }
        return;
    }

    if (contenedorCursos) {
        const idsComprados = usuarioActivo.cursosComprados || [];
        if (idsComprados.length === 0) {
            contenedorCursos.innerHTML = `
                <div class="sin-cursos">
                    <h2>Todavía no compraste ningún curso</h2>
                    <p>Explorá nuestro catálogo y sumate a nuestras capacitaciones.</p>
                    <a href="../tienda-carrito/catalogo-cursos.html" class="boton-curso">Ver catálogo</a>
                </div>
            `;
        } else {
            contenedorCursos.innerHTML = "";

            idsComprados.forEach(idCurso => {
                const curso = catalogoCursosDetalle.find(c => String(c.id) === String(idCurso));

                if (curso) {
                    const article = document.createElement("article");
                    article.className = "tarjeta curso";
                    article.setAttribute("data-id", curso.id);

                    article.innerHTML = `
                        <div class="portada-curso">
                            <img src="${curso.imagen}" alt="${curso.alt || curso.nombre}">
                        </div>
                        <div class="tarjeta-cuerpo">
                            <h2>${curso.nombre}</h2>
                            <p class="descripcion-curso">${curso.descripcion}</p>
                            <div class="botones-curso">
                                <a href="../Usuario/mis-cursos.html?id=${curso.id}" class="boton-curso">Ir al curso</a>
                            </div>
                        </div>
                    `;

                    contenedorCursos.appendChild(article);
                } else {
                    console.warn("No se encontró en catalogoCursosDetalle el curso con ID:", idCurso);
                }
            });
        }
    }

    renderizarFavoritosEnContenedor(contenedorFavoritos, catalogoCursosDetalle);
});