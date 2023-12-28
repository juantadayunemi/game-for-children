document.addEventListener("DOMContentLoaded", function ()
{
    const navLinks = document.querySelectorAll(".nav-link");
    const contentContainer = document.getElementById("content-container");
    var contentResult = document.getElementById("content-result");
 

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const page = this.getAttribute("href");

            navLinks.forEach(link => {
                link.classList.remove("text-warning");
            });

            this.classList.add("text-warning");

            loadPartialPage(page);
        });
    });

    function loadPartialPage(page) {
        const url = `./pages/${page}.html`;


        fetch(url)
            .then(response => response.text())
            .then(data => {
                
                contentContainer.innerHTML = data;
                contentResult.innerHTML  = "";

                // Ejecuta submitForm después de cargar el contenido del formulario parcial
                submitFormSetup();
            })
            .catch(error => {
                console.log(`Error al cargar la página parcial: ${error}`);
                console.log(error);
            });
    }

    // Función para establecer la lógica del formulario después de cargar el contenido
    function submitFormSetup() {
        const submitButtons = document.querySelectorAll("[data-form-type]");
        submitButtons.forEach(button => {
            button.addEventListener("click", submitForm);
        });
    }

    // Función para procesar el formulario parcial
    function submitForm(event) {

        const newScript = document.createElement('script');

        var formType = event.target.dataset.formType;
        var formData = {};
    }

});
