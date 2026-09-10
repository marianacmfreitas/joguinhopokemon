var velocidade = 1
var pontos = 0
var vida = 3
var valorCenario = 0
var posVilao = -153
var posPersonagem = 70
var pulando = false

var cenario = document.querySelector(".cenario")
var jogador = document.querySelector("#jogador")
var vilao = document.querySelector("#vilao")

function moverCenario() {
    valorCenario = valorCenario - velocidade
    cenario.style.backgroundPositionX = valorCenario + "px"
}

function moverVilao() {
    posVilao = posVilao + velocidade * 2
    vilao.style.right = posVilao + "px"

    var larguraJogo = cenario.offsetWidth

    if (posVilao > larguraJogo) {
        posVilao = -153
        pontos = pontos + 10

        document.querySelector("#valorPontos").innerHTML = pontos

        if (pontos % 50 === 0) {
            velocidade = velocidade + 1
        }
    }
}

var contador = 0

function pular() {

    if (pulando === true) {
        if (posPersonagem < 350) {
            posPersonagem += velocidade + 3
        } else {
            if (contador >= 12) {
                pulando = false
                contador = 0
            } else {
                contador += 1
            }
        }
    } else {
        if (posPersonagem > 70) {
            posPersonagem -= velocidade + 2
        } else {
            posPersonagem = 70
        }
    }

    jogador.style.bottom = posPersonagem + "px"
}

function colisao() {
    var posJ = jogador.getBoundingClientRect()
    var posV = vilao.getBoundingClientRect()

    if (posV.left < posJ.right &&
        posV.left > posJ.left &&
        posV.top <= posJ.bottom) {

        vida = vida - 1
        posVilao = -153
        pulando = false
        posPersonagem = 70


        if (vida == 0) {
            localStorage.setItem('record', pontos)
            window.location.href = "gameover.html"
        }

        document.querySelector('#valorVidas').innerHTML = vida
        document.querySelector("#somDano").play()
    }

}

function mudarcenario() {
    var cenario = document.querySelector('.cenario')



    if (pontos === 10) {
        cenario.style.backgroundImage = "url(./assets/img/cenario1.png)"
    }

    else if (pontos === 20) {
        cenario.style.backgroundImage = "url(./assets/img/cenario2.png)"
    }

    else if (pontos === 30) {
        cenario.style.backgroundImage = "url(./assets/img/cenario3.png)"
    }


}



setInterval(function () {
    moverCenario()
    moverVilao()
    pular()
    colisao()
    mudarcenario()
}, 20)


document.addEventListener("keypress", function (event) {

    if (event.code === "Space" && posPersonagem === 70) {
        pulando = true
    }

    document.querySelector("#meuSom").play()

})

