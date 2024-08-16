function cargarHorarios() {
    let peliculaSeleccionada = parseInt(document.getElementById('pelicula').value);
    let horariosSelect = document.getElementById('horario');
    

    horariosSelect.innerHTML = '';
    

    peliculas[peliculaSeleccionada].horarios.forEach(horario => {
        let option = document.createElement('option');
        option.value = horario;
        option.text = horario;
        horariosSelect.add(option);
    });
}

document.getElementById('pelicula').addEventListener('change', cargarHorarios);


function capturarEntradas() {
    let peliculaSeleccionada = parseInt(document.getElementById('pelicula').value);
    let horarioSeleccionado = document.getElementById('horario').value;
    let cantidadAdultos = parseInt(document.getElementById('adultos').value);
    let cantidadNiños = parseInt(document.getElementById('ninos').value);

    if (isNaN(cantidadAdultos) || isNaN(cantidadNiños) || cantidadAdultos < 0 || cantidadNiños < 0) {
        alert("Por favor ingrese valores válidos para las cantidades de entradas.");
        return null;
    }

    return { peliculaSeleccionada, horarioSeleccionado, cantidadAdultos, cantidadNiños };
}


function calcularTotal(cantidades, precios) {
    return (cantidades.cantidadAdultos * precios.adulto) + (cantidades.cantidadNiños * precios.niño);
}


function mostrarResultado(datos, total) {
    let resumenDiv = document.getElementById('resumen');
    resumenDiv.innerHTML = `
        <p>Película: ${peliculas[datos.peliculaSeleccionada].titulo}</p>
        <p>Horario: ${datos.horarioSeleccionado}</p>
        <p>Entradas Adultos: ${datos.cantidadAdultos}</p>
        <p>Entradas Niños: ${datos.cantidadNiños}</p>
        <p>Total a pagar: $${total.toFixed(2)}</p>
    `;


    localStorage.setItem('ultimaCompra', JSON.stringify({
        pelicula: peliculas[datos.peliculaSeleccionada].titulo,
        horario: datos.horarioSeleccionado,
        cantidadAdultos: datos.cantidadAdultos,
        cantidadNiños: datos.cantidadNiños,
        total: total.toFixed(2)
    }));
}
