// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    cargarInversiones();
    agregarEventos();
});

// Cargar inversiones desde un JSON local usando fetch
async function cargarInversiones() {
    try {
        const response = await fetch("../data/inversiones.json");
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

// Mostrar inversiones dinámicamente en el DOM
function mostrarInversiones(inversiones) {
    const contenedor = document.getElementById("cotizacion");
    inversiones.forEach(({ nombre, descripcion, tasaRetorno }) => {
        const item = document.createElement("div");
        item.innerHTML = `
            <h3>${nombre}</h3>
            <p>${descripcion}</p>
            <p><strong>Tasa de retorno:</strong> ${tasaRetorno}%</p>
        `;
        contenedor.appendChild(item);
    });
}

// Agregar eventos a los botones de cálculo
targetEventListeners();
function agregarEventos() {
    document.getElementById("btnCalcular").addEventListener("click", calcularPresupuesto);
    document.getElementById("btnCalcularRoi").addEventListener("click", calcularRoi);
}

// Calcular presupuesto total seleccionado
function calcularPresupuesto() {
    let total = 0;
    document.querySelectorAll(".servicio:checked").forEach(({ dataset }) => {
        total += parseFloat(dataset.precio);
    });
    document.getElementById("total").textContent = total;
    Swal.fire({
        icon: "success",
        title: "Cálculo Exitoso",
        text: `El total estimado es de $${total}`
    });
}

// Calcular ROI
function calcularRoi() {
    const ingreso = parseFloat(document.getElementById("ingreso").value);
    const inversion = parseFloat(document.getElementById("inversion").value);
    
    if (isNaN(ingreso) || isNaN(inversion) || inversion === 0) {
        Swal.fire({
            icon: "warning",
            title: "Datos Inválidos",
            text: "Por favor, ingresa valores válidos para calcular el ROI."
        });
        return;
    }

    const roi = ((ingreso - inversion) / inversion) * 100;
    document.getElementById("roi").textContent = roi.toFixed(2);
    Swal.fire({
        icon: "info",
        title: "Resultado del ROI",
        text: `Tu ROI es de ${roi.toFixed(2)}%`
    });
}

