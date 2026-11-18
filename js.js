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
            <section class="carril">
                <h2>Usuario ${id} <button class="botonBorrar" onclick="borrarCarril('${id}')">X</button></h2>
                <div id="datos-${id}">Cargando...</div>
            </section>
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
            <p class="datoUsuario"><strong>Nombre:</strong> ${usuario.name}</p>
            <p class="datoUsuario"><strong>Correo:</strong> ${usuario.email}</p>
            <p class="datoUsuario"><strong>Teléfono:</strong> ${usuario.phone}</p>
        `;
    })
    .catch(function() {
        cajaDatos.innerHTML = "<p style='color: red;'>Error: No encontrado.</p>";
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