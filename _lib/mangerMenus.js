document.addEventListener('DOMContentLoaded', function () {
    var dropdownItems = document.querySelectorAll('.dropdown-item');
    var navOpenBtn = document.querySelector('.navOpenBtn');
    var contentResult = document.getElementById("content-result");

    navOpenBtn.addEventListener('click', function () {
        nav.classList.add("openNav");
        nav.classList.remove("openSearch");
        searchIcon.classList.replace("uil-times", "uil-search");
    });

    dropdownItems.forEach(function (item) {
        item.addEventListener('click', function () {
            hideDropdownMenus(); 
        });
    });

    function hideDropdownMenus() {
        nav.classList.remove("openNav");
        contentResult.style.display = "none";
    }
 });


const nav = document.querySelector(".nav"),
    searchIcon = document.querySelector("#searchIcon"),
    navOpenBtn = document.querySelector(".navOpenBtn"),
    navCloseBtn = document.querySelector(".navCloseBtn"),
    searchBox = document.querySelector(".search-box input"),
    navLinks = document.querySelectorAll(".nav-links li"),
    contentContainer = document.getElementById("content-container"),
    searchResultsContainer = document.querySelector(".search-results");



    function loadPartialPage(page) {

        const url = `./pages/${page}.html`;
       alert(page);

        fetch(url)
            .then(response => response.text())
            .then(data => {
                contentContainer.innerHTML = data;
                submitFormSetup();
                searchResultsContainer.style.display = "none";
                
                nav.classList.toggle("openSearch");
                nav.classList.remove("openNav");

                //evalua que tipo de icono tiene
                if (nav.classList.contains("openSearch")) {

                    return searchIcon.classList.replace("uil-search", "uil-times");
                } else {
                    searchBox.value = "";
                    searchIcon.classList.replace("uil-times", "uil-search");
                    hideSearchResults();
                }
         

            })
            .catch(error => {
                console.error(`Error al cargar la página parcial: ${error}`);
            });
    }


    function submitFormSetup() {
        const submitButtons = document.querySelectorAll("[data-form-type]");
        submitButtons.forEach(button => {
            button.addEventListener("click", submitForm);
        });
    }


     // Función para procesar el formulario parcial
    function submitForm(event) {

        const scripts = document.head.querySelectorAll('script[src^="/js/"]');

        scripts.forEach(script => script.parentNode.removeChild(script));

        var formType = event.target.dataset.formType;
        var formData = {};
        
    
        switch (formType) {
            case "triangulo":
            case  "sumados":

                formData.firstData = document.getElementById("partialFirstName").value;
                formData.secondData = document.getElementById("partialLastName").value;
                break;
            case "type2":
                formData.email = document.getElementById("partialEmail").value;
                break;
            case "tablamult":
                formData.firstData = document.getElementById("selectTable").value;
                break;

        }


        //ejecucion de fuciones
        let result ="";
        switch (formType) {
            
            case "triangulo" :
                result  =  func.areaTriangulo(formData.firstData, formData.secondData);
                result = `El área del triángulo es: ${result}`;
                break;
           case "sumados":
                result  =  func.sumaDosNum(formData.firstData, formData.secondData);
                result = `La suma es : ${result}`;
                break;
            case "tablamult":
                result  =  func.tablaMulti(formData.firstData);
                break;
           
        }

        console.log(panelResult);

        contentResult.innerHTML = result;
        contentResult.style.display = "block";
    }


// Función para mostrar los resultados de búsqueda
function showSearchResults(filteredItems) {

    // Limpia el contenido anterior del contenedor
    searchResultsContainer.innerHTML = "";

    // Verifica si el cuadro de búsqueda está vacío
    const searchTerm = searchBox.value.trim();

    if (searchTerm === "") {
        // Si el cuadro de búsqueda está vacío, oculta el contenedor de resultados y sal de la función
        searchResultsContainer.style.display = "none";
        return;
    }

    // Crea elementos de lista para cada resultado y agrégales enlaces
    filteredItems.forEach(uniqueKey => {
        const [name, url] = uniqueKey.split('-');
        const listItem = document.createElement("li");
        const navLink = document.createElement("a");
        navLink.textContent = name;
        navLink.setAttribute("href", url);
        navLink.style.color = "#000";

        navLink.addEventListener("click", function (event) {
            event.preventDefault();
            const page = this.getAttribute("href");
            loadPartialPage(page);
        });

        listItem.appendChild(navLink);
        searchResultsContainer.appendChild(listItem);
        console.log(navLink);
        console.log(`name : ` + name);
        console.log(`href : ` + url);
    });

    // Muestra el contenedor de resultados
    searchResultsContainer.style.display = "block";
    console.log(searchResultsContainer.innerHTML);
    contentContainer.innerHTML = "";

    
}


function hideSearchResults() {
    searchResultsContainer.style.display = "none";
}

function filterMenuItems(searchText) {

    const filteredItemsSet = new Set();

    // Itera sobre cada menú
    navLinks.forEach(link => {
        const dropdownItems = link.querySelectorAll('.dropdown-item');

        console.log('esto es :dropdownItems ' + dropdownItems.length);

        // Filtra los elementos dentro de cada menú
        const filteredDropdownItems = Array.from(dropdownItems).filter(item =>
            item.textContent.toLowerCase().includes(searchText.toLowerCase())
        );


        // Agrega los elementos filtrados al conjunto
        filteredDropdownItems.forEach(filteredItem => {
            const menuItem = {
                name: filteredItem.textContent.trim(),
                url: filteredItem.getAttribute('href'), // Cambiado de 'link' a 'url'
            };
            const uniqueKey = `${menuItem.name}-${menuItem.url}`;
            console.log('Unique key:', uniqueKey);

            if (!filteredItemsSet.has(uniqueKey)) {
                filteredItemsSet.add(uniqueKey);
            }
        });

        // Muestra u oculta el menú según si hay elementos filtrados
        link.style.display = filteredDropdownItems.length > 0 ? 'block' : 'none';
    });



    // Convierte el conjunto a un array
    const filteredItems = Array.from(filteredItemsSet);

    // Muestra los resultados
    showSearchResults(filteredItems);

    // Oculta todos los elementos del menú
    //  navLinks.forEach(link => {
    //      link.style.display = "none";
    //  });

    // Oculta el contenido principal
    contentContainer.innerHTML = "";

}

searchIcon.addEventListener("click", () => {
    nav.classList.toggle("openSearch");
    nav.classList.remove("openNav");

    //evalua que tipo de icono tiene
    if (nav.classList.contains("openSearch")) {

        return searchIcon.classList.replace("uil-search", "uil-times");
    } else {
        searchBox.value = "";
        searchIcon.classList.replace("uil-times", "uil-search");
        hideSearchResults();
    }
});


navOpenBtn.addEventListener("click", () => {
    nav.classList.add("openNav");
    nav.classList.remove("openSearch");
    searchIcon.classList.replace("uil-times", "uil-search");
    hideSearchResults();
});

navCloseBtn.addEventListener("click", () => {
    nav.classList.remove("openNav");
});

searchBox.addEventListener("input", () => {
    const searchText = searchBox.value.trim();
    filterMenuItems(searchText);
});
