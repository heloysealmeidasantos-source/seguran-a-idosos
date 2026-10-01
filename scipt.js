// ==========================================
// 1. ALTERAÇÃO DO TAMANHO DA FONTE
// ==========================================
let tamanhoFonteAtual = 16;
const valorAdicionado = 2;
const valorSubtraido = 2;

const btnAumentaFonte = document.getElementById("btnAumentaTexto");
const btnDiminuiFonte = document.getElementById("btnDiminuiTexto");

btnAumentaFonte.addEventListener("click", aumentaFonte);
btnDiminuiFonte.addEventListener("click", diminuiFonte);

function aumentaFonte() {
  tamanhoFonteAtual += valorAdicionado;
  document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
}

function diminuiFonte() {
  tamanhoFonteAtual -= valorSubtraido;
  document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
}

// ==========================================
// 2. LEITURA DE TELA EM VOZ ALTA (Web Speech API)
// ==========================================
let lendo = false;

const btnLeitura = document.getElementById("btnVoz");
const btnPararLeitura = document.getElementById("btnPararVoz");

btnLeitura.addEventListener("click", lerEmVozAlta);
btnPararLeitura.addEventListener("click", pararLeitura);

function lerEmVozAlta() {
  // Se já estiver lendo, alterna entre pausar e retomar
  if (lendo) {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      btnLeitura.textContent = "⏸️ Pausar Leitura";
    } else {
      window.speechSynthesis.pause();
      btnLeitura.textContent = "▶️ Continuar Leitura";
    }
    return;
  }

  // Captura o texto contido dentro de <main>
  const conteudo = document.querySelector("main");
  if (!conteudo) return;

  const texto = conteudo.innerText;
  const fala = new SpeechSynthesisUtterance(texto);

  fala.lang = "pt-BR";
  fala.onend = finalizarLeitura;

  // Interrompe reproduções anteriores e inicia a nova
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(fala);

  lendo = true;
  btnLeitura.textContent = "⏸️ Pausar Leitura";
}

function finalizarLeitura() {
  lendo = false;
  btnLeitura.textContent = "🔊 Ouvir Página";
}

function pararLeitura() {
  window.speechSynthesis.cancel();
  finalizarLeitura();
}

// ==========================================
// 3. CONTROLE DO MODAL DE AJUDA
// ==========================================
const btnFecharModal = document.querySelector(".botao-fechar");
const modal = document.querySelector(".modal-fundo");

if (btnFecharModal && modal) {
  btnFecharModal.addEventListener("click", fechaModal);
}

function abreModal() {
  if (modal) modal.style.display = "block";
}

function fechaModal() {
  if (modal) modal.style.display = "none";
}