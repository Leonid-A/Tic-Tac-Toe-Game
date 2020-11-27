const winnerCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const items = document.getElementsByClassName("item");
let whoseTurn = 0;
let fieldValues = [];
const resetBtn = document.getElementById("reset");
const info = document.getElementById("info");

addItemsEventListeners()
resetBtn.addEventListener("click", reset);

function addItemsEventListeners(emptyItems=false){
    for (let i=0; i<items.length;i++){
        if (emptyItems){
            items[i].innerHTML = "";
            items[i].className = "item";
        }
        items[i].onclick = () => {
            const player = ++whoseTurn & 1 ? "X" : "O";
            items[i].innerHTML=`<p class='sign'>${player}</p>`;
            items[i].onclick=null;
            fieldValues[i] = player;

            if (whoseTurn>4){
                const winner = checkWinner()
                if(winner){
                    endGame(player,winner);
                } else if (whoseTurn === 9){
                    endGame("No one", [])
                }
            } 
        }
    }
}

function endGame(player, winner){
    for (let i=0; i<items.length;i++){
        items[i].onclick = null;
    }
    if (winner.length){
        const [a,b,c] = winner;
        items[a].classList.add("winner");
        items[b].classList.add("winner");
        items[c].classList.add("winner");
    }
    info.innerHTML = `${player} WINS`;
}

function checkWinner(){
    let winner;
    winnerCombinations.forEach(element => {
        const [a,b,c] = element;
        if (fieldValues[a] && fieldValues[a] === fieldValues[b] && fieldValues[b] === fieldValues[c] ){
            winner = element;
        }
    })
    return winner;
}

function reset() {
    whoseTurn = 0;
    fieldValues = [];
    addItemsEventListeners(true);
    info.innerHTML = "";
}