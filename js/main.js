var compOrder = []
var gameCount = 0;
var playerPushes = 0;
var strictMode = false;
var gameStarted = false;

$('#strictSwitch').click(function() {
  if (document.getElementById('strictSwitch').checked) {
    strictMode = true;
  } else {
    strictMode = false;
  }
});

$('.startBtn').mouseenter(function(){
  $(this).css({
  'color': 'white',
  'background-color': '#52a7e0'
  });
}).mousedown(function(){
  $(this).css({
  'color': '#ddd',
  'background-color': '#1b6698'
  });
}).mouseup(function(){
  $(this).css({
  'color': 'white',
  'background-color': '#3498db'
  });
}).mouseleave(function(){
  $(this).css({
  'color': 'white',
  'background-color': '#3498db'
  });
});

$('.startBtn').click(function(event) {
  gameStarted = true;
  compOrder = []
  gameCount = 0;
  playerPushes = 0;
  computerTurn();
  $('path').css({'cursor':'pointer'});

  $('.ll').addClass('yellow').removeClass('ll');
  $('.tl').addClass('green').removeClass('tl');
  $('.tr').addClass('red').removeClass('tr');
  $('.lr').addClass('blue').removeClass('lr');

})

function pickRandomColor() {
  var nextColor;
  switch (Math.floor(Math.random() * 4) + 1) {
    case 1:
      nextColor = 'green';
      break;
    case 2:
      nextColor = 'red';
      break;
    case 3:
      nextColor = 'yellow';
      break;
    case 4:
      nextColor = 'blue';
      break;
  }
  return nextColor;
}

//plays back picks
function playBack() {
  for (var i = 0; i < compOrder.length; i++) {
    (function (i) {
      setTimeout(function () {
        buttonPush(compOrder[i]);
      }, 1000 * i);
    })(i);
  };
}

function computerTurn() {
  gameCount++;
  if (gameCount === 21) {
    winFunc();
    return;
  }

  playerPushes = 0;
  //display game count in box on Controls
  if (gameCount < 10) {
      $('#counter').html('0' + gameCount);
  } else if (gameCount > 9) {
      $('#counter').html(gameCount);
  }

  var nextPick = pickRandomColor();
  compOrder.push(nextPick);

  //plays back picks
  playBack();
}

//player turns
$('path').click(function() {
  if (gameStarted) {
    var playerPush = $(this).attr('class');
    if (compOrder[playerPushes] === playerPush) {
      playerPushes++;
      if (playerPushes === compOrder.length) {
        setTimeout(computerTurn, 1000)
      }
    } else {
      //if player gets it wrong
      if (strictMode) {
        playerPushes = 0;
        $('#counter').css('color','red').html('!!').fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);

        setTimeout(function() {
          $('#counter').css('color','#45f442')
          $('.startBtn').click();
        }, 1500)

      } else {
        playerPushes = 0;
        var counterVal = $('#counter').html();
        $('#counter').css('color','red').html('!!').fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
        setTimeout(function() {
          $('#counter').css('color','#45f442').html(counterVal);
          playBack();
        }, 1500)
      }
    }
  }
});

function buttonPush(color) {
  $('#' + color + 'Sound').get(0).play();
  $('.' + color).removeClass(color).addClass(color + 'Light').delay(400).queue(function(){
    $('.' + color + 'Light').addClass(color).removeClass(color + 'Light').dequeue();
  });
}

$('path').click(function() {
  if (gameStarted) {
    var myPush = $(this).attr('class');
    buttonPush(myPush);
  }
});


function winFunc() {
  $('#counter').html('WIN').fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
  buttonPush('yellow');
  setTimeout(function(){ buttonPush('blue'); }, 250);
  setTimeout(function(){ buttonPush('red'); }, 500);
  setTimeout(function(){ buttonPush('green'); }, 750);
  setTimeout(function(){ buttonPush('yellow'); }, 1250);
  setTimeout(function(){ buttonPush('blue'); }, 1500);
  setTimeout(function(){ buttonPush('red'); }, 1750);
  setTimeout(function(){ buttonPush('green'); }, 2000);
  setTimeout(function(){ $('.startBtn').click(); }, 2500);
}
