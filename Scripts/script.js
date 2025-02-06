
function pedirNombre() {
    let nombre = prompt("Ingresa tu nombre:");
    if (nombre) {
        localStorage.setItem("nombreUsuario", nombre);
        Swal.fire({
            icon: "success",
            title: `¡Hola, ${nombre}!`,
            text: "Tu nombre ha sido guardado."
        });
    } else {
        Swal.fire({
            icon: "warning",
            title: "No se ingresó un nombre"
        });
    }
}


function mostrarNombreGuardado() {
    let nombre = localStorage.getItem("nombreUsuario");
    if (nombre) {
        Swal.fire({
            icon: "info",
            title: `¡Bienvenido de nuevo, ${nombre}!`
        });
    }
}


function calcularPresupuesto() {
    let total = 0;
    document.querySelectorAll(".servicio:checked").forEach(function(element) {
        total += parseFloat(element.dataset.precio);
    });

    document.getElementById("total").textContent = total;

    Swal.fire({
        icon: total > 0 ? "success" : "warning",
        title: total > 0 ? "Cálculo Exitoso" : "No seleccionaste ningún servicio",
        text: total > 0 ? `El total estimado es de $${total}` : "Selecciona al menos un servicio antes de calcular."
    });

    localStorage.setItem("cotizacionTotal", total);
}


async function cargarInversiones() {
    try {
        const response = await fetch("../Data/inversiones.json");
        if (!response.ok) throw new Error("Error al cargar el JSON");
        const inversiones = await response.json();
        mostrarInversiones(inversiones);
    } catch (error) {
        console.error("Error al cargar inversiones:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudieron cargar las inversiones."
        });
    }
}


function mostrarInversiones(inversiones) {
    const contenedor = document.getElementById("listaInversiones");
    contenedor.innerHTML = ""; 
    inversiones.forEach(({ nombre, descripcion, tasaRetorno }) => {
        const item = document.createElement("div");
        item.classList.add("inversion-item");
        item.innerHTML = `
            <h3>${nombre}</h3>
            <p>${descripcion}</p>
            <p><strong>Tasa de retorno:</strong> ${tasaRetorno}%</p>
        `;
        contenedor.appendChild(item);
    });
}


function calcularRoi() {
    const ingreso = parseFloat(document.getElementById("ingreso").value);
    const inversion = parseFloat(document.getElementById("inversion").value);

    if (isNaN(ingreso) || isNaN(inversion) || inversion === 0) {
        Swal.fire({ icon: "warning", text: "Valores inválidos" });
        return;
    }

    const roi = ((ingreso - inversion) / inversion) * 100;
    document.getElementById("roi").textContent = roi.toFixed(2);
    Swal.fire({ icon: "info", text: `ROI: ${roi.toFixed(2)}%` });
}


document.addEventListener("DOMContentLoaded", function() {
    mostrarNombreGuardado();
    cargarInversiones();

    document.getElementById("btnCalcularRoi").addEventListener("click", calcularRoi);
    document.getElementById("btnCalcular").addEventListener("click", calcularPresupuesto);
    document.getElementById("btnPedirNombre").addEventListener("click", pedirNombre);
});
