document.addEventListener("DOMContentLoaded", () => {
    const contenedorCatalogo = document.getElementById("contenedor-catalogo");
    
    if (!contenedorCatalogo) return;

    contenedorCatalogo.innerHTML = "";

    catalogoCursosDetalle.forEach(curso => {
        const articulo = document.createElement("article");
        articulo.classList.add("tarjeta", "curso");
        articulo.dataset.id = curso.id;

        articulo.innerHTML = `
            <div class="portada-curso">
                <img src="${curso.imagen}" alt="${curso.alt}">
            </div>
            <div class="tarjeta-cuerpo">
                <h2>${curso.nombre}</h2>
                <p class="descripcion-curso">${curso.descripcion}</p>
                <span class="precio-curso">$${curso.precio.toLocaleString("es-AR")} ARS</span>
                <div class="botones-curso">
                    <a href="../Cursos/detalle.html?id=${curso.id}" class="boton-curso">Ver más</a>
                    <button type="button" class="boton-carrito" data-id="${curso.id}">
                        <img src="../svg's/Iconos-SVG/whide/carrito-compras.svg" alt="Carrito de compra">
                    </button>
                </div>
            </div>
        `;

        contenedorCatalogo.appendChild(articulo);
    });
    document.querySelectorAll(".listado-cursos .boton-carrito").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idCurso = e.currentTarget.dataset.id;
            agregarAlCarrito(idCurso);
        });
    });
});