console.log('Script cargado');

// Funcion Validar Form de contacto //

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


document.getElementById('btnCalcular').addEventListener('click', calcularPresupuesto);

// Función De ROI
function calcularRoi() {
    const ingreso = parseFloat(document.getElementById('ingreso').value);
    const inversion = parseFloat(document.getElementById('inversion').value);

    console.log('Ingreso ingresado:', ingreso);
    console.log('Inversión ingresada:', inversion);

    const resultadoRoi = document.getElementById('roi');


    if (isNaN(ingreso) || isNaN(inversion) || ingreso <= 0 || inversion <= 0) {
        console.error('Valores no válidos detectados.');
        resultadoRoi.textContent = "Por favor, ingresa valores válidos.";
        resultadoRoi.style.color = "red";
        return;
    }


    const roi = ((ingreso - inversion) / inversion) * 100;


    resultadoRoi.textContent = roi.toFixed(2);
    resultadoRoi.style.color = "green";
}


document.addEventListener("DOMContentLoaded", () => {
    const botonCalcularRoi = document.getElementById('btnCalcularRoi');

    if (botonCalcularRoi) {
        botonCalcularRoi.addEventListener('click', calcularRoi);
        console.log("Botón de cálculo de ROI listo.");
    } else {
        console.error("El botón 'btnCalcularRoi' no fue encontrado en el DOM.");
    }
});