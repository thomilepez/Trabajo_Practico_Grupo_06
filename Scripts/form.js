const password = document.getElementById("password");
const ojo = document.getElementById("ojo");


function verContraseña(){
    if(password.type ==  "password" ) {

        password.type = "text";
        ojo.src ="../svg's/Iconos-SVG/icono-ojo-open.svg";
    }else{
        password.type = "password" ;
        ojo.src ="../svg's/Iconos-SVG/Icono-ojo-close.svg";
    }


}

 ojo.addEventListener("click", verContraseña );