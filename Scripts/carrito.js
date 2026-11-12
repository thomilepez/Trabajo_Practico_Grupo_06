console.log("El archivo carrito.js se está ejecutando");

const catalogoCursos = [{
    id: "cmasmas",
    nombre: "C++ para principiantes",
    descripcion: "Punteros, estructuras de datos, POO y alto rendimiento.",
    imagen: "../imagenes/Programacion/Cmasmas.jpg",
    alt: "Logo de c++ con lineas de codigo de fondo ",
    precio: 17999,
    enlace: "../Cursos/cmasmas.html"
},
{
    id:"css-html",
    nombre:"HTML5 y CSS3 desde Cero", 
    descripcion:"Aprendé a maquetar sitios web modernos.",
    imagen:"../imagenes/Programacion/Html-Css.jpg",
    alt: "Logo de HTML5 y CSS3",
    precio: 14999,
    enlace:  "../Cursos/css-html.html"


}, {

    id:"diseno-grafico",
    nombre:"Diseño Gráfico" ,
    descripcion:"Aprendé los principios fundamentales del Diseño Grafico",
    imagen:"../imagenes/Diseño/Portada-Diseño.jpg",
    alt: "Logo de Diseño Gráfico",
    precio: 24999,
    enlace: "../Cursos/diseno-grafico.html"


},{

    id:"IA",
    nombre: "Inteligencia Artificial",
    descripcion: "Descubrí el funcionamiento de la inteligencia artificial",
    imagen: "../imagenes/IA/portada ia.jpg",
    alt: "Logo de Inteligencia Artificial",
    precio: 9999 ,
    enlace: "../Cursos/inteligencia-artificial.html"
}
,{
     id:"java",
    nombre: "Java y POO",
    descripcion: "Aprendé los fundamentos de Java desde cero",
    imagen: "../imagenes/Programacion/JAVA",
    alt: "Logo de Java",
    precio: 21999,
    enlace: "../Cursos/java.html"
},{
     id:"javascript",
    nombre:"JavaScript Moderno",
    descripcion:"Dominá el lenguaje esencial de la web",
    imagen:"../imagenes/Programacion/JavaScript.jpg",
    alt: "Logo de JavaScript",
    precio: 19999,
    enlace: "../Cursos/javascript.html"
},{
     id:"linux",
    nombre: "Linux para principiante",
    descripcion: "Descubrí la potencia del sistema operativo de los servidores y el desarrollo web",
    imagen: "../imagenes/Oficina/linux.jpg",
    alt: "Logo de Linux",
    precio: 14999,
    enlace: "../Cursos/linux.html"
},{
     id:"php",
    nombre: "PHP y Desarrollo Web Backend",
    descripcion: "Aprendé a desarrollar sistemas backend seguros y estructurados",
    imagen: "../imagenes/Programacion/lenguaje-php.jpg",
    alt: "Logo de PHP",
    precio: 16999,
    enlace: "../Cursos/php.html"
},{
     id:"python",
    nombre:"Python desde cero",
    descripcion: "Aprendé a programar de forma rapida y fácil con Python",
    imagen: "../imagenes/Programacion/Python.jpg",
    alt: "Logo de Python",
    precio: 22999,
    enlace: "../Cursos/python.html"
},{
     id:"sql",
    nombre: "SQL y Bases de Datos",
    descripcion: "Aprendé a diseñar, consultar y administrar bases de datos desde cero",
    imagen: "../imagenes/Programacion/BDD.jpg",
    alt: "Logo de SQL",
    precio: 20999,
    enlace: "../Cursos/sql.html"
},{
     id:"swift",
    nombre: "Swift y Apps para iOS",
    descripcion: "Aprendé el lenguaje de Apple desde las bases de forma sencilla",
    imagen: "../imagenes/Programacion/swift.jpg",
    alt: "Logo de Swift",
    precio: 24999,
    enlace: "../Cursos/swift.html"
},{
     id:"ux-ui",
    nombre: "Diseño UX/UI",
    descripcion: "Llevá tus bases de diseño visual al siguiente nivel",
    imagen: "../imagenes/Diseño/Diseno-UX-UI.webp",
    alt: "Logo de Diseño UX/UI",
    precio: 23999,
    enlace: "../Cursos/ux-ui.html"
}

]



/*Agregar al Carrito*/




const botonesCarrito = document.querySelectorAll(".boton-carrito");


botonesCarrito.forEach(boton => {
           
    boton.addEventListener("click", () => {

        const id = boton.dataset.id;
        agregarAlCarrito(id);


    })

})


function agregarAlCarrito(idCurso){

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

if(!usuarioActivo){

    alert("Debes iniciar sesión para agregar cursos al carrito");
         return;
    
    }

const usuarioEncontrado = usuarios.find(usuario => usuario.email === usuarioActivo.email);

if(!usuarioEncontrado){
        return ;     
}

if(!usuarioEncontrado.carrito){

    usuarioEncontrado.carrito = []; 

}

const cursoExistente = usuarioEncontrado.carrito.find(curso => curso === idCurso);



if(cursoExistente){
    alert("El curso ya está en el carrito");
    return;
}

    usuarioEncontrado.carrito.push(idCurso);



    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

    alert("Curso agregado al carrito");

}


