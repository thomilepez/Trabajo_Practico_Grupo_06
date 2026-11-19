const CLAVE_VISTA_CATALOGO = "catalogoVistaModo"; // "grilla" | "lista"
const CLAVE_CATALOGO_STORAGE = "catalogoCursos_v1";

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

function estaEnModoDocente() {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo) return false;

    const tienePermiso =
        usuarioActivo.rol === "docente" || usuarioActivo.rol === "administrador";
    if (!tienePermiso) return false;

    const modoRolActivo = localStorage.getItem("modoRolActivo");
    return modoRolActivo !== "alumno";
}

function cargarCatalogoPersistente() {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_CATALOGO_STORAGE));
    if (Array.isArray(guardado) && guardado.length > 0) {
        if (typeof catalogoCursosDetalle !== "undefined") {
            catalogoCursosDetalle.splice(0, catalogoCursosDetalle.length, ...guardado);
        }
        return guardado;
    }

    const base = typeof catalogoCursosDetalle !== "undefined" ? [...catalogoCursosDetalle] : [];
    localStorage.setItem(CLAVE_CATALOGO_STORAGE, JSON.stringify(base));
    return base;
}

function guardarCatalogoPersistente(listaCursos) {
    localStorage.setItem(CLAVE_CATALOGO_STORAGE, JSON.stringify(listaCursos));
    if (typeof catalogoCursosDetalle !== "undefined") {
        catalogoCursosDetalle.splice(0, catalogoCursosDetalle.length, ...listaCursos);
    }
}

function generarIdUnico(nombre, listaCursos, idExcluir = null) {
    const baseSlug = nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "curso";

    let candidato = baseSlug;
    let contador = 2;
    while (
        listaCursos.some(c => String(c.id) === candidato && String(c.id) !== String(idExcluir))
    ) {
        candidato = `${baseSlug}-${contador}`;
        contador++;
    }
    return candidato;
}

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

function crearFilaDinamica(contenedorId, valor = "", placeholder = "Completar ítem...") {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    const fila = document.createElement("div");
    fila.className = "fila-item-dinamico";
    fila.innerHTML = `
        <input type="text" class="input-item-dinamico" value="${String(valor).replace(/"/g, "&quot;")}" placeholder="${placeholder}" />
        <button type="button" class="btn-quitar-item" title="Quitar ítem" aria-label="Quitar ítem">×</button>
    `;

    fila.querySelector(".btn-quitar-item")?.addEventListener("click", () => {
        fila.remove();
    });

    contenedor.appendChild(fila);
}

function poblarListaDinamica(contenedorId, items, placeholder, minimoUno = true) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;
    contenedor.innerHTML = "";

    const lista = Array.isArray(items) && items.length > 0
        ? items
        : (minimoUno ? [""] : []);

    lista.forEach(item => crearFilaDinamica(contenedorId, item, placeholder));
}

function leerListaDinamica(contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return [];

    return Array.from(contenedor.querySelectorAll(".input-item-dinamico"))
        .map(input => input.value.trim())
        .filter(Boolean);
}

