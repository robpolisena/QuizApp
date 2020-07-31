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

  $("#reddit-share").attr(
    "href",
    `https://reddit.com/submit/?Hey%20there,%20i%20just%20completed%20this%20quiz:%20with%20the%20score%20.${score}/5&url=${window.location.href}`
  );


})



