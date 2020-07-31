// Taking the quiz from public to private and vice-versa;
$(document).ready(function () {
  $(".private-form").submit(function (event) {
    event.preventDefault();

    const myData = $(this).serialize();
    const myDataVal = $(".quiz_id").html();

    $.post( "/quizzes/private", myData)

    .then(() => {
      alert("This quiz is now Private")
    }).catch((err) => {
      console.log(err);
    });


  })

  $(".public-form").submit(function (event) {
    event.preventDefault();

    const myData = $(this).serialize();
    const myDataVal = $(".quiz_id").html();

    $.post( "/quizzes/public", myData)

    .then(() => {
      alert("This quiz is now Public")
    }).catch((err) => {
      console.log(err);
    });
  })
})
