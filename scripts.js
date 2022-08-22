// defini as classes do projeto
const cartas = document.querySelectorAll('.memory-card');
var ganhador = document.querySelector('.winertext')

// defini as variaveis do projeto
let carta_virada = false;
let travar_tabuleiro = false;
let primeira_carta, segunda_carta;
var contador = 0;
var vez = true;

function Virar_Carta() {
	// fecha a função si a variavel
	// travar tabuleiro for verdadeira
	if (travar_tabuleiro) {
		return;
	}
	
	// rotaciona as cartas
	this.classList.add('flip');
	// registra a quantidade de clicks
	contador += 1;
	// revela qual jogador ganhou a partida
	Mostra_Ganhador();

// efetua o primeiro click
	if (!carta_virada) {
		carta_virada = true;
		primeira_carta = this;
		return;
	}

// efetua o segundo click
	segunda_carta = this;
	Checar_correspondencia();
}

// verifica si as cartas clicadas são iguais,
// si verdadeira a condição as desabilita, si falsa as vira
function Checar_correspondencia() {
	let correspondencia = primeira_carta.dataset.framework === segunda_carta.dataset.framework;
	correspondencia ? desabilitar_cartas() : cartas_desviradas();
}

function desabilitar_cartas() {
	// remove o evento de click
	primeira_carta.removeEventListener('click', Virar_Carta);
	segunda_carta.removeEventListener('click', Virar_Carta);

	// chama a função resetar tabuleiro
	resetar_tabuleiro();
}

function cartas_desviradas() {
	// trava o tabuleiro
	travar_tabuleiro = true;
	// retrocede o contador
	contador -= 2;
	// alterna a vez do jogador
	alterna_vez();
	// desvira as cartas
	setTimeout(() => {primeira_carta.classList.remove('flip');
	segunda_carta.classList.remove('flip'); 
	resetar_tabuleiro();}, 1500);

}

// transforma varivel booleana em seu oposto
function alterna_vez() {
	vez ? vez = false: vez = true;
}

// retorna o tabuleiro a seu valor original
function resetar_tabuleiro() {
	[carta_virada, travar_tabuleiro] = [false, false];
	[primeira_carta, segunda_carta] = [null, null];
}

// si quantidade de clicks for iqual ao total de cartas
// escolhe o ganhador com base na vez
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

// oculta todas as cartas do jogo
function Ocultar_cartas() {
	cartas.forEach(carta => {carta.style.display = "none";});
}

// aleatoriza cada carta ao iniciar o jogo
(function embaralhar() {
	cartas.forEach(carta => {let Posição_aleatoria = Math.floor(Math.random() * 12); 
	carta.style.order = Posição_aleatoria;});
})()

// adiciona evento de click as cartas
cartas.forEach(carta => carta.addEventListener('click', Virar_Carta));
