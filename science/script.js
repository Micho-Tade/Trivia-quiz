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
        question: "What is the most abundant element in the Earth's crust?",
        answers: ["Oxygen", "Silicon", "Iron", "Calcium"],
        correctAnswer: "Oxygen",
    },
    {
        question: "Which scientist is known for the principle of buoyancy?",
        answers: ["Isaac Newton", "Albert Einstein", "Archimedes", "Galileo Galilei"],
        correctAnswer: "Archimedes",
    },
    {
        question: "What is the term for the process by which plants convert sunlight into energy?",
        answers: ["Photosynthesis", "Respiration", "Transpiration", "Osmosis"],
        correctAnswer: "Photosynthesis",
    },
    {
        question: "What is the second law of thermodynamics?",
        answers: [
            "Energy cannot be created or destroyed",
            "Entropy of an isolated system always increases",
            "Force equals mass times acceleration",
            "Every action has an equal and opposite reaction",
        ],
        correctAnswer: "Entropy of an isolated system always increases",
    },
    {
        question: "What is the name of the galaxy that contains our Solar System?",
        answers: ["Andromeda Galaxy", "Milky Way Galaxy", "Triangulum Galaxy", "Whirlpool Galaxy"],
        correctAnswer: "Milky Way Galaxy",
    },
    {
        question: "What particle is responsible for carrying the electromagnetic force?",
        answers: ["Photon", "Electron", "Proton", "Neutron"],
        correctAnswer: "Photon",
    },
    {
        question: "What is the chemical formula for table salt?",
        answers: ["NaCl", "KCl", "CaCO3", "NaHCO3"],
        correctAnswer: "NaCl",
    },
    {
        question: "Which organ in the human body is responsible for detoxifying chemicals?",
        answers: ["Liver", "Kidney", "Heart", "Lungs"],
        correctAnswer: "Liver",
    },
    {
        question: "What is the phenomenon where light bends around an object called?",
        answers: ["Refraction", "Reflection", "Diffraction", "Interference"],
        correctAnswer: "Diffraction",
    },
    {
        question: "What is the name of the bond formed by sharing electrons between atoms?",
        answers: ["Ionic Bond", "Covalent Bond", "Hydrogen Bond", "Metallic Bond"],
        correctAnswer: "Covalent Bond",
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
