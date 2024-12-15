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
        question: "What does Wi-Fi stand for?",
        answers: ["Wireless Fidelity", "Wireless Function", "Wide Internet Frequency", "Worldwide Internet Fiber"],
        correctAnswer: "Wireless Fidelity",
    },
    {
        question: "What company developed the iPhone?",
        answers: ["Microsoft", "Apple", "Samsung", "Google"],
        correctAnswer: "Apple",
    },
    {
        question: "Which social media platform is known for its 'tweets'?",
        answers: ["Facebook", "Instagram", "Twitter", "TikTok"],
        correctAnswer: "Twitter",
    },
    {
        question: "What is the most popular search engine?",
        answers: ["Bing", "Yahoo", "Google", "DuckDuckGo"],
        correctAnswer: "Google",
    },
    {
        question: "What does the term 'cloud storage' mean?",
        answers: [
            "Storing files in a physical hard drive",
            "Storing files on a remote server over the internet",
            "Storing files on a computer's desktop",
            "Storing files in an email inbox",
        ],
        correctAnswer: "Storing files on a remote server over the internet",
    },
    {
        question: "What is the main function of a computer’s operating system?",
        answers: [
            "To play music and videos",
            "To manage hardware and software resources",
            "To browse the internet",
            "To run antivirus programs",
        ],
        correctAnswer: "To manage hardware and software resources",
    },
    {
        question: "What does the 'Bluetooth' logo represent?",
        answers: [
            "A wireless internet connection",
            "A Viking king's initials",
            "A symbol for a charging cable",
            "A brand of speakers",
        ],
        correctAnswer: "A Viking king's initials",
    },
    {
        question: "What is the name of the virtual assistant on Apple devices?",
        answers: ["Alexa", "Siri", "Google Assistant", "Cortana"],
        correctAnswer: "Siri",
    },
    {
        question: "Which device is used to browse the internet on the go, besides a smartphone?",
        answers: ["Desktop computer", "Tablet", "Smartwatch", "Printer"],
        correctAnswer: "Tablet",
    },
    {
        question: "What does the term 'download' mean in relation to the internet?",
        answers: [
            "Sending files to another device",
            "Moving files from one folder to another",
            "Transferring files from the internet to your device",
            "Deleting files from your device",
        ],
        correctAnswer: "Transferring files from the internet to your device",
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
