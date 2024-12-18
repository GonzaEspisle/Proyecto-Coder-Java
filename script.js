function validarFormulario() {
    const nombre = document.querySelector(".field[placeholder='Nombre/Apellido']").value.trim();
    const email = document.querySelector(".field[placeholder='E-mail']").value.trim();
    const telefono = document.querySelector(".field[placeholder='Telefono']").value.trim();
    const mensaje = document.querySelector(".field.area").value.trim();
    const contenedorMensaje = document.getElementById("mensaje");


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    contenedorMensaje.textContent = "";
    contenedorMensaje.classList.remove("error", "exito");

    if (!nombre || !email || !telefono || !mensaje) {
        contenedorMensaje.textContent = "Por favor, completa todos los campos.";
        contenedorMensaje.classList.add("error");
        return false;
    }

    if (!emailRegex.test(email)) {
        contenedorMensaje.textContent = "Por favor, ingresa un correo electrónico válido.";
        contenedorMensaje.classList.add("error");
        return false;
    }

    if (isNaN(telefono) || telefono.length < 7) {
        contenedorMensaje.textContent = "El número de teléfono debe ser válido y contener al menos 7 dígitos.";
        contenedorMensaje.classList.add("error");
        return false;
    }

    contenedorMensaje.textContent = "¡Consulta enviada exitosamente!";
    contenedorMensaje.classList.add("exito");
    return true;
}


document.getElementById("btnenviar").addEventListener("click", (e) => {
    e.preventDefault();
    validarFormulario();
});

console.log("Archivo script.js cargado correctamente");

// Función para calcular el presupuesto
function calcularPresupuesto() {
    let total = 0;

    const serviciosSeleccionados = document.querySelectorAll('.servicio:checked');

    serviciosSeleccionados.forEach(servicio => {
        const precio = parseInt(servicio.getAttribute('data-precio')) || 0;
        total += precio;
    });

    document.getElementById('total').textContent = total;
}

// Escucha el evento de clic en el botón "Calcular Total"
document.getElementById('btnCalcular').addEventListener('click', calcularPresupuesto);

