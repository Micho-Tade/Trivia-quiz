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
        question: "Who is considered the father of modern engineering?",
        answers: ["Isambard Kingdom Brunel", "Leonardo da Vinci", "Nikola Tesla", "Thomas Edison"],
        correctAnswer: "Isambard Kingdom Brunel",
    },
    {
        question: "What is the tallest building in the world?",
        answers: ["Empire State Building", "Burj Khalifa", "Shanghai Tower", "Petronas Towers"],
        correctAnswer: "Burj Khalifa",
    },
    {
        question: "What is the primary material used in reinforced concrete?",
        answers: ["Wood", "Steel", "Aluminum", "Plastic"],
        correctAnswer: "Steel",
    },
    {
        question: "What is the architectural style of the Eiffel Tower?",
        answers: ["Baroque", "Gothic", "Art Deco", "Iron Lattice"],
        correctAnswer: "Iron Lattice",
    },
    {
        question: "Who designed the Sydney Opera House?",
        answers: ["Frank Lloyd Wright", "Zaha Hadid", "Jørn Utzon", "Le Corbusier"],
        correctAnswer: "Jørn Utzon",
    },
    {
        question: "Which engineering field focuses on the design and construction of bridges?",
        answers: ["Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Chemical Engineering"],
        correctAnswer: "Civil Engineering",
    },
    {
        question: "What is the term for the process of converting raw materials into products in large quantities?",
        answers: ["Manufacturing", "Design", "Prototyping", "Engineering"],
        correctAnswer: "Manufacturing",
    },
    {
        question: "Which ancient wonder was located in Egypt and was a massive statue?",
        answers: [
            "The Colossus of Rhodes",
            "The Great Pyramid of Giza",
            "The Statue of Zeus",
            "The Lighthouse of Alexandria",
        ],
        correctAnswer: "The Statue of Zeus",
    },
    {
        question: "What is the primary purpose of a structural engineer?",
        answers: [
            "Designing electrical systems",
            "Creating software",
            "Ensuring the safety and stability of buildings",
            "Designing interiors",
        ],
        correctAnswer: "Ensuring the safety and stability of buildings",
    },
    {
        question: "Which is the largest dam in the world by volume?",
        answers: ["Three Gorges Dam", "Hoover Dam", "Aswan High Dam", "Itaipu Dam"],
        correctAnswer: "Three Gorges Dam",
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
