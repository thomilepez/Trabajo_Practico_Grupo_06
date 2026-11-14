document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!usuarioActivo) {
        window.location.href = "iniciar-sesion.html";
        return;
    }

    const spanNombre = document.getElementById("perfil-nombre");
    const spanEmail = document.getElementById("perfil-email");
    const spanDni = document.getElementById("perfil-dni");
    const spanRol = document.getElementById("perfil-rol");

    if (spanNombre) spanNombre.textContent = usuarioActivo.nombre || "No especificado";
    if (spanEmail) spanEmail.textContent = usuarioActivo.email || "No especificado";
    if (spanDni) spanDni.textContent = usuarioActivo.dni || "No especificado";
    if (spanRol) spanRol.textContent = usuarioActivo.rol ? usuarioActivo.rol.toUpperCase() : "Alumno";

    const panelAlumno = document.getElementById("panel-alumno");
    const panelDocente = document.getElementById("panel-docente");

    const esDocenteOAdmin = usuarioActivo.rol === "docente" || usuarioActivo.rol === "administrador";

    if (esDocenteOAdmin) {
        if (panelDocente) panelDocente.classList.remove("oculto");
        if (panelAlumno) panelAlumno.classList.add("oculto");
    } else {
        if (panelDocente) panelDocente.classList.add("oculto");
        if (panelAlumno) panelAlumno.classList.remove("oculto");
    }

    const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", () => {
            localStorage.removeItem("usuarioActivo");
            window.location.href = "iniciar-sesion.html";
        });
    }
});