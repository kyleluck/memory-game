function checkIfGameOver(numMoves) {
  var gameOver = false;
  if ($('.tile').length === $('.selected').length) {
    gameOver = true;
  }
  if (gameOver) {
    $('.gameover').append(' with ' + numMoves + ' moves!').addClass('gameovershow');
  }
}

function shuffleTiles (arrayOfTiles) {
  var currentIndex = arrayOfTiles.length;
  var tempValue;
  var randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    tempValue = arrayOfTiles[currentIndex];
    arrayOfTiles[currentIndex] = arrayOfTiles[randomIndex];
    arrayOfTiles[randomIndex] = tempValue;
  }
  return arrayOfTiles;
}

function createTileLayout (arrayOfTiles) {
  var tiles = shuffleTiles(arrayOfTiles);
  var html = '';
  tiles.forEach(function(val) {
    html += '<div class="col col-xs-6 col-sm-3 tile"><img src="images/monsters-0' + val + '.png" alt="" class="img-responsive monster"></div>';
  });
  $('.row').html(html);
}

$(function() {

  var state = true;
  var prevElement;
  var currElement;
  var numMoves = 0;
  var arrayOfTiles = [1, 1, 2, 2, 3, 3, 4, 4];
  createTileLayout(arrayOfTiles);

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
