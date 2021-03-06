//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let cart;
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(NEW_CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cart = resultObj.data;
            let htmlContentToAppend = "";
            let subtotal = 0;
            let total = 0;
            for (let i = 0; i < cart.articles.length; i++) {
                let c = cart.articles[i];
                subtotal = getValueInPesos(subtotal, c.count, c);
                /*let valueInPesos = 0;
                if (c.currency == 'USD') {
                    valueInPesos = c.unitCost * 40;
                    subtotal += valueInPesos * c.count;
                } else {
                    subtotal += c.unitCost * c.count;
                }*/
                htmlContentToAppend += `
                <a class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + c.src + `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ c.name + `</h4>
                                <input type="number" onchange="calculatePrice()" id="quantity" name="quantity" class="text-muted"  min="0" value="`+ c.count + `"> Unidades</input>
                                </div>
                                <p class="mb-1">` + c.unitCost + `</p>
                                <div><small class="text-muted">` + c.currency + `</small></div>
                        </div>
                    </div>
                </a>
                <p></p>
                `
            }
            total = subtotal;
            htmlContentToAppend += `<p></p>`
            document.getElementById("cart-list-container").innerHTML = htmlContentToAppend;
            document.getElementById("subTotalValue").innerHTML = subtotal;
            document.getElementById("totalValue").innerHTML = total;
        }
    });

});

function calculatePrice() {
    let subtotal = 0;
    let total = 0;
    let values = document.getElementsByName("quantity");
    for (let i = 0; i < cart.articles.length; i++) {
        let c = cart.articles[i];
        subtotal = getValueInPesos(subtotal, values[i].value, c);
        /*let valueInPesos = 0;
        if (c.currency == 'USD') {
            valueInPesos = c.unitCost * 40;
            subtotal += valueInPesos * values[i].value;
        } else {
            subtotal += c.unitCost * values[i].value;
        }*/
    }
    let envio = 0;
    if (document.getElementById('Premium').checked) {
        envio = subtotal * 0.15;
    }
    else if (document.getElementById('Express').checked) {
        envio = subtotal * 0.07;
    }
    else if (document.getElementById('Standard').checked) {
        envio = subtotal * 0.05;
    }
    total = subtotal + envio;
    document.getElementById("subTotalValue").innerHTML = subtotal;
    document.getElementById("totalValue").innerHTML = total;
}

function validarCompra() {
    let listElements=document.getElementsByName("quantity");
    let cantidadProducto=true;
    for (let i = 0; i < listElements.length; i++){
        if (listElements[i].value==0){
            cantidadProducto=false;
            alert('No se ha determinado la cantidad de uno de los productos')
        }
    }
    if (!(document.getElementById('creditCard').checked || document.getElementById('transfer').checked)) {
        alert('No se ha seleccionado metodo de pago');
    }
    else if (!(document.getElementById('Premium').checked || document.getElementById('Express').checked || document.getElementById('Standard').checked)) {
        alert('No se ha seleccionado metodo de envio');
    } 
    else if (cantidadProducto){
        alert('Compra exitosa');
    }
}

function getValueInPesos(subtotal, count, c) {
    let valueInPesos = 0;
    if (c.currency == 'USD') {
        valueInPesos = c.unitCost * 40;
        subtotal += valueInPesos * count;
    } else {
        subtotal += c.unitCost * count;
    }
    return subtotal;
}