/*MOSTRAR EN EL CARRO*/
function mostrarCarrito(){
    
    
    
    const contenedorCarrito = document.getElementById("contenedor-carrito");
    const resumenCarrito = document.getElementById("resumen-carrito");
    
    contenedorCarrito.innerHTML = "";
    
    resumenCarrito.innerHTML = "";

const usuarioActivoCarrito = JSON.parse(localStorage.getItem("usuarioActivo"));
const usuariosCarrito = JSON.parse(localStorage.getItem("usuarios")) || []; 

   if(!usuarioActivoCarrito){
    alert("Debes iniciar sesión para ver el carrito");
    window.location.href = "../index.html";
    return ;
   } 

   const usuarioEncontrado = usuariosCarrito.find(usuario => usuario.email === usuarioActivoCarrito.email);

   if(!usuarioEncontrado){

        return ;
   }

   let total = 0; 
   
   const carrito = usuarioEncontrado.carrito || [];

    console.log("Usuario activo:", usuarioActivoCarrito);
    console.log("Usuario encontrado:", usuarioEncontrado);
    console.log("Cursos guardados:", carrito);

    if(carrito.length === 0){
        contenedorCarrito.innerHTML = "<p>El carrito está vacío</p>";
        resumenCarrito.innerHTML = "<p>No hay cursos en el carrito</p>";
        return;
    }

    carrito.forEach(idCurso => {

        const cursoEncontrado = catalogoCursos.find(curso => curso.id === idCurso);

        console.log("ID guardado:", idCurso);
        console.log("Curso encontrado:", cursoEncontrado);

        if(cursoEncontrado){
            total += cursoEncontrado.precio;

             const articulo = document.createElement("article");
             articulo.classList.add("tarjeta", "curso");
             articulo.dataset.id = cursoEncontrado.id;
             
             const portadaCurso = document.createElement("div");
             portadaCurso.classList.add("portada-curso");
             
             const imagenCurso = document.createElement("img");
             imagenCurso.src = cursoEncontrado.imagen;
             imagenCurso.alt = `${cursoEncontrado.alt}`;


            portadaCurso.appendChild(imagenCurso);

            const tarjetaCuerpo = document.createElement("div");
            tarjetaCuerpo.classList.add("tarjeta-cuerpo");

            const h2 = document.createElement("h2");
            h2.textContent = cursoEncontrado.nombre;

            const descripcion = document.createElement("p");
            descripcion.classList.add("descripcion-curso");
            descripcion.textContent = cursoEncontrado.descripcion;

            const precio = document.createElement("span");
            precio.classList.add("precio-curso");
            precio.textContent = `$ ${cursoEncontrado.precio.toLocaleString("es-AR")} ARS`;

            const botonesCurso = document.createElement("div");
            botonesCurso.classList.add("botones-curso");

            const botonEliminar = document.createElement("a");
            botonEliminar.href = "#";
            botonEliminar.classList.add("boton-eliminar");
            botonEliminar.textContent = "Eliminar";

            botonesCurso.appendChild(botonEliminar);

            tarjetaCuerpo.appendChild(h2);
            tarjetaCuerpo.appendChild(descripcion);
            tarjetaCuerpo.appendChild(precio);
            tarjetaCuerpo.appendChild(botonesCurso);

            articulo.appendChild(portadaCurso);
            articulo.appendChild(tarjetaCuerpo);


            contenedorCarrito.appendChild(articulo); /*se agrega los elementos al contenedor */


                /*RESUMEN */


             const fila = document.createElement("div");
             fila.classList.add("fila-resumen");

             const nombreCurso = document.createElement("span");
             nombreCurso.textContent = cursoEncontrado.nombre;


             const precioCurso = document.createElement("span");
             precioCurso.textContent = `$ ${cursoEncontrado.precio.toLocaleString("es-AR")} ARS`;

                fila.appendChild(nombreCurso);
                fila.appendChild(precioCurso);
            

            resumenCarrito.appendChild(fila);

        }


    })



            
            const totalFila = document.createElement("div");
            totalFila.classList.add("fila-resumen", "total");

            const totalTexto = document.createElement("strong");
            totalTexto.textContent = "Total a pagar";

            const totalPrecio = document.createElement("strong");
            totalPrecio.textContent = `$ ${total.toLocaleString("es-AR")} ARS`;

            totalFila.appendChild(totalTexto);
            totalFila.appendChild(totalPrecio); 


            const contenedorBotones = document.createElement("div");
            contenedorBotones.classList.add("botones-curso");

            const botonComprar = document.createElement("a");
            botonComprar.href = "logica-de-compra/resumen-pago.html";
            botonComprar.classList.add("boton-curso");
            botonComprar.textContent = "Continuar pago";


            const botonSeguir = document.createElement("a");
            botonSeguir.href = "../tienda-carrito/catalogo-cursos.html";
            botonSeguir.classList.add("boton-curso");
            botonSeguir.textContent = "Seguir explorando";


             contenedorBotones.appendChild(botonComprar);
             contenedorBotones.appendChild(botonSeguir);     


            resumenCarrito.appendChild(totalFila);
            resumenCarrito.appendChild(contenedorBotones);



        }
        
        mostrarCarrito();