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
        this.nextOperandTextValue.innerText = "";
    }
    appendNumber(number) {
        if (this.currentOperand.includes(".") && number === ".") return;
        this.currentOperand =
            this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) {}
    accumulation() {}
    updateDisplay() {
        this.nextOperandTextValue.innerText = this.currentOperand;
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

// calculator.clear()
