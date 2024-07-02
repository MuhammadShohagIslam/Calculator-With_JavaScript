// Define a Calculator class
class Calculator {
    // constructor initializes with references to HTML elements and clears operands
    constructor(previousOperandTextValue, nextOperandTextValue) {
        this.previousOperandTextValue = previousOperandTextValue;
        this.nextOperandTextValue = nextOperandTextValue;
        this.clear();
    }

    // clear all operands and operation
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    // delete the last character of the current operand
    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    // append a number or decimal point to the current operand
    appendNumber(number) {
        if (this.currentOperand.includes(".") && number === ".") return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    // store the chosen operation and calculate if there's already a previous operand
    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.accumulation();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    // perform arithmetic based on the chosen operation
    accumulation() {
        let accumulatedAmount;
        const prev = parseFloat(this.previousOperand);
        const cur = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(cur)) return;
        switch (this.operation) {
            case "+":
                accumulatedAmount = prev + cur;
                break;
            case "-":
                accumulatedAmount = prev - cur;
                break;
            case "*":
                accumulatedAmount = prev * cur;
                break;
            case "÷":
                accumulatedAmount = prev / cur;
                break;
            default:
                return;
        }
        this.currentOperand = accumulatedAmount;
        this.operation = undefined;
        this.previousOperand = "";
    }

    // format number for display
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigit = parseFloat(stringNumber.split(".")[0]);
        const decimalDigit = stringNumber.split(".")[1];
        let integerDisplay;

        if (isNaN(integerDigit)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigit.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }
        if (decimalDigit != null) {
            return `${integerDisplay}.${decimalDigit}`;
        } else {
            return integerDisplay;
        }
    }

    // update the displayed operands
    updateDisplay() {
        this.nextOperandTextValue.innerText = this.getDisplayNumber(
            this.currentOperand
        );
        if (this.operation != null) {
            this.previousOperandTextValue.innerText = `${this.getDisplayNumber(
                this.previousOperand
            )} ${this.operation}`;
        } else {
            this.previousOperandTextValue.innerText = "";
        }
    }
}

// grab HTML elements for calculator functionality
const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalBtn = document.querySelector("[data-equal]");
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-all-clear]");
const previousOperandTextValue = document.querySelector(
    "[data-previous-operand]"
);
const nextOperandTextValue = document.querySelector("[data-next-operand]");

// create an instance of Calculator
const calculator = new Calculator(
    previousOperandTextValue,
    nextOperandTextValue
);

// add event listeners for number buttons to append numbers
numberBtns.forEach((numberButton) => {
    numberButton.addEventListener("click", function () {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    });
});

// add event listeners for operation buttons to choose operations
operationBtns.forEach((operationButton) => {
    operationButton.addEventListener("click", function () {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    });
});

// add event listener for equal button to perform calculation
equalBtn.addEventListener("click", function () {
    calculator.accumulation();
    calculator.updateDisplay();
});

// add event listener for delete button to remove last character
deleteBtn.addEventListener("click", function () {
    calculator.delete();
    calculator.updateDisplay();
});

// add event listener for all clear button to reset calculator
allClearBtn.addEventListener("click", function () {
    calculator.clear();
    calculator.updateDisplay();
});
