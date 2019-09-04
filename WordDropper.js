function updateScore() {
	score = score + 1
	var scoreLine = document.getElementsByClassName("score-banner")[0];
	scoreLine.innerHTML = "<p>Score: " + score + "</p>"
}

function randomWord(ar) {
	var word = ar[Math.floor(Math.random()*ar.length)];
	return word;
}

async function processWord() {
	var input = document.getElementById("word-entry").value;
	document.getElementById("word-entry").value = "";
	if (onScreen.includes(input)) {
		updateScore(score + 1);
		var index = onScreen.indexOf(input);
		var div = wordDivs[index];
		onScreen.splice(index, 1);
		wordDivs.splice(index, 1);
		div.parentNode.removeChild(div);
	}
}

function placeWord() {
	word = randomWord(words)
	onScreen.push(word);
	var wordDiv = document.createElement("div");
	wordDiv.innerHTML = "<p>" + word + "</p>";
	wordDiv.id = currentId;
	currentId = currentId + 1;
	wordDiv.classList.add("word");
	wordDiv.style.top = "1px";
	wordDiv.style.zIndex = zIndex.toString()
	wordDiv.style.left = (Math.random() * (document.getElementById("word-area").clientWidth - 60)).toString() + "px";
	zIndex = zIndex + 1;
	wordDivs.push(wordDiv);

	document.getElementsByClassName("word-area")[0].appendChild(wordDiv);

}

function wordCreator() {
	setInterval( () => {
		if (!gameOver) {
			placeWord()
		}
	}, 6000)
}

function moveWords() {
	setInterval(() => {
		if (!gameOver) {
			divs = document.getElementsByClassName("word");
			for (i = 0; i < onScreen.length; i++) {
				if (parseInt(topVal) + 10 > document.getElementById("word-area").clientHeight) {
					gameOver = true;
					document.getElementById("word-area").innerHTML = "<h1> Game Over </h2><h2>Score: " + score + "</h2>"
				} else {
					var topVal = divs[i].style.top;
					topVal.replace("px", "");
					divs[i].style.top = (parseInt(topVal) + 1).toString() + "px";
				}
			}
		}
		
	}, 100);
}

async function playGame() {

	wordCreator();
	moveWords();
}

const words = ["generate", "review", "cultivate", "proud", "patience", "motivation", "wriggle", "ant", "falsify", "distribute", "vague", "pepper", "copper", "lie", "case", "expand", "absence", "football", "thread", "award", "tycoon", "still", "empirical", "doll", "dinner", "register", "proof", "script", "wrist", "sulphur", "selection", "slam", "grandmother", "assertive", "eaux", "admiration", "TRUE", "recognize", "roll", "bank", "reactor", "gradient", "ribbon", "pleasant", "path", "draft", "polish", "art", "hook", "flow", "operational", "transaction", "physics", "rally", "fold", "housewife", "suspicion", "craft", "objective", "grass", "reckless", "manual", "test", "switch", "silver", "take", "president", "constituency", "basis", "cluster", "psychology", "cat", "minimize", "hide", "chord", "brilliance", "official", "condition", "guideline", "apology", "general", "sock", "hunting", "kinship", "change", "departure", "mile", "ancestor", "cheat", "taxi", "tight", "moment", "dimension", "family", "projection", "demonstration", "pony", "standard", "appendix", "reluctance"]
const gameWidth = document.getElementById("word-area").clientHeight;
var currentId = 0;
var gameOver = false
var score = -1;
var zIndex = 1;
var divs;
updateScore(score)
var onScreen = [];
var wordDivs = [];



playGame();
