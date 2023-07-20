const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const Reiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');

const botonReiniciar = document.getElementById('boton-reiniciar');

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');

const spanMascotaJugador = document.getElementById('mascota-jugador');

const spanMascotaEnemigo = document.getElementById('mascota-enemigo');

const spanVidasJugador   = document.getElementById('vidas-jugador');
const spanVidasEnemigo   = document.getElementById('vidas-enemigo');
const sectionMensajes   = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
const contenedorAtaques = document.getElementById('contenedorAtaques');

const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');

let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let inputHypodogue;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let mascotaJugadorObjeto;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego; 
let botonAgua;
let botonTierra;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = '../assets/mokemap.webp';
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth -20;
const anchoMaximoDelMapa = 350;

if(anchoDelMapa>anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa -20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800;

mapa.widht = anchoDelMapa;
mapa.height = alturaQueBuscamos;

class Mokepon{
    constructor(nombre, foto, vida, fotoMapa){
        this.nombre  = nombre;
        this.foto    = foto;
        this.vida    = vida;
        this.ataques = [];
        this.ancho = 40;
        this.alto = 40;
        this.x = aleatorio(0, mapa.width - this.ancho);
        this.y = aleatorio(0, mapa.height -this.alto);
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.alto,
            this.ancho
        );
    }
}

let hypodogue = new Mokepon('Hypodogue', '../assets/hipo.png', 5, '../assets/hipocara.png');

let capipepo = new Mokepon('Capipepo', '../assets/capi.png', 5, '../assets/capipepo.webp') ;
let ratigueya = new Mokepon('Ratigueya', '../assets/rati.png', 5, '../assets/ratigueya.webp');

let hypodogueEnemigo = new Mokepon('Hypodogue', '../assets/hipo.png', 5, '../assets/hipocara.png');

let capipepoEnemigo = new Mokepon('Capipepo', '../assets/capi.png', 5, '../assets/capipepo.webp') ;
let ratigueyaEnemigo = new Mokepon('Ratigueya', '../assets/rati.png', 5, '../assets/ratigueya.webp');

hypodogue.ataques.push(
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🔥',id:'boton-fuego'},
    {nombre: '🌱', id:'boton-tierra'}
);
hypodogueEnemigo.ataques.push(
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🔥',id:'boton-fuego'},
    {nombre: '🌱', id:'boton-tierra'}
);

capipepo.ataques.push(
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🔥',id:'boton-fuego'},
    {nombre: '💧', id:'boton-agua'}
);
capipepoEnemigo.ataques.push(
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🔥',id:'boton-fuego'},
    {nombre: '💧', id:'boton-agua'}
);

ratigueya.ataques.push(
    {nombre: '🔥',id:'boton-fuego'},
    {nombre: '🔥',id:'boton-fuego'},
    {nombre: '🔥',id:'boton-fuego'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🌱', id:'boton-tierra'}
);
ratigueyaEnemigo.ataques.push(
    {nombre: '🔥',id:'boton-fuego'},
    {nombre: '🔥',id:'boton-fuego'},
    {nombre: '🔥',id:'boton-fuego'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🌱', id:'boton-tierra'}
);

mokepones.push(hypodogue,capipepo,ratigueya);


function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = 'none';
    sectionVerMapa.style.display = 'none';

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = ` 
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre} >
            <p> ${mokepon.nombre} </p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label> `


        contenedorTarjetas.innerHTML += opcionDeMokepones;

        inputHypodogue = document.getElementById('Hypodogue');
        inputCapipepo  = document.getElementById('Capipepo');
        inputRatigueya = document.getElementById('Ratigueya');
    });

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none';
    
    if (inputHypodogue.checked) {
        spanMascotaJugador.innerHTML = inputHypodogue.id;
        mascotaJugador = inputHypodogue.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id;
        mascotaJugador = inputCapipepo.id;
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id;
        mascotaJugador = inputRatigueya.id
    } else {
        alert('Selecciona una mascota')
    }

    extraerAtaques(mascotaJugador);
    sectionVerMapa.style.display='flex';
    iniciarMapa()
    
}
function extraerAtaques(mascotaJugador) {
    let ataques;
    for (let i=0; i<mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
    }
    mostrarAtaques(ataques);
}
function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon =`
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>`

        contenedorAtaques.innerHTML += ataquesMokepon;
    });

 // Seleccionar botones luego de crearlos
    botonFuego = document.getElementById('boton-fuego');
    botonAgua = document.getElementById('boton-agua');
    botonTierra = document.getElementById('boton-tierra');
    botones = document.querySelectorAll('.BAtaque');


}
function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥'){
                ataqueJugador.push('FUEGO 🔥');
                console.log(ataqueJugador);
                boton.style.background='#05aa7e';
                boton.disabled = true;
            }else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA 💧');
                console.log(ataqueJugador);
                boton.style.background='#05aa7e';
                boton.disabled = true;
            }else {
                ataqueJugador.push('TIERRA 🌱');
                console.log(ataqueJugador);
                boton.style.background='#05aa7e';
                boton.disabled = true;
            }
            ataqueAleatorioEnemigo();
        });
    });
}

