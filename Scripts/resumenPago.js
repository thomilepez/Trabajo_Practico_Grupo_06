document.addEventListener("DOMContentLoaded", () => {
    const contenedorResumen = document.querySelector(".resumen-pedido .desglose-resumen");
    const formularioPago = document.getElementById("form-pago");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (usuarioActivo) {
        const inputNombre = document.getElementById("nombre-apellido");
        const inputEmail = document.getElementById("email");
        const inputDni = document.getElementById("dni");

        if (inputNombre && usuarioActivo.nombre) inputNombre.value = usuarioActivo.nombre;
        if (inputEmail && usuarioActivo.email) inputEmail.value = usuarioActivo.email;
        if (inputDni && usuarioActivo.dni) inputDni.value = usuarioActivo.dni;
    }

    if (!contenedorResumen) return;
    if (carrito.length === 0) {
        contenedorResumen.innerHTML = "<p>No hay cursos en el carrito.</p>";
        if (formularioPago) formularioPago.style.display = "none";
        return;
    }
    let htmlResumen = "";
    let total = 0;

    carrito.forEach(item => {
        total += item.precio;
        htmlResumen += `
            <div class="fila-resumen">
                <span>${item.nombre}</span>
                <span>$${item.precio.toLocaleString("es-AR")} ARS</span>
            </div>
        `;
    });

    htmlResumen += `
        <hr style="margin: 10px 0; border: 0; border-top: 1px solid var(--Color-Borde);">
        <div class="fila-resumen total">
            <strong>Total Final</strong>
            <strong>$${total.toLocaleString("es-AR")} ARS</strong>
        </div>
    `;

    contenedorResumen.innerHTML = htmlResumen;

    if (formularioPago) {
        formularioPago.addEventListener("submit", (e) => {
            e.preventDefault();

            const tarjeta = document.getElementById("numero-tarjeta").value.trim();
            const vencimiento = document.getElementById("vencimiento").value.trim();
            const cvv = document.getElementById("cvv").value.trim();

            if (tarjeta.length < 15 || cvv.length < 3) {
                alert("Por favor, ingresa datos de tarjeta válidos para verificar el pago.");
                return;
            }
            if (usuarioActivo) {
                if (!usuarioActivo.cursosComprados) {
                    usuarioActivo.cursosComprados = [];
                }
                carrito.forEach(item => {
                    if (!usuarioActivo.cursosComprados.includes(item.id)) {
                        usuarioActivo.cursosComprados.push(item.id);
                    }
                });

                localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

                let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
                usuarios = usuarios.map(u => {
                    if (u.email === usuarioActivo.email) {
                        return usuarioActivo;
                    }
                    return u;
                });
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
            }

            localStorage.removeItem("carrito");

            alert("¡Pago verificado con éxito! Tus cursos ya están disponibles en tu cuenta.");

            window.location.href = "Usuario/mis-cursos.html";
        });
    }
});