// Light/Dark Theme
const toggleElement = document.querySelector('.themes__toggle');
const toggleDarkTheme = () => { toggleElement.classList.toggle("themes__toggle--isActive"); }
const toggleDarkThemeWithEnter = (event) => (event.key === "Enter") && toggleDarkTheme();
toggleElement.addEventListener("click", toggleDarkTheme);
toggleElement.addEventListener("keydown", toggleDarkThemeWithEnter);

// Logic for calculator
let storeNumber = '';
let currentNumber = '';
let operation = '';

const resultElement = document.querySelector(".calc__result");
const keyElements = document.querySelectorAll("[data-type]");

const updateScreen = (value) => {
    resultElement.innerText = !value ? "0" : value;
}

const numberButtonHandler = (value) => {
    if (value === "." && currentNumber.includes(".")) return;
    if (value === "." && !currentNumber) return;

    currentNumber += value;
    updateScreen(currentNumber);
}

const resetButtonHandler = () => {
    storeNumber = '';
    currentNumber = '';
    operation = '';
    updateScreen(currentNumber);
}

const deleteButtonHandler = () => {
    if (!currentNumber || currentNumber === "0") return;

    if (currentNumber.length === 1) {
        currentNumber = "";
    } else {
        currentNumber = currentNumber.substring(0, currentNumber.length - 1);
    }
    updateScreen(currentNumber);
};

const executeOperation = () => {
    if (currentNumber && storeNumber && operation) {
        switch (operation) {
            case '+':
                storeNumber = parseFloat(storeNumber) + parseFloat(currentNumber);
                break;
            case '-':
                storeNumber = parseFloat(storeNumber) - parseFloat(currentNumber);
                break;
            case '*':
                storeNumber = parseFloat(storeNumber) * parseFloat(currentNumber);
                break;
            case '/':
                storeNumber = parseFloat(storeNumber) / parseFloat(currentNumber);
                break;
            default:
                break;
        }
        currentNumber = "";
        updateScreen(storeNumber);
    }
}

const operationButtonHandler = (operationValue) => {
    if (!storeNumber && !currentNumber) return;
    if (currentNumber && !storeNumber) {
        storeNumber = currentNumber;
        currentNumber = '';
        operation = operationValue;
    } else if (storeNumber) {
        operation = operationValue;
    }
    if (currentNumber) executeOperation();
}

const keyElementsHandler = (element) => {
    element.addEventListener("click", () => {
        const type = element.dataset.type;
        if (type === "number") {
            numberButtonHandler(element.dataset.value);
        } else if (type === "operation") {
            switch (element.dataset.value) {
                case "c":
                    resetButtonHandler();
                    break;
                case "Backspace":
                    deleteButtonHandler();
                    break;
                case "Enter":
                    executeOperation();
                    break;
                default:
                    operationButtonHandler(element.dataset.value);
            }
        }
    });
}

keyElements.forEach(keyElementsHandler);

// Use keyboard as input source
const availableNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const availableOperations = ['+', '-', '*', '/'];

addEventListener("keydown", (event) => {
    const key = event.key;
    if (availableNumbers.includes(key)) {
        numberButtonHandler(key);
    } else if (availableOperations.includes(key)) {
        operationButtonHandler(key);
    } else if (key === "Backspace") {
        deleteButtonHandler();
    } else if (key === "Enter") {
        executeOperation();
    } else if (key.toLowerCase() === "c") {
        resetButtonHandler();
    }
});