//! Build the layout of dollar amounts
//* document.createElement
//* .appendChild
const body = $("body");

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

const jeopardyBoardArry = [cat1, cat2, cat3, cat4, cat5];

// $(categories).css({
// 	margin: "20px",
// 	padding: "20px",
// 	border: "2px solid black",
// 	backgroundColor: "#080b70",
// 	color: "red",
// });

$(jeopardyBoard).css({
	// margin: "20px",
	display: "flex",
	flexDirection: "row",
});

body.append(jeopardyBoard);

jeopardyBoard.append(cat1, cat2, cat3, cat4, cat5);

let dollarAmount = 100;

for (let i = 0; i < jeopardyBoardArry.length; i++) {
	for (let j = 0; j < 5; j++) {
		const value = $(`<div class="cat${i + 1}" id="${dollarAmount}">
            $${dollarAmount}
        </div>`);

		$(value).css({
			padding: "5px",
			color: "#D7A04B",
			backgroundColor: "#080b70",
			border: "2px solid black",
		});

		jeopardyBoardArry[i].append(value);

		if (j < 1) {
			dollarAmount += 100;
		} else {
			dollarAmount += 200;
		}
	}
	dollarAmount = 100;
}
