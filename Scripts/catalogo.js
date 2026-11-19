document.addEventListener("DOMContentLoaded", () => {
    const contenedorCatalogo = document.getElementById("contenedor-catalogo");

    if (!contenedorCatalogo) return;

    contenedorCatalogo.innerHTML = "";

    catalogoCursosDetalle.forEach(curso => {
        const articulo = document.createElement("article");
        articulo.classList.add("tarjeta", "curso");
        articulo.dataset.id = curso.id;

        const yaComprado = typeof window.cursoYaAdquirido === "function"
            ? window.cursoYaAdquirido(curso.id)
            : false;

        const botonAccionHtml = yaComprado
            ? `
                <a href="../Usuario/mis-cursos.html?id=${curso.id}" class="boton-curso-adquirido">
                    <img src="../svg's/Iconos-SVG/whide/libro-abierto.svg" alt="Icono de reproducción">
                    Ir a mis clases
                </a>
              `
            : `
                <button type="button" class="boton-carrito" data-id="${curso.id}">
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
                </div>
            </div>
        `;

        contenedorCatalogo.appendChild(articulo);
    });

    document.querySelectorAll(".listado-cursos .boton-carrito").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idCurso = e.currentTarget.dataset.id;
            if (typeof window.agregarAlCarrito === "function") {
                window.agregarAlCarrito(idCurso);
            }
        });
    });
});