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
// calculator.clear()
