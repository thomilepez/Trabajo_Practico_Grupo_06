document.addEventListener("DOMContentLoaded", () => {
    const contenedorResumen = document.querySelector(".resumen-pedido .desglose-resumen");
    const formularioPago = document.getElementById("form-pago");
    const mensajePago = document.getElementById("mensaje-pago");
    const btnSubmit = document.getElementById("btn-submit-pago");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!usuarioActivo) {
        window.location.href = "../Usuario/iniciar-sesion.html";
        return;
    }

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

    function mostrarMensaje(texto, tipo = "error") {
        if (!mensajePago) return;
        mensajePago.textContent = texto;
        mensajePago.className = `mensaje-pago ${tipo}`;
        mensajePago.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function limpiarMensaje() {
        if (!mensajePago) return;
        mensajePago.textContent = "";
        mensajePago.className = "mensaje-pago oculto";
    }

    const idOperacion = `EST-${Date.now().toString().slice(-6)}`;
    const codigoCupon = `7904 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;

    const elCupon = document.getElementById("codigo-pago-facil");
    const btnCopiarCupon = document.getElementById("btn-copiar-cupon");
    if (elCupon) elCupon.textContent = codigoCupon;
    if (btnCopiarCupon) btnCopiarCupon.dataset.copiar = codigoCupon.replace(/\s+/g, "");

    const elRefQr = document.getElementById("referencia-qr");
    if (elRefQr) elRefQr.textContent = `Operación #${idOperacion} • Total: $${total.toLocaleString("es-AR")} ARS`;

    generarQRVisual("contenedor-qr", `${idOperacion}|${total}`);

    function generarQRVisual(idContenedor, semilla) {
        const cont = document.getElementById(idContenedor);
        if (!cont) return;

        const size = 21;
        let hash = 0;
        for (let i = 0; i < semilla.length; i++) {
            hash = (hash << 5) - hash + semilla.charCodeAt(i);
            hash |= 0;
        }

        const esFinder = (r, c) =>
            (r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7);

        const patronFinder = (r, c) => {
            const lr = r >= size - 7 ? r - (size - 7) : r;
            const lc = c >= size - 7 ? c - (size - 7) : c;
            return lr === 0 || lr === 6 || lc === 0 || lc === 6 || (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4);
        };

        let rects = "";
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                let activo = false;
                if (esFinder(r, c)) {
                    activo = patronFinder(r, c);
                } else {
                    const val = Math.abs(Math.sin(hash + r * 31 + c * 17));
                    activo = val > 0.48;
                }
                if (activo) {
                    rects += `<rect x="${c}" y="${r}" width="1" height="1" fill="currentColor"/>`;
                }
            }
        }

        cont.innerHTML = `
            <svg viewBox="-1 -1 ${size + 2} ${size + 2}" width="170" height="170" aria-label="Código QR de pago">
                <rect x="-1" y="-1" width="${size + 2}" height="${size + 2}" fill="#ffffff"/>
                <g color="#111111">${rects}</g>
            </svg>
        `;
    }

    const radiosMetodo = document.querySelectorAll('input[name="metodo-pago"]');
    const paneles = {
        tarjeta: document.getElementById("panel-tarjeta"),
        qr: document.getElementById("panel-qr"),
        transferencia: document.getElementById("panel-transferencia"),
        efectivo: document.getElementById("panel-efectivo")
    };

    const textosBoton = {
        tarjeta: "Confirmar y Pagar",
        qr: "Ya escaneé y pagué el QR",
        transferencia: "Informar Transferencia",
        efectivo: "Confirmar Reserva en Efectivo"
    };

    radiosMetodo.forEach(radio => {
        radio.addEventListener("change", () => {
            limpiarMensaje();

            document.querySelectorAll(".opcion-metodo").forEach(lbl => lbl.classList.remove("activa"));
            radio.closest(".opcion-metodo")?.classList.add("activa");

            Object.entries(paneles).forEach(([clave, panel]) => {
                if (panel) panel.classList.toggle("oculto", clave !== radio.value);
            });

            if (btnSubmit) btnSubmit.textContent = textosBoton[radio.value] || "Confirmar y Pagar";
        });
    });

    document.querySelectorAll(".btn-copiar").forEach(btn => {
        btn.addEventListener("click", async () => {
            const texto = btn.dataset.copiar;
            if (!texto) return;
            try {
                await navigator.clipboard.writeText(texto);
                const original = btn.textContent;
                btn.textContent = "¡Copiado!";
                setTimeout(() => (btn.textContent = original), 1800);
            } catch {
                mostrarMensaje("No se pudo copiar automáticamente. Seleccionalo manualmente.", "info");
            }
        });
    });

    // --- FORMATEO AUTOMÁTICO DE TARJETA Y VENCIMIENTO ---
    const inputTarjeta = document.getElementById("numero-tarjeta");
    const inputVencimiento = document.getElementById("vencimiento");

    if (inputTarjeta) {
        inputTarjeta.addEventListener("input", () => {
            const soloNumeros = inputTarjeta.value.replace(/\D/g, "").slice(0, 16);
            inputTarjeta.value = soloNumeros.replace(/(.{4})/g, "$1 ").trim();
        });
    }

    if (inputVencimiento) {
        inputVencimiento.addEventListener("input", () => {
            const nums = inputVencimiento.value.replace(/\D/g, "").slice(0, 4);
            inputVencimiento.value = nums.length > 2 ? `${nums.slice(0, 2)}/${nums.slice(2)}` : nums;
        });
    }

    if (formularioPago) {
        formularioPago.addEventListener("submit", (e) => {
            e.preventDefault();
            limpiarMensaje();

            const metodoSeleccionado = document.querySelector('input[name="metodo-pago"]:checked')?.value || "tarjeta";

            if (metodoSeleccionado === "tarjeta") {
                const tarjetaLimpia = (inputTarjeta?.value || "").replace(/\s+/g, "");
                const vencimiento = (inputVencimiento?.value || "").trim();
                const cvv = (document.getElementById("cvv")?.value || "").trim();

                if (tarjetaLimpia.length < 15) {
                    mostrarMensaje("Ingresá un número de tarjeta válido (15 o 16 dígitos).");
                    inputTarjeta?.focus();
                    return;
                }
                if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(vencimiento)) {
                    mostrarMensaje("Ingresá un vencimiento válido con formato MM/AA (ej: 12/28).");
                    inputVencimiento?.focus();
                    return;
                }
                if (cvv.length < 3) {
                    mostrarMensaje("El código de seguridad (CVV) debe tener 3 o 4 dígitos.");
                    document.getElementById("cvv")?.focus();
                    return;
                }
            }

            if (metodoSeleccionado === "transferencia") {
                const comprobante = (document.getElementById("comprobante-transferencia")?.value || "").trim();
                if (comprobante.length < 4) {
                    mostrarMensaje("Ingresá el número de operación o referencia de la transferencia.");
                    document.getElementById("comprobante-transferencia")?.focus();
                    return;
                }
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
                usuarios = usuarios.map(u => (u.email === usuarioActivo.email ? usuarioActivo : u));
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
            }

            localStorage.removeItem("carrito");

            const modalExito = document.getElementById("modal-exito-pago");
            const textoDetalle = document.getElementById("texto-detalle-exito");
            const btnIrCursos = document.getElementById("btn-ir-cursos");

            const mensajesExito = {
                tarjeta: "Pago con tarjeta aprobado. Tus cursos ya están habilitados.",
                qr: "Pago con QR acreditado. Tus cursos ya están disponibles en tu perfil.",
                transferencia: `Transferencia registrada (Ref. #${idOperacion}). Tus cursos ya están habilitados.`,
                efectivo: `Cupón ${codigoCupon} generado. Tus cursos ya quedaron reservados en tu cuenta.`
            };

            if (textoDetalle) textoDetalle.textContent = mensajesExito[metodoSeleccionado];
            if (modalExito) modalExito.classList.remove("oculto");

            const destino = "../Usuario/mis-cursos.html";
            if (btnIrCursos) {
                btnIrCursos.addEventListener("click", () => {
                    window.location.href = destino;
                });
            }
        });
    }
});