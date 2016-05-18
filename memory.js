function checkIfGameOver(numMoves) {
  var gameOver = false;
  if ($('.tile').length === $('.selected').length) {
    gameOver = true;
  }
  if (gameOver) {
    $('.gameover').append(' with ' + numMoves + ' moves!').show();
  }
}

$(function() {

  var state = true;
  var prevElement;
  var currElement;
  var numMoves = 0;

  $('.gameover').hide();

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
      numMoves++;
    }
    checkIfGameOver(numMoves);
  });
});
