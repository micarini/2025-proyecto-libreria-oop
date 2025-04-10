// CLASES
class Producto {
  constructor(titulo, autor, genero, precio, año, imagen) {
    this.titulo = titulo;
    this.autor = autor;
    this.genero = genero;
    this.precio = precio;
    this.año = año;
    this.imagen = imagen;
  }
}

class Libro extends Producto {
  constructor(titulo, autor, genero, precio, año, paginas, imagen) {
    super(titulo, autor, genero, precio, año, imagen);
    this.paginas = paginas;
    this.tipo = "libro";
  }
}

class Pelicula extends Producto {
  constructor(titulo, director, genero, precio, año, duracion, imagen) {
    super(titulo, director, genero, precio, año, imagen);
    this.duracion = duracion;
    this.tipo = "pelicula";
  }
}

class CD extends Producto {
  constructor(titulo, banda, genero, precio, año, canciones, imagen) {
    super(titulo, banda, genero, precio, año, imagen);
    this.canciones = canciones;
    this.tipo = "cd";
  }
}

// FUNCIONES
function crearTarjeta(producto) {
  let div = document.createElement("div");
  div.classList.add("producto", "card");

  div.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.titulo}" class="img-prod">
    <h3>${producto.titulo}</h3>
    <p><strong>Autor/Director:</strong> ${producto.autor}</p>
    <p><strong>Género:</strong> ${producto.genero}</p>
    <p><strong>Año:</strong> ${producto.año}</p>
    <p><strong>Precio:</strong> $${producto.precio}</p>
  `;

  if (producto.tipo === "libro") {
    div.innerHTML += `<p>Páginas: ${producto.paginas}</p>`;
  } else if (producto.tipo === "pelicula") {
    div.innerHTML += `<p>Duración: ${producto.duracion} min</p>`;
  } else if (producto.tipo === "cd") {
    div.innerHTML += `<p>Canciones: ${producto.canciones}</p>`;
  }

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
  new CD("SOS", "SZA", "Hip-hop", 27.82, 2022, 23, "assets/images/sos.png")
];

let peliculas = [
  new Pelicula("Interstellar", "Christopher Nolan", "Science Fiction", 9.99, 2014, 169, "assets/images/interstellar.jpg"),
  new Pelicula("Star Wars: A New Hope", "George Lucas", "Science Fiction", 7.99, 1977, 121, "assets/images/starwars.jpg"),
  new Pelicula("My Neighbor Totoro", "Hayao Miyazaki", "Fantasy", 9.99, 1988, 86, "assets/images/totoro.jpg"),
  new Pelicula("Eternal Sunshine of the Spotless Mind", "Michel Gondry", "Science Fiction", 9.99, 2004, 108, "assets/images/eternalsunshine.jpg"),
  new Pelicula("Top Gun: Maverick", "Joseph Kosinski", "Action", 15.99, 2022, 8, "assets/images/maverick.jpg"),
  new Pelicula("Lady Bird", "Greta Gerwig", "Comedy", 7.5, 2017, 94, "assets/images/ladybird.jpg"),
  new Pelicula("La La Land", "Damien Chazelle", "Drama", 9.2, 2016, 129, "assets/images/lalaland.webp"),
  new Pelicula("Whiplash", "Damien Chazelle", "Drama", 9.2, 2014, 107, "assets/images/whiplash.jpg"),
  new Pelicula("The Royal Tenenbaums", "Wes Anderson", "Drama", 5.00, 2001, 110, "assets/images/royaltenenbaums.jpg"),
  new Pelicula("10 Things I Hate About You", "Gil Junger", "Comedy", 9.99, 1999, 97, "assets/images/tenthings.jpg")
];

// EVENTOS
document.getElementById("boton1").addEventListener("click", function () {
  mostrarProductos(libros);
  activarBoton("boton1");
});

document.getElementById("boton2").addEventListener("click", function () {
  mostrarProductos(cds);
  activarBoton("boton2");
});

document.getElementById("boton3").addEventListener("click", function () {
  mostrarProductos(peliculas);
  activarBoton("boton3");
});

// MOSTRAR LIBROS AL INICIO
mostrarProductos(libros);
activarBoton("boton1");