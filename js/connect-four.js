///////////////////// CONSTANTS /////////////////////////////////////
const winningConditions = [
[0, 1, 2, 3],
[1, 2, 3, 4],
[2, 3, 4, 5],
[3, 4, 5, 6],
[7, 8, 9, 10],
[8, 9, 10, 11],
[9, 10, 11, 12],
[10, 11, 12, 13],
[14, 15, 16, 17],
[15, 16, 17, 18],
[16, 17, 18, 19],
[17, 18, 19, 20],
[21, 22, 23, 24],
[22, 23, 24, 25],
[23, 24, 25, 26],
[24, 25, 26, 27],
[28, 29, 30, 31],
[29, 30, 31, 32],
[30, 31, 32, 33],
[31, 32, 33, 34],
[35, 36, 37, 38],
[36, 37, 38, 39],
[37, 38, 39, 40],
[38, 39, 40, 41],
//vertical
[0, 7, 14, 21],
[7, 14, 21, 28],
[14, 21, 28, 35],
[1, 8, 15, 22],
[8, 15, 22, 29],
[15, 22, 29, 36],
[2, 9, 16, 23],
[9, 16, 23, 30],
[16, 23, 30, 37],
[3, 10, 17, 24],
[10, 17, 24, 31],
[17, 24, 31, 38],
[4, 11, 18, 21],
[11, 18, 21, 32],
[18, 21, 32, 39],
[5, 12, 19, 26],
[12, 19, 26, 33],
[19, 26, 33, 40],
[6, 13, 20, 27],
[13, 20, 27, 34],
[20, 27, 34, 41],
//diagonal(right)
[3, 9, 15, 21],
[4, 10, 16, 22],
[10, 16, 22, 28],
[5, 11, 17, 23],
[11, 17, 23, 29],
[17, 23, 29, 35],
[6, 12, 18, 24],
[12, 18, 24, 30],
[18, 24, 30, 36],
[13, 19, 25, 31],
[19, 25, 31, 37],
[20, 26, 32, 38],
//diagonal(left)
[14, 22, 30, 38],
[7, 15, 23, 31],
[15, 23, 31, 39],
[0, 8, 16, 24],
[8, 16, 24, 32],
[16, 24, 32, 40],
[1, 9, 17, 25],
[9, 17, 25, 33],
[17, 25, 33, 41],
[2, 10, 18, 26],
[10, 18, 26, 34],
[3, 11, 19, 27],
];
///////////////////// APP STATE (VARIABLES) /////////////////////////
let newIndex;
let board;
let turn = "Yellow";
let win;
let column_Count = [];
let redScore = 0;
let yellowScore = 0;
let tieScore = 0;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("firstRed").onclick = init2;
document.getElementById("firstYellow").onclick = init3;
document.getElementById("firstRed").onclick = firstRed;
document.getElementById("firstYellow").onclick = firstYellow;
///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
board = ["", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", ""];
column_Count = [0, 0, 0, 0, 0, 0, 0];
turn = turn;
win = null;
renderInit();
}
function init2() {
board = ["", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", ""];
column_Count = [0, 0, 0, 0, 0, 0, 0];
turn = "Red";
win = null;
render();
}
function init3() {
board = ["", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", ""];
column_Count = [0, 0, 0, 0, 0, 0, 0];
turn = "Yellow";
win = null;
render();
}
function firstRed() {
document.getElementById("change").innerHTML = "Turn: Red";
turn = "Yellow";
}
function firstYellow() {
document.getElementById("change").innerHTML = "Turn: Yellow";
turn = "Red";
}
function render() {
squares[newIndex].style.backgroundColor = turn;
if (turn == "Red") {
message.textContent =
win === "T" ? "It's a tie!" : win ? `Red wins!` : `Turn: Yellow`;
} else {
message.textContent =
win === "T" ? "It's a tie!" : win ? `Yellow wins!` : `Turn: Red`;
}
}
function renderInit() {
for (i=0; i < 42; i++) {
squares[i].style.backgroundColor = "White";
}
document.body.style.backgroundColor = "lightBlue";
turn = "Yellow";
}
function takeTurn(e) {
if (!win) {
let index = squares.findIndex(function (square) {
return square === e.target;
});
let rowNumber = Math.floor(index / 7);
let columnNumber = index % 7;
column_Count[columnNumber] = column_Count[columnNumber] + 1;
newIndex = index;
if (column_Count[columnNumber] <= 6) {
newIndex = 41 - ((column_Count[columnNumber]) * 7) + columnNumber + 1;
}
if (board[newIndex] === "") {
board[newIndex] = turn;
turn = (turn === "Red") ? "Yellow" : "Red";
win = getWinner();
render();
}
if (win === "T") {
tieScore++;
document.getElementById("thirdList").innerHTML = tieScore;
}
}
}
function getWinner() {
let winner = null;
winningConditions.forEach(function (condition, index) {
if (
board[condition[0]] &&
board[condition[0]] === board[condition[1]] &&
board[condition[1]] === board[condition[2]] &&
board[condition[2]] === board[condition[3]]
) {
winner = board[condition[0]];
if (winner === "Yellow") {
redScore++;
document.getElementById("firstList").innerHTML = redScore;
}
if (winner === "Red") {
yellowScore++;
document.getElementById("secondList").innerHTML = yellowScore;
}
}
});
return winner ? winner : board.includes("") ? null : "T";
}
