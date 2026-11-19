document.addEventListener("DOMContentLoaded", () => {

    const contenedor = document.getElementById("contenedor-cursos");
    const indicadores = document.getElementById("indicadores-carrusel");

    let indiceActual = 0;

    function obtenerCantidadVisible() {

    if (window.innerWidth <= 768) {
        return 1;
    }

    if (window.innerWidth <= 1024) {
        return 2;
    }

    return 4;
}

const cursosRecomendados = [
    "javascript",
    "java",
    "python",
    "diseno-grafico",
    "html5-css3",
    "sql"
];


    // Generar las tarjetas de los cursos
    catalogoCursosDetalle
    .filter(curso => cursosRecomendados.includes(curso.id))
    .forEach(curso =>  {

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("contenedor-img-curso");

        const rutaImagen = curso.imagen.replace("../", "");

        tarjeta.innerHTML = `
            <img src="${rutaImagen}" alt="${curso.alt}">

            <h3>${curso.nombre}</h3>

            <p>${curso.descripcion}</p>

            <a href="Cursos/Detalle-curso.html?id=${curso.id}"
               class="btn-cursos-masInfo">
                Más información
            </a>
        `;

        contenedor.appendChild(tarjeta);

    });

    // Calcular cuántas posiciones puede tener el carrusel
    let cantidadVisible = obtenerCantidadVisible();
    const cantidadPosiciones = cursosRecomendados.length - cantidadVisible + 1;;

    // Crear los puntitos 
    for (let i = 0; i < cantidadPosiciones; i++) {

        const punto = document.createElement("button");

        punto.type = "button";
        punto.setAttribute("aria-label", ` ${i + 1}`);

        if (i === 0) {
            punto.classList.add("activo");
        }

        punto.addEventListener("click", () => {

            indiceActual = i;

            actualizarCarrusel();

        });

        indicadores.appendChild(punto);

    }

    // Actualizar la posición del carrusel
    function actualizarCarrusel() {

        const tarjeta = contenedor.querySelector(".contenedor-img-curso");

        const anchoTarjeta = tarjeta.getBoundingClientRect().width;

        const espacio = parseFloat(getComputedStyle(contenedor).gap);

        const desplazamiento = indiceActual * (anchoTarjeta + espacio);

        contenedor.style.transform = `translateX(-${desplazamiento}px)`;

        const puntos = indicadores.querySelectorAll("button");

        puntos.forEach((punto, i) => {

            punto.classList.toggle("activo", i === indiceActual);

        });

    }

});