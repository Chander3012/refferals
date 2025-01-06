const taskCodes = {}; // Store generated codes
let task1Completed = false;  // Flag to track if Task 1 is completed

// Check if the task is marked as completed in the URL
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('task1-completed')) {
        task1Completed = true;
        alert("You have completed Task 1! Now you can get the code.");
        generateCode(1);  // Display the code for Task 2
    }
};

// Redirect the user to the link shortener task
function completeLinkShortener() {
    // Redirect to the link shortener service
    // Add your link shortener service URL here, for example:
    window.location.href = "https://shrinkme.io/st?api=eac3e0b8901b846eb9ddaa05e03bd568aeae26bb&url=yourdestinationlink.com";
}

// Generate a random 6-digit code and show it
function generateCode(taskNumber) {
    const code = Math.floor(100000 + Math.random() * 900000); // 6-digit code
    taskCodes[taskNumber] = code;

    // Show code next to the button
    const codeDisplay = document.getElementById(`code-display-${taskNumber}`);
    if (codeDisplay) {
        codeDisplay.textContent = `Code: ${code}`;
    }

    const inputField = document.getElementById(`code-input-${taskNumber}`);
    if (inputField) {
        inputField.disabled = false;  // Enable the code input field
    }

    const submitButton = inputField.nextElementSibling;
    if (submitButton) {
        submitButton.disabled = false; // Enable the submit button
    }
}

// Validate the entered code and unlock the task completion button
function validateCode(taskNumber) {
    const inputField = document.getElementById(`code-input-${taskNumber}`);
    const enteredCode = inputField.value;

    if (enteredCode == taskCodes[taskNumber]) {
        alert(`Task ${taskNumber} unlocked!`);

        // Remove Task Completed button after the code is entered
        const taskCompletedButton = document.getElementById(`task-completed-${taskNumber}`);
        if (taskCompletedButton) {
            taskCompletedButton.remove();
        }

        // Unlock the next task button and change its color
        const nextTaskButton = document.getElementById(`btn-task-${taskNumber + 1}`);
        if (nextTaskButton) {
            nextTaskButton.disabled = false;  // Enable the next task button
            nextTaskButton.classList.add("btn-warning"); // Change color to indicate task is unlocked
        }
    } else {
        alert("Invalid code. Please try again.");
    }
}

