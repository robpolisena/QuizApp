// Adding the share Button;

$(document).ready(function () {
  $(".private-form").submit(function (event) {
    console.log('IS THIS RUNNING')
    event.preventDefault();

    const myData = $(this).serialize();
    const myDataVal = $(".quiz_id").html();
    // $.post( "/quizzes/private", myDataVal);

    $.ajax({
      type: "POST",
      url: "/quizzes/private",
      data: myDataVal,
    }).then(() => {
      console.log('HELLOOO')
      // $("#tweet-text").html("");
      // $(".counter").html("140");
      // $("#empty-box").slideUp(200, function () {});
      // $("#long-tweet").slideUp(200, function () {});
    }).catch((err) => {
      console.log(err);
    });
  })
});


