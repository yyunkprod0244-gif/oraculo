const guessInput =
  document.getElementById("guessInput");

const guessButton =
  document.getElementById("guessButton");

const resetButton =
  document.getElementById("resetButton");

const message =
  document.getElementById("message");

const attemptsElement =
  document.getElementById("attempts");

const progressBar =
  document.getElementById("progressBar");

const historyList =
  document.getElementById("historyList");

const orbCore =
  document.querySelector(".orb-core");

const gameCard =
  document.getElementById("gameCard");

const MAX_ATTEMPTS = 10;

let secretNumber;
let attempts;
let gameOver;
let guesses = [];

/* INICIA O JOGO */

function startGame() {
  secretNumber =
    Math.floor(Math.random() * 100) + 1;

  attempts = MAX_ATTEMPTS;
  gameOver = false;
  guesses = [];

  attemptsElement.textContent =
    attempts;

  progressBar.style.width =
    "100%";

  progressBar.style.background =
    "linear-gradient(90deg, #36f1a4, #00e5ff)";

  message.textContent =
    "O número secreto foi gerado. Faça seu primeiro palpite.";

  message.className =
    "message";

  historyList.textContent =
    "Nenhum palpite registrado";

  orbCore.textContent =
    "?";

  guessInput.value =
    "";

  guessInput.disabled =
    false;

  guessButton.disabled =
    false;

  guessInput.focus();

  gameCard.style.transform =
    "rotateY(0deg) rotateX(0deg)";
}

/* ATUALIZA TENTATIVAS */

function updateAttempts() {
  attemptsElement.textContent =
    attempts;

  const percentage =
    (attempts / MAX_ATTEMPTS) * 100;

  progressBar.style.width =
    `${percentage}%`;

  if (percentage <= 40) {
    progressBar.style.background =
      "linear-gradient(90deg, #ff5577, #ff9b5c)";
  } else if (percentage <= 70) {
    progressBar.style.background =
      "linear-gradient(90deg, #ffd166, #ff9b5c)";
  } else {
    progressBar.style.background =
      "linear-gradient(90deg, #36f1a4, #00e5ff)";
  }
}

/* ADICIONA AO HISTÓRICO */

function addGuessToHistory(guess) {
  if (guesses.length === 1) {
    historyList.textContent =
      "";
  }

  const guessTag =
    document.createElement("span");

  guessTag.className =
    "guess-tag";

  guessTag.textContent =
    guess;

  historyList.appendChild(
    guessTag
  );
}

/* ENCERRA O JOGO */

function endGame() {
  gameOver = true;

  guessInput.disabled =
    true;

  guessButton.disabled =
    true;
}

/* VERIFICA O PALPITE */

function checkGuess() {
  if (gameOver) {
    return;
  }

  const guess =
    parseInt(guessInput.value);

  // Validação
  if (
    isNaN(guess) ||
    guess < 1 ||
    guess > 100
  ) {
    message.textContent =
      "Digite um número válido entre 1 e 100.";

    message.className =
      "message error";

    guessInput.focus();

    return;
  }

  // Evita números repetidos
  if (guesses.includes(guess)) {
    message.textContent =
      "Você já tentou esse número. Escolha outro.";

    message.className =
      "message error";

    guessInput.select();

    return;
  }

  guesses.push(
    guess
  );

  addGuessToHistory(
    guess
  );

  attempts--;

  updateAttempts();

  const difference =
    Math.abs(secretNumber - guess);

  // Acertou
  if (guess === secretNumber) {
    message.textContent =
      `Parabéns! Você acertou. O número secreto era ${secretNumber}.`;

    message.className =
      "message success";

    orbCore.textContent =
      secretNumber;

    endGame();

    return;
  }

  // Perdeu
  if (attempts === 0) {
    message.textContent =
      `Fim de jogo! O número secreto era ${secretNumber}.`;

    message.className =
      "message error";

    orbCore.textContent =
      secretNumber;

    endGame();

    return;
  }

  // Quase acertou
  if (difference <= 5) {
    if (guess < secretNumber) {
      message.textContent =
        "Quase lá! O número secreto é um pouco maior.";
    } else {
      message.textContent =
        "Quase lá! O número secreto é um pouco menor.";
    }

    message.className =
      "message hint";

  // Palpite menor
  } else if (guess < secretNumber) {
    message.textContent =
      "O número secreto é maior que o seu palpite.";

    message.className =
      "message hint";

  // Palpite maior
  } else {
    message.textContent =
      "O número secreto é menor que o seu palpite.";

    message.className =
      "message hint";
  }

  guessInput.value =
    "";

  guessInput.focus();
}

/* EFEITO 3D NO CARD */

document.addEventListener(
  "mousemove",
  (event) => {
    const rotateY =
      (event.clientX - window.innerWidth / 2) / 40;

    const rotateX =
      (window.innerHeight / 2 - event.clientY) / 40;

    gameCard.style.transform = `
      rotateY(${rotateY}deg)
      rotateX(${rotateX}deg)
    `;
  }
);

document.addEventListener(
  "mouseleave",
  () => {
    gameCard.style.transform =
      "rotateY(0deg) rotateX(0deg)";
  }
);

/* EVENTOS */

guessButton.addEventListener(
  "click",
  checkGuess
);

resetButton.addEventListener(
  "click",
  startGame
);

guessInput.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Enter") {
      checkGuess();
    }
  }
);

/* INICIA AUTOMATICAMENTE */

startGame();
