var questionAnswer = [

    {
        question: 'What is the name of Maleficent\'s pet raven?',
        answers: ['John Cena', 'Zazu', 'Iago', 'Diablo'],
        correct: 'Diablo'
    }, {
        question: 'Which glass slipper did Cinderella leave behind at the ball?',
        answers: ['left', 'right'],
        correct: 'left'
    }, {
        question: 'In the Lion King, which one is these is not one of the hyenas\' names?',
        answers: ['Ganzhi', 'Shenzi', 'Ed', 'Banzai'],
        correct: 'Ganzhi'
    }, {
        question: 'What was the name of Sid\'s dog in Toy Story?',
        answers: ['Skid', 'Scud', 'Skeet', 'Von'],
        correct: 'Scud'
    }, {
        question: 'In The Sword in the Stone, what is the name of Merlin\'s pet owl?',
        answers: ['Socrates', 'Plato', 'Archimedes', 'Aristotle'],
        correct: 'Archimedes'
    },

    {
        question: 'What does the tag on the Mad Hatter\'s Hat read?',
        answers: ['10/6', '5/3', '6/10', '3/5'],
        correct: '10/6'
    },

    {
        question: 'What is the name of Jack\'s ghost dog?',
        answers: ['Hero', 'Zero', 'Dee-oh-gee', 'Stay'],
        correct: 'Zero'
    },

    {
        question: 'What is the name of the snowman in Frozen?',
        answers: ['Fizz', 'Garen', 'Sub-Zero', 'Olaf'],
        correct: 'Olaf'
    }, {
        question: 'What sport does Merida, from the movie Brave, choose for her suitors to compete in?',
        answers: ['Archery', 'Rugby', 'Jousting', 'Tag'],
        correct: 'Archery'
    }, {
        question: 'What is the name of the hunchback in The Hunchback of Notre Dame?',
        answers: ['Herold', 'Quasimodo', 'Quetzalcoatl', 'Frodo'],
        correct: 'Quasimodo'
    },
];

var time = 10;

var unAnswered = 0;

var click = 0;

var questionCount = 0;

var correct = 0;

var incorrect = 0;


// shuffle answers
function shuffleAnswers(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


function shuffleQuestionAnswers(questionAnswer) {
    for (var i = questionAnswer.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = questionAnswer[i];
        questionAnswer[i] = questionAnswer[j];
        questionAnswer[j] = temp;
    }
}





// what happens if timer runs out?

function countDown() {
    $('#timer').html('Timer: ' + time);
    time--;
    if (time < 0) {
        unAnswered++;
        $('#result').html('Time is up! The correct answer is ' + questionAnswer[questionCount].correct);
        reset();
    }
}


// get the question from array and check with answer



function getQuestion() {
    $('#timer').html('Timer: ' + time);
    $('#start').css('display', 'none');
    $('#startText').css('display', 'none');
    $('#timer').removeClass('displayNone');
    timer = setInterval(countDown, 1000);
    //console.log(questionAnswer[questionCount].answers);
    //shuffleQuestionAnswers(questionAnswer[questionCount].questions);
    shuffleAnswers(questionAnswer[questionCount].answers);
    //console.log(questionAnswer[questionCount].answers);
    $('#question').append(questionAnswer[questionCount].question);
    for (var i = 0; i < questionAnswer[questionCount].answers.length; i++) {
        var b = $('<button class="btn pill">');
        b.text(questionAnswer[questionCount].answers[i]);
        b.appendTo('#button' + i);
    }
    checkAnswer();
}



//move to next question .. IF.....
function nextQuestion() {
    time = 10;
    $('#timer').html('Timer: ' + time);
    getQuestion();
}

function checkFinal() {
    if (questionCount === questionAnswer.length - 1) {
        displayResults();
    }
}


// answer check, make sure its correct if else
function checkAnswer() {

    $('button').on('click', function() {
        if ($(this).text() == questionAnswer[questionCount].correct) {
            $('#result').html('That was the correct answer');
            correct++;
            reset();
        } else {
            $('#result').html('That answer was incorrect the correct answer is ' + questionAnswer[questionCount].correct);
            incorrect++;
            reset();
        }
    });
    //console.log(questionCount);
    checkFinal();
}

//clear for next question
function empty() {
    for (var i = 0; i < 4; i++) {
        $('#button' + i).empty();
    }
    $('#question').empty();
    $('#result').empty();
}

//show the results right or wrong
function displayResults() {
    $('#timer').addClass('displayNone');
    $('#result').html('Correct Answers: ' + correct);
    $('#question').html('Incorrect Answers: ' + incorrect);
    $('#answers').html('Unanswered:' + unAnswered);
    clearInterval(timer);
}

// reset timer for next question
function reset() {
    questionCount++;
    clearInterval(timer);
    setTimeout(empty, 3000);
    setTimeout(nextQuestion, 3000);
}



//game reset function, clear bored, zero it out
function resetGame() {
    time = 10;
    questionCount = 0;
    correct = 0;
    incorrect = 0;
    unAnswered = 0;
    setTimeout(getQuestion, 500);
}
