// 1. creating the global variables
let imgArray = [];//array for the image elements
let randNum = 0;//Holds random numbers generated
let flipCount = 0; //takes track of the number of flips in the flipsArray
let flipsArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];//array that helps determine whether or not to flip cards
let cardHTML = [];
let cardArray = []; //track the classes of cards
let cardNum; //an array that stores the card number
let cardFront;
let cardBack;
let checkClick = 0; //number of clicks
let moves = 0;//moves
// const maxMoves = 25;
let lives; //lives
let maxNoOfMoves = 3;

// var to retrieve the HTML elements
let gameStage = document.getElementById('game-area');
let time = document.getElementById('time');
let live = document.querySelectorAll('star');


let move = document.getElementById('moves');
let newGame = document.getElementById('reset-btn');
let playAgainButton = document.getElementById('play-btn');
let scoreSheet = document.getElementById('score-sheet');
let trans = document.getElementById('transparent');
let scoreHeader = document.getElementById('score-header');
let scoreText = document.getElementById('score-text');
let health = 1;

let imgStatus = 0; //checks that all elements retrieve in the array are unique
let timeCounter;
let maxTimeSecs = 60;
let currentTimeInSecs;
let secs = maxTimeSecs; // seconds count down is set by maxTimeSecs
let gameOver = false;//boolean vaule false because the game is not over until the time runs out


//This logic occurs as soon as the page loads
(function() {
	restartMaxTime();
	updateTimer(currentTimeInSecs);
	var gameLoop = setInterval(gameTimer, 1000);
 })();

function gameTimer(){
	if (!timeIsOver() && !gameIsWon()){
		updateTimer(currentTimeInSecs);
		currentTimeInSecs--;
	}
	else{
		showResults();
	}
}

function gameIsWon(){
	for (i = 0; i < flipsArray.length; i++){
		if(flipsArray[i] === 0){
			return 0;
		}
	}
	return 1;
}

function timeIsOver(){
	if(currentTimeInSecs === 0){
		return 1;
	}
	else return 0;
}

function restartMaxTime(){
	currentTimeInSecs = maxTimeSecs;
}

function resetGame(){
	restartMaxTime();
	updateTimer(currentTimeInSecs);
}

function updateTimer(currentTimeInSecs){
	time.innerHTML = formatTimeToNiceString(currentTimeInSecs);
}

//2. flipping function
//needs an eventlistener with an anonymous function
gameStage.addEventListener("click",function(evt) {
	let parentElt = evt.target.parentElement;   // evt holds the value of the target element being clicked
	let retrieveId = parentElt.id;
	if(Number.isInteger(parseInt(retrieveId.replace("card-bck-",""),10))) {
		cardClick(parentElt.parentElement.id);
	}
	else {
		cardClick(retrieveId);
	}
});

playAgainButton.addEventListener("click", function(){
	hideResults();
	resetGame();
});

function cardClick(i) {
	cardNum = i.replace("card-","");//starts from 1
	cardNum = parseInt(cardNum,10);
// there are a few conditions that need to be met before card is flipped
		if(flipsArray[cardNum-1] == 0 && checkClick == 0 && gameOver == false){
			cardFront = document.getElementById(`card-frt-${cardNum}`);//concatenates string with cardNum e.g. card-frt-1
			cardBack = document.getElementById(`card-bck-${cardNum}`);
			cardFront.style.transform = "rotateY(-180deg)";//flips on the Y axis, changes the values previously assigned in the css file
			cardBack.style.transform = "rotateY(0deg)";
			cardHTML.push(cardBack.innerHTML);
			cardArray.push(cardNum);

			flipCount ++;
			flipsArray[cardNum-1] = 1;
			numMover();
			// lostLives();


			if(flipCount == 2){//compares a max of 2 cards
				// the comparison begins
				if(cardHTML[0] == cardHTML[1]){
					// moves ++;
					// move.innerHTML = `Moves: ${moves}`;// Moves: 2

					cardHTML = [];//empty the imgArray
					cardArray = [];
					flipCount = 0;

					if(time === 0){//needs a delay because it shows too quickly, Using an anonymous function
						clearTimeout(maxTimeSecs);//stop countdown
						setTimeout(function(){showResults();}, 500);// set to 500 milliseconds
					}
					return;//return to stop the execution of the function
				}
				else{
					//need a way to flip back
					checkClick = 1;
					//calling a new function to flip card back with a delay was it does not happen suddenly
					setTimeout(function(){flipCardBck();
				}, 500);
				return;
			}
		}
	}
	// if(gameOver == true) {
	// 	alert('Game Over, you lose');
	// }
}

