const chatForm = document.getElementById('chat-form');
        const chatLog = document.getElementById('chat-log');
        const userMessageInput = document.getElementById('user-message');

        // Handle form submission
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent the form from refreshing the page

            const userMessage = userMessageInput.value.trim();
            if (!userMessage) return;

            // Append the user's message to the chat log
            appendMessage('You', userMessage);

            // Send the user's message to the Flask server
            try {
                const response = await fetch('/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message: userMessage })
                });

                const data = await response.json();
                if (response.ok) {
                    // Append the bot's reply to the chat log
                    appendMessage('Bot', data.bot_reply);
                } else {
                    // Handle errors (e.g., server error, invalid input)
                    appendMessage('Bot', data.error || 'Oops! Something went wrong.');
                }
            } catch (error) {
                console.error('Error:', error);
                appendMessage('Bot', 'Oops! Something went wrong.');
            }

            // Clear the user input field
            userMessageInput.value = '';
        });

        // Function to append a message to the chat log
        function appendMessage(sender, message) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
            chatLog.appendChild(messageDiv);

            // Scroll to the bottom of the chat log
            chatLog.scrollTop = chatLog.scrollHeight;
        }
