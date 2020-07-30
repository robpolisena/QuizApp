// Counting the quizzes Score

$(document).ready(function () {

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
    const count = Object.values(counts).filter(
      (eachCount) => eachCount === true
    ).length;
    console.log('THIS IS THE COUNT', count);
    $("#score").val(count);
  });

});
