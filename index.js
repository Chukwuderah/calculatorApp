const operators = ["+", "×", "÷", "%",]
// Get the display element
var display = document.querySelector("#grab h6");
function displayNumber(number) {

    const content = display.innerHTML;

    // If the display is empty and the operator clicked is not a number, do nothing
    if (!content && operators.includes(number)) {
        return;
    }

    const concat = content + number

    display.innerHTML = concat;
}

function clearNumbers() {
    display.innerHTML = null
}

function backSpace() {
    var content = display.innerHTML;
    var newContent = content.slice(0, -1);
    display.innerHTML = newContent;
}

function calculateResult() {
    // Get the display element
    var display = document.querySelector("#grab h6");
    // Get the expression entered in the calculator
    var expression = display.innerHTML;
    console.log(expression);
    // Replace the regular slash and X with the Unicode division and multiplicatin symbols respectively
    expression = expression.replace(/\//g, '÷'); // Replace all occurrences globally
    expression = expression.replace(/\*/g, '×'); // Replace all occurrences globally

    // Check if the expression contains percentage
    if (expression.includes('%')) {
        // Remove the percentage sign
        expression = expression.replace('%', '');
        // Calculate the percentage
        var result = parseFloat(expression) / 100;
        // Update the display with the result
        display.innerHTML = result;
        return;
    }

    // Split the expression into operands based on all operators
    var operands = expression.split(/(\+|\-|\×|\÷)/);
    // console.log(operands);

    // Check if the expression contains only one number
    if (operands.length === 1) {
        return; // Return null if there's no operation to perform
    }


    // Check if there's no number after the last operator
    if (isNaN(parseFloat(operands[operands.length - 1])) || !isFinite(operands[operands.length - 1])) {
        return; // Return null if the expression ends with an operator
    }


    // Initialize result and current operator
    var result = parseFloat(operands[0]);
    var currentOperator = '+';

    // Iterate through operands starting from the second element
    for (var i = 1; i < operands.length; i++) {
        var operand = operands[i];

        // Check if the operand is an operator
        if (['+', '-', '×', '÷'].includes(operand)) {
            currentOperator = operand; // Update current operator
        } else {
            // Perform calculations based on the current operator
            if (currentOperator === '+') {
                result += parseFloat(operand);
            } else if (currentOperator === '-') {
                // Handle negative arithmetic
                // If the next operand starts with a '-', subtract the absolute value of that operand
                if (operand.startsWith('-')) {
                    result -= Math.abs(parseFloat(operand));
                } else {
                    result -= parseFloat(operand);
                }
            } else if (currentOperator === '×') {
                result *= parseFloat(operand);
            } else if (currentOperator === '÷') {
                result /= parseFloat(operand);
            }
        }
    }

    // Update the display with the final result
    display.innerHTML = result;
}

function toggleTheme() {
    var icon = document.getElementById("icon");

    // Toggle between light and dark mode icons
    if (icon.src.includes("moon-icon.png")) {
        icon.src = "./Images/sun-icon.png";
        toggleDarkMode(); // Change to dark mode
    } else {
        icon.src = "./Images/moon-icon.png";
        toggleLightMode(); // Change to light mode
    }
}

function toggleDarkMode() {
    document.documentElement.style.setProperty('--bg-color', '#111');
    document.documentElement.style.setProperty('--display-bg', 'linear-gradient(to top right, #222, #000)');
    document.documentElement.style.setProperty('--btn-bg2', 'linear-gradient(to bottom right, #0e194e44, #0e1227)');
    document.documentElement.style.setProperty('--font-color', '#fff');
}

function toggleLightMode() {
    document.documentElement.style.setProperty('--bg-color', '#f6f5f2');
    document.documentElement.style.setProperty('--display-bg', 'linear-gradient(to top right,#bed7dc, #b3c8cf');
    document.documentElement.style.setProperty('--btn-bg2', 'linear-gradient(to top right, #bed7dc, #b3c8cf');
    document.documentElement.style.setProperty('--btn-bg3', 'linear-gradient(to top right, rgb(209, 140, 55), rgb(255, 166, 0))');
    document.documentElement.style.setProperty('--font-color', '#000');
}