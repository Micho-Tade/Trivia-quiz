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
        question: "What is 15 + 27?",
        answers: ["42", "32", "52", "47"],
        correctAnswer: "42",
    },
    {
        question: "If a train travels 60 miles per hour for 2 hours, how far does it travel?",
        answers: ["120 miles", "100 miles", "140 miles", "160 miles"],
        correctAnswer: "120 miles",
    },
    {
        question: "What is the next number in the sequence: 2, 5, 8, 11, ___?",
        answers: ["12", "14", "13", "15"],
        correctAnswer: "14",
    },
    {
        question: "Which number is the odd one out: 2, 3, 5, 7, 9?",
        answers: ["2", "3", "7", "9"],
        correctAnswer: "9",
    },
    {
        question: "What is 12 x 8?",
        answers: ["96", "104", "108", "100"],
        correctAnswer: "96",
    },
    {
        question: "Which of these numbers is prime: 9, 11, 15, 18?",
        answers: ["9", "11", "15", "18"],
        correctAnswer: "11",
    },
    {
        question: "What is the value of x in the equation 3x = 18?",
        answers: ["6", "3", "9", "12"],
        correctAnswer: "6",
    },
    {
        question: "What is the square root of 144?",
        answers: ["12", "14", "16", "10"],
        correctAnswer: "12",
    },
    {
        question: "If 3x = 9, what is x?",
        answers: ["3", "9", "6", "5"],
        correctAnswer: "3",
    },
    {
        question: "Which of these is an even number: 11, 17, 22, 29?",
        answers: ["11", "17", "22", "29"],
        correctAnswer: "22",
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
