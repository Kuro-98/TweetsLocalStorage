//variables
const formulario = document.querySelector('#formulario'); // Selecciona el formulario con el id "formulario" en el DOM y lo almacena en la variable "formulario".
const listaTweets = document.querySelector('#lista-tweets'); // Selecciona un elemento con el id "lista-tweets" en el DOM y lo almacena en la variable "listaTweets".

let tweets = []; // Crea una variable llamada "tweets" y la inicializa como un arreglo vacío.

//event listeners
eventListeners(); // Llama a la función "eventListeners" para configurar los event listeners.

function eventListeners() {
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet); // Agrega un event listener para el evento "submit" del formulario que llama a la función "agregarTweet" cuando se envía el formulario.

    //cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []; // Cuando el documento HTML ha sido completamente cargado, intenta obtener los tweets almacenados en el almacenamiento local y los almacena en la variable "tweets". Si no hay datos en el almacenamiento local, se inicializa "tweets" como un arreglo vacío. Después, llama a la función "crearHTML".
        crearHTML();
    });
}

//funciones

function agregarTweet(e) {
    e.preventDefault(); // Evita que se envíe el formulario de manera predeterminada (recargar la página).

    //TextArea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value; // Obtiene el valor del campo de texto con el id "tweet" y lo almacena en la variable "tweet".
    if (tweet == '') {
        mostrarError('Un mensaje no puede ir vacío'); // Si el campo de texto está vacío, llama a la función "mostrarError" con un mensaje de error y sale de la función.
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet,
    };
    //añadir al arreglo de tweets
    tweets = [...tweets, tweetObj]; // Crea un nuevo objeto "tweetObj" con un ID único generado con la función "Date.now()" y el contenido del tweet. Luego, agrega este objeto al arreglo "tweets".

    //Una vez agregado vamos a crear el HTML
    crearHTML(); // Llama a la función "crearHTML" para actualizar la lista de tweets en la interfaz.

    //Reiniciar el formulario
    formulario.reset(); // Limpia el contenido del formulario.
}

function mostrarError(error) {
    const mensajeError = document.createElement('p'); // Crea un elemento de párrafo en el DOM y lo almacena en la variable "mensajeError".
    mensajeError.textContent = error; // Establece el contenido de texto del párrafo con el mensaje de error recibido.

    mensajeError.classList.add('error'); // Agrega una clase CSS "error" al párrafo.

    //insertar en el contenido
    const contenido = document.querySelector('#contenido'); // Selecciona un elemento con el id "contenido" en el DOM y lo almacena en la variable "contenido".
    contenido.appendChild(mensajeError); // Agrega el párrafo de error como hijo del elemento "contenido".

    setTimeout(() => {
        mensajeError.remove(); // Después de 3 segundos, elimina el párrafo de error del DOM.
    }, 3000);
}

//Muestra un listado de los tweets
function crearHTML() {
    limpiarHTML(); // Llama a la función "limpiarHTML" para eliminar cualquier tweet anterior en la lista.

    if (tweets.length > 0) {
        // Verifica si hay tweets en el arreglo "tweets".
        tweets.forEach((tweet) => {
            //Agregar un botón
            const btnEliminar = document.createElement('a'); // Crea un elemento "a" en el DOM y lo almacena en la variable "btnEliminar".
            btnEliminar.classList.add('borrar-tweet'); // Agrega una clase CSS "borrar-tweet" al elemento "btnEliminar".
            btnEliminar.innerText = 'X'; // Establece el texto del botón como 'X'.

            //Añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id); // Agrega un event listener al botón para llamar a la función "borrarTweet" cuando se haga clic en él, pasando el ID del tweet como argumento.
            };
            const li = document.createElement('li'); // Crea un elemento de lista "li" en el DOM y lo almacena en la variable "li".
            li.innerText = tweet.tweet; // Establece el contenido de texto del "li" con el contenido del tweet.

            //insertarlo en el HTML
            li.appendChild(btnEliminar); // Agrega el botón "btnEliminar" como hijo del elemento "li".
            listaTweets.appendChild(li); // Agrega el "li" a la lista de tweets en la interfaz.
        });
    }

    sincronizarStorage(); // Llama a la función "sincronizarStorage" para guardar los tweets en el almacenamiento local.
}

//Agregar los tweets a localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets)); // Convierte el arreglo "tweets" a formato JSON y lo guarda en el almacenamiento local con la clave "tweets".
}

//Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id); // Filtra el arreglo "tweets" para eliminar el tweet con el ID proporcionado.
    crearHTML(); // Llama a la función "crearHTML" para actualizar la lista de tweets en la interfaz.
}

function limpiarHTML() {
    while (listaTweets.firstChild) {
        // Mientras haya elementos hijos en "listaTweets".
        listaTweets.removeChild(listaTweets.firstChild); // Elimina el primer hijo de "listaTweets" (borra todos los elementos de la lista).
    }
}
