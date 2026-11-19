document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-cursos");
    const indicadores = document.getElementById("indicadores-carrusel");
    const carruselRoot = document.querySelector(".carrusel");
    const btnPrev = document.getElementById("btn-carrusel-prev");
    const btnNext = document.getElementById("btn-carrusel-next");

    if (!contenedor || !indicadores) return;

    const catalogoGuardado = JSON.parse(localStorage.getItem("catalogoCursos_v1"));
    const fuenteCatalogo = Array.isArray(catalogoGuardado) && catalogoGuardado.length > 0
        ? catalogoGuardado
        : (typeof catalogoCursosDetalle !== "undefined" ? catalogoCursosDetalle : []);

    const cursosRecomendados = [
        "javascript",
        "java",
        "python",
        "diseno-grafico",
        "html5-css3",
        "sql"
    ];

    const recomendadosFiltrados = fuenteCatalogo.filter(curso =>
        cursosRecomendados.includes(String(curso.id))
    );

    if (recomendadosFiltrados.length === 0) return;

    recomendadosFiltrados.forEach(curso => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("contenedor-img-curso");

        const rutaImagen = String(curso.imagen || "").replace(/^\.\.\//, "");

        tarjeta.innerHTML = `
            <img src="${rutaImagen}" alt="${curso.alt || curso.nombre}" draggable="false">
            <h3>${curso.nombre}</h3>
            <p>${curso.descripcion}</p>
            <a href="Cursos/Detalle-curso.html?id=${curso.id}" class="btn-cursos-masInfo">
                Más información
            </a>
        `;

        contenedor.appendChild(tarjeta);
    });

    let indiceActual = 0;
    let cantidadVisible = obtenerCantidadVisible();
    let cantidadPosiciones = Math.max(1, recomendadosFiltrados.length - cantidadVisible + 1);

    function obtenerCantidadVisible() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 4;
    }

    function construirIndicadores() {
        indicadores.innerHTML = "";
        for (let i = 0; i < cantidadPosiciones; i++) {
            const punto = document.createElement("button");
            punto.type = "button";
            punto.setAttribute("aria-label", `Ir a posición ${i + 1}`);
            if (i === indiceActual) punto.classList.add("activo");

            punto.addEventListener("click", () => {
                irA(i);
            });

            indicadores.appendChild(punto);
        }
    }

    function actualizarEstadoControles() {
        if (btnPrev) btnPrev.disabled = indiceActual <= 0;
        if (btnNext) btnNext.disabled = indiceActual >= cantidadPosiciones - 1;

        const puntos = indicadores.querySelectorAll("button");
        puntos.forEach((punto, i) => {
            punto.classList.toggle("activo", i === indiceActual);
            punto.setAttribute("aria-current", i === indiceActual ? "true" : "false");
        });
    }

    function actualizarCarrusel(conTransicion = true) {
        const tarjeta = contenedor.querySelector(".contenedor-img-curso");
        if (!tarjeta) return;

        const anchoTarjeta = tarjeta.getBoundingClientRect().width;
        const espacio = parseFloat(getComputedStyle(contenedor).gap) || 0;
        const desplazamiento = indiceActual * (anchoTarjeta + espacio);

        contenedor.style.transition = conTransicion
            ? "transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)"
            : "none";
        contenedor.style.transform = `translateX(-${desplazamiento}px)`;

        actualizarEstadoControles();
    }

    function irA(nuevoIndice) {
        indiceActual = Math.max(0, Math.min(nuevoIndice, cantidadPosiciones - 1));
        actualizarCarrusel(true);
    }

    btnPrev?.addEventListener("click", () => irA(indiceActual - 1));
    btnNext?.addEventListener("click", () => irA(indiceActual + 1));

    carruselRoot?.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            irA(indiceActual - 1);
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            irA(indiceActual + 1);
        }
    });

    let inicioX = 0;
    let arrastrando = false;

    contenedor.addEventListener("pointerdown", (e) => {
        if (e.target.closest("a, button")) return;
        arrastrando = true;
        inicioX = e.clientX;
        contenedor.style.transition = "none";
    });

    window.addEventListener("pointerup", (e) => {
        if (!arrastrando) return;
        arrastrando = false;
        const deltaX = e.clientX - inicioX;

        if (deltaX < -50) {
            irA(indiceActual + 1);
        } else if (deltaX > 50) {
            irA(indiceActual - 1);
        } else {
            actualizarCarrusel(true);
        }
    });

    window.addEventListener("resize", () => {
        const nuevaVisible = obtenerCantidadVisible();
        const nuevasPosiciones = Math.max(1, recomendadosFiltrados.length - nuevaVisible + 1);

        if (nuevaVisible !== cantidadVisible || nuevasPosiciones !== cantidadPosiciones) {
            cantidadVisible = nuevaVisible;
            cantidadPosiciones = nuevasPosiciones;
            indiceActual = Math.min(indiceActual, cantidadPosiciones - 1);
            construirIndicadores();
        }
        actualizarCarrusel(false);
    });

    construirIndicadores();
    actualizarCarrusel(false);
});