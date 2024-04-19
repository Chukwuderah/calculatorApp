const operators = ["+", "-", "x", "÷", "%"]
// Get the display element
var display = document.querySelector("#grab h6");
function displayNumber(number) {

    const content = display.innerHTML;
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

// function calculateResult() {
//     // Get the display element
//     var display = document.querySelector("#grab h6");
//     // Get the expression entered in the calculator
//     var expression = display.innerHTML;
//     console.log(expression);
//     // Replace the regular slash and X with the Unicode division and multiplicatin symbols respectively
//     expression = expression.replace(/\//g, '÷'); // Replace all occurrences globally
//     expression = expression.replace(/\*/g, '×'); // Replace all occurrences globally

//     // Check if the expression contains percentage
//     if (expression.includes('%')) {
//         // Remove the percentage sign
//         expression = expression.replace('%', '');
//         // Calculate the percentage
//         var result = parseFloat(expression) / 100;
//         // Update the display with the result
//         display.innerHTML = result;
//         return;
//     }

//     // Check if the expression contains division
//     if (expression.includes('÷')) {
//         // Split the expression into operands
//         var operands = expression.split('÷');
//         // Perform the division
//         var result = parseFloat(operands[0]) / parseFloat(operands[1]);
//         // Update the display with the result
//         display.innerHTML = result;
//         return;
//     }

//     // Check if the expression contains multiplication
//     if (expression.includes('×')) {
//         console.log("multiplication")
//         // Split the expression into operands
//         var operands = expression.split('×');
//         // Perform the multiplication
//         var result = parseFloat(operands[0]) * parseFloat(operands[1]);
//         // Update the display with the result
//         display.innerHTML = result;
//         return;
//     }

//     // Check if the expression contains addition
//     if (expression.includes('+')) {
//         // Split the expression into operands
//         var operands = expression.split('+');
//         // Perform the addition
//         console.log(operands);
//         var result = parseFloat(operands[0]) + parseFloat(operands[1]);
//         // Update the display with the result
//         console.log(result);
//         display.innerHTML = result;
//         return;
//     }

//     // Check if the expression contains subtraction
//     if (expression.includes('-')) {
//         // Split the expression into operands
//         var operands = expression.split('-');
//         // Perform the subtraction
//         var result = parseFloat(operands[0]) - parseFloat(operands[1]);
//         // Update the display with the result
//         display.innerHTML = result;
//         return;
//     }
// }


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

    // Perform calculations based on the operator
    for (var i = 0; i < operands.length; i++) {
        if (operands[i] === '÷') {
            // Perform the division
            var result = parseFloat(operands[i - 1]) / parseFloat(operands[i + 1]);
            // Update the array with the result and remove the used operands
            operands.splice(i - 1, 3, result);
            // Reset the index to recheck the same position
            i--;
        } else if (operands[i] === '×') {
            // Perform the multiplication
            var result = parseFloat(operands[i - 1]) * parseFloat(operands[i + 1]);
            // Update the array with the result and remove the used operands
            operands.splice(i - 1, 3, result);
            // Reset the index to recheck the same position
            i--;
        }
    }

    // Perform addition and subtraction
    var result = parseFloat(operands[0]);
    for (var i = 1; i < operands.length; i += 2) {
        if (operands[i] === '+') {
            result += parseFloat(operands[i + 1]);
        } else if (operands[i] === '-') {
            result -= parseFloat(operands[i + 1]);
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
    document.documentElement.style.setProperty('--font-color', '#000');
}
