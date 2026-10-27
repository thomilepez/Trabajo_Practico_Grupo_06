document.addEventListener('DOMContentLoaded',()=>{

 const contenedorHeader = document.getElementById('header-contenedor');

 if(contenedorHeader){
    fetch('/Componentes/header.html')
    .then(respuesta => respuesta.text())
    .then(html =>{
        contenedorHeader.innerHTML =html
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