((d) => {
    const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");

    $btnMenu.addEventListener("click", (e) => {
        //intercambiando
        $btnMenu.firstElementChild.classList.toggle("none"); //oculta barras
        $btnMenu.lastElementChild.classList.toggle("none"); // muestra tachito
        $menu.classList.toggle("is-active"); // muestra
    });

    d.addEventListener("click", (e) => {
        if(!e.target.matches(".menu a")) return false;

        $btnMenu.firstElementChild.classList.remove("none"); 
        $btnMenu.lastElementChild.classList.add("none"); 
        $menu.classList.remove("is-active"); // oculta
 
    })
})(document);

((d) => {
    const $form = d.querySelector(".contact-form");
    const $loader = d.querySelector(".contact-form-loader");
    const $response = d.querySelector(".contact-form-response");

    $form.addEventListener("submit", (e) => {
        //Para evitar que el formulario se envie, Controlar por AJAX
        e.preventDefault();
        //Cuando el formulario se envie(retiro none) para que se vea
        $loader.classList.remove("none");
        //peticion
        fetch("https://formSubmit.co/ajax/axacovare.martinllaucesuclupe@gmail.com", {
            method: "POST",
            body: new FormData(e.target), //información que se va enviar
        })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then(json => {
            console.log(json);
            /* $loader.classList.add("none"); */ //Ocultamos loader
            location.hash = "#gracias"; //Activa la ventana modal
            $form.reset();
        })
        .catch((err) => {
            console.log(err);
            let message = err.statusText || "Ocurrió un error al enviar, intenta nuevamente"
            $response.querySelector("h3").innerHTML = `Error ${err.status}: ${message}`;
            /* $loader.classList.add("none"); */
        }).finally(() => {
            //Independinetemente de que haya error o no se ejecuta
            $loader.classList.add("none");
            setTimeout(() => {
                location.hash = "#close"
            }, 3000);
        });

    });

})(document);