var state = true;
var prevElement;
var currElement;

$(function() {
  $('.tile').click(function() {
    if (state) {
      $(this).addClass('selected animated flipInY');
      prevElement = $(this);
      state = false;
    } else {
      currElement = $(this);
      currElement.addClass('selected animated flipInY');

      //check if monsters match
      if (prevElement.find('.monster').attr('src') === currElement.find('.monster').attr('src')) {
        //do nothing
      } else {
        setTimeout(function() {
          currElement.removeClass('selected animated flipInY');
          prevElement.removeClass('selected animated flipInY');
        }, 1000);
      }
      state = true;
    }
  });
});
