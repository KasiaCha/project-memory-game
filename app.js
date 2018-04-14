$(document).ready(function() {

/** Variables */

var movesTaken = 0;
var firstMove = 0;
var secondMove = 1;
var totalMovesPerTurn = 2; 
var cardPairsMatched = 0;
var totalCardPairs = 8;
var movesCounter = 0;
var performanceRating = "3 beers";
var hours = 1;
var minutes = 1;
var seconds = 1;
var timerStart = false;
var gameTimer;
var firstCard;
var firstCardType;
var secondCard;
var secondCardType;
var gameOverElement = $('.game-over');
var performanceRatingElement = $('.performance-rating');
var timeTakenElement = $('.time-taken');
var movesTakenElement = $('.moves-taken');
var performanceRatingString = "Performance rating: ";
var timeTakenString = "Time taken: ";
var movesTakenString = "Moves taken: ";

/** List of cards (total of 16) */

var cardDeck = [
  "fas fa-chess-knight",
  "fas fa-tree",
  "fas fa-fire",
  "fas fa-map-signs",
  "fas fa-paw",
  "fab fa-pagelines",
  "fab fa-studiovinari",
  "fab fa-sticker-mule",
  "fas fa-map-signs",
  "fas fa-tree",
  "fab fa-studiovinari",
  "fab fa-pagelines",
  "fas fa-chess-knight",
  "fas fa-paw",
  "fab fa-sticker-mule",
  "fas fa-fire"];

/**
* CARDS
* This code will run when a card is clicked (game functionality).
*/

$('.card').click(function() {
      /** Code to run if it is the first move in the turn */
      if(movesTaken === firstMove) {
        $(this).addClass('open');
        /** First card object and its card type  */
        firstCard = $(this);
        firstCardType = $(this).find('i').attr('class');
        /** This allows the program to determine second move from the first */
        movesTaken = movesTaken + 1;
      }
      /** Code to run if it is the second move in the turn */
      else if (movesTaken === secondMove) {
        $(this).addClass('open');
        /** Second card object and its card type */
        secondCard = $(this);
        secondCardType = $(this).find('i').attr('class');
        /** Colour codes the cards based on whether the cards match or not */
        if (firstCardType === secondCardType) {
          cardMatchSuccess(firstCard, secondCard);
          /** Code to run when the game is won */
          if (cardPairsMatched === totalCardPairs) {
          gameCompleted();
          };
        } else if (firstCardType !== secondCardType) {
          cardMatchFail(firstCard, secondCard);
        };
        /** This resets moves_taken so it is the first move again **/
        movesTaken = 0;
      };
    });

/**
* CARD MATCH SUCCESSFUL
*/
    function cardMatchSuccess(firstCard, secondCard) {
      firstCard.addClass('match');
      secondCard.addClass('match');
      cardPairsMatched = cardPairsMatched + 1;
      movesCounter = movesCounter + 1;
      moveCounter(movesCounter);
    }

/**
* CARD MATCH UNSUCCESSFUL
*/
    function cardMatchFail(firstCard, secondCard) {
      firstCard.addClass('not-a-match');
      secondCard.addClass('not-a-match');
      movesCounter = movesCounter + 1;
      /** Flips incorrect cards back */
      flipCards(firstCard, secondCard);
      moveCounter(movesCounter);
    }

/**
* CARD FLIP
* Function to be called when a card match is unsuccessful.
*/
    function flipCards(firstCard, secondCard) {
      setTimeout(function(){
            firstCard.removeClass('not-a-match open');
            secondCard.removeClass('not-a-match open');
      },1000);
    };

/**
* MOVE COUNTER
* This function is called after every turn.
*/
    function moveCounter(movesCounter){
      /** Counts the number of moves the player has taken */
      if(movesCounter > 1) {
        $('.score-panel').find('.moves').text(movesCounter);
        $('.moves-text').text("Moves");
      } else if (movesCounter === 1) {
        $('.score-panel').find('.moves').text(movesCounter);
        $('.moves-text').text("Move");
      };

/** BEER RATING */
      if (movesCounter === 18) {
        $('#first-beer').removeClass('fa fa-beer').addClass('fa fa-beer-o');
        performanceRating = "2 beers";
      } else if (movesCounter === 28) {
        $('#second-beer').removeClass('fa fa-beer').addClass('fa fa-beer-o');
        performanceRating = "1 beer";
      } else if (movesCounter === 38) {
        $('#third-beer').removeClass('fa fa-beer').addClass('fa fa-beer-o');
        performanceRating = "0 beers";
      }
    };

    /** GAME WON */
      function gameCompleted() {
      // Terminates the game timer once it is finished.
      clearInterval(gameTimer);
      timerStart = false;
      // Opens the modal
      gameOverElement.css('display', 'block');
      // Game over content
      performanceRatingElement.text(performanceRatingString + performanceRating);
      timeTakenElement.text(timeTakenString + $('.hours').text() +
       $('.colon-one').text() +
       $('.minutes').text() +
       $('.colon-two').text() +
       $('.seconds').text());
      movesTakenElement.text(movesTakenString + movesCounter);

      // Restarts the game
      $('.play-again-button').click(function() {
        restartGame();
        gameOverElement.css('display', 'none');
      });
  };

/**
* TIMER
* This code will run as soon as the game begins and lasts until it ends.
*/
    $('.card').click(function() {
      if (timerStart === false) {
        timer();
        // This essentially prevents the timer() function from running when
        // every single time a .card element is pressed.
        // i.e. The timer() function runs only once.
        timerStart = true;
      }
    });

    function timer() {
      gameTimer = setInterval(function() {
          // Seconds timer
          if(seconds < 60) {
            $('.seconds').text(seconds + "s");
            seconds = seconds + 1;
          }
          // Minutes timer
          else if (seconds === 60) {
            $('.minutes').css('visibility', 'visible');
            $('.colon-two').css('visibility', 'visible');
            seconds = 0;
            $('.seconds').text(seconds + "s");
            $('.minutes').text(minutes + "m");
            minutes = minutes + 1;
            seconds = seconds + 1;

            // Hours timer
            if (minutes === 60) {
              $('.hours').css('visibility', 'visible');
              $('.colon-one').css('visibility', 'visible');
              seconds = 0;
              minutes = 0;
              $('.seconds').text(seconds + "s");
              $('.minutes').text(minutes + "m");
              $('.hours').text(hours + "hr");
              hours = hours + 1;
              minutes = minutes + 1;
              seconds = seconds + 1;
              };
          };
        }, 1000);
    };

/** RESTART BUTTON */

    $('.restart').click(function() {
      restartGame();
    });

    // Function responsible for restarting the game
    function restartGame() {

    // Returns all cards and scores back to the default state.
      $('.card').removeClass('open match');
      movesTaken = 0;
      cardPairsMatched = 0;
      performanceRating = "3 beers";

      /** Timer */
      clearInterval(gameTimer);
      seconds = 0;
      minutes = 0;
      hours = 0;
      $('.colon-one').css('visibility', 'hidden');
      $('.minutes').css('visibility', 'hidden');
      $('.colon-two').css('visibility', 'hidden');
      $('.hours').css('visibility', 'hidden');
      $('.seconds').text(seconds + "s");
      $('.minutes').text(minutes);
      $('.hours').text(hours);
      timerStart = false;

      /** Moves counter */
      movesCounter = 0;
      $('.score-panel').find('.moves').text(movesCounter);

      /** Beer rating */
      $('#first-beer').removeClass('fa fa-beer-o').addClass('fa fa-beer');
      $('#second-beer').removeClass('fa fa-beer-o').addClass('fa fa-beer');
      $('#third-beer').removeClass('fa fa-beer-o').addClass('fa fa-beer');

      /** Shuffles all the cards */
      shuffle(cardDeck);
      var shuffledDeck = cardDeck;

      // Assigns new class values to each card, which in turn changes what they show
      $('#card_1').removeClass().addClass(shuffledDeck[0]);
      $('#card_2').removeClass().addClass(shuffledDeck[1]);
      $('#card_3').removeClass().addClass(shuffledDeck[2]);
      $('#card_4').removeClass().addClass(shuffledDeck[3]);
      $('#card_5').removeClass().addClass(shuffledDeck[4]);
      $('#card_6').removeClass().addClass(shuffledDeck[5]);
      $('#card_7').removeClass().addClass(shuffledDeck[6]);
      $('#card_8').removeClass().addClass(shuffledDeck[7]);
      $('#card_9').removeClass().addClass(shuffledDeck[8]);
      $('#card_10').removeClass().addClass(shuffledDeck[9]);
      $('#card_11').removeClass().addClass(shuffledDeck[10]);
      $('#card_12').removeClass().addClass(shuffledDeck[11]);
      $('#card_13').removeClass().addClass(shuffledDeck[12]);
      $('#card_14').removeClass().addClass(shuffledDeck[13]);
      $('#card_15').removeClass().addClass(shuffledDeck[14]);
      $('#card_16').removeClass().addClass(shuffledDeck[15]);
  };

// Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {


      var currentIndex = array.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }

      return array;
  }

});
