//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCTS_URL) //Realizamos el fetch que devolverá una promesa
        .then(respuesta => respuesta.json()) //Obtenemos una promesa que trataremos como json
        .then(datos => { //obtenemos una nueva promesa, pero los datos ya están como json.
            const tbody = document.getElementById("productInfo");
            datos.forEach(element => {
                tbody.innerHTML += `<tr><td>${element.name}</td><td>${element.description}</td><td>${element.cost}</td></tr>`;
            });
        })
        .catch(error => alert("Hubo un error: " + error));

});