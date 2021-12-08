const body = $("body");

const title = $(`<div  id='title'>
                    JEOPARDY!
                </div>`);

let yourScore = $(`<div  id='your-score'>
                        YOUR SCORE :  $${localStorage.score}
                    </div>`);

const score = localStorage.getItem("score");

if (score === null) {
	localStorage.score = 0;
	yourScore.text(`Youe Score: $${localStorage.score}`);
} else {
	yourScore.text(`Youe Score: $${localStorage.score}`);
}

const cat1 = $(`<div class="categories" id='cat-1'>
                </div>`);

const cat2 = $(`<div class="categories" id='cat-2'>
                </div>`);

const cat3 = $(`<div class="categories" id='cat-3'>
                </div>`);

const cat4 = $(`<div class="categories" id='cat-4'>
                </div>`);

const cat5 = $(`<div class="categories" id='cat-5'>
                </div>`);

const categories = $(".categories");

const jeopardyBoard = $(`<div class="jeopardyBoard">
                        </div>`);

const answer = $(`<div class="answer">
                    
                </div>`);

const question = $(`<form class="question">
                        <label for="questionInput">YOUR ANSWER </label>
                        <input id="questionInput" type="text" />
                        <input id="questionInputSubmit" type="submit" />
                    </form`);

const jeopardyBoardArry = [cat1, cat2, cat3, cat4, cat5];

body.append(title);
body.append(yourScore);
body.append(jeopardyBoard);
body.append(answer);
body.append(question);

jeopardyBoard.append(cat1, cat2, cat3, cat4, cat5);

const questionForm = $(`.question`);
const questionInput = $("#questionInput");

//? Sets the initial dollar value to 100
let dollarAmount = 100;

//! Build the layout of dollar amounts =====================================================
//! Creates the Jeopardy 5x5 board
for (let i = 0; i < jeopardyBoardArry.length; i++) {
	for (let j = 0; j < 5; j++) {
		//? defines the id as the div's xy position on the board
		const id = `${i + 1}${j}`;
		const value = $(`<div id="cat${id}">
            $${dollarAmount}
        </div>`);

		//* Appends the new value to the div's innerText
		jeopardyBoardArry[i].append(value);

		//* If dollar amount is greater that 100 than add 200 to it
		if (j < 1) {
			dollarAmount += 100;
		} else {
			dollarAmount += 200;
		}

		//* Applies the answer gunction to each value div
		answers(id);
	}

	//* Resets dollarAmount to 100 for the beginning of each colum
	dollarAmount = 100;
}

//! ========================================================================================

//? Initially sets questionValue to empty string
let questionValue = "";

//! Pulls a jeopardy.json data for an object with a specific value =========================
const main = async (value) => {
	const rawJeopardyData = await fetch("jeopardy.json");
	const jeopardyData = await rawJeopardyData.json();

	const groupedData = _.groupBy(jeopardyData, "value");
	const valueLength = groupedData[value].length;

	const randomNumber = Math.floor(Math.random() * valueLength + 1);

	// //? Gets a random obeject from the values array
	//* console.log(groupedData[value][randomNumber]);

	// //? Gets the question key value from the object ^
	//* console.log(groupedData[value][randomNumber]["question"]);

	//? Sets the innerText of 'answer' div to the values 'question' value
	answer.html(groupedData[value][randomNumber]["question"]);
	$(answer).css({
		backgroundColor: "#d79f4be8",
		border: "6px solid #080b70",
	});

	questionValue = await groupedData[value][randomNumber]["answer"];
	return questionValue;
};

//? Initially sets winnings to empty string
let winnings = "";
//? Initially sets count to 0
let count = 0;

//! Creates and event listner for each jeopardyBoard div value ==========================
//! Pulls the value from each jeopardy div
function answers(id) {
	const answers = document.querySelector(`#cat${id}`);

	//? EventListner that when a jeopardyBoard div is clicked
	//? it will pull its corresponding Answer for that value
	answers.addEventListener("click", async function () {
		winnings = "";
		const answerValue = answers.innerText;

		//? Calles the previous function main(value) which assigns an answer to that div
		await main(answerValue);

		count++;
		console.log(count);

		// ? removes '$' and ',' from the value
		for (num of answerValue) {
			if (num === "$" || num === ",") {
			} else {
				winnings += num;
			}
		}

		console.log("answerValue", answerValue);
		console.log("winnings", winnings);
		console.log("questionValue", questionValue);

		document.getElementById(`cat${id}`).style.pointerEvents = "none";

		$(`#cat${id}`).css({
			color: "#080b70",
			textShadow: "none",
			userSelect: "none",
			cursor: "none",
		});
	});
}

//! Form submission that compares users answer witht the correct answer and awards points
questionForm.submit(function (event) {
	event.preventDefault();

	//? Converts both Value and Input into strings
	const answer = questionValue.toString();
	const question = questionInput.val().toString();

	//? If question value eqauls answer value
	if (question.toLowerCase() === answer.toLowerCase()) {
		//? If the value and
		localStorage.score = Number(winnings) + Number(localStorage.score);
		//? Sets the value of 'Your score' to 'score' value
		yourScore.text(`Youe Score: $${localStorage.score}`);
		winnings = "";
		alert("Correct!");
	} else {
		winnings = "";
		alert("Incorrect!");
	}

	if (count === 25) {
		alert(`Congratulations You Have Won $${localStorage.score}!!!`);
		localStorage.clear();
	}
});
