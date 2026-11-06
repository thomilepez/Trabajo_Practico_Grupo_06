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


if(formularioInicioSesion !== null){

    formularioInicioSesion.addEventListener("submit" , validarInicioSesion);

}

//exeption 








function validarRegistro(event){
let esValido = true;

    //Validacion Nombre

    if(inputNombre.value.trim() === ""){
        event.preventDefault();
        errorNombre.textContent = "El campo nombre no puede estar vacio";
        esValido = false;
    }else{

        errorNombre.textContent = "";
    }

    //Validacion Email
 
    const expresionRegularEmail = /^[a-z0-9]+@[a-z]+\.[a-z]+$/;
                                
    if(inputEmail.value.trim() === "")  {
        event.preventDefault(); 
        errorEmail.textContent = "El campo email no puede estar vacio"; 
        esValido = false;

    }else if(!expresionRegularEmail.test(inputEmail.value.trim())){
       
        event.preventDefault();
        errorEmail.textContent = "Email invalido";
        esValido = false;
    }else{

          errorEmail.textContent = "";
    }

    const validacionNumero = /[^0-9]/;
    //Validacion DNI
    if(imputDni.value.trim() === "" ){
        event.preventDefault()
        errorDNI.textContent = "El campo DNI no puede estar vacio";
        esValido = false;

    }else if(validacionNumero.test(imputDni.value.trim())){
        event.preventDefault()
        errorDNI.textContent = "No se permiten letras";
        esValido = false;

    }else if(imputDni.value.length !== 8 ){

        event.preventDefault()
        errorDNI.textContent = "DNI invalido ";
        esValido = false;

    }else {
        errorDNI.textContent = "";  
    }

    //Validacion Fecha
    if(fechaIngresada.value === ""){

        event.preventDefault();
        errorFecha.textContent = "El campo fecha no puede estar vacio";
        esValido = false;
    }else{

        const fechaDeNacimiento = new Date(fechaIngresada.value);
        const hoy = new Date();
        const fechaMinima = new Date(hoy.getFullYear()-16 , hoy.getMonth() , hoy.getDate());
        const fechaMinimaPermitida = new Date (1945 , 0 , 1);

        if(fechaDeNacimiento > fechaMinima ){
            event.preventDefault();
            errorFecha.textContent ="Debes tener o ser mayor de 16 años de edad";
            esValido = false;

        }else if (fechaDeNacimiento < fechaMinimaPermitida){
            event.preventDefault();
            errorFecha.textContent = "La fecha no puede ser anterior al año 1945";
            esValido = false;
        }else{
            errorFecha.textContent ="";
        }


       if(!validarContrasenia()){
        event.preventDefault();
        esValido =false ;
       } 


}

if(esValido){
    event.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem('usuarios') ) || [];
    const nuevousuario = {
        nombre: inputNombre.value.trim(),
        email: inputEmail.value.trim(),
        dni: imputDni.value.trim(),
        password: contraseniaIngresada.value.trim(),
        rol: "alumno"
    };

    usuarios.push(nuevousuario);
localStorage.setItem('usuarios', JSON.stringify(usuarios));
localStorage.setItem('usuarioActivo', JSON.stringify(nuevousuario));
window.location.href = "../index.html";
}
}

function validarContrasenia(){

        //Validar contraseña

        const expresionDeConstraseniaCaracterEspecial = /[^a-zA-Z0-9]/;

        if(contraseniaIngresada.value.trim() === ""){

            
            errorPassword.textContent ="Complete el campo contraseña";
            ojo.style.top = "75%" ;  
            candado.style.top ="75%";
            return false ;  

        }else if(!expresionDeConstraseniaCaracterEspecial.test(contraseniaIngresada.value.trim())){
          
            errorPassword.textContent = "La contraseña debe contener al menos 1 caracter especial";
             ojo.style.top = "75%" ;    
               candado.style.top ="75%";
               return false ;  
        }else if(contraseniaIngresada.value.length < 8 ){

        
            errorPassword.textContent = "La contraseña debe tener minimo 8 caracteres";
             ojo.style.top = "75%" ;    
               candado.style.top ="75%";
               return false ;  
        }else{

            errorPassword.textContent = "";
            return true ;
             
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

//DATOS DE SESION 



function validarInicioSesion(event){
    event.preventDefault();
    
    const  emailSesion = document.getElementById('email').value.trim()
    const contraseniaSesion = document.getElementById('password').value.trim()
    //Etiquetas p 
    const errorInicio = document.getElementById("error-inicio-sesion");
    const msjRolNoSeleccionado = document.getElementById("error-Seleccion-Rol");

    const rolSeleccionado = document.querySelector('input[name="rol"]:checked');

    if(!rolSeleccionado){
        event.preventDefault();
        msjRolNoSeleccionado.textContent="Rol no seleccionado";
        return ;
     //   localStorage.usuarios;
       // const usuarios= JSON.parse(localStorage.getItem('usuarios'))
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [] ;

    
    const usuarioEncontrado = usuarios.find(usuarios => usuarios.email === emailSesion && usuarios.password === contraseniaSesion);

        if(!usuarioEncontrado){

            if(usuarioEncontrado.rol === rolSeleccionado.value){

                localStorageStorage.setItem("usuarioActivo" ,JSON.stringify(usuarioEncontrado));
               window.location.href = "../index.html";
            }else{
                event.preventDefault();
                errorInicio.textContent ="El rol no coincide con el usuario";

            }

        }else{
            event.preventDefault();
            errorInicio.textContent ="Email o contraseña incorrecta";
        }
    

        

}
if(ojo){
 ojo.addEventListener("click", verContraseña );
 }