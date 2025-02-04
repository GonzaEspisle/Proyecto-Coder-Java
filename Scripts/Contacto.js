document.getElementById("formContacto").addEventListener("submit", function (event) {
    event.preventDefault(); 
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mensajeTexto = document.getElementById("mensaje-texto").value.trim();
    const mensajeError = document.getElementById("mensaje");

    mensajeError.textContent = ""; 
    mensajeError.style.color = "red";

    // Validaciones
    if (!nombre) {
        mensajeError.textContent = "Por favor, ingresa tu nombre/apellido.";
        return;
    }

    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        mensajeError.textContent = "Por favor, ingresa un correo electrónico válido.";
        return;
    }

    if (!telefono || !/^\d+$/.test(telefono)) {
        mensajeError.textContent = "Por favor, ingresa un número de teléfono válido.";
        return;
    }

    if (!mensajeTexto) {
        mensajeError.textContent = "Por favor, escribe un mensaje.";
        return;
    }

    mensajeError.textContent = "Formulario enviado correctamente.";
    mensajeError.style.color = "green";

});
