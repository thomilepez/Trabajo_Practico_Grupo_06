function obtenerClaveFavoritosPerfil() {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuarioActivo && (usuarioActivo.email || usuarioActivo.dni || usuarioActivo.nombre)) {
        const identificador = usuarioActivo.email || usuarioActivo.dni || usuarioActivo.nombre;
        return `favoritos_${identificador}`;
    }
    return "favoritos_invitado";
}

function leerFavoritosPerfil() {
    const clave = obtenerClaveFavoritosPerfil();
    const datos = JSON.parse(localStorage.getItem(clave));
    return Array.isArray(datos) ? datos : [];
}

function quitarFavoritoPerfil(idCurso) {
    const clave = obtenerClaveFavoritosPerfil();
    const actual = leerFavoritosPerfil().filter(id => String(id) !== String(idCurso));
    localStorage.setItem(clave, JSON.stringify(actual));
}

function renderizarFavoritosPerfil() {
    const contenedor = document.getElementById("perfil-favoritos-cursos");
    if (!contenedor) return;

    if (typeof catalogoCursosDetalle === "undefined") {
        contenedor.innerHTML = `<p>No se pudo cargar el catálogo de cursos.</p>`;
        return;
    }

    const idsFavoritos = leerFavoritosPerfil();
    contenedor.innerHTML = "";

    if (idsFavoritos.length === 0) {
        contenedor.innerHTML = `
            <div class="sin-cursos">
                <p>Todavía no marcaste ningún curso como favorito.</p>
                <a href="../tienda-carrito/catalogo-cursos.html" class="boton-curso">Explorar cursos</a>
            </div>
        `;
        return;
    }

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const compradosFallback = Array.isArray(usuarioActivo?.cursosComprados)
        ? usuarioActivo.cursosComprados.map(String)
        : [];

    idsFavoritos.forEach(idFav => {
        const curso = catalogoCursosDetalle.find(c => String(c.id) === String(idFav));
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

        contenedor.appendChild(article);
    });

    contenedor.querySelectorAll(".btn-quitar-favorito").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idCurso = e.currentTarget.dataset.id;
            quitarFavoritoPerfil(idCurso);
            renderizarFavoritosPerfil();
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!usuarioActivo) {
        window.location.href = "iniciar-sesion.html";
        return;
    }

    const spanNombre = document.getElementById("perfil-nombre");
    const spanEmail = document.getElementById("perfil-email");
    const spanDni = document.getElementById("perfil-dni");
    const spanRol = document.getElementById("perfil-rol");

    if (spanNombre) spanNombre.textContent = usuarioActivo.nombre || "No especificado";
    if (spanEmail) spanEmail.textContent = usuarioActivo.email || "No especificado";
    if (spanDni) spanDni.textContent = usuarioActivo.dni || "No especificado";

    const panelAlumno = document.getElementById("panel-alumno");
    const panelDocente = document.getElementById("panel-docente");
    const btnAlternarRol = document.getElementById("btn-alternar-rol");

    const tienePermisoDocente =
        usuarioActivo.rol === "docente" || usuarioActivo.rol === "administrador";

    let modoRolActivo = localStorage.getItem("modoRolActivo");
    if (!tienePermisoDocente) {
        modoRolActivo = "alumno";
    } else if (!modoRolActivo) {
        modoRolActivo = "docente";
    }
    localStorage.setItem("modoRolActivo", modoRolActivo);

    function actualizarVistaRol() {
        const viendoComoDocente = tienePermisoDocente && modoRolActivo === "docente";

        if (spanRol) {
            const rolBase = usuarioActivo.rol ? usuarioActivo.rol.toUpperCase() : "ALUMNO";
            spanRol.textContent = tienePermisoDocente
                ? `${rolBase} (viendo como ${viendoComoDocente ? "DOCENTE" : "ALUMNO"})`
                : rolBase;
        }

        if (panelDocente) panelDocente.classList.toggle("oculto", !viendoComoDocente);
        if (panelAlumno) panelAlumno.classList.toggle("oculto", viendoComoDocente);

        if (btnAlternarRol) {
            btnAlternarRol.classList.toggle("oculto", !tienePermisoDocente);
            btnAlternarRol.textContent = viendoComoDocente
                ? "Cambiar a vista Alumno"
                : "Volver a vista Docente";
        }
    }

    actualizarVistaRol();

    btnAlternarRol?.addEventListener("click", () => {
        if (!tienePermisoDocente) return;
        modoRolActivo = modoRolActivo === "docente" ? "alumno" : "docente";
        localStorage.setItem("modoRolActivo", modoRolActivo);
        actualizarVistaRol();
    });

    const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", () => {
            localStorage.removeItem("usuarioActivo");
            localStorage.removeItem("modoRolActivo");
            window.location.href = "iniciar-sesion.html";
        });
    }

    renderizarFavoritosPerfil();
});