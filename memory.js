var state = true;
var prevElement;
var currElement;

$(function() {
  $('.tile').click(function() {
    if (state) {
      $(this).addClass('selected');
      prevElement = $(this);
      state = false;
    } else {
      currElement = $(this);
      currElement.addClass('selected');

      //check if monsters match
      if (prevElement.find('.monster').attr('src') === currElement.find('.monster').attr('src')) {
        //do nothing
      } else {
        setTimeout(function() {
          currElement.removeClass('selected');
          prevElement.removeClass('selected');
        }, 1000);
      }
      state = true;
    }
  });
});
