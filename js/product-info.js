//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let relatedProductos;
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let product = resultObj.data;
            relatedProductos = product.relatedProducts;
            let nameHtml = document.getElementById("productName");
            let descriptionHtml = document.getElementById("productDescription");
            let costHtml = document.getElementById("productCost");
            let currencyHtml = document.getElementById("productCurrrency");
            let soldCountHtml = document.getElementById("soldCountProduct");
            let categoryHtml = document.getElementById("productCategory");

            nameHtml.innerHTML = product.name;
            descriptionHtml.innerHTML = product.description;
            costHtml.innerHTML = product.cost;
            currencyHtml.innerHTML = product.currency;
            soldCountHtml.innerHTML = product.soldCount;
            categoryHtml.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let comments = resultObj.data;
            let htmlContentToAppend = "";

            for(let i = 0; i < comments.length; i++){
                let c = comments[i];
                htmlContentToAppend += `
                <a href="product-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1"><b>Nombre de Usuario:</b> `+ c.user +`</h4>
                                <small class="text-muted">` + c.dateTime + `</small>
                                </div>
                                <p class="mb-1">` + c.description + `</p>
                                <p class="mb-1"> Puntuacion `+c.score + `/5 estrellas </p>
                        </div>
                    </div>
                </a>
                <p></p>
                `
            }
            htmlContentToAppend += ` <p></p>`
            document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
        }
    });

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let allProducts = resultObj.data;
            let htmlContentToAppend = "";
            for (let i = 0; i < allProducts.length; i++) {
                if (relatedProductos.includes(i)) {
                    let currentProduct = allProducts[i];
                    htmlContentToAppend += `
                    <div class="col-lg-3 col-md-4 col-6">
                         <div type="button" class="d-block mb-4 h-100">
                                <p>` + currentProduct.name +`</p>
                             <img class="img-fluid img-thumbnail" src="` + currentProduct.imgSrc + `" alt="">
                         </div>
                     </div>
                    `
                }
            }
            document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
        }
    });
});


function showImagesGallery(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}