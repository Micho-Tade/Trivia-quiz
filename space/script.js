const nextBtn = document.getElementById("next-button");
const restartBtn = document.getElementById("restart-btn");
const exitBtn = document.getElementById("exit-btn");
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answer-buttons");
const scoreElement = document.getElementById("score");
const resultContainer = document.getElementById("result");

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

// Questions Array
const questions = [
    {
        question: "What is the closest planet to the Sun?",
        answers: ["Earth", "Venus", "Mercury", "Mars"],
        correctAnswer: "Mercury",
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars",
    },
    {
        question: "What is the name of our galaxy?",
        answers: ["Andromeda", "Milky Way", "Whirlpool", "Sombrero"],
        correctAnswer: "Milky Way",
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: ["Earth", "Jupiter", "Saturn", "Neptune"],
        correctAnswer: "Jupiter",
    },
    {
        question: "What is the name of the first human to walk on the Moon?",
        answers: ["Yuri Gagarin", "Buzz Aldrin", "Neil Armstrong", "John Glenn"],
        correctAnswer: "Neil Armstrong",
    },
    {
        question: "What is the phenomenon when the Moon blocks the Sun called?",
        answers: ["Solar Eclipse", "Lunar Eclipse", "Comet", "Meteor Shower"],
        correctAnswer: "Solar Eclipse",
    },
    {
        question: "What is the name of the largest moon of Saturn?",
        answers: ["Europa", "Titan", "Ganymede", "Callisto"],
        correctAnswer: "Titan",
    },
    {
        question: "Which planet has the most moons?",
        answers: ["Earth", "Jupiter", "Saturn", "Mars"],
        correctAnswer: "Saturn",
    },
    {
        question: "What is the brightest star in the night sky?",
        answers: ["Sirius", "Polaris", "Betelgeuse", "Rigel"],
        correctAnswer: "Sirius",
    },
    {
        question: "What is the term for a planet outside our solar system?",
        answers: ["Asteroid", "Exoplanet", "Comet", "Dwarf planet"],
        correctAnswer: "Exoplanet",
    },
];

// Shuffle the questions array
function shuffleQuestions() {
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
}

// Render the current question and its answers
function renderQuestion() {
    const question = shuffledQuestions[currentQuestionIndex];
    questionElement.textContent = question.question;
    answersContainer.innerHTML = "";

    question.answers.forEach((answer) => {
        const answerBtn = document.createElement("button");
        answerBtn.textContent = answer;
        answerBtn.classList.add("btn");
        answerBtn.addEventListener("click", () => checkAnswer(answerBtn, answer, question.correctAnswer));
        answersContainer.appendChild(answerBtn);
    });
}

// Check the selected answer and update the score
function checkAnswer(selectedBtn, selectedAnswer, correctAnswer) {
    const answerButtons = document.querySelectorAll(".btn");
    answerButtons.forEach((button) => (button.disabled = true));

    if (selectedAnswer === correctAnswer) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        answerButtons.forEach((button) => {
            if (button.textContent === correctAnswer) {
                button.classList.add("correct");
            }
        });
    }
    scoreElement.textContent = score;
    nextBtn.style.display = "block";
}

// Show the next question or display results if the quiz is over
function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        renderQuestion();
        nextBtn.style.display = "none";
    } else {
        showResults();
    }
}

// Restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = score;
    shuffleQuestions();
    renderQuestion();
    resultContainer.style.display = "none";
    nextBtn.style.display = "none";
}

// Exit the quiz
function exitQuiz() {
    document.querySelector(".quiz-container").style.display = "none";
    alert("Thank you for playing!");
}

// Show the final results
function showResults() {
    resultContainer.style.display = "block";
    resultContainer.textContent = `Quiz Finished! Your score is ${score}.`;
}

// Initialize the quiz
shuffleQuestions();
renderQuestion();

nextBtn.addEventListener("click", showNextQuestion);
restartBtn.addEventListener("click", restartQuiz);
exitBtn.addEventListener("click", exitQuiz);
