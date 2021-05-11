'use strict';

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/
let btnStart = document.getElementById("firing-button")
let rocket = document.getElementById('rocket')
let ramp = document.getElementById('launching-ramp')
let billboard = document.querySelector('#billboard span')
let html = document.querySelector("html")
let cancelButton = document.querySelector('#cancel-button')
let resetBtn = document.querySelector("#reset-chrono")
let count = 10
let x, y, sizeStar
let intervalChrono

/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/

function startChrono() {
    billboard.innerHTML = count
    cancelButton.classList.remove("disabled")
    disabledBtn()
    rocket.src = "images/rocket2.gif"

    intervalChrono = window.setInterval(() => {

        billboard.innerHTML = --count
        if (count === 0) {
            window.clearInterval(intervalChrono)
            rocket.src = "images/rocket3.gif"
            rocket.classList.add("tookOff")
            cancelButton.removeEventListener('click', cancelChrono)
            cancelButton.classList.add("disabled")
        }
        cancelButton.addEventListener('click', cancelChrono)

    }, 1000)

}

function cancelChrono() {
    if (count > 0) {
        window.clearInterval(intervalChrono)
        btnStart.addEventListener("click", startChrono, true)
        cancelButton.classList.add("disabled")
        btnStart.classList.remove("disabled")
    } else {
        cancelButton.classList.add("disabled")
    }
}

function resetChrono() {
    window.clearInterval(intervalChrono)
    count = 10
    billboard.innerHTML = count
    rocket.src = "images/rocket1.png"
    cancelChrono()

}

function disabledBtn() {
    if (!btnStart.classList.contains("disabled")) {
        btnStart.classList.add("disabled")
        btnStart.removeEventListener("click", startChrono, true)
    }
}

function randomStar() {
    sizeStar = getRandomInteger(1, 3);
    switch (sizeStar) {
        case 1:
            return "tiny";
            break;
        case 2:
            return "normal";
            break;
        case 3:
            return "big";
            break;
    }
}

function randomPositionY() {

    let y = getRandomInteger(1, window.innerHeight - 3);
    return y;

}

function randomPositionX() {

    let x = getRandomInteger(1, window.innerWidth - 3);
    return x;

}

function displayStar() {

    let star = []

    for (let i = 0; i < 150; i++) {

        star[i] = document.createElement("div");
        document.body.appendChild(star[i]);
        star[i].classList.add("star")

        star[i].classList.add(randomStar())

        star[i].style.top = randomPositionY() + "px"
        star[i].style.left = randomPositionX() + "px"

    }
}


/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/
cancelButton.classList.add("disabled")

displayStar()

btnStart.addEventListener("click", startChrono, true)

resetBtn.addEventListener('click', resetChrono)