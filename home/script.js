// Variables to track the selected category
let selectedCategory = "";

// Function to handle category selection
document.querySelectorAll(".categories ul li").forEach((item) => {
    item.addEventListener("click", () => {
        // Remove the 'selected' class from all categories
        document.querySelectorAll(".categories ul li").forEach((li) => {
            li.classList.remove("selected");
        });

        // Add the 'selected' class to the clicked category
        item.classList.add("selected");

        // Store the selected category
        selectedCategory = item.id;

        // Redirect to the corresponding HTML page based on the selected category
        switch (selectedCategory) {
            case "science":
                window.location.href = "/science/index.html"; // Absolute path
                break;
            case "tech":
                window.location.href = "/tech/index.html"; // Absolute path
                break;
            case "space":
                window.location.href = "/space/index.html"; // Absolute path
                break;
            case "engineering":
                window.location.href = "/engineering/index.html"; // Absolute path
                break;
            case "environment":
                window.location.href = "/environment/index.html"; // Absolute path
                break;
            case "math":
                window.location.href = "/math/index.html"; // Absolute path
                break;
            case "medical":
                window.location.href = "/medical/index.html"; // Absolute path
                break;
            default:
                alert("Please select a valid category.");
                break;
        }
    });
});
