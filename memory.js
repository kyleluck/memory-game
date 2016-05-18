function checkIfGameOver(numMoves) {
  var gameOver = false;
  if ($('.tile').length === $('.selected').length) {
    gameOver = true;
  }
  if (gameOver) {
    $('.gameover').append(' with ' + numMoves + ' moves!').addClass('gameovershow');
  }
}

$(function() {

  var state = true;
  var prevElement;
  var currElement;
  var numMoves = 0;

  $('.tile').click(function() {
    if (state) {
      $(this).addClass('selected animated flipInY');
      prevElement = $(this);
      state = false;
    } else {
      currElement = $(this);
      //check to see if the user clicked on the same tile... stupid users
      if (currElement.hasClass('selected')) {
        state = false;
      }
      else {
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
    }
    checkIfGameOver(numMoves);
  });
});
