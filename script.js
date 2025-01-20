console.log('Script cargado');

//Formulario de Contacto//

document.addEventListener("DOMContentLoaded", () => {
    const formContacto = document.getElementById("formContacto");
    const mensaje = document.getElementById("mensaje");

    formContacto.addEventListener("submit", (event) => {
        event.preventDefault();
        if (validarFormulario()) {
            almacenarEnLocalStorage();
            reiniciarFormulario();
        }
    });

    function validarFormulario() {
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const mensajeTexto = document.getElementById("mensaje-texto").value.trim();

        mensaje.textContent = "";
        mensaje.classList.remove("error", "exito");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nombre || !email || !telefono || !mensajeTexto) {
            mensaje.textContent = "Por favor, completa todos los campos.";
            mensaje.classList.add("error");
            return false;
        }

        if (!emailRegex.test(email)) {
            mensaje.textContent = "Por favor, ingresa un correo electrónico válido.";
            mensaje.classList.add("error");
            return false;
        }

        if (isNaN(telefono) || telefono.length < 10) {
            mensaje.textContent = "El número de teléfono debe ser válido y contener al menos 10 dígitos.";
            mensaje.classList.add("error");
            return false;
        }

        mensaje.textContent = "¡Consulta enviada exitosamente!";
        mensaje.classList.add("exito");
        return true;
    }

    function almacenarEnLocalStorage() {
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const mensajeTexto = document.getElementById("mensaje-texto").value.trim();

        const datosContacto = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            mensaje: mensajeTexto,
        };

        localStorage.setItem("consultaContacto", JSON.stringify(datosContacto));
        console.log("Datos almacenados en localStorage:", datosContacto);
    }

    function reiniciarFormulario() {
        formContacto.reset();
    }
});


// Array de inversiones

//Falta Agregar esto al html, ya que no es funcional aun
const inversiones = [
    {
        nombre: "Inversión A",
        descripcion: "Alta rentabilidad a corto plazo",
        tasaRetorno: 12.5
    },
    {
        nombre: "Inversión B",
        descripcion: "Moderada rentabilidad a mediano plazo",
        tasaRetorno: 8.2
    },
    {
        nombre: "Inversión C",
        descripcion: "Baja rentabilidad a largo plazo",
        tasaRetorno: 5.3
    }
];

// Función para mostrar las inversiones

function mostrarInversiones() {
    const listaInversiones = document.getElementById('listaInversiones');

    if (listaInversiones) {
        listaInversiones.innerHTML = ""; 
        
        inversiones.forEach((inversion, index) => {
            const item = document.createElement('li');
            item.textContent = `${index + 1}. ${inversion.nombre} - ${inversion.descripcion} (Tasa de Retorno: ${inversion.tasaRetorno}%)`;
            listaInversiones.appendChild(item);
        });
    }
}


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

// Función para calcular ROI


function calcularRoi() {
    const ingreso = parseFloat(document.getElementById('ingreso').value);
    const inversion = parseFloat(document.getElementById('inversion').value);
    const resultadoRoi = document.getElementById('roi');

    if (isNaN(ingreso) || isNaN(inversion) || ingreso <= 0 || inversion <= 0) {
        resultadoRoi.textContent = "Valores inválidos.";
        resultadoRoi.style.color = "red";
        return;
    }

    const roi = ((ingreso - inversion) / inversion) * 100;
    resultadoRoi.textContent = roi.toFixed(2);
    resultadoRoi.style.color = "green";
}

document.addEventListener("DOMContentLoaded", () => {
    const botonCalcularRoi = document.getElementById('btnCalcularRoi');
    const botonCalcularPresupuesto = document.getElementById('btnCalcular');
    const formularioContacto = document.getElementById('formContacto'); 

    if (botonCalcularRoi) {
        botonCalcularRoi.addEventListener('click', calcularRoi);
        console.log("Botón de cálculo de ROI listo.");
    } else {
        console.error("El botón 'btnCalcularRoi' no fue encontrado en el DOM.");
    }

    if (botonCalcularPresupuesto) {
        botonCalcularPresupuesto.addEventListener('click', calcularPresupuesto);
        console.log("Botón de cálculo de presupuesto listo.");
    } else {
        console.error("El botón 'btnCalcular' no fue encontrado en el DOM.");
    }

    if (formularioContacto) {
        formularioContacto.addEventListener('submit', (event) => {
            if (!validarFormulario()) {
                event.preventDefault();
            }
        });
        console.log("Validación del formulario de contacto lista.");
    } else {
        console.error("El formulario de contacto no fue encontrado en el DOM.");
    }

    mostrarInversiones();
});

console.log("Archivo script.js cargado correctamente");
