// Adding the share Button;
$(document).ready(function () {
  $("#email-share").attr(
    "href",
    `mailto:?subject=Quiz%20App.&amp;body=Hey%20there,%20i%20just%20completed%20this%20quiz:${encodeURI(
      window.location
    )}%20with%20the%20score%204/5`
  );

  $("#twitter-share").attr(
    "href",
    "https://twitter.com/intent/tweet/?text=Hey%20there,%20i%20just%20completed%20this%20quiz:%20with%20the%20score%204/5;url=window.location"
  );

  $("#facebook-share").attr(
    "href",
    "https://facebook.com/sharer/sharer.php?u=encodeURI(window.location)"
  );
});
