//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let jsonString = localStorage.getItem("userData");
    let json = JSON.parse(jsonString);
    if (json.name != '' || json.surname != '' || json.email != '' || json.phone != '' || json.age != '') {
        document.getElementById("profileName").value = json.name;
        document.getElementById("profileSurname").value = json.surname;
        document.getElementById("profileAge").value = json.age;
        document.getElementById("profileEmail").value = json.email;
        document.getElementById("profilePhone").value = json.phone;
    }
});


function cargarDatos() {
    let _name = document.getElementById("profileName").value;
    let _surname = document.getElementById("profileSurname").value;
    let _age = document.getElementById("profileAge").value;
    let _email = document.getElementById("profileEmail").value;
    let _phone = document.getElementById("profilePhone").value;
    _name = _name.trim();
    _surname = _surname.trim();
    _email = _email.trim();
    _phone = _phone.trim();
    if (_name == '' || _surname == '' || _email == '' || _phone == '' || _age == '') {
        alert('Se ha ingresado un dato vacio')
    } else {
        let data = { name: _name, surname: _surname, age: _age, email: _email, phone: _phone }
        let json = JSON.stringify(data);
        localStorage.setItem("userData", json);
        alert('Datos guardados correctamente')
    }
}