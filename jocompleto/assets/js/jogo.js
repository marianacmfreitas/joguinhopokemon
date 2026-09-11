var velocidade = 1
var pontos = 0
var vida = 3
var valorCenario = 0
var posVilao = -153
var posPersonagem = 70
var pulando = false
var pulos = 0

var recorde = localStorage.getItem("recorde")

var cenario = document.querySelector(".cenario")
var jogador = document.querySelector("#jogador")
var vilao = document.querySelector("#vilao")

var img1 = document.querySelector("#img1")
var img2 = document.querySelector("#img2")
var img3 = document.querySelector("#img3")


function moverCenario() {
    valorCenario = valorCenario - velocidade
    cenario.style.backgroundPositionX = valorCenario + "px"
}

function moverVilao(){
     posVilao = posVilao + velocidade * 4
    vilao.style.right = posVilao + "px"

    var larguraJogo = cenario.offsetWidth

    if (posVilao > larguraJogo) {
        posVilao = -153
        pontos = pontos + 10

        document.querySelector("#valorPontos").innerHTML = pontos

        if (pontos >= 10) {
            duploPulo = true
        }

        if (pontos % 2 === 0 && velocidade < 6) {
            velocidade = velocidade + 0.5
        // } melhorar velocidade
        }
    }
}
   


var contador = 0

function pular() {
    var velocidadepulo= 5
    if (pulando === true) {

        if (posPersonagem < 300) {
            posPersonagem += velocidadepulo + 2
        } 
        
        else {
            if (contador >= 8) {
                pulando = false
                contador = 0
            } 
            
            else {
                contador += 1
            }
        }

    } 
    
    else {

        if (posPersonagem > 70) {
            posPersonagem -= velocidadepulo + 2
        } 
        
        else {
            posPersonagem = 70
            pulos = 0 
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

        posVilao = -153

        perderVidas()
        
        pulando = false
        posPersonagem = 70
        pulos = 0

        document.querySelector("#somDano").play()
    }
}

function perderVidas(){
        vida -= 1
 
        if(vida == 2){
            img3.style.display = 'none';
        }
        if(vida == 1){
            img2.style.display = 'none';
        }
        else if(vida == 0){
            img1.style.display = 'none';
            
            if(pontos > Number(recorde)) {
                localStorage.setItem('recorde', pontos)
            }

            window.location.href = "gameover.html"
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

function mudarpersonagem(){
    var perosnagem = document.querySelector('#jogador')

    if(pontos === 10){
        perosnagem.style.backgroundImage = 'url(./assets/img/personagem1.png)'
    }

    else if(pontos === 20){
        perosnagem.style.backgroundImage = 'url(./assets/img/personagem2.png)'
    }

    else if (pontos === 30){
        perosnagem.style.backgroundImage = 'url(./assets/img/personagem3.png)'
    }
}

function mudarvilao(){
    var vilaomudando = document.querySelector('#vilao')

    if(pontos === 10){
        vilaomudando.style.backgroundImage = 'url(./assets/img/vilao1.png)'
    }

    else if(pontos === 20){
        vilaomudando.style.backgroundImage = 'url(./assets/img/vilao2.png)'
    }

    else if(pontos === 30){
        vilaomudando.style.backgroundImage =  'url(./assets/img/vilao1.png)'
    }
}

setInterval(function () {
    moverCenario()
    moverVilao()
    pular()
    colisao()
    mudarcenario()
    mudarpersonagem()
}, 20)

document.addEventListener("keypress", function (event) {

    if (event.code === "Space") {

        if (posPersonagem <= 70) {
            pulando = true
            pulos = pulos + 1
        }

        else if (pontos >=0 && pulos <=2) {
           pulando = true
            pulos = pulos + 1 
        }
        // dois pulos 
    }

    document.querySelector("#meuSom").play()
})