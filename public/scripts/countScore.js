// Get the info of the quiz and answer from the database
// Make the display of the options random

// submitting the quiz and calculating the score.
// Have an eventlisterer connected to a variable score that increments once the button clicks matches the correct answer

$(document).ready(function () {
  // --- our code goes here ---
  let count = 0;

  let counts = {
    question1: false,
    question2: false,
    question3: false,
    question4: false,
    question5: false,
  };

  $("input").click(function () {
    const clickedInput = $(this).attr("name");
    const inputClass = $(this).attr("class");
    if (inputClass === "answer") {
      counts[clickedInput] = true;
    } else {
      counts[clickedInput] = false;
    }
  });

  $(".submit_quiz").submit(function (event) {
    //event.preventDefault();
    const count = Object.values(counts).filter(
      (eachCount) => eachCount === true
    ).length;
    $("#score").val(count);
  });
});

//send answer to the backend via POST
// make new ejs file
// submit score to the database
// remove event.preventDefault
