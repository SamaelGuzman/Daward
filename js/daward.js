const contenedorTarjetas = document.getElementById("contenedorTarjetas");
const sectionVerMapa = document.getElementById("verMapa");
const mapa = document.getElementById("mapa");

let personajes = [];
let ataqueJugador;
let opcionDePersonajes;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;
let personajeJugador;
let lienzo = mapa.getContext("2d");

let inputGuerreroJaguar;
let inputVikingo;
let inputCaballero;
let spannombreMascotaJ;
let intervalo;
let mapaBackground = new Image()
mapaBackground.src = './assets/Mapa.png'

//CLASE DE PERSONAJES, CONTIENE ATRIBUTO NOMBRE, FOTO, VIDAS, ATAQUES

class Daward {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.x = 20;
    this.y = 30;
    this.ancho = 40;
    this.alto = 40;
    this.mapaFoto = new Image();
    this.mapaFoto.src = './assets/Indicador.png';
    this.velocidadX = 0;
    this.velocidadY = 0;
  }
}

//DECLARACION DE VARIABLES CREANDO OBJETOS PARA AÑADIRLES PROPIEDADES A CADA UNO DE LOS PERSONAJES

let GuerreroJaguar = new Daward("TEOTL", "assets/GuerreroJaguar.png", 5);

let Vikingo = new Daward("SIGURD", "assets/Vikingo.png", 5);

let Caballero = new Daward("GUZMÁN", "assets/Caballero.png", 5);

//DECLARACION DE LOS ATAQUES POR CADA PERSONAJE

//ATAQUES DE GUERRERO JAGUAR (ENFOCADO A VELOCIDAD, AGILIDAD Y VERSATILIDAD EN COMBATE)

GuerreroJaguar.ataques.push(
  { nombre: "🗡", id: "boton-AtqLigero" },
  { nombre: "🗡", id: "boton-AtqLigero" },
  { nombre: "🗡", id: "boton-AtqLigero" },
  { nombre: "🪓", id: "boton-AtqPesado" },
  { nombre: "🧬", id: "boton-AtqInnato" }
);

//ATAQUES DE VIKINGO (ENFOCADO A ATAQUES PESADOS, DA;P CONTUNDENTE Y RESISTENCIA EN COMBATE)
Vikingo.ataques.push(
  { nombre: "🪓", id: "boton-AtqPesado" },
  { nombre: "🪓", id: "boton-AtqPesado" },
  { nombre: "🪓", id: "boton-AtqPesado" },
  { nombre: "🗡", id: "boton-AtqLigero" },
  { nombre: "🧬", id: "boton-AtqInnato" }
);

//ATAQUES DE CABALLERO (ENFOCADO A BALANCE INTEGRAL ES EL GUERRERO PERFECTO SI QUIERES RESISTENCIA Y AGILIDAD EN COMBATE)
Caballero.ataques.push(
  { nombre: "🗡", id: "boton-AtqLigero" },
  { nombre: "🗡", id: "boton-AtqLigero" },
  { nombre: "🪓", id: "boton-AtqPesado" },
  { nombre: "🪓", id: "boton-AtqPesado" },
  { nombre: "🧬", id: "boton-AtqInnato" }
);

personajes.push(GuerreroJaguar, Vikingo, Caballero);

//FUNCIONES

//INICIAR JUEGO
function iniciarJuego() {
  personajes.forEach((Daward) => {
    opcionDePersonajes = `
  <label class="tarjetaMascota" for=${Daward.nombre}>
  <p>${Daward.nombre}</p>
  <img src= ${Daward.foto} alt=${Daward.nombre} height="150px">
</label>
<input type="radio" id=${Daward.nombre} name="mascota">
  `;

    contenedorTarjetas.innerHTML += opcionDePersonajes;

    inputGuerreroJaguar = document.getElementById("TEOTL");
    inputVikingo = document.getElementById("SIGURD");
    inputCaballero = document.getElementById("GUZMÁN");
    spannombreMascotaJ = document.getElementById("nombreMascotaJ");
  });

  sectionVerMapa.style.display = "none";

  let sectionReiniciar = document.getElementById("reiniciar");
  sectionReiniciar.style.display = "none";

  let sectionSeleccionarAtaque = document.getElementById("tituloAtaques");
  sectionSeleccionarAtaque.style.display = "none";

  let sectionBotonesAtaques = document.getElementById("botonesAtaque");
  sectionBotonesAtaques.style.display = "none";

  let vidas = document.getElementById("ataques");
  vidas.style.display = "none";

  let sectionmensajes = document.getElementById("mensajes");
  sectionmensajes.style.display = "none";

  let botonMascota = document.getElementById("boton-mascota");
  botonMascota.addEventListener("click", seleccionarMascota);

  let botonFuego = document.getElementById("boton-AtqLigero");
  botonFuego.addEventListener("click", ataqueFuego);
  let botonAgua = document.getElementById("boton-AtqPesado");
  botonAgua.addEventListener("click", ataqueAgua);
  let botonTierra = document.getElementById("boton-AtqInnato");
  botonTierra.addEventListener("click", ataqueTierra);

  let botonReiniciar = document.getElementById("boton-reiniciar");
  botonReiniciar.addEventListener("click", reiniciarJuego);
}

