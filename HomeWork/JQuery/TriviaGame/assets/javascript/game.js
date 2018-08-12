//Varibles
//**************************************************************************************/
var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5'];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered; 
var seconds;
var time; 
var answered;
var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "Nope, that's not it.",
	endTime: "Times Up!",
	finished: "Now, was that not fun?."
}
var triviaQuestions = [{
	question: "What Year Was I Born?",
	answerList: ["1960", "1963", "1965", "1967"],
	answer: 0
},{
	question: "What is My NickName?",
	answerList: ["Pretty Boy", "Johnny", "Hoppy", "Froggie"],
	answer: 2
},{
	question: "Who is my favorite Actor?",
	answerList: ["Bobby Jensen", "John Wayne", "Michael Douglas", "Sam Elliot"],
	answer: 3
},{
	question: "Who do I look most a like?",
	answerList: ["Brad Pit", "Kevin Coster", "Clint Eastwood", "Alex Baldwin"],
	answer: 1
},{
	question: "What is my faviort passtime?",
	answerList: ["Reading", "Surfing", "LeatherCraft", "TV"],
	answer: 2
}];

//Events
//**************************************************************************************/
$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

//Functions
//**************************************************************************************/
function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+' of '+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 6;
	$('#timeLeft').html('<h2>Time Remaining: ' + seconds + '</h2>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h2>Time Remaining: ' + seconds + '</h2>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();
	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.jpg">');
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 2000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 2000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
//End Javascript
//**************************************************************************************/