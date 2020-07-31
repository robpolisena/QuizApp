// Adding the share Button;

$(document).ready(function () {
  const score = $("#email-share").data("score");
  //const score = $("#email-share").data("score");
  $("#email-share").attr(
    "href",
    `mailto:?subject=Quiz%20App.&body=Hey%20there,%20i%20just%20completed%20this%20quiz:%20${encodeURI(
      window.location.href
    )}%20with%20the%20score%20${score}/5`
  );

  $("#twitter-share").attr(
    "href",
    `https://twitter.com/intent/tweet/?text=Hey%20there,%20i%20just%20completed%20this%20quiz:%20with%20the%20score%20${score}/5&url=${window.location.href}`
  );

  $("#facebook-share").attr(
    "href",
    `https://facebook.com/sharer/sharer.php?u=${encodeURI(
      window.location.href
    )}`
  );
});


SELECT quizzes.name as quiz, quizzes.id as quizid, completed_quizzes.completed_date as date, completed_quizzes.score as score
      FROM quizzes
      JOIN completed_quizzes ON quiz_id = quizzes.id
      WHERE quizzes.owner_id = 2
      ORDER BY date DESC;
