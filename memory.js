function MemoryGame (state, prevElement, currElement, numMoves) {
  this.state = state;
  this.prevElement = prevElement;
  this.currElement = currElement;
  this.numMoves = numMoves;
}

MemoryGame.prototype.checkIfGameOver = function() {
  var gameOver = false;
  if ($('.tile').length === $('.selected').length) {
    gameOver = true;
  }
  if (gameOver) {
    $('.gameover').prepend('Congrats! You won with ' + this.numMoves + ' moves!').addClass('gameovershow');
  }
}

MemoryGame.prototype.shuffleTiles = function(arrayOfTiles) {
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

MemoryGame.prototype.createTileLayout = function(arrayOfTiles) {
  var tiles = this.shuffleTiles(arrayOfTiles);
  var html = '';
  tiles.forEach(function(val) {
    if (val < 10) {
      val = "0" + val.toString();
    }
    html += '<div class="col col-xs-6 col-sm-3 tile"><img src="images/monsters-' + val + '.png" alt="" class="img-responsive monster"><div class="back"></div></div>';
  });
  $('.row').html(html);
}

MemoryGame.prototype.chooseRandomImages = function(numImagesToUse, numTotalImages) {
  var arrayOfImageNumbers = [];
  while (arrayOfImageNumbers.length < numImagesToUse) {
    var randomNumber = Math.floor(Math.random() * numTotalImages) + 1;
    if (arrayOfImageNumbers.indexOf(randomNumber) === -1) {
      arrayOfImageNumbers.push(randomNumber);
      arrayOfImageNumbers.push(randomNumber);
    }
  }
  return arrayOfImageNumbers;
}

MemoryGame.prototype.createLevel = function(level) {
  if (level === 'Easy') {
    numImagesToUse = 8;
  } else if (level === 'Medium') {
    numImagesToUse = 12;
  } else if (level === 'Hard'){
    numImagesToUse = 16;
  }
  var arrayOfTiles = this.chooseRandomImages(numImagesToUse, 16);
  this.createTileLayout(arrayOfTiles);
}

$(function() {
  var game = new MemoryGame(true, '', '', 0);
  // var state = true;
  // var prevElement;
  // var currElement;
  // var numMoves = 0;

  $('#chooselevel li').on('click', function() {
    level = $(this).text();
    game.createLevel(level);
  });

  $('.row').on('click', '.tile', function() {
    if (game.state) {
      $(this).addClass('selected');
      game.prevElement = $(this);
      game.state = false;
    } else {
      game.currElement = $(this);
      //check to see if the user clicked on the same tile... stupid users
      if (game.currElement.hasClass('selected')) {
        game.state = false;
      }
      else {
        game.currElement.addClass('selected');
        //check if monsters match
        if (game.prevElement.find('.monster').attr('src') === game.currElement.find('.monster').attr('src')) {
          //do nothing
          game.prevElement.addClass('matched');
          game.currElement.addClass('matched');
        } else {
          setTimeout(function() {
            game.currElement.removeClass('selected');
            game.prevElement.removeClass('selected');
          }, 1000);
        }
        game.state = true;
        game.numMoves++;
      }
    }
    game.checkIfGameOver();
  });

  $('.playagain').on('click', function() {
    location.reload();
  });
});
