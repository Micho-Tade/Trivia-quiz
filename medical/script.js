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
        question: "What is the normal body temperature for a human?",
        answers: ["37°C", "36.5°C", "38°C", "39°C"],
        correctAnswer: "37°C",
    },
    {
        question: "Which organ is responsible for pumping blood throughout the body?",
        answers: ["Lungs", "Kidney", "Heart", "Liver"],
        correctAnswer: "Heart",
    },
    {
        question: "What is the medical term for high blood pressure?",
        answers: ["Hypertension", "Hypotension", "Arrhythmia", "Tachycardia"],
        correctAnswer: "Hypertension",
    },
    {
        question: "Which vitamin is primarily obtained from sunlight?",
        answers: ["Vitamin A", "Vitamin B12", "Vitamin D", "Vitamin C"],
        correctAnswer: "Vitamin D",
    },
    {
        question: "What is the most common cause of food poisoning?",
        answers: ["Bacteria", "Viruses", "Parasites", "Fungi"],
        correctAnswer: "Bacteria",
    },
    {
        question: "What does the term 'BMI' stand for?",
        answers: ["Body Mass Index", "Body Muscle Index", "Basic Medical Information", "Blood Mass Indicator"],
        correctAnswer: "Body Mass Index",
    },
    {
        question: "Which part of the body is affected by arthritis?",
        answers: ["Lungs", "Joints", "Muscles", "Nerves"],
        correctAnswer: "Joints",
    },
    {
        question: "What is the recommended daily water intake for an average adult?",
        answers: ["1 liter", "2 liters", "3 liters", "4 liters"],
        correctAnswer: "2 liters",
    },
    {
        question: "Which disease is caused by the deficiency of insulin?",
        answers: ["Cancer", "Diabetes", "Asthma", "Hypertension"],
        correctAnswer: "Diabetes",
    },
    {
        question: "What is the primary function of red blood cells?",
        answers: ["Fight infections", "Carry oxygen", "Control body temperature", "Help digestion"],
        correctAnswer: "Carry oxygen",
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
