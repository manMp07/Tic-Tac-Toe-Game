let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let resetButton = document.querySelector("#resetButton");
let newGameButton = document.querySelector("#newGameButton");
let mainContent = document.querySelector("main");

let count = 0;
let turnO = true;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const resetGame = () => {
    count = 0;
    turnO = true;
    enableBoxes();
    mainContent.classList.remove("hide");
    msgContainer.classList.add("hide");
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        count++;
        if(turnO)
            box.innerText = 'O';
        else
            box.innerText = 'X';
        turnO = !turnO;
        box.disabled = true;
        checkWinner(count);
    })
})

const checkWinner = (count) => {
    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 !== "" && pos2 !== "" && pos3 !== ""){
            if(pos1 === pos2 && pos2 === pos3){
                showWinner(pos1);
                return;
            }
        }
    }
    if(count == 9)
        showWinner("Draw");
}

const showWinner = (winner) => {
    msgContainer.classList.remove("hide");
    mainContent.classList.add("hide");
    if(winner == "Draw")
        msg.innerText = "OOPS! Game Drawn";
    else
        msg.innerText = `Congratulations, ${winner} is Winner`;
    disableBoxes();
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}