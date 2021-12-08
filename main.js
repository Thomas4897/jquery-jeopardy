//! Build the layout of dollar amounts
//* document.createElement
//* .appendChild
// localStorage.clear();
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

let dollarAmount = 100;

//! Creates the Jeopardy board
for (let i = 0; i < jeopardyBoardArry.length; i++) {
	for (let j = 0; j < 5; j++) {
		const id = `${i + 1}${j}`;
		const value = $(`<div id="cat${id}">
            $${dollarAmount}
        </div>`);

		jeopardyBoardArry[i].append(value);

		if (j < 1) {
			dollarAmount += 100;
		} else {
			dollarAmount += 200;
		}

		answers(id);
	}

	dollarAmount = 100;
}

let questionValue = "";

//! Groups jeopardy data by set variable
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

let winnings = "";

//! Function when value is clicked on the Jeopardy board a corresponding question will be displayed
function answers(id) {
	const answers = document.querySelector(`#cat${id}`);

	answers.addEventListener("click", async function () {
		winnings = "";
		const answerValue = answers.innerText;

		await main(answerValue);

		// ? Adds the value
		for (num of answerValue) {
			if (num === "$" || num === ",") {
			} else {
				winnings += num;
			}
		}

		console.log("answerValue", answerValue);
		console.log("winnings", winnings);
		console.log("questionValue", questionValue);
	});
}

//! Form submission that compares users answer witht the correct answer and awards points
questionForm.submit(function (event) {
	event.preventDefault();

	const answer = questionValue.toString();
	const question = questionInput.val().toString();

	//? If question value eqauls answer value
	if (question.toLowerCase() === answer.toLowerCase()) {
		localStorage.score = Number(winnings) + Number(localStorage.score);
		//? Resets the value of 'Your score'
		yourScore.text(`Youe Score: $${localStorage.score}`);
		winnings = "";
		alert("Correct!");
	} else {
		winnings = "";
		alert("Incorrect!");
	}
});
