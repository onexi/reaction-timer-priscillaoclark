# Reaction Time Test

This is a simple web application that tests and records a user's reaction time. It's built using Node.js with Express for the backend and vanilla JavaScript with Chart.js for the frontend.

## Features

1. **Reaction Time Test**: Users can test their reaction time by clicking a button when it changes color.
2. **Name Entry**: Users can enter their name before taking the test.
3. **Results Table**: All test results are displayed in a table, showing the user's name and their reaction time.
4. **Graphical Representation**: A line chart shows the user's reaction times across multiple attempts.
5. **CSV Export**: Users can export all results to a CSV file for further analysis.
6. **Cheating Prevention**: The game detects if a user clicks too early and resets the test.

## How to Play

1. Enter your name in the input field.
2. Click the "Start Test" button.
3. Wait for the large button to turn green. It will initially be red with the text "Wait for green...".
4. As soon as the button turns green and displays "Click now!", click it as quickly as you can.
5. Your reaction time will be displayed on the button, added to the results table, and reflected in the graph.
6. Click "Start Test" to play again.

## Cheating Prevention

If you click the button before it turns green, the game will detect this as an early click. You'll see a "Clicked too soon! Try again." message, and the test will reset. This ensures fair play and accurate reaction time measurements.

## Technical Details

- **Backend**: Node.js with Express
- **Frontend**: HTML, CSS (Bootstrap), and vanilla JavaScript
- **Charting**: Chart.js for the reaction time graph
- **Styling**: Bootstrap 5 with a dark theme

## Setup and Running

1. Ensure you have Node.js installed on your system.
2. Clone this repository.
3. Navigate to the project directory in your terminal.
4. Run `npm install` to install the dependencies.
5. Start the server by running `node app.js`.
6. Open a web browser and go to `http://localhost:3030` to use the application.

Enjoy testing and improving your reaction time!