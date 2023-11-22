// Add event listeners to each button to trigger the sendEmail function on click
document.getElementById('submitFeedback').addEventListener('click', () => sendEmail('Feedback'));
document.getElementById('submitIdeas').addEventListener('click', () => sendEmail('Ideas'));
document.getElementById('submitQuestions').addEventListener('click', () => sendEmail('Questions'));

// Function to send an email based on the type (Feedback, Ideas, Questions)
async function sendEmail(type) {
    // Get the text area element based on the type
    const textArea = document.getElementById(type.toLowerCase());
    const body = textArea.value;

    // URL of your Google Cloud Function
    const functionUrl = 'https://us-central1-github-feedback.cloudfunctions.net/GitHub-Feedback-Function-01';
    

    try {
        // Send a POST request to the Google Cloud Function
        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type, body }),
        });

        // Change button color and display an alert based on the response
        const button = document.getElementById(`submit${type}`);
        if (response.ok) {
            button.style.backgroundColor = 'green';
            alert('Thank you for your feedback!');
        } else {
            button.style.backgroundColor = 'red';
            alert('Sorry, we were unable to process your request at this time. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        button.style.backgroundColor = 'red';
        alert('Error sending feedback.');
    }
}
