// CLASES
class Producto {
  constructor(titulo, autor, genero, precio, año) {
    this.titulo = titulo;
    this.autor = autor;
    this.genero = genero;
    this.precio = precio;
    this.año = año;
  }
}

class Libro extends Producto {
  constructor(titulo, autor, genero, precio, año, paginas) {
    super(titulo, autor, genero, precio, año);
    this.paginas = paginas;
    this.tipo = "libro";
  }
}

class Pelicula extends Producto {
  constructor(titulo, director, genero, precio, año, duracion) {
    super(titulo, director, genero, precio, año);
    this.duracion = duracion;
    this.tipo = "pelicula";
  }
}

class CD extends Producto {
  constructor(titulo, banda, genero, precio, año, canciones) {
    super(titulo, banda, genero, precio, año);
    this.canciones = canciones;
    this.tipo = "cd";
  }
}

// FUNCIONES
function crearTarjeta(producto) {
  let div = document.createElement("div");
  div.classList.add("producto", "card");

  div.innerHTML = `
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
  new Libro("Normal People", "Sally Rooney", "Literary Fiction", 20.76, 2019, 266),
  new Libro("Daisy Jones & The Six", "Taylor Jenkins Reid", "Historical Fiction", 20.76, 2019, 384),
  new Libro("The Priory of the Orange Tree", "Samantha Shannon", "Fantasy", 15.99, 1949, 328),
  new Libro("Pride & Prejudice", "Jane Austen", "Romance", 11.00, 1813, 279),
  new Libro("The Perks of Being a Wallflower", "Stephen Chbosky", "Young Adult", 13.25, 2009, 237),
  new Libro("Everything I Know About Love", "Memoir", "Nonfiction", 12.23, 2019, 368),
  new Libro("The Seven Husbands of Evelyn Hugo", "Taylor Jenkins Reid", "Romance", 9.99, 2017, 389),
  new Libro("Ready Player One", "Ernest Cline", "Science Fiction", 7.99, 2011, 374),
  new Libro("Six of Crows", "Leigh Bardugo", "Fantasy", 16.5, 2015, 495),
  new Libro("The Bell Jar", "Sylvia Plath", "Autobiography", 12.10, 2006, 288)
];

let cds = [
  new CD("The 1975", "The 1975", "Electronic", 12.99, 2013, 16),
  new CD("Clics Modernos", "Charly Garcia", "Rock", 14.99, 1983, 9),
  new CD("Clancy", "Twenty One Pilots", "Alternative", 20.00, 2024, 13),
  new CD("Folklore", "Taylor Swift", "Alternative", 12.5, 2020, 16),
  new CD("IGOR", "Tyler,The Creator", "Hip-Hop", 14.39, 2019, 12),
  new CD("Melodrama", "Lorde", "Alternative", 23.00, 2017, 11),
  new CD("Punisher", "Phoebe Bridgers", "Indie Rock", 13.2, 2020, 11),
  new CD("The Tortured Poets Department", "Taylor Swift", "Synth Pop", 35.00, 2024, 16),
];

let peliculas = [
  new Pelicula("Interstellar", "Christopher Nolan", "Science Fiction", 9.99, 2014, 169),
  new Pelicula("Star Wars: A New Hope", "George Lucas", "Science Fiction", 7.99, 1977, 121),
  new Pelicula("My Neighbor Totoro", "Hayao Miyazaki", "Fantasy", 9.99, 1988, 86),
  new Pelicula("Eternal Sunshine of the Spotless Mind", "Michel Gondry", "Science Fiction", 9.99, 2004, 108),
  new Pelicula("Top Gun: Maverick", "Joseph Kosinski", "Action", 15.99, 2022, 8),
  new Pelicula("Lady Bird", "Greta Gerwig", "Comedy", 7.5, 2017, 94),
  new Pelicula("La La Land", "Damien Chazelle", "Drama", 9.2, 2016, 129),
  new Pelicula("Whiplash", "Damien Chazelle", "Drama", 9.2, 2014, 107),
  new Pelicula("The Royal Tenenbaums", "Wes Anderson", "Drama", 5.00, 2001, 110),
  new Pelicula("10 Things I Hate About You", "Gil Junger", "Comedy", 9.99, 1999, 97)
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