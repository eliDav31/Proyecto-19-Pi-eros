let contenedorCarriles = document.getElementById("contenedorCarriles");
let entradaUsuario = document.getElementById("entradaUsuario");
let botonAgregar = document.getElementById("botonAgregar");

let memoria = localStorage.getItem("misCarriles");
let listaCarriles = memoria ? JSON.parse(memoria) : ["1", "2"];

function dibujarPantalla() {
    contenedorCarriles.innerHTML = "";

    for (let i = 0; i < listaCarriles.length; i++) {
        let id = listaCarriles[i];

        contenedorCarriles.innerHTML += `
            <article class="tarjeta">
                <div class="tarjetaTop">
                    <span class="avatar">${id}</span>
                    <h2>Usuario ${id}</h2>
                    <button class="botonBorrar" onclick="borrarCarril('${id}')">✕</button>
                </div>
                <div id="datos-${id}">Cargando...</div>
            </article>
        `;

        buscarUsuario(id);
    }
}

function buscarUsuario(id) {
    let cajaDatos = document.getElementById("datos-" + id);

    fetch("https://jsonplaceholder.typicode.com/users/" + id)
    .then(function(respuesta) {
        if (respuesta.ok == false) { throw new Error(); }
        return respuesta.json();
    })
    .then(function(usuario) {
        cajaDatos.innerHTML = `
            <p class="datoUsuario"><span class="etiqueta">Nombre</span>${usuario.name}</p>
            <p class="datoUsuario"><span class="etiqueta">Correo</span>${usuario.email}</p>
            <p class="datoUsuario"><span class="etiqueta">Teléfono</span>${usuario.phone}</p>
        `;
    })
    .catch(function() {
        cajaDatos.innerHTML = "<p class='mensajeError'>Error: No encontrado.</p>";
    });
}

botonAgregar.onclick = function() {
    let texto = entradaUsuario.value;
    
    if (texto !== "" && !listaCarriles.includes(texto)) {
        listaCarriles.push(texto); 
        localStorage.setItem("misCarriles", JSON.stringify(listaCarriles)); 
        entradaUsuario.value = "";
        dibujarPantalla();
    }
};

function borrarCarril(id) {
    let posicion = listaCarriles.indexOf(id);
    listaCarriles.splice(posicion, 1); 
    localStorage.setItem("misCarriles", JSON.stringify(listaCarriles)); 
    dibujarPantalla(); 
}

dibujarPantalla();