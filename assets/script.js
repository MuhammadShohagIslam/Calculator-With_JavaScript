// make a calculator class
class Calculator {
    constructor(previousOperandTextValue, nextOperandTextValue) {
        this.previousOperandTextValue = previousOperandTextValue;
        this.nextOperandTextValue = nextOperandTextValue;
        this.clear();
    }
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
        console.log(this.currentOperand, this.previousOperand, this.operation);
    }
    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }
    appendNumber(number) {
        if (this.currentOperand.includes(".") && number === ".") return;
        this.currentOperand =
            this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand != "") {
            this.accumulation();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
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
    updateDisplay() {
        this.nextOperandTextValue.innerText = this.getDisplayNumber(
            this.currentOperand
        );
        if (this.operation != null) {
            this.previousOperandTextValue.innerText = `${this.getDisplayNumber(
                this.previousOperand
            )}${this.operation}`;
        } else {
            this.previousOperandTextValue.innerText = "";
        }
    }
}

// grab indentity from the html file
const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalBtn = document.querySelector("[data-equal]");
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-all-clear]");
const previousOperandTextValue = document.querySelector(
    "[data-previous-operand]"
);
const nextOperandTextValue = document.querySelector("[data-next-operand]");

// create a calculator instance
const calculator = new Calculator(
    previousOperandTextValue,
    nextOperandTextValue
);

// add number to the appendNumber method
numberBtns.forEach((numberButton) => {
    numberButton.addEventListener("click", function () {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    });
});

// add operator to the chooseOperation method
operationBtns.forEach((operationButton) => {
    operationButton.addEventListener("click", function () {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    });
});

// calculation and get total value with accumalation method
equalBtn.addEventListener("click", function () {
    calculator.accumulation();
    calculator.updateDisplay();
});
deleteBtn.addEventListener("click", function () {
    calculator.delete();
    calculator.updateDisplay();
});
allClearBtn.addEventListener("click", function () {
    calculator.clear();
    calculator.updateDisplay();
});