//ELEGIR MASCOTA
function seleccionarMascota() {
  //OCULTA LA SECCION DE SELECCIONAR MASCOTA
  let secctionSeleccionarMascota = document.getElementById("eligeMascota");
  secctionSeleccionarMascota.style.display = "none";

  //ME MUESTRA LA SECCION SELECCION DE ATAQUES CUANDO ENTRAMOS A ESTE BLOQUE
  //let secctionSeleccionarAtaque = document.getElementById("tituloAtaques");
  //secctionSeleccionarAtaque.style.display = "flex";

  sectionVerMapa.style.display = "flex";
  pintarCanvas();


  iniciarMapa()


  // let sectionBotonesAtaques = document.getElementById("botonesAtaque");
  // sectionBotonesAtaques.style.display = "flex";

  // let vidas = document.getElementById("ataques");
  // vidas.style.display = "grid";

  //BOTON PARA REINICIAR JUEGO
  // let secctionmensajes = document.getElementById("mensajes");
  // secctionmensajes.style.display = "flex";

  if (inputGuerreroJaguar.checked == true) {
    alert("Elegiste TEOTL");
    spannombreMascotaJ.innerHTML = inputGuerreroJaguar.id;
    personajeJugador = inputGuerreroJaguar;
  } else if (inputVikingo.checked == true) {
    alert("Elegiste SIGURD");
    spannombreMascotaJ.innerHTML = inputVikingo.id;
    personajeJugador = inputVikingo;
  } else if (inputCaballero.checked == true) {
    alert("Elegiste GUZMÁN");
    spannombreMascotaJ.innerHTML = inputCaballero.id;
    personajeJugador = inputCaballero;
  } else {
    alert("No elegiste ningun guerrero todavia");
    reiniciarJuego();
    end;
  }

  if (
    inputCaballero.checked ||
    inputVikingo.checked ||
    inputGuerreroJaguar.checked
  ) {
    seleccionarMascotaEnemigo();
  } else {
    end;
  }
}

//SELECCIONAR ENEMIGO ALEATORIAMENTE
function seleccionarMascotaEnemigo() {
  let seleccionarMascotaAleatorio = aleatorio(0, personajes.length - 1);
  let spannombreMascotaE = document.getElementById("nombreMascotaE");

  spannombreMascotaE.innerHTML = personajes[seleccionarMascotaAleatorio].nombre;
}

// FUNCION PARA HACER ALEATORIO ENTRE UN RANGO DE NUMEROS
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//FUNCION ATAQUE FUEGO

function ataqueFuego() {
  ataqueJugador = "ATAQUE LIGERO";
  ataqueAleatorioEnemigo();
}
//FUNCION ATAQUE AGUA
function ataqueAgua() {
  ataqueJugador = "ATAQUE PESADO";
  ataqueAleatorioEnemigo();
}
//FUNCION ATAQUE TIERRA
function ataqueTierra() {
  ataqueJugador = "HABILIDAD INNATA";
  ataqueAleatorioEnemigo();
}
//FUNCION ATAQUE ALEATORIO ENEMIGO
function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "ATAQUE LIGERO";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "ATAQUE PESADO";
  } else if (ataqueAleatorio == 3) {
    ataqueEnemigo = "HABILIDAD INNATA";
  }
  combate();
}

//FUNCION DE MENSAJE COMBATE
function crearMensaje(RESULTADO) {
  let sectionMensaje = document.getElementById("resultado");
  let ataquesJugador = document.getElementById("ataquesJugador");
  let ataquesEnemigo = document.getElementById("ataquesEnemigo");

  let nuevoAtaquedelJugador = document.createElement("p");
  let nuevoAtaquedelEnemigo = document.createElement("p");

  sectionMensaje.innerHTML = RESULTADO;
  nuevoAtaquedelJugador.innerHTML = ataqueJugador;
  nuevoAtaquedelEnemigo.innerHTML = ataqueEnemigo;

  ataquesJugador.appendChild(nuevoAtaquedelJugador);
  ataquesEnemigo.appendChild(nuevoAtaquedelEnemigo);
}

