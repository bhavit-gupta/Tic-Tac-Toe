// Select elements
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#resetBtn");
const newGameBtn = document.querySelector("#newGameBtn");
const winMsg = document.querySelector("#winnerMsg");
const msg = document.querySelector("#msg");
const main = document.querySelector("#main");

// Game state
let turnO = true;

// Winning patterns
const winCond = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Handle box click
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.add("text-emerald-600");
        } else {
            box.innerText = "X";
            box.classList.add("text-rose-600");
        }

        box.disabled = true;
        turnO = !turnO;

        checkWinner();
    });
});

// Show winner modal
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    winMsg.classList.remove("hidden");
    main.classList.add("hidden");

    boxes.forEach((box) => (box.disabled = true));
};

// Check for winner
const checkWinner = () => {
    for (let pattern of winCond) {
        const pos1 = boxes[pattern[0]].innerText;
        const pos2 = boxes[pattern[1]].innerText;
        const pos3 = boxes[pattern[2]].innerText;

        if (pos1 && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return;
        }
    }
    checkDraw();
};

// Check for draw
const checkDraw = () => {
    let isDraw = true;

    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });

    if (isDraw) {
        msg.innerText = "It's a Draw!";
        winMsg.classList.remove("hidden");
        main.classList.add("hidden");
    }
};

// Reset game
const resetGame = () => {
    turnO = true;

    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
        box.classList.remove("text-emerald-600", "text-rose-600");
    });

    winMsg.classList.add("hidden");
    main.classList.remove("hidden");
};

// Button listeners
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
