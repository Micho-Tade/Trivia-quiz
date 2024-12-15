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
        question: "What is the greenhouse effect?",
        answers: [
            "The trapping of the sun's warmth in the Earth's atmosphere",
            "The cooling of the Earth's surface",
            "The process of photosynthesis in plants",
            "The creation of ozone in the stratosphere",
        ],
        correctAnswer: "The trapping of the sun's warmth in the Earth's atmosphere",
    },
    {
        question: "Which gas is most responsible for global warming?",
        answers: ["Oxygen", "Carbon dioxide", "Nitrogen", "Methane"],
        correctAnswer: "Carbon dioxide",
    },
    {
        question: "What is the main cause of deforestation?",
        answers: ["Wildfires", "Urbanization", "Agricultural expansion", "Pollution"],
        correctAnswer: "Agricultural expansion",
    },
    {
        question: "Which renewable energy source uses wind to generate electricity?",
        answers: ["Solar power", "Hydropower", "Geothermal energy", "Wind power"],
        correctAnswer: "Wind power",
    },
    {
        question: "What is the process by which plants take in carbon dioxide and release oxygen?",
        answers: ["Respiration", "Photosynthesis", "Transpiration", "Fermentation"],
        correctAnswer: "Photosynthesis",
    },
    {
        question: "What is the largest source of freshwater on Earth?",
        answers: ["Rivers", "Lakes", "Glaciers and ice caps", "Underground aquifers"],
        correctAnswer: "Glaciers and ice caps",
    },
    {
        question: "Which of the following is an example of non-renewable energy?",
        answers: ["Wind", "Solar", "Natural gas", "Geothermal"],
        correctAnswer: "Natural gas",
    },
    {
        question: "What is the main effect of acid rain?",
        answers: [
            "Increased oxygen levels in water bodies",
            "Damage to buildings and forests",
            "Increase in crop yields",
            "Reduction in greenhouse gases",
        ],
        correctAnswer: "Damage to buildings and forests",
    },
    {
        question: "What is the primary purpose of recycling?",
        answers: [
            "To reduce waste and conserve resources",
            "To create more landfills",
            "To increase carbon emissions",
            "To burn more fossil fuels",
        ],
        correctAnswer: "To reduce waste and conserve resources",
    },
    {
        question: "Which of the following is a major consequence of climate change?",
        answers: [
            "Increased biodiversity",
            "More stable weather patterns",
            "Rising sea levels",
            "Lower global temperatures",
        ],
        correctAnswer: "Rising sea levels",
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
