document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo) {
        window.location.href = "iniciar-sesion.html";
        return;
    }
    const contenedorCursos = document.getElementById("listado-mis-cursos");
    if (!contenedorCursos) return;

    const idsComprados = usuarioActivo.cursosComprados || [];
    if (idsComprados.length === 0) {
        contenedorCursos.innerHTML = `
            <div class="sin-cursos">
                <h2>Todavía no compraste ningún curso</h2>
                <p>Explorá nuestro catálogo y sumate a nuestras capacitaciones.</p>
                <a href="../tienda-carrito/catalogo-cursos.html" class="boton-curso">Ver catálogo</a>
            </div>
        `;
        return;
    }

    contenedorCursos.innerHTML = "";

    idsComprados.forEach(idCurso => {
        const curso = catalogoCursosDetalle.find(c => c.id === idCurso);

        if (curso) {
            const article = document.createElement("article");
            article.className = "tarjeta curso";
            article.setAttribute("data-id", curso.id);

            article.innerHTML = `
                <div class="portada-curso">
                    <img src="${curso.imagen}" alt="${curso.alt}">
                </div>
                <div class="tarjeta-cuerpo">
                    <h2>${curso.nombre}</h2>
                    <p class="descripcion-curso">${curso.descripcion}</p>
                    <div class="botones-curso">
                        <a href="../Cursos/mis-clases.html?id=${curso.id}" class="boton-curso">Ir al curso</a>
                    </div>
                </div>
            `;

            contenedorCursos.appendChild(article);
        }
    });
});