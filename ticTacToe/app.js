let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msg = document.querySelector('#msg');
let msg2 = document.querySelector('#turn');
let msgContainer = document.querySelector('.msg-container');

let boxNum = 0;

let turnO = true;

let winArr = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

const resetGame = () => {
    enableAllBtn();
    turnO = true;
    boxNum = 0; 
    msgContainer.classList.add('hide');
    reset.classList.remove('hide');
}

const showWinner = (winner) => {
    if (boxNum === 9) {
        disableAllBtn();
        msg.innerText = 'It\'s a draw!';
        msgContainer.classList.remove('hide');
        reset.classList.add('hide');
    }
    msg.innerText = `Congratulations, ${winner} wins!`;
    msgContainer.classList.remove('hide');
    reset.classList.add('hide');

}

const disableAllBtn = () => {
    boxes.forEach( (box) => {
        box.disabled = true;
    });
}

const enableAllBtn = () => {
    boxes.forEach( (box) => {
        box.disabled = false;
        box.innerText = '';
    });
}

const checkForWin = () => {
    for (pattern of winArr) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val === '' || pos2Val === '' || pos3Val === '') {
            continue;
        }
        if (pos1Val === pos2Val && pos2Val === pos3Val) {
            // console.log(`${pos1Val} wins!`);
            disableAllBtn();
            showWinner(pos1Val);
        }
    }
    boxNum++;
}

boxes.forEach( (box) => {
    box.addEventListener('click', () => {
        if (turnO) {
            box.classList.remove('box-X');
            box.classList.add('box-O');
            box.innerText = 'O';
            msg2.innerText = 'Player X\'s turn';
        }
        else {
            box.classList.remove('box-O');
            box.classList.add('box-X');
            box.innerText = 'X';
            msg2.innerText = 'Player O\'s turn';
        }
        turnO = !turnO;
        box.disabled = true;

        checkForWin();
    });
})

reset.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', resetGame);