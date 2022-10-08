// time and score
var timeEl = document.querySelector("p.time");
var timeLeft = 75;
var scoreEl = document.querySelector("#score");

// section title
var titleEl = document.querySelector("#title");

//question section
var questionsEl = document.querySelector("#questions");
var questionEl = document.querySelector("#question");
var questionCount = 0;
// questionAnswer
var questionAnswerEl = document.querySelector("#questionAnswer");

// section final
var finalEl = document.querySelector("#final");
// user initials
var initialsInput = document.querySelector("#initials");

// section highscores
var highscoresEl = document.querySelector("#highscores");
// ordered list
var scoreListEl = document.querySelector("#score-list");
// array of scores
var scoreList = [];

// buttons
// start
var startButton = document.querySelector("#start");
// answer button class
var ansButton = document.querySelectorAll("button.ansButton")
// Question answer button selections
var ans1Button = document.querySelector("#answer1");
var ans2Button = document.querySelector("#answer2");
var ans3Button = document.querySelector("#answer3");
var ans4Button = document.querySelector("#answer4");
// submit-score
var submitScrButton = document.querySelector("#submit-score");
// goback
var goBackButton = document.querySelector("#goback");
// clearscores
var clearScrButton = document.querySelector("#clearscores");
// view-scores
var viewScrButton = document.querySelector("#view-scores");

// Array for question, answer is wrong or correct
var questions = [
    {
        // question 0
        question: "Commonly used data types do NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "2"

    },
    {
        // question 1
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: "1"
    },
    {
        // question 2
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3"
    },
    {
        // question 3
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "2"
    },
    {
        // question 4
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "3"
    }
];
console.log(questions);

// timer
function setTime() {
    var timerInterval = setInterval(function () {
        timeLeft--;
        timeEl.textContent = "Time:" + timeLeft + "s";

        if (timeLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = timeLeft;
        }
    }, 1000);
}

// start quiz with timer and set up questions
function startQuiz() {
    titleEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

console.log(startButton)
console.log(questionCount)

// function to set question; takes in a count and displays the next question/answers
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Button.textContent = questions[id].answers[0];
        ans2Button.textContent = questions[id].answers[1];
        ans3Button.textContent = questions[id].answers[2];
        ans4Button.textContent = questions[id].answers[3];
    }
}
console.log(questionsEl)
console.log(questionEl)

// function to check answer and then move to next question
function checkAnswer(event) {
    event.preventDefault();

    // show section for questionAnswer and append message
    questionAnswerEl.setAttribute("style", "display : block; color : #844caf");
    var p = document.createElement("p");
    questionAnswerEl.appendChild(p);

    // time out after 1 second
    setTimeout(function () {
        p.setAttribute("style", "display : none");
    }, 1000);

    // answer checker
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        timeLeft = timeLeft - 10;
        p.textContent = "Wrong!";
    }

    // increment so the questions index is increased
    if (questionCount < questions.length) {
        questionCount++;
    }
    // call setQuestion to bring in next question when any ansButton is clicked
    setQuestion(questionCount);
}

// add score to list // come back to update only letters only alert!
function addScore(event) {
    event.preventDefault();
    finalEl.style.display = "none";
    highscoresEl.style.display = "block";
    var init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: timeLeft });


    // sort the scores in decending order
    scoreList = scoreList.sort(function (a, b) {
        if (a.score < b.score) {
            return 1;
        } else {
            return -1;
        }
    });
    // add score to the scorelist on the DOM
    scoreListEl.innerHTML = "";
    for (var i = 0; i < scoreList.length; i++) {
        var li = document.createElement("li");
        li.textContent = scoreList[i].initials + " : " + scoreList[i].score;
        scoreListEl.append(li);
    }


    // store scores to local storage
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}
// Get stored scores from localStorage
function displayScores() {
    var storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    // If scores were retrieved from localStorage, update the scorelist array to it
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// clear scores
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML = "";
}

// EventListeners
// Start timer and display first question when click start quiz
startButton.addEventListener("click", startQuiz);

// Check answers
document.getElementById("answer1").addEventListener("click", checkAnswer);
document.getElementById("answer2").addEventListener("click", checkAnswer);
document.getElementById("answer3").addEventListener("click", checkAnswer);
document.getElementById("answer4").addEventListener("click", checkAnswer);

// Add score
submitScrButton.addEventListener("click", addScore);

// Go Back Button
goBackButton.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    titleEl.style.display = "block";
    timeLeft = 75;
    timeEl.textContent = "Time:" + timeLeft + "s"
});

// Clear the scores
clearScrButton.addEventListener("click", clearScores);

// View/Hide High Scores Button
viewScrButton.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("No scores to show.");
    }
});