// CLASES
class Producto {
  #tipo;
  #titulo;
  #autor;
  #genero;
  #precio;
  #año;
  #imagen;
  #descripcion;
  #reservadoHasta;  //propiedad para manejar la reserva

  constructor(tipo, titulo, autor, genero, precio, año, imagen, descripcion = "") {
    this.#tipo = tipo;
    this.#titulo = titulo;
    this.#autor = autor;
    this.#genero = genero;
    this.#precio = precio;
    this.#año = año;
    this.#imagen = imagen;
    this.#descripcion = descripcion;
    this.#reservadoHasta = null;  //inicialmente no está reservado
  }
  get tipo() { return this.#tipo; }
  get titulo() { return this.#titulo; }
  get autor() { return this.#autor; }
  get genero() { return this.#genero; }
  get precio() { return this.#precio; }
  get año() { return this.#año; }
  get imagen() { return this.#imagen; }
  get descripcion() { return this.#descripcion; }

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

  constructor(titulo, autor, genero, precio, año, paginas, imagen, descripcion = "", libroEmbed = "") {
    super("libro", titulo, autor, genero, precio, año, imagen, descripcion);
    this.#paginas = paginas;
    this.libroEmbed = libroEmbed;
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
  constructor(titulo, director, genero, precio, año, duracion, imagen, descripcion = "", trailerEmbed = "") {
    super("pelicula", titulo, director, genero, precio, año, imagen, descripcion);
    this.#duracion = duracion;
    this.trailerEmbed = trailerEmbed; 
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
  constructor(titulo, banda, genero, precio, año, canciones, imagen, descripcion = "", cancionEmbed = "") {
    super("cd", titulo, banda, genero, precio, año, imagen, descripcion);
    this.#canciones = canciones;
    this.cancionEmbed = cancionEmbed;
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

let productosActuales = []; //para saber que productos mostrar luego de una reserva

function crearTarjeta(producto) {
  const div = document.createElement("div");
  div.innerHTML = producto.contenidoHTML;

  const tarjeta = div.querySelector(".producto.card");

 // boton "cerrar" 
 const botonCerrar = document.createElement("button");
 botonCerrar.classList.add("btn-cerrar");
 botonCerrar.textContent = "Cerrar";

 botonCerrar.addEventListener("click", (e) => {
  e.stopPropagation(); // evita efectos adicionales
  tarjeta.remove(); // eliminar la tarjeta de administración
});

  const botonReserva = document.createElement("button");
  botonReserva.classList.add("btn-reservar");
  botonReserva.textContent = producto.estaReservado ? "Cancelar reserva" : "Reservar por 7 días";

  botonReserva.addEventListener("click", (e) => {
    e.stopPropagation(); //evita que se abra el modal al hacer click en el botón
    if (producto.estaReservado) {
      producto.cancelarReserva();
      alert("Reserva cancelada");
    } else {
      producto.reservarProducto(7);
      alert("Producto reservado por 7 días");
    }
    mostrarProductos(productosActuales);
  });

  tarjeta.appendChild(botonReserva);
  tarjeta.appendChild(botonCerrar);

  tarjeta.addEventListener("click", () => {
    abrirModal(producto);
  });

  return tarjeta; 
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

//DATOS
let libros = [
  new Libro("Normal People", "Sally Rooney", "Literary Fiction", 20.76, 2019, 266, "assets/images/normalpeople.jpg", "At school Connell and Marianne pretend not to know each other. He’s popular and well-adjusted, star of the school soccer team while she is lonely, proud, and intensely private. But when Connell comes to pick his mother up from her housekeeping job at Marianne’s house, a strange and indelible connection grows between the two teenagers - one they are determined to conceal. A year later, they’re both studying at Trinity College in Dublin. Marianne has found her feet in a new social world while Connell hangs at the sidelines, shy and uncertain. Throughout their years in college, Marianne and Connell circle one another, straying toward other people and possibilities but always magnetically, irresistibly drawn back together. Then, as she veers into self-destruction and he begins to search for meaning elsewhere, each must confront how far they are willing to go to save the other.", ),
  new Libro("Daisy Jones & The Six", "Taylor Jenkins Reid", "Historical Fiction", 20.76, 2019, 384, "assets/images/daisyjones.jpg", "Everyone knows DAISY JONES & THE SIX, but nobody knows the reason behind their split at the absolute height of their popularity... until now. Daisy is a girl coming of age in L.A. in the late sixties, sneaking into clubs on the Sunset Strip, sleeping with rock stars, and dreaming of singing at the Whisky a Go Go. The sex and drugs are thrilling, but it’s the rock’n’roll she loves most. By the time she’s twenty, her voice is getting noticed, and she has the kind of heedless beauty that makes people do crazy things. lso getting noticed is The Six, a band led by the brooding Billy Dunne. On the eve of their first tour, his girlfriend Camila finds out she’s pregnant, and with the pressure of impending fatherhood and fame, Billy goes a little wild on the road. Daisy and Billy cross paths when a producer realizes that the key to supercharged success is to put the two together. What happens next will become the stuff of legend. The making of that legend is chronicled in this riveting and unforgettable novel, written as an oral history of one of the biggest bands of the seventies."),
  new Libro("The Priory of the Orange Tree", "Samantha Shannon", "Fantasy", 15.99, 2019, 328, "assets/images/priory.jpg", "A world divided. A queendom without an heir. An ancient enemy awakens. The House of Berethnet has ruled Inys for a thousand years. Still unwed, Queen Sabran the Ninth must conceive a daughter to protect her realm from destruction – but assassins are getting closer to her door. Ead Duryan is an outsider at court. Though she has risen to the position of lady-in-waiting, she is loyal to a hidden society of mages. Ead keeps a watchful eye on Sabran, secretly protecting her with forbidden magic. Across the dark sea, Tané has trained to be a dragonrider since she was a child, but is forced to make a choice that could see her life unravel. Meanwhile, the divided East and West refuse to parley, and forces of chaos are rising from their sleep."),
  new Libro("Pride & Prejudice", "Jane Austen", "Romance", 11.00, 1813, 279, "assets/images/prideandprejudice.jpg", "Pride and Prejudice has charmed generations of readers for more than two centuries. Jane Austen's much-adapted novel is famed for its witty, spirited heroine, sensational romances, and deft remarks on the triumphs and pitfalls of social convention. Author Jane Austen (1775-1817) was an English novelist whose works of social realism achieved unprecedented critical and popular success, though Austen herself remained an anonymous writer throughout her life."),
  new Libro("The Perks of Being a Wallflower", "Stephen Chbosky", "Young Adult", 13.25, 2009, 237, "assets/images/perksofbeing.jpg", "Standing on the fringes of life...offers a unique perspective. But there comes a time to see what it looks like from the dance floor. This haunting novel about the dilemma of passivity vs. passion marks the stunning debut of a provocative new voice in contemporary fiction: The Perks of Being A Wallflower. This is the story of what it's like to grow up in high school. More intimate than a diary, Charlie's letters are singular and unique, hilarious and devastating. We may not know where he lives. We may not know to whom he is writing. All we know is the world he shares. Caught between trying to live his life and trying to run from it puts him on a strange course through uncharted territory. The world of first dates and mixed tapes, family dramas and new friends. The world of sex, drugs, and The Rocky Horror Picture Show, when all one requires is that the perfect song on that perfect drive to feel infinite. Through Charlie, Stephen Chbosky has created a deeply affecting coming-of-age story, a powerful novel that will spirit you back to those wild and poignant roller coaster days known as growing up."),
  new Libro("Everything I Know About Love", "Dolly Alderton", "Nonfiction", 12.23, 2018, 368, "assets/images/love.jpg", "The wildly funny, occasionally heartbreaking internationally bestselling memoir about growing up, growing older, and learning to navigate friendships, jobs, loss, and love along the ride. When it comes to the trials and triumphs of becoming an adult, journalist and former Sunday Times columnist Dolly Alderton has seen and tried it all. In her memoir, she vividly recounts falling in love, finding a job, getting drunk, getting dumped, realizing that Ivan from the corner shop might just be the only reliable man in her life, and that absolutely no one can ever compare to her best girlfriends. Everything I Know About Love is about bad dates, good friends and—above all else— realizing that you are enough. Everything I Know About Love is about the struggles of early adulthood in all its terrifying and hopeful uncertainty."),
  new Libro("The Seven Husbands of Evelyn Hugo", "Taylor Jenkins Reid", "Romance", 9.99, 2017, 389, "assets/images/evelyn.webp", "Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself. Why her? Why now?. Monique is not exactly on top of the world. Her husband has left her, and her professional life is going nowhere. Regardless of why Evelyn has selected her to write her biography, Monique is determined to use this opportunity to jumpstart her career. Summoned to Evelyn’s luxurious apartment, Monique listens in fascination as the actress tells her story. From making her way to Los Angeles in the 1950s to her decision to leave show business in the ‘80s, and, of course, the seven husbands along the way, Evelyn unspools a tale of ruthless ambition, unexpected friendship, and a great forbidden love. Monique begins to feel a very real connection to the legendary star, but as Evelyn’s story nears its conclusion, it becomes clear that her life intersects with Monique’s own in tragic and irreversible ways."),
  new Libro("Ready Player One", "Ernest Cline", "Science Fiction", 7.99, 2011, 374, "assets/images/readyplayerone.jpg", "In the year 2044, reality is an ugly place. The only time teenage Wade Watts really feels alive is when he's jacked into the virtual utopia known as the OASIS. Wade's devoted his life to studying the puzzles hidden within this world's digital confines, puzzles that are based on their creator's obsession with the pop culture of decades past and that promise massive power and fortune to whoever can unlock them. But when Wade stumbles upon the first clue, he finds himself beset by players willing to kill to take this ultimate prize. The race is on, and if Wade's going to survive, he'll have to win—and confront the real world he's always been so desperate to escape."),
  new Libro("Six of Crows", "Leigh Bardugo", "Fantasy", 16.5, 2015, 495, "assets/images/sixofcrows.jpg", "Ketterdam: a bustling hub of international trade where anything can be had for the right price—and no one knows that better than criminal prodigy Kaz Brekker. Kaz is offered a chance at a deadly heist that could make him rich beyond his wildest dreams. But he can’t pull it off alone... A convict with a thirst for revenge. A sharpshooter who can’t walk away from a wager. A runaway with a privileged past. A spy known as the Wraith. A Heartrender using her magic to survive the slums. A thief with a gift for unlikely escapes. Six dangerous outcasts. One impossible heist. Kaz’s crew is the only thing that might stand between the world and destruction—if they don’t kill each other first."),
  new Libro("The Bell Jar", "Sylvia Plath", "Autobiography", 12.10, 1963, 288, "assets/images/thebelljar.webp", "The Bell Jar chronicles the crack-up of Esther Greenwood: brilliant, beautiful, enormously talented, and successful, but slowly going under -- maybe for the last time. Sylvia Plath masterfully draws the reader into Esther's breakdown with such intensity that Esther's insanity becomes completely real and even rational, as probable and accessible an experience as going to the movies. Such deep penetration into the dark and harrowing corners of the psyche is an extraordinary accomplishment and has made The Bell Jar a haunting American classic."),
  new Libro("The Outsiders", "S.E. Hinton", "Classics", 8.99, 1967, 214, "assets/images/theoutsiders.png", "No one ever said life was easy. But Ponyboy is pretty sure that he's got things figured out. He knows that he can count on his brothers, Darry and Sodapop. And he knows that he can count on his friends - true friends who would do anything for him, like Johnny and Two-Bit. And when it comes to the beating up on greasers like him and his friends - he knows that he can count on them for trouble. But one night someone takes things too far, and Ponyboy's world is turned upside down..."),
  new Libro("Tomorrow, and Tomorrow, and Tomorrow", "Gabrielle Zevin", "Literary Fiction", 13.99, 2022, 401, "assets/images/tomorrowx3.jpg", "In this exhilarating novel, two friends—often in love, but never lovers—come together as creative partners in the world of video game design, where success brings them fame, joy, tragedy, duplicity, and, ultimately, a kind of immortality. On a bitter-cold day, in the December of his junior year at Harvard, Sam Masur exits a subway car and sees, amid the hordes of people waiting on the platform, Sadie Green. He calls her name. For a moment, she pretends she hasn't heard him, but then, she turns, and a game begins: a legendary collaboration that will launch them to stardom. These friends, intimates since childhood, borrow money, beg favors, and, before even graduating college, they have created their first blockbuster, Ichigo. Overnight, the world is theirs. Not even twenty-five years old, Sam and Sadie are brilliant, successful, and rich, but these qualities won't protect them from their own creative ambitions or the betrayals of their hearts.")
];

let cds = [
  new CD("The 1975", "The 1975", "Electronic", 12.99, 2013, 16, "assets/images/the1975.png", "'The 1975', by the band of the same name, is a self-titled debut album that blends electropop, funk rock, and indie rock influences, showcasing the band's adventurous and shape-shifting musical style. It features a mix of indie pop, alt-rock, and dreamy interludes, with lyrics that explore themes of sex, love, and fear. ",`<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1361258134&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/the1975" title="the1975" target="_blank" style="color: #cccccc; text-decoration: none;">the1975</a> · <a href="https://soundcloud.com/the1975/oh-caroline" title="Oh Caroline" target="_blank" style="color: #cccccc; text-decoration: none;">Oh Caroline</a></div>`),
  new CD("Clics Modernos", "Charly Garcia", "Rock", 14.99, 1983, 9, "assets/images/clicsmodernos.jpg", "Es un álbum emblemático que marcó un punto de inflexión en su carrera, explorando nuevos sonidos y ritmos, incluyendo el uso de máquinas de ritmo. Es conocido por su contenido lírico, que refleja la realidad social y política de la época, especialmente en canciones como 'Los Dinosaurios'. El álbum también destaca por su innovación musical y su impacto en la escena del rock argentino. ", `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1183381234&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/xy_xy" title="Flexaxy" target="_blank" style="color: #cccccc; text-decoration: none;">Flexaxy</a> · <a href="https://soundcloud.com/xy_xy/charly-garcia-clics-modernos-1983" title="Charly García - Clics Modernos (1983)" target="_blank" style="color: #cccccc; text-decoration: none;">Charly García - Clics Modernos (1983)</a></div>`),
  new CD("Clancy", "Twenty One Pilots", "Alternative", 20.00, 2024, 13, "assets/images/clancy.png", "Clancy is Twenty One Pilots' seventh studio album, released in May 2024. It's the concluding installment in their conceptual narrative series, beginning with 'Blurryface' and culminating in 'Clancy'. The album explores themes of mental health, addiction, fame, and escaping a dystopian world called DEMA. It blends various musical styles, including alternative rock, pop rock, hip hop, and synth-pop. ", `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1806334068&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/twentyonepilots" title="twentyonepilots" target="_blank" style="color: #cccccc; text-decoration: none;">twentyonepilots</a> · <a href="https://soundcloud.com/twentyonepilots/backslide" title="Backslide" target="_blank" style="color: #cccccc; text-decoration: none;">Backslide</a></div>`),
  new CD("Folklore", "Taylor Swift", "Alternative", 12.5, 2020, 16, "assets/images/folklore.png", "It is a 2020 release characterized by its indie-folk sound and introspective themes, exploring ideas of escapism and storytelling during the COVID-19 pandemic. It deviates from Swift's usual pop style, featuring mellow ballads with piano, guitars, and strings. The album weaves together fictional narratives, including a love triangle between fictional characters, and draws inspiration from Swift's home and family history. ", `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1041449656&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/officialmusicland" title="Music Land!" target="_blank" style="color: #cccccc; text-decoration: none;">Music Land!</a> · <a href="https://soundcloud.com/officialmusicland/august-acoustic" title="august (Acoustic)" target="_blank" style="color: #cccccc; text-decoration: none;">august (Acoustic)</a></div>`),
  new CD("IGOR", "Tyler,The Creator", "Hip-Hop", 14.39, 2019, 12, "assets/images/igor.jpg", "It is a concept album exploring a love triangle and the emotional journey of a love interest. The album follows a narrative arc, beginning with the initial spark of attraction, progressing through periods of hope and heartbreak, and culminating in acceptance and a possible friendship. It's characterized by a blend of hip-hop, neo-soul, R&B, funk, and pop, with a focus on synth-heavy production and lo-fi vocals. ", `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/621622326&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/tylerthecreatorofficial" title="Tyler, The Creator" target="_blank" style="color: #cccccc; text-decoration: none;">Tyler, The Creator</a> · <a href="https://soundcloud.com/tylerthecreatorofficial/earfquake" title="EARFQUAKE" target="_blank" style="color: #cccccc; text-decoration: none;">EARFQUAKE</a></div>`),
  new CD("Melodrama", "Lorde", "Alternative", 23.00, 2017, 11, "assets/images/melodrama.webp", "It is a loose concept album exploring themes of solitude and heartbreak, framed around a single house party. It's known for its maximalist sound, moving away from the minimalist style of her debut album, Pure Heroine. The album features songs like Green Light, Supercut, and Liability, which delve into the emotional rollercoaster of a breakup and the search for identity in the face of solitude. ", `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/310382926&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/lordemusic" title="LordeMusic" target="_blank" style="color: #cccccc; text-decoration: none;">LordeMusic</a> · <a href="https://soundcloud.com/lordemusic/green-light" title="Green Light" target="_blank" style="color: #cccccc; text-decoration: none;">Green Light</a></div>`),
  new CD("Punisher", "Phoebe Bridgers", "Indie Rock", 13.2, 2020, 11, "assets/images/punisher.png", "a 2020 indie rock album exploring themes of loss, death, and the complexities of relationships. It's known for its lyrical honesty, often described as dreamlike and surreal. The album's title track, 'Punisher' is particularly notable, reflecting Bridgers' obsession with Elliot Smith and her self-perception as a 'punisher'. ", `<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1074736837&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/phoebebridgers" title="phoebe bridgers" target="_blank" style="color: #cccccc; text-decoration: none;">phoebe bridgers</a> · <a href="https://soundcloud.com/phoebebridgers/sets/punisher-7" title="Punisher" target="_blank" style="color: #cccccc; text-decoration: none;">Punisher</a></div>`),
  new CD("The Tortured Poets Department", "Taylor Swift", "Synth Pop", 35.00, 2024, 16, "assets/images/ttpd.png", "Taylor Swift's 11th studio album, explores themes of heartbreak, grief, and betrayal, focusing on the end of a long-term relationship and a subsequent whirlwind romance. It delves into the raw emotional aftermath of those experiences, offering a deeply personal and often raw exploration of love's complexities and failures. ", `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1803423213&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/taylorswiftofficial" title="Taylor Swift" target="_blank" style="color: #cccccc; text-decoration: none;">Taylor Swift</a> · <a href="https://soundcloud.com/taylorswiftofficial/i-can-do-it-with-a-broken" title="I Can Do It With a Broken Heart" target="_blank" style="color: #cccccc; text-decoration: none;">I Can Do It With a Broken Heart</a></div>`),
  new CD("Abbey Road", "The Beatles", "Rock", 14.00, 1969, 17, "assets/images/abbeyroad.jpg", "Abbey Road is a road in north-west London, famous for both the Abbey Road Studios, a world-renowned recording studio, and the iconic zebra crossing featured on the cover of The Beatles' album of the same name. This album, released in 1969, is considered one of their finest and marks a valedictory point in their career. ", `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1167647131&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/music-589780849" title="Rich" target="_blank" style="color: #cccccc; text-decoration: none;">Rich</a> · <a href="https://soundcloud.com/music-589780849/the-beatles-abbey-road-full-album" title="The Beatles Abbey Road (Full Album)" target="_blank" style="color: #cccccc; text-decoration: none;">The Beatles Abbey Road (Full Album)</a></div>`),
  new CD("SOS", "SZA", "Hip-hop", 27.82, 2022, 23, "assets/images/sos.png", "SZA's 'SOS' is a multi-genre album exploring various stages of love, heartbreak, and self-discovery. It blends R&B, hip-hop, and alternative influences with folk, indie rock, and electronica elements. The album's sound is described as a 'varied palette' drawing on surf rock, grunge, and lo-fi beats. ", `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1413792211&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/waystoloveu" title="waystoloveu" target="_blank" style="color: #cccccc; text-decoration: none;">waystoloveu</a> · <a href="https://soundcloud.com/waystoloveu/sza-sos-full-album" title="SZA - Sos Full Album" target="_blank" style="color: #cccccc; text-decoration: none;">SZA - Sos Full Album</a></div>`),
  new CD("POST MORTEM", "Dillom", "Hip-Hop", 23.65, 2021, 18, "assets/images/postmortem.jpg", "Dillom's 'Post Mortem' is a concept album exploring themes of mortality and overcoming fear of death, blending hip-hop, horrorcore, and other genres. It features 18 tracks that delve into his childhood, family, love, fame, and existentialism. The album is structured around the fictional character Demian, who experiences a 'strange transformation' and ultimately kills his friends. ", `<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1369654801&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/if33lik3dying" title="lov me now not wh3n im dead !" target="_blank" style="color: #cccccc; text-decoration: none;">lov me now not wh3n im dead !</a> · <a href="https://soundcloud.com/if33lik3dying/sets/dillom-postmortem" title="DILLOM - POST MORTEM" target="_blank" style="color: #cccccc; text-decoration: none;">DILLOM - POST MORTEM</a></div>`),
  new CD("Short n' Sweet", "Sabrina Carpenter", "Pop", 44.30, 2024, 12, "assets/images/shortnsweet.webp", "The album explores Carpenter's love life and her views on 2020s dating, with the title referencing the emotional impact of her shortest relationships and her height. ", `<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1968971152&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/sabrinacarpenter" title="Sabrina Carpenter" target="_blank" style="color: #cccccc; text-decoration: none;">Sabrina Carpenter</a> · <a href="https://soundcloud.com/sabrinacarpenter/sets/short-n-sweet-deluxe-1" title="Short n&#x27; Sweet (Deluxe)" target="_blank" style="color: #cccccc; text-decoration: none;">Short n&#x27; Sweet (Deluxe)</a></div>`)
];

let peliculas = [
  new Pelicula("Interstellar", "Christopher Nolan", "Science Fiction", 9.30, 2014, 169, "assets/images/interstellar.jpg", "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.", `<iframe width="100%" height="315" src="https://www.youtube.com/embed/zSWdZVtXT7E?si=z3d3sN79iqJEx59t" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`),
  new Pelicula("Star Wars: A New Hope", "George Lucas", "Science Fiction", 7.99, 1977, 121, "assets/images/starwars.jpg", "A long time ago in a galaxy far, far away… Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.", `<iframe width="560" height="315" src="https://www.youtube.com/embed/vZ734NWnAHA?si=gqJ2TScX4ABAr0hD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`),
  new Pelicula("My Neighbor Totoro", "Hayao Miyazaki", "Fantasy", 10.99, 1988, 86, "assets/images/totoro.jpg", "He’s your friendly neighbourhood forest spirit! Two sisters move to the country with their father in order to be closer to their hospitalized mother, and discover the surrounding trees are inhabited by Totoros, magical spirits of the forest. When the youngest runs away from home, the older sister seeks help from the spirits to find her.", `<iframe width="560" height="315" src="https://www.youtube.com/embed/92a7Hj0ijLs?si=jfteQv_Hgzz0KQin" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`),
  new Pelicula("Eternal Sunshine of the Spotless Mind", "Michel Gondry", "Science Fiction", 9.99, 2004, 108, "assets/images/eternalsunshine.jpg", "You can erase someone from your mind. Getting them out of your heart is another story. Joel Barish, heartbroken that his girlfriend underwent a procedure to erase him from her memory, decides to do the same. However, as he watches his memories of her fade away, he realises that he still loves her, and may be too late to correct his mistake.", `<iframe width="560" height="315" src="https://www.youtube.com/embed/07-QBnEkgXU?si=ftuJM-xDj_3t0x9J" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`),
  new Pelicula("Top Gun: Maverick", "Joseph Kosinski", "Action", 15.99, 2022, 8, "assets/images/maverick.jpg", "Feel the need… The need for speed. After more than thirty years of service as one of the Navy’s top aviators, and dodging the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.", `<iframe width="560" height="315" src="https://www.youtube.com/embed/qSqVVswa420?si=OciWVKp1mhPSZwr9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`),
  new Pelicula("Lady Bird", "Greta Gerwig", "Comedy", 7.5, 2017, 94, "assets/images/ladybird.jpg", "Fly away home. Lady Bird McPherson, a strong willed, deeply opinionated, artistic 17 year old comes of age in Sacramento. Her relationship with her mother and her upbringing are questioned and tested as she plans to head off to college.", `<iframe width="560" height="315" src="https://www.youtube.com/embed/cNi_HC839Wo?si=xNOwwwZqKQpJy8kB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`),
  new Pelicula("La La Land", "Damien Chazelle", "Drama", 9.2, 2016, 129, "assets/images/lalaland.webp", "Here’s to the fools who dream. Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.", `<iframe width="560" height="315" src="https://www.youtube.com/embed/0pdqf4P9MB8?si=WB38IdUCX8rY4Tyo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`),
  new Pelicula("Whiplash", "Damien Chazelle", "Drama", 9.2, 2014, 107, "assets/images/whiplash.jpg", "The road to greatness can take you to the edge. Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, even his humanity.", `<iframe width="560" height="315" src="https://www.youtube.com/embed/7d_jQycdQGo?si=Ab53ecw34GbFQSPS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`),
  new Pelicula("The Royal Tenenbaums", "Wes Anderson", "Drama", 5.00, 2001, 110, "assets/images/royaltenenbaums.jpg", "Family isn’t a word … It’s a sentence. Royal Tenenbaum and his wife Etheline had three children and then they separated. All three children are extraordinary — all geniuses. Virtually all memory of the brilliance of the young Tenenbaums was subsequently erased by two decades of betrayal, failure, and disaster. Most of this was generally considered to be their father’s fault. “The Royal Tenenbaums” is the story of the family’s sudden, unexpected reunion one recent winter.", `<iframe width="560" height="315" src="https://www.youtube.com/embed/caMgokYWboU?si=xv1gMntgpE-0Jodb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`),
  new Pelicula("10 Things I Hate About You", "Gil Junger", "Comedy", 9.99, 1999, 97, "assets/images/tenthings.jpg", "How do I loathe thee? Let me count the ways. On the first day at his new school, Cameron instantly falls for Bianca, the gorgeous girl of his dreams. The only problem is that Bianca is forbidden to date until her ill-tempered, completely un-dateable older sister Kat goes out, too. In an attempt to solve his problem, Cameron singles out the only guy who could possibly be a match for Kat: a mysterious bad boy with a nasty reputation of his own.", `<iframe width="560" height="315" src="https://www.youtube.com/embed/uE7qjQlfoRs?si=oLNmBM9pbN9ZNRi7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`),
  new Pelicula("When Evil Lurks", "Demián Rugna", "Horror", 8.99, 2023, 100, "assets/images/whenevillurks.jpg", "There’s no point in praying. Residents of a small rural town discover that a demon is about to be born among them. They desperately try to escape before the evil is born, but it may be too late.", `<iframe width="560" height="315" src="https://www.youtube.com/embed/YrTnV6gNzno?si=Uy-14LFhXGEwUFxR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`),
  new Pelicula("I, Tonya","Craig Gillespie", "Comedy", 13.99, 2017, 120, "assets/images/itonya.jpg", "Fitting in is overrated. Competitive ice skater Tonya Harding rises amongst the ranks at the U.S. Figure Skating Championships, but her future in the sport is thrown into doubt when her ex-husband intervenes.", `<iframe width="560" height="315" src="https://www.youtube.com/embed/OXZQ5DfSAAc?si=_6hImiislaSCoj4u" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`),
];

//EVENTOS
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

//MOSTRAR LIBROS AL INICIO
mostrarProductos(libros);
activarBoton("boton1");

// mdn file input, mdn base64 (para mostrar lo que agrega el usuario)

const items = JSON.parse(localStorage.getItem('items')) || [];
const contenedorlibros = document.getElementById('contenedor-libros');
const contenedorpeliculas = document.getElementById('contenedor-peliculas');
const contenedorcds = document.getElementById('contenedor-cds');

// diferenciar si la tarjeta es de admin o no
const esAdmin = true;  // cambiar a `false` si no es admin

items.forEach(item => {
  let producto;

  if (item.tipo === "libro") {
    producto = new Libro(item.titulo, item.autor, item.genero, item.precio, parseInt(item.year), item.paginas || 0, item.imagen, item.descripcion);
  } else if (item.tipo === "pelicula") {
    producto = new Pelicula(item.titulo, item.autor, item.genero, item.precio, parseInt(item.year), item.duracion || 0, item.imagen, item.descripcion);
  } else if (item.tipo === "cd") {
    producto = new CD(item.titulo, item.autor, item.genero, item.precio, parseInt(item.year), item.canciones || 0, item.imagen, item.descripcion);
  } else {
    // y este sería lo genérico
    producto = new Producto(item.tipo, item.titulo, item.autor, item.genero, item.precio, parseInt(item.year), item.imagen, item.descripcion);
  }

  // pasar `esAdmin` a la función `crearTarjeta`
  const tarjeta = crearTarjeta(producto, esAdmin); // Ahora la función recibe un argumento que indica si es admin
  
  if (item.tipo === "libro") {
    contenedorlibros.appendChild(tarjeta);
  } else if (item.tipo === "pelicula") {
    contenedorpeliculas.appendChild(tarjeta);
  } else if (item.tipo === "cd") {
    contenedorcds.appendChild(tarjeta);
  }  

});

//Cierra el modal al hacer clic en la "x"
document.getElementById('cerrar-modal').addEventListener('click', () => {
  document.getElementById('modal').classList.add('oculto');
});

//función que abre el modal y carga contenido
function abrirModal(producto) {
  document.getElementById('modal-titulo').textContent = producto.titulo;
  document.getElementById('modal-descripcion').textContent = producto.descripcion || "Descripción no disponible";

  const modalExtra = document.createElement('div');
  modalExtra.id = "modal-extra";

  if (producto.tipo === "cd" && producto.cancionEmbed) {
    modalExtra.innerHTML = `<div class="embed-wrapper">${producto.cancionEmbed}</div>`;
  }

  if (producto.tipo === "pelicula" && producto.trailerEmbed) {
    modalExtra.innerHTML = `<div class="embed-wrapper">${producto.trailerEmbed}</div>`;
  }

  if (producto.tipo === "libro" && producto.libroEmbed) {
    modalExtra.innerHTML = `<div class="embed-wrapper">${producto.libroEmbed}</div>`;
  }

  document.getElementById('modal-descripcion').appendChild(modalExtra);
  
  document.getElementById('modal').classList.remove('oculto');
}

//cerrar el modal haciendo clic fuera del contenido
document.getElementById('modal').addEventListener('click', e => {
  if (e.target.id === 'modal') {
    document.getElementById('modal').classList.add('oculto');
  }
});


/*MODO OSCURO*/
document.addEventListener("DOMContentLoaded", function () {
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

});
