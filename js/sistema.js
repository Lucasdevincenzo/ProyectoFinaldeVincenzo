// Funcion para cargar los horarios de la película seleccionada
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

// Funcion para capturar las entradas del usuario
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

// Funcion para calcular el total a pagar
function calcularTotal(cantidades, precios) {
    return (cantidades.cantidadAdultos * precios.adulto) + (cantidades.cantidadNiños * precios.niño);
}

// Funcion para mostrar el resumen de la compra y guardar la información en local storage
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
// API Y URL
const API_KEY = 'e918a640cf3b2a04ddc24c6e3bbb708a';
const BASE_URL = 'https://api.themoviedb.org/3';
// Event listener para ver los trailers de las peliculas
document.querySelectorAll('.ver-trailer').forEach(button => {
    button.addEventListener('click', async () => {
        const movieId = button.getAttribute('data-movie-id');
        const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-EN`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            
            if (trailer) {
                const trailerIframe = document.getElementById('trailerIframe');
                trailerIframe.src = `https://www.youtube.com/embed/${trailer.key}`;
                
                const trailerModal = new bootstrap.Modal(document.getElementById('trailerModal'));
                trailerModal.show();
            } else {
                alert('Trailer no disponible.');
            }
        } catch (error) {
            console.error('Error al obtener el trailer:', error);
        }
    });
});

// Limpiador para que el trailer no se reproduzca en segundo plano 
document.getElementById('trailerModal').addEventListener('hidden.bs.modal', function () {
    document.getElementById('trailerIframe').src = '';
});
