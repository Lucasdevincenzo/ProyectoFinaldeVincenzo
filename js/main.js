function simuladorCompra() {
    let datos = capturarEntradas();
    
    if (datos === null) {
        return;
    }

    let total = calcularTotal(datos, precios);
    mostrarResultado(datos, total);
}


document.getElementById('comprar').addEventListener('click', simuladorCompra);


document.addEventListener('DOMContentLoaded', (event) => {
    cargarHorarios();
    
    let ultimaCompra = localStorage.getItem('ultimaCompra');
    if (ultimaCompra) {
        ultimaCompra = JSON.parse(ultimaCompra);
        let resumenDiv = document.getElementById('resumen');
        resumenDiv.innerHTML = `
            <p><strong>Última compra:</strong></p>
            <p>Película: ${ultimaCompra.pelicula}</p>
            <p>Horario: ${ultimaCompra.horario}</p>
            <p>Entradas Adultos: ${ultimaCompra.cantidadAdultos}</p>
            <p>Entradas Niños: ${ultimaCompra.cantidadNiños}</p>
            <p>Total a pagar: $${ultimaCompra.total}</p>
        `;
    }
});