function flipCardBck(){
	cardFront = document.getElementById(`card-frt-${cardArray[0]}`);
	cardBack = document.getElementById(`card-bck-${cardArray[0]}`);
	cardFront.style.transform = 'rotateY(0deg)';
	cardBack.style.transform = 'rotateY(180deg)';

	cardFront = document.getElementById(`card-frt-${cardArray[1]}`);
	cardBack = document.getElementById(`card-bck-${cardArray[1]}`);
	cardFront.style.transform = 'rotateY(0deg)';
	cardBack.style.transform = 'rotateY(180deg)';

	flipsArray[cardArray[0]-1] = 0;
	flipsArray[cardArray[1]-1] = 0;
	cardHTML = [];
	cardArray = [];
	flipCount = 0;
	checkClick = 0;
}

function numMover() {
	moves ++;
	move.innerHTML = `Moves: ${moves}`;// Moves: 2


}
// determine when to remove star based on moves
if(moves > 18 && moves < 28){
	for(i = 0; i < 3; i++){
		if(i > 1){
			live.style.visibility = "collapse";
		}
	}
}else if(moves > 21){
	for(i = 0; i < 3; i++){
		if(i < 0){
			live.style.visibility = "collapse";
		}
	}
}

// Creating the new game button
newGame;//selects the new game buttons id
newGame.addEventListener('click', clicked);//listens out for an alert when the button is clicked

function clicked(){
	window.location.reload();// reloads the current page location
}

//Adding randomisation
/*

*/
function randCard(){
	for(i = 0; i < 16; i ++){//for loop that will iterate through all of the card
		// FOR LOOP WILL LOOP THROUGH card.js img array
		if(i == 0){//will use the math.random method to generate a random number to associate the random images: rounds to the nearest integer
			randNum = Math.round(Math.random() * img.length);//Need to convert the decimal numbers, because you cannot search arrays with decimals

			while(randNum === img.length){//
				randNum = Math.round(Math.random() * img.length);
			}
			imgArray[i] = randNum;//assign the imgArray the new value generated in randNum [1,2,5,3,0,8]
		}else{//now generate unique values
			while(imgStatus === 0){
				randNum = Math.round(Math.random() * img.length);

				if(randNum !== img.length){//if randNum does not match img.length then run for loop
					for(k = 0; k < imgArray.length; k++){//runs through the imgArray
						if(randNum === imgArray[k]){// 1 === 12 false
							break;// if the value is not unique then break the for loop cycle
						}else if (k === imgArray.length - 1) {// 1 === 1 true, also if it generate a unique value with no match imgStatus is set to 1
							imgStatus = 1;
							imgArray[i] = randNum;
						}
					}
				}
			}
		}
		imgStatus = 0;//before the next for loop is executed imgArray must be set to zero
		document.getElementById(`card-bck-${i+1}`).innerHTML = img[randNum];//arrays index at zero hence why 1 is added
	}
}

function hideResults() {
	trans.style.display = "none";

}

function showResults() {
	gameOver = true;

	let width = window.innerWidth;

	trans.style.display = "block";
	scoreSheet.style.display = "block";
	scoreSheet.style.left = (width/2) - (500/2) + 'px';//setting the position of the results box
	scoreSheet.style.top = 150 + 'px';

	if(currentTimeInSecs === 0){
		scoreHeader.innerHTML = 'Times up!, Try again';
		scoreText.innerHTML = `Seems like you've run out of time, with ${moves} moves in total`;
	}
	else{
		let duration = maxTimeSecs-currentTimeInSecs;
		scoreHeader.innerHTML = 'Awesome, you beat the timer!';
		scoreText.innerHTML = `Your time was: ${formatTimeToNiceString(duration)}, with ${moves} moves in total`;
	}
	playAgain = document.getElementById('play-btn');
	playAgain.addEventListener('click', clicked);
}

function formatTimeToNiceString(timeInSecs){
    var minutes = Math.floor(timeInSecs / 60);
    var seconds = timeInSecs - (minutes * 60);

    if (minutes < 10) {
		minutes = "0" + minutes;
	}
    if (seconds < 10) {
		seconds = "0" + seconds;
	}
    return minutes + ':' + seconds;
}

let tRbtn = document.getElementById('play-btn');
tRbtn.addEventListener('click',tRbtn);

function tRclick(){
	scoreSheet.stylesheet.display = 'none';
	trans.stylesheet.display = 'none';
}

//called the randCard() function
window.onload = randCard();
