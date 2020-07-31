// Adding the share Button;

$(document).ready(function () {
  $(".private-form").submit(function (event) {
    console.log('IS THIS RUNNING')
    event.preventDefault();

    const myData = $(this).serialize();
    const myDataVal = $(".quiz_id").html();

    $.post( "/quizzes/private", myData)

    .then(() => {
      console.log('HELLOOO')
      alert("This quiz is now Private")
    }).catch((err) => {
      console.log(err);
    });


  })

  $(".public-form").submit(function (event) {
    console.log('IS THIS RUNNING')
    event.preventDefault();

    const myData = $(this).serialize();
    const myDataVal = $(".quiz_id").html();

    $.post( "/quizzes/public", myData)

    .then(() => {
      console.log('HELLOOO')
      alert("This quiz is now Public")
    }).catch((err) => {
      console.log(err);
    });
  })
})
