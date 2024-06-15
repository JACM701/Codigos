// Declaramos las variables para los elementos HTML que vamos a manipular
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
// Función que realiza la búsqueda de la película
let getMovie = () => {
    // Obtenemos el nombre de la película desde el input
    let movieName = movieNameRef.value;
    // Creamos la URL para la API de OMDB con el nombre de la película y la clave API
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    // Verificamos si el nombre de la película está vacío
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Por favor ingrese un nombre</h3>`;
    } else {
        // Hacemos una solicitud fetch a la URL de la API
        fetch(url)
            .then((resp) => resp.json()) // Convertimos la respuesta a JSON
            .then((data) => {
                // Si la respuesta de la API es positiva, mostramos la información de la película
                if (data.Response == "True") {
                    result.innerHTML = 
                    `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                    `;
                } else {
                    // Si la respuesta de la API es negativa, mostramos el mensaje de error
                    result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
                }
            });
    }
}
// Agregamos un event listener al botón de búsqueda para ejecutar la función getMovie cuando se haga clic
searchBtn.addEventListener("click", getMovie);

// Agregamos un event listener para cargar la información de la película al cargar la página
window.addEventListener("load", getMovie);
