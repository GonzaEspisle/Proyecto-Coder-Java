let nombre = localStorage.getItem("nombreUsuario") || "";

// Función para pedir el nombre y guardarlo en localStorage
function pedirNombre() {
    nombre = prompt("Ingresa tu nombre:");
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

// Función para borrar el nombre del localStorage
function borrarNombre() {
    localStorage.removeItem("nombreUsuario");
    nombre = "";
    Swal.fire({
        icon: "info",
        title: "Nombre borrado",
        text: "Tu nombre ha sido eliminado del almacenamiento."
    });
}

// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    cargarInversiones();
    agregarEventos();
    mostrarNombreGuardado();
});

// Mostrar nombre guardado al recargar la página
function mostrarNombreGuardado() {
    if (nombre) {
        Swal.fire({
            icon: "info",
            title: `¡Bienvenido de nuevo, ${nombre}!`
        });
    }
}

// Cargar inversiones desde el JSON
async function cargarInversiones() {
    try {
        const response = await fetch("../data/inversiones.json");
        if (!response.ok) throw new Error("Error en la carga del JSON");
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

// Mostrar inversiones en el HTML
function mostrarInversiones(inversiones) {
    const contenedor = document.getElementById("cotizacion");
    contenedor.innerHTML = ""; // Limpiar antes de agregar nuevas
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

// Agregar eventos a los botones
function agregarEventos() {
    document.getElementById("btnCalcular").addEventListener("click", calcularPresupuesto);
    document.getElementById("btnCalcularRoi").addEventListener("click", calcularRoi);
}

// Calcular presupuesto según los servicios seleccionados
function calcularPresupuesto() {
    let total = 0;
    document.querySelectorAll(".servicio:checked").forEach(({ dataset }) => {
        total += parseFloat(dataset.precio);
    });

    document.getElementById("total").textContent = total;

    Swal.fire({
        icon: total > 0 ? "success" : "warning",
        title: total > 0 ? "Cálculo Exitoso" : "No seleccionaste ningún servicio",
        text: total > 0 ? `El total estimado es de $${total}` : "Selecciona al menos un servicio antes de calcular."
    });

    // Guardar en localStorage
    localStorage.setItem("cotizacionTotal", total);
}

// Calcular el ROI con validaciones
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

    // Guardar en localStorage para que no se pierda
    localStorage.setItem("roiCalculado", roi.toFixed(2));
}
