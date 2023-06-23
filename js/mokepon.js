function iniciarJuego(){
    let botonMascotaJugador = document.getElementById('boton-mascota');
botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
}

function seleccionarMascotaJugador(){
    if (document.getElementById("hypodoge").checked == true){
        alert("Usted ha seleccionado hypodoge")
    }
    else if (document.getElementById("capipepo").checked == true){
        alert("Usted ha seleccionado capipepo")
    }
    else if (document.getElementById("ratigueya").checked == true){
        alert("Usted ha seleccionado ratigueya")
    }
}

window.addEventListener('load',iniciarJuego);