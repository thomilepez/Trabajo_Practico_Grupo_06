if(localStorage.getItem('tema')==='oscuro'){
    document.body.classList.add('tema-oscuro')
}
document.addEventListener('DOMContentLoaded',()=>{

 const contenedorHeader = document.getElementById('header-contenedor');

 if(contenedorHeader){
    fetch('/Componentes/header.html')
    .then(respuesta => respuesta.text())
    .then(html =>{
        contenedorHeader.innerHTML =html

            const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
            const menuIniciarSesion = document.getElementById('menu-iniciar-sesion');
            const menuPerfil = document.getElementById('menu-perfil');
            const menuMisCursos = document.getElementById('menu-mis-cursos');
            const btnHamburguesa = document.getElementById('btn-hamburguesa');
            const navegacionPrincipal = document.getElementById('navegacion-principal');

            if (btnHamburguesa && navegacionPrincipal) {
             btnHamburguesa.addEventListener('click', () => {
           navegacionPrincipal.classList.toggle('activo');
             });
}

            if (usuarioActivo) {
                if (menuIniciarSesion) menuIniciarSesion.classList.add('oculto');
                if (menuPerfil) menuPerfil.classList.remove('oculto');
                if (menuMisCursos) menuMisCursos.classList.remove('oculto');
            } else {
                if (menuIniciarSesion) menuIniciarSesion.classList.remove('oculto');
                if (menuPerfil) menuPerfil.classList.add('oculto');
                if (menuMisCursos) menuMisCursos.classList.add('oculto');
            }

        const btnTema = document.getElementById('btn-tema')
        const iconoTema = document.getElementById('icono-tema')
        const rutaSol = "/svg's/Iconos-SVG/whide/sol.svg"
        const rutaLuna = "/svg's/Iconos-SVG/whide/luna.svg"

        if(btnTema && iconoTema){
           if(document.body.classList.contains('tema-oscuro')){
           iconoTema.src = rutaSol;
           } else {
           iconoTema.src = rutaLuna;
           }

           btnTema.addEventListener('click', () => {
           document.body.classList.toggle('tema-oscuro');
           
            if(document.body.classList.contains('tema-oscuro')){
            localStorage.setItem('tema','oscuro')
            iconoTema.src = rutaSol;
            }else{
            localStorage.setItem('tema', 'claro');
            iconoTema.src = rutaLuna;
            }


           }
        
        
        )

        }
    })
 }



const contenedorFooter = document.getElementById('footer-contenedor');

if(contenedorFooter){
     fetch('/Componentes/footer.html')
    .then(respuesta => respuesta.text())
    .then(html =>{
        contenedorFooter.innerHTML =html
    })
}

});