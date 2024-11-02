import * as misc from "./misc.js";

document.addEventListener("DOMContentLoaded", function() {
    misc.updateStatusDiv("awaiting name input...");
    misc.updateStatusDiv("");
});



let drawPile = [];
let discardPile = [];

const stratagems = [
    "wild", "wild", "wild", "wild",
    "scrap", "scrap", "scrap", "scrap", "scrap", "scrap", "scrap", "scrap",
    "recycle", "recycle", "recycle", "recycle", "recycle", "recycle", "recycle", "recycle",
    "donate", "donate", "donate", "donate", "donate",
    "repair", "repair", "repair", "repair", "repair"
];
const attacks = [
    "full clear", "full clear", "full clear",
    "all purified",
    "random pick", "random pick", "random pick", "random pick", "random pick",
    "swap", "swap", "swap", "swap", "swap",
    "nullify", "nullify", "nullify", "nullify", "nullify",
    "debt", "debt", "debt", "debt", "debt"
];
const boosts = [
    "double draw", "double draw", "double draw", "double draw", "double draw",
    "intel", "intel", "intel", "intel", "intel",
    "good as new", "good as new", "good as new", "good as new", "good as new",
    "score", "score", "score", "score", "score",
    "all-or-nothing", "all-or-nothing"
];
const suddenEvents = [
    "messy home",
    "accounting error",
    "removal failure",
    "generous donation",
    "misplaced logistics",
    "clingy homeowners"
];
const clutter = [
    "faulty wiring",
    "broken phones",
    "old laptops",
    "containers",
    "vessels",
    "plastic bags",
    "tissue paper",
    "boxes",
    "receipts",
    "newspapers",
    "books",
    "letters",
];
const clutterPoints = {
    "faulty wiring": 40,
    "broken phones": 30,
    "old laptops": 30,
    "containers": 20,
    "vessels": 20,
    "plastic bags": 20,
    "tissue paper": 10,
    "boxes": 30,
    "receipts": 10,
    "newspapers": 30,
    "books": 40,
    "letters": 10
};
const sentiments = [
    "stuffed toys",
    "antiques",
    "dead plants",
    "old clothes",
    "furniture",
    "trinkets"
];
const sentimentPoints = {
    "stuffed toys": 50,
    "antiques": 70,
    "dead plants": 40,
    "old clothes": 70,
    "furniture": 80,
    "trinkets": 60
};

let setupForm = document.getElementById("setup-form");
let setupDiv = document.getElementById("setup-div");

const players = [];
let playerCount;

function Player(name) {
    this.name = name; 
    this.index = players.length; 
    this.points = 0; 
    this.hand = []; 
    this.clearedClutter = []; 
    this.nextClutterMultiplier = 1; 
    this.diceRoll = 0; 
    this.even = 0;
    players.push(this);
};

Player.prototype.rollDice = function() {
    this.diceRoll = Math.floor(Math.random() * 6) + 1;
    this.even = this.diceRoll % 2 === 0 ? 1 : 0; 
};

function drawCard(count) {
    let drawnCards = [];
    for (let i = 0; i < count; i++) {
        let drawnIndex = Math.floor(Math.random() * 100)
        let drawnCard = drawPile[drawnIndex];
        drawPile.splice(drawnIndex, 1);
        drawnCards.push(drawnCard);
    };
    console.log(drawnCards);
};

setupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    initialiseGame();
});

function initialiseGame() {
    setupDiv.classList.remove("block");
    setupDiv.classList.add("hidden");

    drawPile = [
        ...stratagems,
        ...attacks,
        ...boosts,
        ...suddenEvents,
        ...clutter,
        ...sentiments
    ]; // spread operator. concats the arrays into one
    
    let playerOneNameInput = document.getElementById("player-one-name-input").value;
    let playerTwoNameInput = document.getElementById("player-two-name-input").value;
    let playerThreeNameInput = document.getElementById("player-three-name-input").value;
    let playerFourNameInput = document.getElementById("player-four-name-input").value;

    let playerOneName = document.getElementById("player-one-name");
    let playerTwoName = document.getElementById("player-two-name");
    let playerThreeName = document.getElementById("player-three-name");
    let playerFourName = document.getElementById("player-four-name");

    const player1 = new Player(playerOneNameInput);
    playerOneName.innerText = player1.name;
    document.getElementById("playfield-1").classList.remove("hidden");

    const player2 = new Player(playerTwoNameInput);
    playerTwoName.innerText = player2.name;
    document.getElementById("playfield-2").classList.remove("hidden");

    let player3, player4;

    if (playerThreeNameInput) {
        player3 = new Player(playerThreeNameInput);
        playerThreeName.innerText = player3.name;
        document.getElementById("playfield-3").classList.remove("hidden");
    };

    if (playerFourNameInput) {
        player4 = new Player(playerFourNameInput);
        playerFourName.innerText = player4.name;
        document.getElementById("playfield-4").classList.remove("hidden");
    };

    console.log(player1); // Player { name: 'Alice', index: 0, points: 0, hand: [], clearedClutter: [], nextClutterMultiplier: 1, diceRoll: 0 }
    console.log(player2); // Player { name: 'Bob', index: 1, points: 0, hand: [], clearedClutter: [], nextClutterMultiplier: 1, diceRoll: 0 }
    console.log(player3);
    console.log(player4);
    console.log(drawPile);
    misc.updateStatusDiv("game state initialised!");
    // player1.rollDice();
    // console.log(`Player ${player1.name} rolled a ${player1.diceRoll}`); 
    return false;
};





// function clearSentiment(sentiment) {
    
// }