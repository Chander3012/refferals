// Button click event for "Get Task"
document.getElementById("btn-task-1").addEventListener("click", generateShortenedLink);

// Function to generate a shortened link
async function generateShortenedLink() {
    const taskCompletionURL = "https://chander3012.github.io/refferals/thank-you?task1-completed=true"; // URL where user will be redirected after task
    const alias = "link-shortener-task"; // Custom alias for the shortened URL

    const apiUrl = `https://shrinkearn.com/api?api=f0873b57ded6b79c5086f2e977db73793512191b&url=${encodeURIComponent(taskCompletionURL)}&alias=${alias}`;

    try {
        // Fetch the shortened link from Shrinkearn API
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 'success' && data.shortenedUrl) {
            const shortenedLink = data.shortenedUrl; // Get the shortened link
            const shortenedLinkElem = document.getElementById("shortened-link");

            // Display the shortened link for the user to click
            shortenedLinkElem.style.display = "inline";
            shortenedLinkElem.href = shortenedLink;
            shortenedLinkElem.innerText = "Click here to complete the task!";
            
            // Enable code input and submit button after link is generated
            document.getElementById("code-input-1").disabled = false;
            document.getElementById("submit-code").disabled = false;
        } else {
            alert("Error generating shortened URL. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to generate shortened link. Check console for details.");
    }
}

// Button click event for "Submit Code"
document.getElementById("submit-code").addEventListener("click", validateCode);

// Function to validate the entered code
function validateCode() {
    const inputField = document.getElementById("code-input-1");
    const enteredCode = inputField.value;

    // Get the code from URL query parameters (or generate it dynamically)
    const correctCode = localStorage.getItem('taskCode');  // Stored code in LocalStorage (generated when user clicks shortened link)

    if (enteredCode === correctCode) {
        alert("Task completed successfully!");
    } else {
        alert("Invalid code. Please try again.");
    }
}

// When the user returns after completing the task
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('task1-completed') && urlParams.get('task1-completed') === 'true') {
        // Generate a random code and store it
        const randomCode = generateRandomCode();
        localStorage.setItem('taskCode', randomCode);

        // Display the code in the input field for user to enter
        alert(`Your code is: ${randomCode}`);
    }
};

// Function to generate a random 6-digit code
function generateRandomCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
