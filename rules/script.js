// Function to redirect to the categories page when the "Start Quiz" button is clicked
document.getElementById("start").addEventListener("click", function () {
    window.location.href = "categories.html"; // Redirect to the categories page inside the rules folder
});

function startQuiz(category) {
    // Redirect to the quiz page for the selected category, assuming each category is in its own folder
    window.location.href = "../" + category + "/index.html"; // The category folder contains the quiz.html
}
