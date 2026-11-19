document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const cursoId = params.get("id");

    if (typeof catalogoCursosDetalle === "undefined") {
        console.error("catalogoCursosDetalle no está definido.");
        return;
    }

    const curso = catalogoCursosDetalle.find(c => String(c.id) === String(cursoId));

    if (!curso) {
        const contenedor = document.querySelector(".contenedor-curso");
        if (contenedor) {
            contenedor.innerHTML = `
                <div class="error-curso">
                    <h2>Curso no encontrado</h2>
                    <p>El curso que buscás no existe o fue removido.</p>
                </div>
            `;
        }
        return;
    }

    const tituloPestana = document.getElementById("titulo-pestana");
    const cursoTitulo = document.getElementById("curso-titulo");
    const cursoDescripcion = document.getElementById("curso-descripcion");
    const cursoImagen = document.getElementById("curso-imagen");
    const cursoPrecio = document.getElementById("curso-precio");
    const cursoNivel = document.getElementById("curso-nivel");
    const cursoDuracion = document.getElementById("curso-duracion");

    if (tituloPestana) tituloPestana.textContent = curso.nombre;
    if (cursoTitulo) cursoTitulo.textContent = curso.nombre;
    if (cursoDescripcion) cursoDescripcion.textContent = curso.descripcion;
    if (cursoImagen) {
        cursoImagen.src = curso.imagen;
        cursoImagen.alt = curso.alt || curso.nombre;
    }
    if (cursoPrecio) cursoPrecio.textContent = `Precio final: $ ${curso.precio.toLocaleString("es-AR")} ARS`;
    if (cursoNivel) cursoNivel.textContent = `Nivel: ${curso.nivel}`;
    if (cursoDuracion) cursoDuracion.textContent = `Duración: ${curso.duracion}`;

    // 1. Para quién está dirigido
    const contDirigido = document.getElementById("curso-dirigido");
    if (contDirigido) {
        const listaDirigido = Array.isArray(curso.dirigido) && curso.dirigido.length > 0
            ? curso.dirigido
            : [`Estudiantes y principiantes interesados en ${curso.nombre} desde cero.`];

        contDirigido.innerHTML = listaDirigido
            .map(texto => `<p>${texto}</p>`)
            .join("");
    }

    const contAprendizajes = document.getElementById("curso-aprendizajes");
    if (contAprendizajes) {
        const listaAprendizajes = Array.isArray(curso.aprendizajes) && curso.aprendizajes.length > 0
            ? curso.aprendizajes
            : [
                `Fundamentos y conceptos clave de ${curso.nombre}.`,
                "Ejercicios prácticos paso a paso.",
                "Buenas prácticas y resolución de problemas reales."
            ];

        contAprendizajes.innerHTML = listaAprendizajes
            .map(item => `<div class="item-aprendizaje"><p>${item}</p></div>`)
            .join("");
    }

    const contModulos = document.getElementById("curso-modulos");
    if (contModulos) {
        const listaModulos = Array.isArray(curso.modulos) && curso.modulos.length > 0
            ? curso.modulos
            : [
                "Módulo 1: Introducción y puesta a punto",
                "Módulo 2: Conceptos fundamentales",
                "Módulo 3: Práctica guiada y proyecto"
            ];

        contModulos.innerHTML = listaModulos
            .map(modulo => `<li>${modulo}</li>`)
            .join("");
    }

    const contenedorAcciones = document.getElementById("contenedor-acciones-compra");
    if (contenedorAcciones) {
        const yaComprado = typeof window.cursoYaAdquirido === "function"
            ? window.cursoYaAdquirido(curso.id)
            : false;

        if (yaComprado) {
            contenedorAcciones.innerHTML = `
                <a href="../Usuario/mis-cursos.html?id=${curso.id}" class="boton-curso-adquirido">
                    <img src="../svg's/Iconos-SVG/whide/libro-abierto.svg" alt="Icono de curso">
                    Ir a mis clases
                </a>
            `;
        } else {
            contenedorAcciones.innerHTML = `
                <button type="button" class="boton-carrito" id="btn-comprar-detalle" data-id="${curso.id}">
                    <img src="../svg's/Iconos-SVG/whide/carrito-compras.svg" alt="Carrito de compra">
                    Añadir al carrito
                </button>
            `;

            const btnComprar = document.getElementById("btn-comprar-detalle");
            if (btnComprar) {
                btnComprar.addEventListener("click", () => {
                    if (typeof window.agregarAlCarrito === "function") {
                        window.agregarAlCarrito(curso.id);
                    } else {
                        console.error("La función agregarAlCarrito no está disponible globalmente.");
                    }
                });
            }
        }
    }
});