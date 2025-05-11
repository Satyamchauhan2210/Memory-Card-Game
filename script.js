const board = document.getElementById("game-board");
const movesText = document.getElementById("moves");
const timerText = document.getElementById("timer");
const restartBtn = document.getElementById("restart");
const congratsMsg = document.getElementById("congrats");

const images = [
    "🍎", "🍌", "🍇", "🍓", "🍍", "🥝", "🍑", "🍒"
]; // Use emojis or use image URLs

let cards = [];
let flippedCards = [];
let matched = 0;
let moves = 0;
let timer;
let time = 0;
let gameStarted = false;

function shuffle(array) {
    return array.concat(array).sort(() => Math.random() - 0.5);
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        timerText.textContent = time;
    }, 1000);
}

function resetGame() {
    cards = shuffle(images);
    board.innerHTML = "";
    flippedCards = [];
    matched = 0;
    moves = 0;
    time = 0;
    gameStarted = false;
    clearInterval(timer);
    timerText.textContent = "0";
    movesText.textContent = "0";
    congratsMsg.classList.add("hidden");

    cards.forEach((img, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = img;

        card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back" style="display: flex; justify-content: center; align-items: center; font-size: 2rem;">${img}</div>
      </div>
    `;

        card.addEventListener("click", () => flipCard(card));
        board.appendChild(card);
    });
}

function flipCard(card) {
    if (
        card.classList.contains("flipped") ||
        flippedCards.length === 2
    ) return;

    if (!gameStarted) {
        gameStarted = true;
        startTimer();
    }

    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moves++;
        movesText.textContent = moves;

        const [first, second] = flippedCards;
        if (first.dataset.image === second.dataset.image) {
            matched += 2;
            flippedCards = [];

            if (matched === cards.length) {
                clearInterval(timer);
                congratsMsg.classList.remove("hidden");
            }
        } else {
            setTimeout(() => {
                first.classList.remove("flipped");
                second.classList.remove("flipped");
                flippedCards = [];
            }, 1000);
        }
    }
}

restartBtn.addEventListener("click", resetGame);

resetGame();