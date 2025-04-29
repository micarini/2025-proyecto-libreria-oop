// CLASES
class Producto {
  #tipo;
  #titulo;
  #autor;
  #genero;
  #precio;
  #año;
  #imagen;
  #reservadoHasta;  //propiedad para manejar la reserva

  constructor(tipo, titulo, autor, genero, precio, año, imagen) {
    this.#tipo = tipo;
    this.#titulo = titulo;
    this.#autor = autor;
    this.#genero = genero;
    this.#precio = precio;
    this.#año = año;
    this.#imagen = imagen;
    this.#reservadoHasta = null;  //inicialmente no está reservado
  }
  get tipo() { return this.#tipo; }
  get titulo() { return this.#titulo; }
  get autor() { return this.#autor; }
  get genero() { return this.#genero; }
  get precio() { return this.#precio; }
  get año() { return this.#año; }
  get imagen() { return this.#imagen; }

  //método de reserva
  reservarProducto(dias) {
    const fechaReserva = new Date(); //creamos una nueva instancia de la clase Date. esto nos da la fecha y hora actuales (del momento que se ejecuta la linea). este objeto fechaReserva ahora tiene la fecha y hora del momento exacto en el que se creó la instancia.
    fechaReserva.setDate(fechaReserva.getDate() + dias);  //fechaReserva.getDate() devuelve el día del mes de la fecha almacenada en el objeto (si es 18 de abril devuelve 18). setDate para establecer un nuevo valor en el día del mes. sumamos dias al valor actual del día. (si dias es 7, entonces esta línea cambiará el día del mes a 25 de abril ya que hoy es 18). setDate automáticamente ajusta el mes y el año si el número de días sobrepasa el número de días en el mes o si se cruza de un mes a otro.
    this.#reservadoHasta = fechaReserva; //se asigna el valor de fechaReserva a la propiedad privada #reservadoHasta. esto almacena la fecha en la que el producto será considerado reservado hasta ese momento (el producto estará reservado por los días que se le hayan asignado a partir del momento actual)
  }

  //getter para saber si está reservado
  get estaReservado() {
    if (!this.#reservadoHasta) return false; //verificamos si la propiedad #reservadoHasta es null o undefined (si no se estableció una fecha de reserva). si no está definida, significa que el producto no está reservado
    return new Date() < this.#reservadoHasta; //si #reservadoHasta tiene un valor entonces comparamos la fecha actual (new Date()) con la fecha en que el producto estará reservado (#reservadoHasta). si la fecha actual es antes de #reservadoHasta, significa que el producto está reservado y returneamos true. si la fecha actual es después de la fecha de reserva significa que la reserva se expiró y returneamos false.
    
    
  }

  //setters con validación
  set genero(valor) {
    if (typeof valor === "string") this.#genero = valor; //typeof es una palabra clave de js que te dice de qué tipo es un valor, devuelve true solo si valor es un texto. si la condición es verdadera, le asigna el nuevo valor a la propiedad privada #genero.
    else console.error("El género debe ser un string");
  }

  set precio(valor) {
    if (typeof valor === "number" && valor >= 0) this.#precio = valor;
    else console.error("El precio debe ser un número válido");
  }

  set año(valor) {
    if (Number.isInteger(valor) && valor > 0) this.#año = valor; //Number.isInteger(valor) revisa si el valor es un número entero.
    else console.error("El año debe ser un número entero positivo");
  }

  //polimorfismo 
    get detalleHTML() { //metodo getter para obtener el detalle html del producto 
      return ""; //por defecto no tiene detalles adicionales
    }

    get fechaDeReserva() {
      return this.#reservadoHasta;
    }
    
    cancelarReserva() {
      this.#reservadoHasta = null;
    }
}

class Libro extends Producto {
  #paginas;
  constructor(titulo, autor, genero, precio, año, paginas, imagen) {
    super("libro", titulo, autor, genero, precio, año, imagen);
    this.#paginas = paginas;
  }

  get paginas() {
    return this.#paginas;
  }

  set paginas(valor) {
    if (Number.isInteger(valor) && valor > 0) this.#paginas = valor;
    else console.error("Las páginas deben ser un número entero positivo");
  }

  get contenidoHTML() {
    let disponibilidad = "";

    if (this.estaReservado) {
      disponibilidad = `<p class="reserva">Reservado hasta ${this.fechaDeReserva.toLocaleDateString()}</p>`;
    } else {
      disponibilidad = `<p class="disponible">Disponible para alquilar</p>`;
    }

    let html = `
      <div class="producto card">
        <img src="${this.imagen}" alt="${this.titulo}" class="img-prod">
        <h3>${this.titulo}</h3>
        <div class= "info-producto">
        <p><strong>Autor:</strong> ${this.autor}</p>
        <p><strong>Género:</strong> ${this.genero}</p>
        <p><strong>Año:</strong> ${this.año}</p>
        <p><strong>Precio:</strong> $${this.precio}</p>
        <p><strong>Páginas:</strong> ${this.paginas}</p>
        </div>
        ${disponibilidad}
      </div>
    `;
    
    return html;
  }

  get detalleHTML() {
    let disponibilidad = ""; //creo esta variable vacia
  
    if (this.estaReservado) { //verifico si el producto esta reservado
      disponibilidad = `<p class="reserva">Reservado hasta ${this.fechaDeReserva.toLocaleDateString()}</p>`;
    } else {
      disponibilidad = `<p class="disponible">Disponible para alquilar</p>`;
    }
  
    return `
      <p><strong>Páginas:</strong> ${this.paginas}</p> 
      ${disponibilidad} 
    `; //devuelvo el html final uniendo los datos de paginas y de disponibilidad
  }
} 


class Pelicula extends Producto {
  #duracion;
  constructor(titulo, director, genero, precio, año, duracion, imagen) {
    super("pelicula", titulo, director, genero, precio, año, imagen);
    this.#duracion = duracion;
  }

  get duracion() {
    return this.#duracion;
  }

  set duracion(valor) {
    if (typeof valor === "number" && valor > 0) this.#duracion = valor;
    else console.error("La duración debe ser un número positivo");
  }
  
  get contenidoHTML() {
    let disponibilidad = "";
  
    if (this.estaReservado) {
      disponibilidad = `<p class="reserva">Reservada hasta ${this.fechaDeReserva.toLocaleDateString()}</p>`;
    } else {
      disponibilidad = `<p class="disponible">Disponible para alquilar</p>`;
    }
  
    let html = `
      <div class="producto card">
        <img src="${this.imagen}" alt="${this.titulo}" class="img-prod">
        <h3>${this.titulo}</h3>
        <div class="info-producto">
        <p><strong>Director:</strong> ${this.autor}</p>
        <p><strong>Género:</strong> ${this.genero}</p>
        <p><strong>Año:</strong> ${this.año}</p>
        <p><strong>Precio:</strong> $${this.precio}</p>
        <p><strong>Duración:</strong> ${this.duracion} min</p>
        </div>
        ${disponibilidad}
      </div>
    `;
    
    return html;
  }
  

  get detalleHTML() {
    let disponibilidad = "";
  
    if (this.estaReservado) {
      disponibilidad = `<p class="reserva">Reservado hasta ${this.fechaDeReserva.toLocaleDateString()}</p>`;
    } else {
      disponibilidad = `<p class="disponible">Disponible para alquilar</p>`;
    }
  
    return `
      <p><strong>Duración:</strong> ${this.duracion} min</p>
      ${disponibilidad}
    `;
  }
}

class CD extends Producto {
  #canciones;
  constructor(titulo, banda, genero, precio, año, canciones, imagen) {
    super("cd", titulo, banda, genero, precio, año, imagen);
    this.#canciones = canciones;
  }

  get canciones() {
    return this.#canciones;
  }

  set canciones(valor) {
    if (Number.isInteger(valor) && valor > 0) this.#canciones = valor;
    else console.error("La cantidad de canciones debe ser un número entero positivo");
  }
  
  get contenidoHTML() {
    let disponibilidad = "";
  
    if (this.estaReservado) {
      disponibilidad = `<p class="reserva">Reservado hasta ${this.fechaDeReserva.toLocaleDateString()}</p>`;
    } else {
      disponibilidad = `<p class="disponible">Disponible para alquilar</p>`;
    }
  
    let html = `
      <div class="producto card">
        <img src="${this.imagen}" alt="${this.titulo}" class="img-prod">
        <h3>${this.titulo}</h3>
        <div class="info-producto">
        <p><strong>Banda:</strong> ${this.autor}</p>
        <p><strong>Género:</strong> ${this.genero}</p>
        <p><strong>Año:</strong> ${this.año}</p>
        <p><strong>Precio:</strong> $${this.precio}</p>
        <p><strong>Canciones:</strong> ${this.canciones}</p>
        </div>
        ${disponibilidad}
      </div>
    `;
    
    return html;
  }
  

  get detalleHTML() {
    let disponibilidad = "";
  
    if (this.estaReservado) {
      disponibilidad = `<p class="reserva">Reservado hasta ${this.fechaDeReserva.toLocaleDateString()}</p>`;
    } else {
      disponibilidad = `<p class="disponible">Disponible para alquilar</p>`;
    }
  
    return `
      <p><strong>Canciones:</strong> ${this.canciones}</p>
      ${disponibilidad}
    `;
  }
  
}

let productosActuales = []; // para saber qué productos mostrar luego de una reserva

// FUNCIONES
function crearTarjeta(producto) {
  let div = document.createElement("div");
  div.innerHTML = producto.contenidoHTML;

  const botonReserva = document.createElement("button"); //creo un boton para reservar
  botonReserva.textContent = "Reservar por 7 días";
  botonReserva.classList.add("btn-reservar");

  if (producto.estaReservado) { //el boton cambia cuando se lo presiona
    botonReserva.textContent = "Cancelar reserva";
  } else {
    botonReserva.textContent = "Reservar por 7 dias"
  }

  botonReserva.addEventListener("click", () => {
    if (producto.estaReservado) {
      producto.cancelarReserva();
      alert("Reserva cancelada");
    } else {
      producto.reservarProducto(7);
      alert("Producto reservado por 7 días");
    }
    mostrarProductos(productosActuales); // actualiza la galería entera
  });

  div.querySelector(".producto.card").appendChild(botonReserva);

  return div;
}

function mostrarProductos(productos) {
  let contenedor = document.getElementById("galeria-contenido");
  contenedor.innerHTML = "";
  for (let i = 0; i < productos.length; i++) {
    contenedor.appendChild(crearTarjeta(productos[i]));
  }
}

function activarBoton(idActivo) {
  let botones = document.querySelectorAll(".btn-prod");
  for (let i = 0; i < botones.length; i++) {
    botones[i].classList.remove("activo");
  }
  document.getElementById(idActivo).classList.add("activo");
}

// DATOS
let libros = [
  new Libro("Normal People", "Sally Rooney", "Literary Fiction", 20.76, 2019, 266, "assets/images/normalpeople.jpg"),
  new Libro("Daisy Jones & The Six", "Taylor Jenkins Reid", "Historical Fiction", 20.76, 2019, 384, "assets/images/daisyjones.jpg"),
  new Libro("The Priory of the Orange Tree", "Samantha Shannon", "Fantasy", 15.99, 1949, 328, "assets/images/priory.jpg"),
  new Libro("Pride & Prejudice", "Jane Austen", "Romance", 11.00, 1813, 279, "assets/images/prideandprejudice.jpg"),
  new Libro("The Perks of Being a Wallflower", "Stephen Chbosky", "Young Adult", 13.25, 2009, 237, "assets/images/perksofbeing.jpg"),
  new Libro("Everything I Know About Love", "Dolly Alderton", "Nonfiction", 12.23, 2018, 368, "assets/images/love.jpg"),
  new Libro("The Seven Husbands of Evelyn Hugo", "Taylor Jenkins Reid", "Romance", 9.99, 2017, 389, "assets/images/evelyn.webp"),
  new Libro("Ready Player One", "Ernest Cline", "Science Fiction", 7.99, 2011, 374, "assets/images/readyplayerone.jpg"),
  new Libro("Six of Crows", "Leigh Bardugo", "Fantasy", 16.5, 2015, 495, "assets/images/sixofcrows.jpg"),
  new Libro("The Bell Jar", "Sylvia Plath", "Autobiography", 12.10, 2006, 288, "assets/images/thebelljar.webp"),
  new Libro("The Outsiders", "S.E. Hinton", "Classics", 8.99, 1967, 214, "assets/images/theoutsiders.png"),
  new Libro("Tomorrow, and Tomorrow, and Tomorrow", "Gabrielle Zevin", "Literary Fiction", 13.99, 2022, 401, "assets/images/tomorrowx3.jpg")
];

let cds = [
  new CD("The 1975", "The 1975", "Electronic", 12.99, 2013, 16, "assets/images/the1975.png"),
  new CD("Clics Modernos", "Charly Garcia", "Rock", 14.99, 1983, 9, "assets/images/clicsmodernos.jpg"),
  new CD("Clancy", "Twenty One Pilots", "Alternative", 20.00, 2024, 13, "assets/images/clancy.png"),
  new CD("Folklore", "Taylor Swift", "Alternative", 12.5, 2020, 16, "assets/images/folklore.png"),
  new CD("IGOR", "Tyler,The Creator", "Hip-Hop", 14.39, 2019, 12, "assets/images/igor.jpg"),
  new CD("Melodrama", "Lorde", "Alternative", 23.00, 2017, 11, "assets/images/melodrama.webp"),
  new CD("Punisher", "Phoebe Bridgers", "Indie Rock", 13.2, 2020, 11, "assets/images/punisher.png"),
  new CD("The Tortured Poets Department", "Taylor Swift", "Synth Pop", 35.00, 2024, 16, "assets/images/ttpd.png"),
  new CD("Abbey Road", "The Beatles", "Rock", 14.00, 1969, 17, "assets/images/abbeyroad.jpg"),
  new CD("SOS", "SZA", "Hip-hop", 27.82, 2022, 23, "assets/images/sos.png"),
  new CD("POST MORTEM", "Dillom", "Hip-Hop", 23.65, 2021, 18, "assets/images/postmortem.jpg"),
  new CD("Short n' Sweet", "Sabrina Carpenter", "Pop", 44.30, 2024, 12, "assets/images/shortnsweet.webp")
];

let peliculas = [
  new Pelicula("Interstellar", "Christopher Nolan", "Science Fiction", 9.30, 2014, 169, "assets/images/interstellar.jpg"),
  new Pelicula("Star Wars: A New Hope", "George Lucas", "Science Fiction", 7.99, 1977, 121, "assets/images/starwars.jpg"),
  new Pelicula("My Neighbor Totoro", "Hayao Miyazaki", "Fantasy", 10.99, 1988, 86, "assets/images/totoro.jpg"),
  new Pelicula("Eternal Sunshine of the Spotless Mind", "Michel Gondry", "Science Fiction", 9.99, 2004, 108, "assets/images/eternalsunshine.jpg"),
  new Pelicula("Top Gun: Maverick", "Joseph Kosinski", "Action", 15.99, 2022, 8, "assets/images/maverick.jpg"),
  new Pelicula("Lady Bird", "Greta Gerwig", "Comedy", 7.5, 2017, 94, "assets/images/ladybird.jpg"),
  new Pelicula("La La Land", "Damien Chazelle", "Drama", 9.2, 2016, 129, "assets/images/lalaland.webp"),
  new Pelicula("Whiplash", "Damien Chazelle", "Drama", 9.2, 2014, 107, "assets/images/whiplash.jpg"),
  new Pelicula("The Royal Tenenbaums", "Wes Anderson", "Drama", 5.00, 2001, 110, "assets/images/royaltenenbaums.jpg"),
  new Pelicula("10 Things I Hate About You", "Gil Junger", "Comedy", 9.99, 1999, 97, "assets/images/tenthings.jpg"),
  new Pelicula("When Evil Lurks", "Demián Rugna", "Horror", 8.99, 2023, 100, "assets/images/whenevillurks.jpg"),
  new Pelicula("I, Tonya","Craig Gillespie", "Comedy", 13.99, 2017, 120, "assets/images/itonya.jpg"),
];

// EVENTOS
document.getElementById("boton1").addEventListener("click", function () {
  productosActuales = libros;
  mostrarProductos(libros);
  activarBoton("boton1");
});

document.getElementById("boton2").addEventListener("click", function () {
  productosActuales = cds;
  mostrarProductos(cds);
  activarBoton("boton2");
});

document.getElementById("boton3").addEventListener("click", function () {
  productosActuales = peliculas;
  mostrarProductos(peliculas);
  activarBoton("boton3");
});

// MOSTRAR LIBROS AL INICIO
mostrarProductos(libros);
activarBoton("boton1");

// mdn file input, mdn base64 

const items = JSON.parse(localStorage.getItem('items')) || [];

    const contenedor = document.getElementById('galeria-contenido');

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'producto card ';
      card.innerHTML = `
  <img src="${item.imagen}" alt="${item.titulo}" style="width:100%; height:auto; border-radius:8px;">
  <h3>${item.titulo}</h3>
  <p><strong>Tipo:</strong> ${item.tipo}</p>
  <p><strong>Autor/Director:</strong> ${item.autor}</p>
  <p><strong>Año:</strong> ${item.anio}</p>
  <p>${item.descripcion}</p>
`;
      contenedor.appendChild(card);
    });

    