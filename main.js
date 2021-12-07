//! Build the layout of dollar amounts
//* document.createElement
//* .appendChild
const body = $("body");

const title = $(`<div  id='title'>
                    JEOPARDY!
                </div>`);
let score = 0;

const yourScore = $(`<div  id='your-score'>
                        YOUR SCORE :  $${score}
                    </div>`);

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
                    Answer!
                </div>`);

const question = $(`<form class="question">
                        <label for="questionInput">YOUR ANSWER </label>
                        <input id="questionInput" type="text" />
                        <input id="questionInputSubmit" type="submit" />
                    </form`);
// const questionSubmitBtn = $(`<input id="questionInputSubmit" type="submit" />`);

const jeopardyBoardArry = [cat1, cat2, cat3, cat4, cat5];

$(title).css({
	padding: "15px",
	fontSize: "50px",
});

$(yourScore).css({
	marginBottom: "20px",
});

$(jeopardyBoard).css({
	display: "flex",
	flexDirection: "row",
});

$(answer).css({
	marginTop: "10px",
	color: "black",
	textShadow: "0px 0px 0px",
});

$(question).css({
	marginTop: "20px",
});

body.append(title);
body.append(yourScore);
body.append(jeopardyBoard);
body.append(answer);
body.append(question);

jeopardyBoard.append(cat1, cat2, cat3, cat4, cat5);

//! Groups jeopardy data by set variable
const main = async (value) => {
	const rawJeopardyData = await fetch("jeopardy.json");
	const jeopardyData = await rawJeopardyData.json();

	const groupedData = _.groupBy(jeopardyData, "value");
	const valueLength = groupedData[value].length;
	console.log(valueLength);

	const randomNumber = Math.floor(Math.random() * valueLength + 1);
	console.log(randomNumber);

	//? Gets a random obeject from the values array
	console.log(groupedData[value][randomNumber]);

	//? Gets the question key value from the object ^
	console.log(groupedData[value][randomNumber]["question"]);

	//? Sets the innerText of 'answer' div to the values 'question' value
	answer.text(groupedData[value][randomNumber]["question"]);
	// return groupedData[value];
};

function answers(id) {
	const answers = document.querySelector(`#cat${id}`);

	answers.addEventListener("click", function () {
		console.log(`#cat${id}`, answers.innerText);
		const answerValue = answers.innerText;

		main(answerValue);
	});
}

let dollarAmount = 100;

for (let i = 0; i < jeopardyBoardArry.length; i++) {
	for (let j = 0; j < 5; j++) {
		const id = `${i + 1}${j}`;
		const value = $(`<div id="cat${id}">
            $${dollarAmount}
        </div>`);

		$(value).css({
			padding: "15px",
			color: "#D7A04B",
			backgroundColor: "#080b70",
			border: "2px solid black",
			fontSize: "30px",
		});

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
