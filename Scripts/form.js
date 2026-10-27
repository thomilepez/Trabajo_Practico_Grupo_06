//Forms
const formularioRegistro = document.querySelector(".formulario-registro");
const formularioInicioSesion = document.querySelector(".formulario-inicioSesion");



const password = document.getElementById("password");
const ojo = document.getElementById("ojo");
const candado = document.getElementById("candado");

const contenedorFechaForm = document.getElementById("form-fecha");

//imputs
const inputNombre = document.getElementById("nombre-apellido");
const inputEmail = document.getElementById("imput-Email");
const imputDni = document.getElementById("dni");
const fechaIngresada = document.getElementById("fecha-nacimiento"); 
const contraseniaIngresada = document.getElementById("password");




//msj de error

const errorNombre = document.getElementById("error-Nombre");
const errorEmail = document.getElementById("error-Email");
const errorDNI = document.getElementById("error-DNI");
const errorFecha = document.getElementById("error-fecha");
const errorPassword = document.getElementById("error-password");


if(formularioRegistro !== null ){

    formularioRegistro.addEventListener("submit" , validarRegistro );

    contraseniaIngresada.addEventListener("keyup" , validarContrasenia);
}



//exeption 








function validarRegistro(event){

    //Validacion Nombre

    if(inputNombre.value.trim() === ""){
        event.preventDefault();
        errorNombre.textContent = "El campo nombre no puede estar vacio";

    }else{

        errorNombre.textContent = "";
    }

    //Validacion Email
 
    const expresionRegularEmail = /^[a-z0-9]+@[a-z]+\.[a-z]+$/;
                                
    if(inputEmail.value.trim() === "")  {
        event.preventDefault(); 
        errorEmail.textContent = "El campo email no puede estar vacio"; 
    }else if(!expresionRegularEmail.test(inputEmail.value.trim())){
       
        event.preventDefault();
        errorEmail.textContent = "Email invalido";

    }else{

          errorEmail.textContent = "";
    }

    const validacionNumero = /[^0-9]/;


    //Validacion DNI


    if(imputDni.value.trim() === "" ){

        errorDNI.textContent = "El campo DNI no puede estar vacio";


    }else if(validacionNumero.test(imputDni.value.trim())){

        errorDNI.textContent = "No se permiten letras";


    }else if(imputDni.value.length !== 8 ){

        errorDNI.textContent = "DNI invalido ";

    }else {

        errorDNI.textContent = "";
            
    }




    //Validacion Fecha


 

    if(fechaIngresada.value === ""){

        event.preventDefault();
        errorFecha.textContent = "El campo fecha no puede estar vacio";

    }else{

        const fechaDeNacimiento = new Date(fechaIngresada.value);
        const hoy = new Date();

        const fechaMinima = new Date(hoy.getFullYear()-16 , hoy.getMonth() , hoy.getDate());
        const fechaMinimaPermitida = new Date (1945 , 0 , 1);

        if(fechaDeNacimiento > fechaMinima ){
            
            event.preventDefault();
            errorFecha.textContent ="Debes tener o ser mayor de 16 años de edad";

        }else if (fechaDeNacimiento < fechaMinimaPermitida){
            event.preventDefault();
            errorFecha.textContent = "La fecha no puede ser anterior al año 1945";


        }else{

            errorFecha.textContent ="";

        }




}


}

function validarContrasenia(){

        //Validar contraseña

        const expresionDeConstraseniaCaracterEspecial = /[^a-zA-Z0-9]/;

        if(contraseniaIngresada.value.trim() === ""){

            
            errorPassword.textContent ="Complete el campo contraseña";
            ojo.style.top = "75%" ;  
            candado.style.top ="75%";  

        }else if(!expresionDeConstraseniaCaracterEspecial.test(contraseniaIngresada.value.trim())){
          
            errorPassword.textContent = "La contraseña debe contener al menos 1 caracter especial";
             ojo.style.top = "75%" ;    
               candado.style.top ="75%";  
        }else if(contraseniaIngresada.value.length < 8 ){

        
            errorPassword.textContent = "La contraseña debe tener minimo 8 caracteres";
             ojo.style.top = "75%" ;    
               candado.style.top ="75%";  
        }else{

            errorPassword.textContent = "";
             ojo.style.top = "75%" ;    
               candado.style.top ="75%";  
        }

    }

function verContraseña(){
    if(password.type ==  "password" ) {

        password.type = "text";
        ojo.src ="../svg's/Iconos-SVG/whide/ojo.svg";
    }else{
        password.type = "password" ;
        ojo.src ="../svg's/Iconos-SVG/whide/no-ojo.svg";
    }

       

}

 ojo.addEventListener("click", verContraseña );