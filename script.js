const html = document.querySelector('html')
const btnFoco = document.querySelector('.app__card-button--foco')
const btnCurto = document.querySelector('.app__card-button--curto')
const btnLongo = document.querySelector('.app__card-button--longo')
const startPauseBt = document.querySelector('#start-pause')
const startPauseBotao = document.querySelector('#start-pause span')
const imgStartPausebt = document.querySelector('.app__card-primary-butto-icon')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const tempoNaTela = document.querySelector('#timer')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const beep = new Audio('/sons/beep.mp3')
const play = new Audio('/sons/play.wav')
const pause = new Audio('/sons/pause.mp3')
musica.loop = true;

let tempoDecorridoEmSegundos = 1500 //Define o tempo inicial em 1500ms
let intervaloId = null //Variavel responsável por definit o intervalo como nulo

//Pausa o contador caso este esteja em processo de contagem e inicia caso esteja pausado, almém de executar os respectivos audios.
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

//Altera o contexto da pagina quando clicado no botão foco
btnFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    btnFoco.classList.add('active')

})

//Altera o contexto da pagina quando clicado no botão descanso curto
btnCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    btnCurto.classList.add('active')


})

//Altera o contexto da pagina quando clicado no botão descanso longo
btnLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    btnLongo.classList.add('active')
})

//Função responsávem por mostrar os tempos, alterar os textos e imagens de acordo com o contexto
function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;

        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superficie.
            <strong class="app__title-strong">faça uma pausa longa.</strong>            
            `
            break;

        default:
            break;
    }

}

//Caso o contador seja menor ou igual a 0, é iniciado o audio beep e exibido o alerta de Tempo Finalizado
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        zerar()
        beep.play()
        alert('Tempo Finalizado!')
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}



//Função responsável por iniciar o contador, caso esse esteja zerado, além de reproduzir os audios e alterar o texto de Começar para Pausar
function iniciarOuPausar() {
    if (intervaloId == null) {
        play.play()
        startPauseBotao.textContent = 'Pausar'
        imgStartPausebt.setAttribute('src', '/imagens/pause.png')
        intervaloId = setInterval(contagemRegressiva, 1000)
    }
    else if (intervaloId != null) {
        pause.play()
        startPauseBotao.textContent = 'Começar'
        imgStartPausebt.setAttribute('src', '/imagens/play_arrow.png')
        zerar()
        return
    }


}

//Evento de click que aciona a função IniciarOuPausar
startPauseBt.addEventListener('click', iniciarOuPausar)


//Função que zera o contador utilizando clearInterval
function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
}

function alterarFoco(contexto) {

}
//Exibe o tempo do contador de acordo com o formato definido
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`

}

mostrarTempo()