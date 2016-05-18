function checkIfGameOver(numMoves) {
  var gameOver = false;
  if ($('.tile').length === $('.selected').length) {
    gameOver = true;
  }
  if (gameOver) {
    $('.gameover').prepend('Congrats! You won with ' + numMoves + ' moves!').addClass('gameovershow');
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

function createTileLayout(arrayOfTiles) {
  var tiles = shuffleTiles(arrayOfTiles);
  var html = '';
  tiles.forEach(function(val) {
    if (val < 10) {
      val = "0" + val.toString();
    }
    html += '<div class="col col-xs-6 col-sm-3 tile"><img src="images/monsters-' + val + '.png" alt="" class="img-responsive monster"></div>';
  });
  $('.row').html(html);
}

function chooseRandomImages(numImagesToUse, numTotalImages) {
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

function createLevel(level) {
  if (level === 'Easy') {
    numImagesToUse = 8;
  } else if (level === 'Medium') {
    numImagesToUse = 12;
  } else if (level === 'Hard'){
    numImagesToUse = 16;
  }
  var arrayOfTiles = chooseRandomImages(numImagesToUse, 16);
  createTileLayout(arrayOfTiles);
}

$(function() {
  var state = true;
  var prevElement;
  var currElement;
  var numMoves = 0;

  $('#chooselevel li').on('click', function() {
    level = $(this).text();
    createLevel(level);
  });

  $('.row').on('click', '.tile', function() {
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

  $('.playagain').on('click', function() {
    location.reload();
  });
});