function seleccionarMascotaEnemigo(enemigo) {
        spanMascotaEnemigo.innerHTML = enemigo.nombre
        ataquesMokeponEnemigo = enemigo.ataques
        secuenciaAtaque()    
}

function ataqueAleatorioEnemigo(){
    console.log('Ataques enemigo', ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1);
    
    if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
        ataqueEnemigo.push('FUEGO 🔥')
    }else if(ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA 💧');
    }else{
        ataqueEnemigo.push('TIERRA 🌱');
    }
    console.log(ataqueEnemigo);
    iniciarPelea();
}

function iniciarPelea(){  
    if (ataqueJugador.length === 5) {
        combate();
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
    for( let index=0; index <ataqueJugador.length; index++){
       if(ataqueJugador[index] === ataqueEnemigo[index]){
        indexAmbosOponentes(index, index);
        crearMensaje("EMPATE");
        
       } else if(ataqueJugador[index]== 'FUEGO 🔥' && ataqueEnemigo[index]== 'TIERRA 🌱') {
        indexAmbosOponentes(index, index);
        crearMensaje("GANASTE");
        victoriasJugador++;
        spanVidasJugador.innerHTML = victoriasJugador;
        } else if(ataqueJugador[index]== 'AGUA 💧' && ataqueEnemigo[index] == 'FUEGO 🔥') {
        indexAmbosOponentes(index, index);    
        crearMensaje("GANASTE");
        victoriasJugador++;
        spanVidasJugador.innerHTML = victoriasJugador;
        } else if(ataqueJugador[index] == 'TIERRA 🌱' && ataqueEnemigo[index] == 'AGUA 💧') {
        indexAmbosOponentes(index, index);        
        crearMensaje("GANASTE");
        victoriasJugador++;
        spanVidasJugador.innerHTML = victoriasJugador;
        } else {
        indexAmbosOponentes(index, index);
        crearMensaje("PERDISTE");
        victoriasEnemigo++
        spanVidasEnemigo.innerHTML = victoriasEnemigo;
         }
    }
    revisarVictorias()
}

function revisarVictorias(){
    if (victoriasJugador == victoriasEnemigo){
        crearMensajeFinal("¡¡¡ EMPATE 🤓!!!");
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("¡¡¡ GANASTE 🎉 !!!");
    }else {
        crearMensajeFinal("¡¡¡ PERDISTE 😭 !!!");
    }
}

function crearMensaje(resultado){

    let nuevoAtaqueJugador = document.createElement('p');
    let nuevoAtaqueEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo;

    ataquesDelJugador.appendChild(nuevoAtaqueJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo);
}
function crearMensajeFinal(resultadoFinal){
    
    sectionMensajes.innerHTML = resultadoFinal;
    
    Reiniciar.style.display = 'block'
}

function reiniciarJuego(){
    location.reload();
}

function aleatorio (min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}  

function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    );
  mascotaJugadorObjeto.pintarMokepon();
  hypodogueEnemigo.pintarMokepon();
  capipepoEnemigo.pintarMokepon();
  ratigueyaEnemigo.pintarMokepon();
  if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0 )
  {
    revisarColision(hypodogueEnemigo);
    revisarColision(capipepoEnemigo);
    revisarColision(ratigueyaEnemigo);
  }
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5;
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5;
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5;
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5;
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
}


function sePresionoUnaTecla(event){
    switch (event.key){
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;            
        default:
            break;
    }
}

function iniciarMapa(){
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);
    console.log(obtenerObjetoMascota,mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50);
    window.addEventListener('keydown', sePresionoUnaTecla);
    window.addEventListener('keyup', detenerMovimiento);
}

function obtenerObjetoMascota(){
    for (let i=0; i<mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
            return mokepones[i];
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x;

    const arribaMascota = 
    mascotaJugadorObjeto.y;
    const abajoMascota =
     mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
    const derechaMascota = 
    mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
    const izquierdaMascota =
     mascotaJugadorObjeto.x;

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return
    }
    detenerMovimiento();
    clearInterval(intervalo);
    console.log('Se detecto una colision');
    sectionSeleccionarAtaque.style.display= 'flex';
    sectionVerMapa.style.display = 'none';
    seleccionarMascotaEnemigo(enemigo);
} 

window.addEventListener('load',iniciarJuego);




