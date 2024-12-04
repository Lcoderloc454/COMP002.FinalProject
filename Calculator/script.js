// Calculator State and Memory
let currentExpression = "";
let lastResult = 0;

// Display Elements
const display = document.getElementById("display");
const lastResultDisplay = document.getElementById("last-result-display");

// Utility: Update Display
const updateDisplay = (value) => {
    display.innerText = value;
};

// Utility: Evaluate Expression Safely
const evaluateExpression = (expression) => {
    try {
        const result = new Function("return " + expression)();
        return result;
    } catch {
        return "Error";
    }
};

// Utility: Factorial Calculation
const factorial = (n) => {
    if (n < 0) return "Error";
    return n === 0 ? 1 : n * factorial(n - 1);
};

// Handle Button Clicks
const handleButtonClick = (buttonValue) => {
    switch (buttonValue) {
        case "C": // Clear
        currentExpression = "";
        updateDisplay("");
        break;
        case "⌫": //Eraser
        currentExpression = currentExpression.slice(0, -1);
        updateDisplay(currentExpression);
        case "=": //Equals
        const result = evaluateExpression(currentExpression);
        if (result !== "Error") {
            lastResult = result;
            lastResultDisplay.innerText = `Last Expression: ${currentExpression} = ${result}`;
        }
        currentExpression = result.toString();
        updateDisplay(currentExpression);
        break;
        case "M+": // Memory add
        lastResult += Number(currentExpression || 0);
        lastResultDisplay.innerText = `Memory: ${lastResult}`;
        break;
        case "M-": // Memory Subtraction
        lastResult -= Number(currentExpression || 0);
        lastResultDisplay.innerText = `Memory: ${lastResult}`;
        break;
        case "MR": // Memory Recall
        currentExpression = lastResult.toString();
        updateDisplay(currentExpression);
        break;
        case "sqrt": //Square Root
        currentExpression = Math.sqrt(Number(currentExpression || 0)).toString();
        updateDisplay(currentExpression);
        break;
        case "!": // Factorial
        const num = Number(currentExpression || 0);
        currentExpression = factorial(num).toString();
        updateDisplay(currentExpression);
        break;
        case "^": // Power
        currentExpression += "**";
        break;
        default: // Append to the Expression
        currentExpression += buttonValue;
        updateDisplay(currentExpression);
        break;
    }
};

// Add Event Listeners to Buttons
document.querySelectorAll(".calculator-button").forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.innerText;
        handleButtonClick(buttonText);
    });
});