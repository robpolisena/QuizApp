// Counting the quizzes Score

$(document).ready(function () {
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
    const count = Object.values(counts).filter(
      (eachCount) => eachCount === true
    ).length;
    $("#score").val(count);
  });
  // Adding the share Button;
  $("#email-share").attr(
    "href",
    `mailto:?subject=${encodeURI(
      window.location
    )}Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;body=` +
      encodeURI(window.location)
  );
});
