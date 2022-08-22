const cartas = document.querySelectorAll('.memory-card');

var teste = document.querySelector('.memory-card');
var ganhador = document.querySelector('.winertext')
//subtitulo.style.fontSize = "70px"
//subtitulo.style.color = "#FFF"
//subtitulo.style.display = "flex"
//cartas.style.display = "none";

let carta_virada = false;
let travar_tabuleiro = false;
let primeira_carta, segunda_carta;
var contador = 0;
var vez = true;
let ponteiros = [];

function Virar_Carta() {
	if (travar_tabuleiro) return;
	if (this === primeira_carta) return;
	 
	this.classList.add('flip');
	contador = contador + 1;
	Mostra_Ganhador();

	if (contador < 12) {
		ponteiros.push(this)
		console.log(ponteiros)
	}

	if (!carta_virada) {
		carta_virada = true;
		primeira_carta = this;
		//console.log(primeira_carta);
		return;
	}

	segunda_carta = this;
	Checar_correspondencia();
}

function Checar_correspondencia() {
	let correspondencia = primeira_carta.dataset.framework === segunda_carta.dataset.framework;
	correspondencia ? desabilitar_cartas() : cartas_desviradas();
}

function desabilitar_cartas() {
	primeira_carta.removeEventListener('click', Virar_Carta);
	segunda_carta.removeEventListener('click', Virar_Carta);

	resetar_tabuleiro();
}

function cartas_desviradas() {
	travar_tabuleiro = true;
	contador -= 2;
	ponteiros.pop()
	ponteiros.pop()
	alterna_vez();

	setTimeout(() => {
	primeira_carta.classList.remove('flip');
	segunda_carta.classList.remove('flip');

	resetar_tabuleiro();
}, 1500);
}

function alterna_vez() {
	vez ? vez = false: vez = true;
}

function resetar_tabuleiro() {
	[carta_virada, travar_tabuleiro] = [false, false];
	[primeira_carta, segunda_carta] = [null, null];
}

function Mostra_Ganhador() {
	if (vez === true && contador === 12) {
		ganhador.style.display = "flex"
		ganhador.textContent = "Jogador 1 venceu";
		resetar_tabuleiro();
		Ocultar_cartas()
	}
	else if (vez === false && contador === 12) {
		ganhador.style.display = "flex"
		ganhador.textContent = "Jogador 2 venceu";
		Ocultar_cartas()
	}
}

function Ocultar_cartas() {
	tamanho = contador -1
	for (let i = 0; i < tamanho; i ++) {
		ponteiros[i].style.display = "none"
	}
}

cartas.forEach(carta => carta.addEventListener('click', Virar_Carta));
