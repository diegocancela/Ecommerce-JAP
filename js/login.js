//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    if (userName.trim() === "" || password.trim() === "") { //Chequea que el dato recibido no esté vacío. 
        //El método trim elimina los espacios en blanco al inicio y al final del mismo.
        alert("Error: usuario o contraseña vacio");
    } else {
        localStorage.setItem("user", userName.trim()); //setItem almacena el dato en la posición "usuario"
        localStorage.setItem("password", password.trim()); // Almaceno la contraseña
        sessionStorage.setItem("user", userName.trim());
        location.href = "index.html";
        //getItem obtiene el dato almacenado en la posición "usuario"
});