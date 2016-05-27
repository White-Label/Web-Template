// Social dropdown for tracklist
$(function() {
  $('body').on('click', '.dropdown-text', function(e) {
    $(this).next('.dropdown-content').toggle();
  });
  $('body').on('click', function(e) {
    // if e does not have any parents with class dropdown
    if(!$(e.target).parents('.dropdown').length) {
      $('.dropdown-content').hide();
    }
  });
});

$(function(){
  // scroll to top when mixtape is selected
  $('.main__archive-grid').on('click', '.mixtapes', function() {
    $('body, html').animate({scrollTop: "0px"}, 700);
  });

  // Lazy Load
  // setTimeout(function() {
  //   $("img.lazy").lazyload({
  //       threshold : 100,
  //       effect : "fadeIn",
  //   });
  // }, 1000);

  // volume slider
  $('.vslider').slider();

});


/** Active link checker **/
$(function() {
  $('.sidebar__nav a[href$="/' + location.pathname.split("/")[1] + '"]').addClass('active');
});
