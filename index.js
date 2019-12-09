//Runs once at the beginning
var soundCorrect = new Audio("sounds/sound_correct.mp3");
var soundIncorrect = new Audio("sounds/sound_incorrect.mp3");

function setup() {
  var googleSheetLink =
    "https://docs.google.com/spreadsheets/d/1EQ0dLYDJ0L3-qXA9S9Y3Ux5gSouzp8w73lhpq5FJ6AI/edit";
  trivia.loadGoogleSheet(googleSheetLink).then(displayWelcome);
}
function displayWelcome() {
  $(".screen").hide();
  $("#welcome-screen").show();
}
function onClickedStart() {
  var input = $("#name").val();
  if (input.length > 5 || (input.length == 0 && input != "Enter Name")) {
    window.alert("UserName Too Long or No UserName Inputted");
  } else if ((input.length <= 6 && input.length > 0) || input == "Enter Name") {
    $("#nameHolder").html(input);
    displayQuestion();
  }
}
function displayQuestion() {
  var timeLimit = 10;
  var startTime = Date.now(); //get the time at the moment a user first sees the question
  clearInterval(trivia.countDown);
  trivia.countDown = setInterval(function() {
    if (trivia.state == "question") {
      //ensure the user has not already answered
      var elapsedTime = (Date.now() - startTime) / 1000; //calculate the time elapsed
      var clock = timeLimit - Math.floor(elapsedTime); //calculate the countdown w/o decimals
      $("#timer").html(clock); // place the clock time in the html for viewing
      if (clock == 0) {
        //if time is up
        clearInterval(trivia.countDown); //stops our timer at 0. Don't want -1 ...
        trivia.triggerAnswer(false); //marks the answer as incorrect in trivia library
      }
    } else clearInterval(trivia.countDown);
  }, 100); //100 is the time interval in milliseconds
  $(".screen").hide();
  $("#question-screen").show();
  $("#correctAnswer").removeClass("highlight");
  $("#feedback").hide();
  trivia.insertQuestionInfo();
  trivia.shuffleAnswers();
}
function onClickedAnswer(isCorrect) {
  if (isCorrect)
    $("#feedback")
      .html(`Nice!`)
      .show();
  else
    $("#feedback")
      .html(`Expand Wider!`)
      .show();

  $("#correctAnswer").addClass("highlight"); //highlight right answ soundIncorrect.play();er
  setTimeout(trivia.gotoNextQuestion, 1800); //wait 3 secs...next question
}
function displayThankyou() {
  $(".screen").hide();
  $("#thankyou-screen").show();
  $("#game-results").html(
    `You got ${trivia.totalCorrect} of ${trivia.totalAnswered} correct.`
  );
}
//Loops continously for background effects and animations. (p5.js)
function draw() {
  if (trivia.state == "welcome") background("darkblue");
  else if (trivia.state == "question") background("purple");
  else if (trivia.state == "correct") background("green");
  else if (trivia.state == "incorrect") background("red");
  else if (trivia.state == "thankyou") background("pink");
}

function ballInBox() {
  background("purple");
  //adjust ball x/y positions based on frameCount
  //and know when to "bounce"
  var x = frameCount % width;
  if (floor(frameCount / width) % 2 == 0) x = width - x;
  var y = (frameCount * 1.3) % height;
  if (floor(frameCount * 1.3 / height) % 2 == 0) y = height - y;
  translate(x, y);
  ellipse(0, 0, 3, 3);
}

//Loops continously for background effects and animations. (p5.js)
function draw() {
  if (trivia.state == "welcome") ballInBox();
  else if (trivia.state == "question") background("purple");
  else if (trivia.state == "correct") background("green");
  else if (trivia.state == "incorrect") background("red");
  else if (trivia.state == "thankyou") background("orange");
}
