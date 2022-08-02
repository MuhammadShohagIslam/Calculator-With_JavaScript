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
    accumulation() {}
    updateDisplay() {
        this.nextOperandTextValue.innerText = this.currentOperand;
        this.previousOperandTextValue.innerText = this.previousOperand;
    }
}

const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalBtn = document.querySelector("[data-equal]");
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-all-clear]");
const previousOperandTextValue = document.querySelector(
    "[data-previous-operand]"
);
const nextOperandTextValue = document.querySelector("[data-next-operand]");

const calculator = new Calculator(
    previousOperandTextValue,
    nextOperandTextValue
);

numberBtns.forEach((numberButton) => {
    numberButton.addEventListener("click", function () {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    });
});

operationBtns.forEach((operationButton) => {
    operationButton.addEventListener("click", function () {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    });
});

allClearBtn.addEventListener("click", function () {
    calculator.clear();
    calculator.updateDisplay();
});
// calculator.clear()
