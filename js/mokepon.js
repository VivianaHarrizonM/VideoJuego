function iniciarJuego(){
    let botonMascotaJugador = document.getElementById('boton-mascota');
botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
}

function seleccionarMascotaJugador(){
    let inputHypodoge = document.getElementById("hypodoge");
    let inputCapipepo = document.getElementById("capipepo");
    let inputRatigueya =document.getElementById("ratigueya");

    if (inputHypodoge.checked){
        alert("Usted ha seleccionado a Hypodoge")
    }else if (inputCapipepo.checked){
        alert("Usted ha seleccionado a Capipepo")
    }else if (inputRatigueya.checked){
        alert("Usted ha seleccionado a Ratigueya")
    }
}

window.addEventListener('load',iniciarJuego);