document.addEventListener("DOMContentLoaded", () => {
    const contenedorCatalogo = document.getElementById("contenedor-catalogo");
    if (!contenedorCatalogo) return;

    let cursos = cargarCatalogoPersistente();

    const vistaGuardada = localStorage.getItem(CLAVE_VISTA_CATALOGO) || "grilla";
    aplicarVistaCatalogo(vistaGuardada, contenedorCatalogo);

    const btnGrilla = document.getElementById("btn-vista-grilla");
    const btnLista = document.getElementById("btn-vista-lista");
    const btnAgregarCurso = document.getElementById("btn-agregar-curso");

    btnGrilla?.addEventListener("click", () => aplicarVistaCatalogo("grilla", contenedorCatalogo));
    btnLista?.addEventListener("click", () => aplicarVistaCatalogo("lista", contenedorCatalogo));

    const modal = document.getElementById("modal-curso");
    const formCurso = document.getElementById("form-curso");
    const modalTitulo = document.getElementById("modal-curso-titulo");
    const btnCancelarModal = document.getElementById("btn-cancelar-modal");

    document.querySelectorAll(".btn-agregar-item").forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.dataset.target;
            const placeholder = btn.dataset.placeholder || "Completar ítem...";
            crearFilaDinamica(targetId, "", placeholder);
        });
    });

    function abrirModalCurso(cursoEditar = null) {
        if (!estaEnModoDocente() || !modal || !formCurso) return;

        formCurso.reset();
        document.getElementById("curso-id-original").value = cursoEditar ? cursoEditar.id : "";
        document.getElementById("curso-nombre").value = cursoEditar ? cursoEditar.nombre : "";
        document.getElementById("curso-descripcion").value = cursoEditar ? cursoEditar.descripcion : "";
        document.getElementById("curso-precio").value = cursoEditar ? cursoEditar.precio : "";
        document.getElementById("curso-nivel").value = cursoEditar ? (cursoEditar.nivel || "Principiante") : "Principiante";
        document.getElementById("curso-duracion").value = cursoEditar ? (cursoEditar.duracion || "") : "";
        document.getElementById("curso-alt").value = cursoEditar ? (cursoEditar.alt || "") : "";
        document.getElementById("curso-imagen").value = cursoEditar ? cursoEditar.imagen : "";

        poblarListaDinamica(
            "lista-dirigido",
            cursoEditar?.dirigido,
            "Ej: Estudiantes de desarrollo web..."
        );
        poblarListaDinamica(
            "lista-aprendizajes",
            cursoEditar?.aprendizajes,
            "Ej: Manipular el DOM y eventos..."
        );
        poblarListaDinamica(
            "lista-modulos",
            cursoEditar?.modulos,
            "Ej: Módulo 1: Introducción..."
        );

        if (modalTitulo) {
            modalTitulo.textContent = cursoEditar ? "Editar curso" : "Agregar curso";
        }

        if (typeof modal.showModal === "function") {
            modal.showModal();
        } else {
            modal.setAttribute("open", "");
        }
    }

    function cerrarModalCurso() {
        if (!modal) return;
        if (typeof modal.close === "function" && modal.open) {
            modal.close();
        } else {
            modal.removeAttribute("open");
        }
    }

    btnAgregarCurso?.addEventListener("click", () => abrirModalCurso(null));
    btnCancelarModal?.addEventListener("click", cerrarModalCurso);

    formCurso?.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!estaEnModoDocente()) return;

        const idOriginal = document.getElementById("curso-id-original").value;
        const nombre = document.getElementById("curso-nombre").value.trim();
        const descripcion = document.getElementById("curso-descripcion").value.trim();
        const precio = Number(document.getElementById("curso-precio").value);
        const nivel = document.getElementById("curso-nivel").value.trim() || "Principiante";
        const duracion = document.getElementById("curso-duracion").value.trim() || "30 horas";
        const imagen = document.getElementById("curso-imagen").value.trim();
        const altIngresado = document.getElementById("curso-alt").value.trim();
        const alt = altIngresado || `Portada del curso ${nombre}`;

        const dirigido = leerListaDinamica("lista-dirigido");
        const aprendizajes = leerListaDinamica("lista-aprendizajes");
        const modulos = leerListaDinamica("lista-modulos");

        if (!nombre || !descripcion || Number.isNaN(precio) || !imagen) return;

        if (idOriginal) {
            cursos = cursos.map(curso => {
                if (String(curso.id) !== String(idOriginal)) return curso;
                return {
                    ...curso,
                    nombre,
                    descripcion,
                    imagen,
                    alt,
                    precio,
                    nivel,
                    duracion,
                    dirigido: dirigido.length > 0 ? dirigido : (curso.dirigido || []),
                    aprendizajes: aprendizajes.length > 0 ? aprendizajes : (curso.aprendizajes || []),
                    modulos: modulos.length > 0 ? modulos : (curso.modulos || [])
                };
            });
            if (typeof mostrarNotificacion === "function") {
                mostrarNotificacion(`"${nombre}" actualizado.`, "exito");
            }
        } else {
            const nuevoId = generarIdUnico(nombre, cursos);
            const nuevoCurso = {
                id: nuevoId,
                nombre,
                descripcion,
                imagen,
                alt,
                precio,
                nivel,
                duracion,
                dirigido,
                aprendizajes,
                modulos
            };
            cursos.push(nuevoCurso);
            if (typeof mostrarNotificacion === "function") {
                mostrarNotificacion(`"${nombre}" agregado al catálogo.`, "exito");
            }
        }

        guardarCatalogoPersistente(cursos);
        cerrarModalCurso();
        renderizarCatalogo();
    });

    function renderizarCatalogo() {
        const esDocente = estaEnModoDocente();
        if (btnAgregarCurso) {
            btnAgregarCurso.classList.toggle("oculto", !esDocente);
        }

        contenedorCatalogo.innerHTML = "";

        cursos.forEach(curso => {
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

            const botonesDocenteHtml = esDocente
                ? `
                    <div class="botones-curso">
                        <button type="button" class="boton-curso btn-editar-curso" data-id="${curso.id}">Editar</button>
                        <button type="button" class="boton-eliminar btn-eliminar-curso" data-id="${curso.id}">Eliminar</button>
                    </div>
                  `
                : "";

            articulo.innerHTML = `
                <div class="portada-curso">
                    <img src="${curso.imagen}" alt="${curso.alt || curso.nombre}">
                </div>
                <div class="tarjeta-cuerpo">
                    <h2>${curso.nombre}</h2>
                    <p class="descripcion-curso">${curso.descripcion}</p>
                    <span class="precio-curso">$${Number(curso.precio).toLocaleString("es-AR")} ARS</span>
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
                    ${botonesDocenteHtml}
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

        contenedorCatalogo.querySelectorAll(".btn-editar-curso").forEach(btn => {
            btn.addEventListener("click", (e) => {
                if (!estaEnModoDocente()) return;
                const idCurso = e.currentTarget.dataset.id;
                const cursoEncontrado = cursos.find(c => String(c.id) === String(idCurso));
                if (cursoEncontrado) {
                    abrirModalCurso(cursoEncontrado);
                }
            });
        });

        contenedorCatalogo.querySelectorAll(".btn-eliminar-curso").forEach(btn => {
            btn.addEventListener("click", (e) => {
                if (!estaEnModoDocente()) return;
                const idCurso = e.currentTarget.dataset.id;
                const cursoEncontrado = cursos.find(c => String(c.id) === String(idCurso));
                const nombreCurso = cursoEncontrado ? cursoEncontrado.nombre : "este curso";

                if (!confirm(`¿Seguro que querés eliminar "${nombreCurso}" del catálogo?`)) return;

                cursos = cursos.filter(c => String(c.id) !== String(idCurso));
                guardarCatalogoPersistente(cursos);
                renderizarCatalogo();

                if (typeof mostrarNotificacion === "function") {
                    mostrarNotificacion(`"${nombreCurso}" eliminado.`, "advertencia");
                }
            });
        });
    }

    renderizarCatalogo();
});