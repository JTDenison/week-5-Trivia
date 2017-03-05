var questionAnswer = [

    {
        question: 'What is the name of Maleficent\'s pet raven?',    
        answers: ['John Cena', 'Zazu', 'Iago', 'Diablo'],
        correct: 'Diablo'
    },

    {
        question: 'Which glass slipper did Cinderella leave behind at the ball?',
        answers: ['left', 'right'],
        correct: 'left'
    },

    {
        question: 'In the Lion King, which one is these is not one of the hyenas\' names?',  
        answers: ['Ganzhi','Shenzi','Ed','Banzai'],
        correct: 'Ganzhi'
    },

    {
        question: 'What was the name of Sid\'s dog in Toy Story?',   
        answers: ['Skid','Scud','Skeet', 'Von'],
        correct: 'Scud'
    },

    {
        question: 'In The Sword in the Stone, what is the name of Merlin\'s pet owl?', 
        answers: ['Socrates','Plato','Archimedes','Aristotle'],
        correct: 'Archimedes'
    },

    {
        question: 'What does the tag on the Mad Hatter\'s Hat read?',  
        answers: ['10/6', '5/3', '6/10', '3/5'],
        correct: '10/6'
    },

    {
        question: 'What is the name of Jack\'s ghost dog?',   
        answers: ['Hero','Zero','Dee-oh-gee','Stay' ],
        correct: 'Zero'
    },

     /*{
        question: '',  
        answers: [],
        correct: ''
    }, {
        question: '',  
        answers: [],
        correct: ''
    }, {
        question: '',  
        answers: [],
        correct: ''
    }, {
        question: '',  
        answers: [],
        correct: ''
    }, {
        question: '',  
        answers: [],
        correct: ''
    },*/
];

var time = 10;

var questionCount = 0;

var correct = 0;

var incorrect = 0;

var unAnswered = 0;

var click = 0;

// FUNCTIONS
// =================================================================================================

// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleAnswers(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

/* function shuffleQuestionAnswers(array) {
    for (var i = questionAnswer.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = questionAnswer[i];
        questionAnswer[i] = questionAnswer[j];
        questionAnswer[j] = temp;
    }
}
  */


function countDown() {
    $('#timer').html('Timer: ' + time);
    time --;
    if (time < 0) {
        unAnswered++;
        $('#result').html('Time is up! The correct answer is ' + questionAnswer[questionCount].correct);
        reset();
    }
}

function getQuestion() {
    $('#timer').html('Timer: ' + time);
    $('#start').css('display', 'none');
    $('#startText').css('display', 'none');
    $('#timer').removeClass('displayNone');
    timer = setInterval(countDown, 1000);
    //console.log(questionAnswer[questionCount].answers);
    shuffleAnswers(questionAnswer[questionCount].answers);
    //console.log(questionAnswer[questionCount].answers);
    $('#question').append(questionAnswer[questionCount].question);
    for (var i = 0; i < questionAnswer[questionCount].answers.length; i++) {
        var b = $('<button class="btn pill">');
        b.text(questionAnswer[questionCount].answers[i]);
        b.appendTo('#button'+i);
    }
    checkAnswer();
}

function nextQuestion() {
    time = 10;
    $('#timer').html('Timer: ' + time);
    getQuestion();
}

function checkFinalAnswer() {
    if (questionCount === questionAnswer.length -1){
        displayResults();
    }
}

function checkAnswer() {

    $('button').on('click', function() {
        if ($(this).text() == questionAnswer[questionCount].correct) {
            $('#result').html('That was the correct answer');
            correct++;
            reset();
        } 
        else {
            $('#result').html('That answer was incorrect the correct answer is ' + questionAnswer[questionCount].correct);
            incorrect++;
            reset();
        }
    });
    //console.log(questionCount);
    checkFinalAnswer();
}

function empty() {
    for (var i = 0; i < 4; i++) {
        $('#button'+i).empty();
    }
    $('#question').empty();
    $('#result').empty();
}

function reset() {
    questionCount++;
    clearInterval(timer);
    setTimeout(empty, 3000);
    setTimeout(nextQuestion, 3000);
}

function displayResults() {
    $('#timer').addClass('displayNone');
    $('#result').html('Correct Answers: ' + correct);
    $('#question').html('Incorrect Answers: ' + incorrect);
    $('#answers').html('Unanswered:' + unAnswered);
    clearInterval(timer);
}

function resetGame() {
    time = 10;
    questionCount = 0;
    correct = 0;
    incorrect = 0;
    unAnswered = 0;
    setTimeout(getQuestion, 500);
}