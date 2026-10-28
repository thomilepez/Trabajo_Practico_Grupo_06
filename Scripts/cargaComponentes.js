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