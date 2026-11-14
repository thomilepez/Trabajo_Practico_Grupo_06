const catalogoCursosDetalle = [
    {
        id: "cmasmas",
        nombre: "C++ para principiantes",
        descripcion: "Aprendé desde cero el lenguaje C++: sintaxis, estructuras de control, funciones, punteros y programación orientada a objetos.",
        imagen: "../imagenes/Programacion/Cmasmas.jpg",
        alt: "Logo de C++",
        precio: 17999,
        nivel: "Principiante",
        duracion: "40 horas"
    },
    {
        id: "javascript",
        nombre: "JavaScript Moderno",
        descripcion: "Aprendé el lenguaje de la web: variables, funciones, manipulación del DOM, eventos y asincronía.",
        imagen: "../imagenes/Programacion/JavaScript.jpg",
        alt: "Logo de JavaScript",
        precio: 19999,
        nivel: "Principiante",
        duracion: "35 horas"
    },
{
        id: "html5-css3",
        nombre: "HTML5 y CSS3",
        descripcion: "Aprendé a construir páginas web desde cero: estructura con HTML5 semántico, estilos con CSS3, maquetación con Flexbox y Grid y diseño responsive para que tus sitios se vean bien en cualquier dispositivo.",
        imagen: "../imagenes/Programacion/Html-Css.jpg",
        alt: "Código HTML y CSS en un editor junto a una página web en un navegador",
        precio: 27999,
        nivel: "Principiante",
        duracion: "40 horas"
    },
    {
        id: "diseno-grafico",
        nombre: "Diseño Gráfico",
        descripcion: "Aprendé los principios fundamentales de la comunicación visual, el manejo del color, la tipografía y la composición para crear piezas gráficas atractivas e identidades de marca sólidas.",
        imagen: "../imagenes/Diseño/Portada-Diseño.jpg",
        alt: "Persona con anteojos sobre fondo celeste",
        precio: 24999,
        nivel: "Principiante",
        duracion: "28 horas"
    },
    {
        id: "inteligencia-artificial",
        nombre: "Inteligencia Artificial",
        descripcion: "Descubrí el funcionamiento de la inteligencia artificial, aprendé a utilizar herramientas generativas, dominá el diseño de prompts y comprendé las bases del aprendizaje automático para resolver problemas reales.",
        imagen: "../imagenes/IA/portada ia.jpg",
        alt: "Representación de una red neuronal con una persona interactuando con una computadora",
        precio: 29999,
        nivel: "Principiante",
        duracion: "30 horas"
    },
    {
        id: "java",
        nombre: "Programación en Java",
        descripcion: "Aprendé Java desde cero: sintaxis, programación orientada a objetos, colecciones, manejo de excepciones y acceso a bases de datos para construir aplicaciones robustas y multiplataforma.",
        imagen: "../imagenes/Programacion/JAVA",
        alt: "Persona programando en una computadora con código Java en pantalla",
        precio: 33999,
        nivel: "Principiante",
        duracion: "45 horas"
    },
    {
        id: "linux",
        nombre: "Linux y Terminal para Principiantes",
        descripcion: "Descubrí la potencia del sistema operativo de los servidores y el desarrollo web, dominá la línea de comandos bash, gestioná usuarios y permisos, y automatizá tareas cotidianas con scripts.",
        imagen: "../imagenes/Oficina/linux.jpg",
        alt: "Terminal de Linux con comandos en pantalla",
        precio: 25999,
        nivel: "Principiante",
        duracion: "30 horas"
    },
    {
        id: "php",
        nombre: "PHP",
        descripcion: "Aprendé a programar el lado del servidor con PHP: sintaxis, formularios, sesiones, conexión con MySQL y programación orientada a objetos para crear sitios web dinámicos y sistemas con base de datos.",
        imagen: "../imagenes/Programacion/lenguaje-php.jpg",
        alt: "Código PHP en un editor sobre fondo oscuro",
        precio: 33999,
        nivel: "Intermedio",
        duracion: "40 horas"
    },
    {
        id: "python",
        nombre: "Programación en Python",
        descripcion: "Aprendé Python desde cero: un lenguaje simple y poderoso para automatizar tareas, analizar datos y desarrollar aplicaciones, con una sintaxis clara ideal para dar tus primeros pasos en la programación.",
        imagen: "../imagenes/Programacion/Python.jpg",
        alt: "Código Python en la pantalla de una computadora",
        precio: 29999,
        nivel: "Principiante",
        duracion: "35 horas"
    },
    {
        id: "sql",
        nombre: "SQL",
        descripcion: "Aprendé a crear, consultar y administrar bases de datos relacionales con SQL: modelado, consultas, uniones, funciones de agregación y optimización para manejar la información de cualquier sistema.",
        imagen: "../imagenes/Programacion/BDD.jpg",
        alt: "Tablas de una base de datos y consultas SQL en pantalla",
        precio: 25999,
        nivel: "Principiante",
        duracion: "30 horas"
    },
    {
        id: "swift",
        nombre: "Programación en Swift",
        descripcion: "Aprendé Swift, el lenguaje de Apple: sintaxis moderna, programación orientada a objetos y SwiftUI para crear tus propias aplicaciones para iPhone, iPad y otros dispositivos del ecosistema Apple.",
        imagen: "../imagenes/Programacion/swift.jpg",
        alt: "Código Swift junto a un teléfono con una aplicación en pantalla",
        precio: 33999,
        nivel: "Principiante",
        duracion: "40 horas"
    },
    {
        id: "ux-ui",
        nombre: "Diseño UX/UI",
        descripcion: "Aprendé a diseñar experiencias digitales centradas en las personas: investigación de usuarios, arquitectura de la información, wireframes, prototipos e interfaces atractivas y fáciles de usar para web y aplicaciones móviles.",
        imagen: "../imagenes/Diseño/Diseno-UX-UI.webp",
        alt: "Bocetos de pantallas de una aplicación sobre un escritorio de trabajo",
        precio: 29999,
        nivel: "Principiante",
        duracion: "32 horas"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const cursoId = params.get("id");
    const curso = catalogoCursosDetalle.find(c => c.id === cursoId);

    if (!curso) {
        document.querySelector(".contenedor-curso").innerHTML = "<h2>Curso no encontrado</h2><p>El curso que buscás no existe o fue removido.</p>";
        return;
    }

    document.getElementById("titulo-pestana").textContent = curso.nombre;
    document.getElementById("curso-titulo").textContent = curso.nombre;
    document.getElementById("curso-descripcion").textContent = curso.descripcion;
    document.getElementById("curso-imagen").src = curso.imagen;
    document.getElementById("curso-imagen").alt = curso.alt;
    document.getElementById("curso-precio").textContent = `Precio final: $ ${curso.precio.toLocaleString("es-AR")} ARS`;
    document.getElementById("curso-nivel").textContent = `Nivel: ${curso.nivel}`;
    document.getElementById("curso-duracion").textContent = `Duración: ${curso.duracion}`;

    const btnComprar = document.getElementById("btn-comprar-detalle");
    btnComprar.dataset.id = curso.id;
    btnComprar.addEventListener("click", () => {
        agregarAlCarrito(curso.id);
    });
});