formulario.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const titulo = this.titulo.value;
    const tipo = this.tipo.value;
    const autor = this.autor.value;
    const year = this.year.value;
    const descripcion = this.descripcion.value;
    const imagenInput = this.imagen.files[0];
    const genero = this.genero.value;
    const precio = parseFloat(this.precio.value) || 0;
    const paginas = parseInt(this.paginas.value);
    const duracion = parseInt(this.duracion.value);
    const canciones = parseInt(this.canciones.value);
  
    const reader = new FileReader();
    reader.onload = function () {
      const imagenBase64 = reader.result;
  
      const nuevoItem = {
        titulo,
        tipo,
        autor,
        year,
        descripcion,
        imagen: imagenBase64,
        genero,
        precio,
        paginas,
        duracion,
        canciones
      };
  
      const items = JSON.parse(localStorage.getItem('items')) || [];
      items.push(nuevoItem);
      localStorage.setItem('items', JSON.stringify(items));
  
      alert('¡Guardado!');
      formulario.reset();
    };
  
    if (imagenInput) {
      reader.readAsDataURL(imagenInput);
    }
  });
  
  
  const selectYear = document.getElementById("year");
  const yearActual = new Date().getFullYear();

  for (let i = yearActual; i >= 1900; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    selectYear.appendChild(opcion);
  }

  const tipoSelect = document.getElementById("tipo");
  const campoPaginas = document.getElementById("campo-paginas");
  const campoDuracion = document.getElementById("campo-duracion");
  const campoCanciones = document.getElementById("campo-canciones");

  tipoSelect.addEventListener("change", () => {
    const tipo = tipoSelect.value;
    campoPaginas.classList.add("oculto");
    campoDuracion.classList.add("oculto");
    campoCanciones.classList.add("oculto");

    if (tipo === "libro") campoPaginas.classList.remove("oculto");
    if (tipo === "pelicula") campoDuracion.classList.remove("oculto");
    if (tipo === "cd") campoCanciones.classList.remove("oculto");
  });


  /*MODO OSCURO*/
    const toggleButton = document.getElementById("theme-toggle");
    const body = document.body;

    // verifico con localStorage si el usuario ya activó el modo oscuro previamente
    if (localStorage.getItem("modo-oscuro") === "activado") {
        body.classList.add("modo-oscuro"); //si existe y tiene el valor "activado", se activa el modo oscuro, añadiendo la clase modo-oscuro al body y marcando el checkbox correspondiente.
        toggleButton.checked = true; // aseguro que el checkbox esté marcado
    }

    function cambiarModoOscuro() {
        //el método .classList.toggle() agrega o quita la clase modo-oscuro del elemento body. si la clase no está presente, toggle() la agrega. si la clase ya está presente, toggle() la elimina.
        body.classList.toggle("modo-oscuro");

        // guarda el estado del modo oscuro en localStorage
        if (body.classList.contains("modo-oscuro")) {
            localStorage.setItem("modo-oscuro", "activado"); // guardo que está activo
        } else {
            localStorage.removeItem("modo-oscuro"); // si se desactiva, removemos el item
        }
    } //cuando el usuario cambia el estado del modo oscuro (marcando o desmarcando el checkbox), la clase modo-oscuro se alterna en el body. si el modo oscuro está activado, se guarda en localStorage con setItem(), de modo que persista. si se desactiva el modo oscuro, se elimina el valor de localStorage con removeItem().

    toggleButton.addEventListener("change", cambiarModoOscuro);