//LOGICA DE COMBATE
function combate() {
  let spanVidasJugador = document.getElementById("vidasJugador");
  let spanVidasEnemigo = document.getElementById("vidasEnemigo");

  if (ataqueJugador == ataqueEnemigo) {
    crearMensaje("EMPATE 🦴🤺🦴");
  } else if (
    (ataqueJugador == "ATAQUE LIGERO" && ataqueEnemigo == "HABILIDAD INNATA") ||
    (ataqueJugador == "ATAQUE PESADO" && ataqueEnemigo == "ATAQUE LIGERO") ||
    (ataqueJugador == "HABILIDAD INNATA" && ataqueEnemigo == "ATAQUE PESADO")
  ) {
    crearMensaje("GANASTE ⚔⚔⚔");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
    if (vidasEnemigo < 1) {
      desabilitarBotones();
      alert("Ganaste!!!, eres el campeon entre campeones 🎉🎉🎉");
      let sectionReiniciar = document.getElementById("reiniciar");
      sectionReiniciar.style.display = "flex";
    }
  } else if (
    (ataqueJugador == "ATAQUE LIGERO" && ataqueEnemigo == "ATAQUE PESADO") ||
    (ataqueJugador == "ATAQUE PESADO" && ataqueEnemigo == "HABILIDAD INNATA") ||
    (ataqueJugador == "HABILIDAD INNATA" && ataqueEnemigo == "ATAQUE LIGERO")
  ) {
    crearMensaje("PERDISTE ☠");
    vidasJugador--;
    spanVidasJugador.innerHTML = vidasJugador;
    if (vidasJugador < 1) {
      desabilitarBotones();
      alert("Perdiste pero luchaste como un gran guerrero 😞😞😞");
      let sectionReiniciar = document.getElementById("reiniciar");
      sectionReiniciar.style.display = "flex";
    }
  }

  return combate;
}

//REINICIAR JUEGO CON BOTON
function reiniciarJuego() {
  location.reload();
}

//FUNCION PARA DESABILITAR BOTONES DE ATAQUE
function desabilitarBotones() {
  let botonFuego = document.getElementById("boton-AtqLigero");
  botonFuego.disabled = true;
  let botonAgua = document.getElementById("boton-AtqPesado");
  botonAgua.disabled = true;
  let botonTierra = document.getElementById("boton-AtqInnato");
  botonTierra.disabled = true;

  return;
}

function pintarCanvas() {
  GuerreroJaguar.x = GuerreroJaguar.x + GuerreroJaguar.velocidadX;
  GuerreroJaguar.y = GuerreroJaguar.y + GuerreroJaguar.velocidadY;
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(
    mapaBackground,
    0,
    0,
    mapa.width,
    mapa.height
  )
  lienzo.drawImage(
    GuerreroJaguar.mapaFoto,
    GuerreroJaguar.x,
    GuerreroJaguar.y,
    GuerreroJaguar.ancho,
    GuerreroJaguar.alto
  );
}

function moverTeotlDerecha() {
  GuerreroJaguar.velocidadX = 5;
}

function moverTeotlIzquierda() {
  GuerreroJaguar.velocidadX = -5;
}

function moverTeotlArriba() {
  GuerreroJaguar.velocidadY = -5;
}
function moverTeotlAbajo() {
  GuerreroJaguar.velocidadY = 5;
}
function detenerMovimiento() {
  GuerreroJaguar.velocidadX = 0;
  GuerreroJaguar.velocidadY = 0;
}

function sePresionoTecla(event) {
  switch (event.key) {
    case "ArrowUp":
      moverTeotlArriba();

      break;
    case "ArrowDown":
      moverTeotlAbajo();
      break;
    case "ArrowLeft":
      moverTeotlIzquierda();
      break;
    case "ArrowRight":
      moverTeotlDerecha();
      break;

    default:
      break;
  }
}

function iniciarMapa ()
{

  mapa.width = 800
  mapa.height = 400
  intervalo = setInterval(pintarCanvas, 10);
  window.addEventListener("keydown", sePresionoTecla);
  window.addEventListener("keyup", detenerMovimiento);


}


function revisarColicion  (enemigo) {
const arribaEnemigo = enemigo.y
const abajoEnemigo = enemigo.y + enemigo.alto
const derechaEnemigo = enemigo.x + enemigo.ancho
const izquierdaEnemigo = enemigo.x


const arribaGuerrero = Guerrero.y
const abajoGuerrero = Guerrero.y + Guerrero.alto
const derechaGuerrero = Guerrero.x + Guerrero.ancho
const izquierdaGuerrero = Guerrero.x

if (
  abajoGuerrero < arribaEnemigo ||
  arribaGuerrero > abajoEnemigo ||
  derechaGuerrero < izquierdaEnemigo ||
  izquierdaGuerrero > derechaEnemigo
  ) {
  return
}

alert('Hay colision')

}
 
   
  
 




//FUNCION PARA LANZAR JS CUANDO CARGUE LA PAGINA
window.addEventListener("load", iniciarJuego());
