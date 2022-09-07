let playerText = document.getElementById('playerText');
let resetbtn = document.getElementById('rstbtn');
let boxes = Array.from(document.getElementsByClassName('box'));

const O_text = "O";
const X_text = "X";
let currentPlayer = X_text;
let Spaces = Array(9).fill(null);

const StartGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

function boxClicked(e) {
    const id = e.target.id;

    if (!Spaces[id]){
        Spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
       

        if(playerhasWon() !==false) {
            let winningBlocks = playerhasWon();
            playerText = `${currentPlayer} has won!`;
            
            winningBlocks.map(box1 => boxes[box1].style.color='green');
            document.querySelector("h2").innerText = playerText;

            boxes.forEach(box => box.removeEventListener('click', boxClicked));

            return;

        }
        
        currentPlayer = currentPlayer == X_text ? O_text: X_text;
        playerText = `${currentPlayer} Turn`
        document.querySelector("h2").innerText = playerText ;
    }
}

const winningCombos = [
    [0,1,2], 
    [3,4,5], 
    [6,7,8], 
    [0,3,6], 
    [1,4,7], 
    [2,5,8], 
    [0,4,8], 
    [2,4,6], 
]

function playerhasWon(){
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if(Spaces[a] && Spaces[a] == Spaces[b] && Spaces[a] == Spaces[c]){
            return [a, b, c];
        }
    }
    return false
}

resetbtn.addEventListener('click', restart);

function restart() {
    Spaces.fill(null);

    boxes.forEach (box => {
        box.innerText = ''
        box.style.color = '';
        box.addEventListener('click', boxClicked);
    })

    currentPlayer = X_text;
    playerText = 'X Turn';
    document.querySelector("h2").innerText = playerText;

}

StartGame();
