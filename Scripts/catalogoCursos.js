const catalogoCursosDetalle = [
    {
        id: "cmasmas",
        nombre: "C++ para principiantes",
        descripcion: "Aprendé desde cero el lenguaje C++: sintaxis, estructuras de control, funciones, punteros y programación orientada a objetos.",
        imagen: "../imagenes/Programacion/Cmasmas.jpg",
        alt: "Logo de C++",
        precio: 17999,
        nivel: "Principiante",
        duracion: "40 horas",
        dirigido: [
            "Personas que quieran aprender programación desde cero con un lenguaje sólido y estructurado.",
            "Estudiantes de tecnología o sistemas que busquen reforzar lógica, memoria y POO."
        ],
        aprendizajes: [
            "Escribir programas en C++ usando variables, condicionales y bucles.",
            "Organizar código con funciones, arreglos y estructuras.",
            "Comprender el manejo de punteros y programación orientada a objetos."
        ],
        modulos: [
            "Módulo 1: Fundamentos de C++ y entorno de trabajo",
            "Módulo 2: Estructuras de control, funciones y arreglos",
            "Módulo 3: Punteros, clases y programación orientada a objetos"
        ]
    },
    {
        id: "javascript",
        nombre: "JavaScript Moderno",
        descripcion: "Aprendé el lenguaje de la web: variables, funciones, manipulación del DOM, eventos y asincronía.",
        imagen: "../imagenes/Programacion/JavaScript.jpg",
        alt: "Logo de JavaScript",
        precio: 19999,
        nivel: "Principiante",
        duracion: "35 horas",
        dirigido: [
            "Quienes ya conozcan nociones básicas de HTML/CSS y quieran darle interactividad a sus páginas.",
            "Estudiantes de desarrollo web que busquen dominar la lógica en el navegador."
        ],
        aprendizajes: [
            "Trabajar con tipos de datos, arrays, objetos y funciones modernas (ES6+).",
            "Seleccionar y modificar elementos del DOM y responder a eventos del usuario.",
            "Resolver operaciones asincrónicas con promesas, async/await y consumo de datos."
        ],
        modulos: [
            "Módulo 1: Sintaxis moderna, arrays, objetos y funciones",
            "Módulo 2: Manipulación del DOM y manejo de eventos",
            "Módulo 3: Asincronía, almacenamiento local y proyecto práctico"
        ]
    },
    {
        id: "html5-css3",
        nombre: "HTML5 y CSS3",
        descripcion: "Aprendé a construir páginas web desde cero: estructura con HTML5 semántico, estilos con CSS3, maquetación con Flexbox y Grid y diseño responsive para que tus sitios se vean bien en cualquier dispositivo.",
        imagen: "../imagenes/Programacion/Html-Css.jpg",
        alt: "Código HTML y CSS en un editor junto a una página web en un navegador",
        precio: 27999,
        nivel: "Principiante",
        duracion: "40 horas",
        dirigido: [
            "Personas sin experiencia previa que quieran dar sus primeros pasos en el desarrollo web.",
            "Estudiantes, diseñadores o emprendedores que busquen crear y personalizar sus propios sitios."
        ],
        aprendizajes: [
            "Estructurar sitios web limpios y accesibles con etiquetas semánticas de HTML5.",
            "Aplicar estilos, colores, tipografías y animaciones con CSS3.",
            "Maquetar interfaces adaptables a celulares, tablets y escritorio con Flexbox y CSS Grid.",
            "Publicar y organizar proyectos web con buenas prácticas."
        ],
        modulos: [
            "Módulo 1: Introducción a la web y estructura con HTML5",
            "Módulo 2: Selectores, box model y estilos con CSS3",
            "Módulo 3: Maquetación moderna con Flexbox y Grid",
            "Módulo 4: Diseño responsive y proyecto final"
        ]
    },
    {
        id: "diseno-grafico",
        nombre: "Diseño Gráfico",
        descripcion: "Aprendé los principios fundamentales de la comunicación visual, el manejo del color, la tipografía y la composición para crear piezas gráficas atractivas e identidades de marca sólidas.",
        imagen: "../imagenes/Diseño/Portada-Diseño.jpg",
        alt: "Persona con anteojos sobre fondo celeste",
        precio: 24999,
        nivel: "Principiante",
        duracion: "28 horas",
        dirigido: [
            "Principiantes creativos que quieran entender cómo funciona el diseño visual.",
            "Emprendedores o creadores de contenido que necesiten armar piezas gráficas coherentes."
        ],
        aprendizajes: [
            "Aplicar teoría del color, jerarquía visual y composición en piezas gráficas.",
            "Elegir y combinar tipografías para mejorar la legibilidad y el tono de marca.",
            "Construir identidades visuales consistentes para redes y presentaciones."
        ],
        modulos: [
            "Módulo 1: Principios de composición y jerarquía visual",
            "Módulo 2: Teoría del color y uso de tipografía",
            "Módulo 3: Identidad visual y piezas gráficas aplicadas"
        ]
    },
    {
        id: "inteligencia-artificial",
        nombre: "Inteligencia Artificial",
        descripcion: "Descubrí el funcionamiento de la inteligencia artificial, aprendé a utilizar herramientas generativas, dominá el diseño de prompts y comprendé las bases del aprendizaje automático para resolver problemas reales.",
        imagen: "../imagenes/IA/portada ia.jpg",
        alt: "Representación de una red neuronal con una persona interactuando con una computadora",
        precio: 29999,
        nivel: "Principiante",
        duracion: "30 horas",
        dirigido: [
            "Curiosos, estudiantes y profesionales que quieran integrar IA en su estudio o trabajo diario.",
            "Personas que busquen entender los conceptos clave de la IA sin requerir matemática avanzada."
        ],
        aprendizajes: [
            "Comprender qué es la IA generativa, los modelos de lenguaje y el aprendizaje automático.",
            "Redactar prompts claros, estructurados y efectivos para distintas tareas.",
            "Evaluar límites, sesgos y buenas prácticas al usar herramientas de IA."
        ],
        modulos: [
            "Módulo 1: Fundamentos de IA y modelos generativos",
            "Módulo 2: Técnicas de prompting y flujos de trabajo",
            "Módulo 3: Aplicaciones prácticas, límites y criterio ético"
        ]
    },
    {
        id: "java",
        nombre: "Programación en Java",
        descripcion: "Aprendé Java desde cero: sintaxis, programación orientada a objetos, colecciones, manejo de excepciones y acceso a bases de datos para construir aplicaciones robustas y multiplataforma.",
        imagen: "../imagenes/Programacion/JAVA.png",
        alt: "Persona programando en una computadora con código Java en pantalla",
        precio: 33999,
        nivel: "Principiante",
        duracion: "45 horas",
        dirigido: [
            "Quienes deseen aprender programación orientada a objetos con un lenguaje usado en sistemas empresariales.",
            "Estudiantes de informática o desarrollo que necesiten afianzar estructuras de datos y POO."
        ],
        aprendizajes: [
            "Dominar la sintaxis de Java, tipos de datos, control de flujo y métodos.",
            "Modelar problemas con clases, herencia, interfaces y polimorfismo.",
            "Trabajar con colecciones, excepciones y persistencia de datos."
        ],
        modulos: [
            "Módulo 1: Fundamentos de Java y lógica de programación",
            "Módulo 2: Programación orientada a objetos (POO)",
            "Módulo 3: Colecciones, excepciones y acceso a datos"
        ]
    },
    {
        id: "linux",
        nombre: "Linux y Terminal para Principiantes",
        descripcion: "Descubrí la potencia del sistema operativo de los servidores y el desarrollo web, dominá la línea de comandos bash, gestioná usuarios y permisos, y automatizá tareas cotidianas con scripts.",
        imagen: "../imagenes/Oficina/linux.jpg",
        alt: "Terminal de Linux con comandos en pantalla",
        precio: 25999,
        nivel: "Principiante",
        duracion: "30 horas",
        dirigido: [
            "Desarrolladores, estudiantes o usuarios que quieran soltarse trabajando en terminal.",
            "Quienes busquen entender cómo funcionan los servidores y entornos Linux."
        ],
        aprendizajes: [
            "Navegar por el sistema de archivos y gestionar archivos y procesos desde Bash.",
            "Configurar usuarios, grupos y permisos de lectura, escritura y ejecución.",
            "Escribir scripts básicos en Bash para automatizar tareas repetitivas."
        ],
        modulos: [
            "Módulo 1: Introducción a Linux y comandos esenciales de terminal",
            "Módulo 2: Sistema de archivos, permisos y gestión de procesos",
            "Módulo 3: Scripts en Bash y automatización"
        ]
    },
    {
        id: "php",
        nombre: "PHP",
        descripcion: "Aprendé a programar el lado del servidor con PHP: sintaxis, formularios, sesiones, conexión con MySQL y programación orientada a objetos para crear sitios web dinámicos y sistemas con base de datos.",
        imagen: "../imagenes/Programacion/lenguaje-php.jpg",
        alt: "Código PHP en un editor sobre fondo oscuro",
        precio: 33999,
        nivel: "Intermedio",
        duracion: "40 horas",
        dirigido: [
            "Quienes ya sepan maquetar con HTML y quieran crear aplicaciones web dinámicas en el servidor.",
            "Desarrolladores que busquen integrar formularios, sesiones y bases de datos relacionales."
        ],
        aprendizajes: [
            "Procesar y validar datos enviados desde formularios HTML en el servidor.",
            "Manejar sesiones, cookies y estructura modular de páginas.",
            "Conectar PHP con bases de datos relacionales para leer y guardar información."
        ],
        modulos: [
            "Módulo 1: Sintaxis de PHP, variables y control de flujo",
            "Módulo 2: Formularios, métodos HTTP y manejo de sesiones",
            "Módulo 3: Conexión a base de datos y POO en PHP"
        ]
    },
    {
        id: "python",
        nombre: "Programación en Python",
        descripcion: "Aprendé Python desde cero: un lenguaje simple y poderoso para automatizar tareas, analizar datos y desarrollar aplicaciones, con una sintaxis clara ideal para dar tus primeros pasos en la programación.",
        imagen: "../imagenes/Programacion/Python.jpg",
        alt: "Código Python en la pantalla de una computadora",
        precio: 29999,
        nivel: "Principiante",
        duracion: "35 horas",
        dirigido: [
            "Principiantes que busquen un lenguaje legible para empezar a programar sin fricción.",
            "Personas interesadas en automatización, scripting o análisis de datos."
        ],
        aprendizajes: [
            "Escribir código claro usando listas, tuplas, diccionarios, condicionales y bucles.",
            "Crear funciones y módulos reutilizables para organizar scripts.",
            "Automatizar tareas con archivos y resolver ejercicios lógicos."
        ],
        modulos: [
            "Módulo 1: Primeros pasos en Python y estructuras de control",
            "Módulo 2: Estructuras de datos y funciones",
            "Módulo 3: Manejo de archivos y automatización práctica"
        ]
    },
    {
        id: "sql",
        nombre: "SQL",
        descripcion: "Aprendé a crear, consultar y administrar bases de datos relacionales con SQL: modelado, consultas, uniones, funciones de agregación y optimización para manejar la información de cualquier sistema.",
        imagen: "../imagenes/Programacion/BDD.jpg",
        alt: "Tablas de una base de datos y consultas SQL en pantalla",
        precio: 25999,
        nivel: "Principiante",
        duracion: "30 horas",
        dirigido: [
            "Desarrolladores, analistas o estudiantes que necesiten consultar y organizar datos en bases relacionales.",
            "Quienes quieran entender cómo se estructuran tablas, claves y relaciones."
        ],
        aprendizajes: [
            "Diseñar tablas con claves primarias y foráneas respetando integridad relacional.",
            "Escribir consultas SELECT, filtros, ordenamientos, JOIN y agrupaciones.",
            "Insertar, actualizar y eliminar registros con seguridad y precisión."
        ],
        modulos: [
            "Módulo 1: Modelo relacional, tablas y operaciones CRUD",
            "Módulo 2: Consultas avanzadas, filtros y funciones de agregación",
            "Módulo 3: JOINs, relaciones y buenas prácticas de consulta"
        ]
    },
    {
        id: "swift",
        nombre: "Programación en Swift",
        descripcion: "Aprendé Swift, el lenguaje de Apple: sintaxis moderna, programación orientada a objetos y SwiftUI para crear tus propias aplicaciones para iPhone, iPad y otros dispositivos del ecosistema Apple.",
        imagen: "../imagenes/Programacion/swift.jpg",
        alt: "Código Swift junto a un teléfono con una aplicación en pantalla",
        precio: 33999,
        nivel: "Principiante",
        duracion: "40 horas",
        dirigido: [
            "Personas interesadas en dar sus primeros pasos en el desarrollo de apps para iOS.",
            "Estudiantes o programadores que quieran conocer la sintaxis moderna de Swift y SwiftUI."
        ],
        aprendizajes: [
            "Trabajar con variables, constantes, optionals, colecciones y closures en Swift.",
            "Construir interfaces declarativas y componentes visuales con SwiftUI.",
            "Estructurar vistas, estados y navegación básica de una aplicación."
        ],
        modulos: [
            "Módulo 1: Fundamentos del lenguaje Swift y seguridad de tipos",
            "Módulo 2: Interfaces y componentes con SwiftUI",
            "Módulo 3: Estado, navegación y armado de una app base"
        ]
    },
    {
        id: "ux-ui",
        nombre: "Diseño UX/UI",
        descripcion: "Aprendé a diseñar experiencias digitales centradas en las personas: investigación de usuarios, arquitectura de la información, wireframes, prototipos e interfaces atractivas y fáciles de usar para web y aplicaciones móviles.",
        imagen: "../imagenes/Diseño/Diseno-UX-UI.webp",
        alt: "Bocetos de pantallas de una aplicación sobre un escritorio de trabajo",
        precio: 29999,
        nivel: "Principiante",
        duracion: "32 horas",
        dirigido: [
            "Quienes quieran aprender a diseñar interfaces web y móviles centradas en el usuario.",
            "Desarrolladores o creadores que busquen mejorar la usabilidad y claridad de sus proyectos."
        ],
        aprendizajes: [
            "Plantear objetivos de usuario, flujos de navegación y arquitectura de información.",
            "Diseñar wireframes de baja fidelidad y prototipos interactivos.",
            "Aplicar criterios de usabilidad, contraste, espaciado y componentes UI."
        ],
        modulos: [
            "Módulo 1: Fundamentos de UX, usuarios y flujos",
            "Módulo 2: Wireframes, arquitectura de información y prototipado",
            "Módulo 3: Diseño UI, componentes y sistema visual"
        ]
    }
];