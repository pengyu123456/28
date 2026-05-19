class Calculator {
  constructor() {
    this.display = document.querySelector('.display-value');
    this.currentValue = '0';
    this.previousValue = '';
    this.operator = null;
    this.shouldResetDisplay = false;
    this.bindEvents();
  }

  bindEvents() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('click', () => this.handleClick(button));
    });
  }

  handleClick(button) {
    const value = button.textContent;

    if (button.classList.contains('btn-number')) {
      this.appendNumber(value);
    } else if (button.classList.contains('btn-operator')) {
      this.setOperator(value);
    } else if (button.classList.contains('btn-clear')) {
      this.clear();
    } else if (button.classList.contains('btn-backspace')) {
      this.backspace();
    } else if (button.classList.contains('btn-equals')) {
      this.calculate();
    } else if (button.classList.contains('btn-function')) {
      this.handleFunction(value);
    }
  }

  appendNumber(number) {
    if (this.shouldResetDisplay) {
      this.currentValue = '0';
      this.shouldResetDisplay = false;
    }

    if (number === '.' && this.currentValue.includes('.')) {
      return;
    }

    if (this.currentValue === '0') {
      this.currentValue = number;
    } else {
      this.currentValue += number;
    }

    this.updateDisplay();
  }

  setOperator(op) {
    if (this.operator !== null && !this.shouldResetDisplay) {
      this.calculate();
    }

    this.previousValue = this.currentValue;
    this.currentValue = '0';
    this.operator = op;
    this.shouldResetDisplay = false;
  }

  calculate() {
    if (this.operator === null || this.previousValue === '') {
      return;
    }

    let result;
    const prev = parseFloat(this.previousValue);
    const current = parseFloat(this.currentValue);

    if (isNaN(prev) || isNaN(current)) {
      return;
    }

    switch (this.operator) {
      case '+':
        result = prev + current;
        break;
      case '−':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        if (current === 0) {
          this.display.textContent = 'Error';
          this.clear();
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }

    this.currentValue = this.formatResult(result);
    this.previousValue = '';
    this.operator = null;
    this.shouldResetDisplay = true;

    this.updateDisplay();
  }

  handleFunction(func) {
    const current = parseFloat(this.currentValue);

    if (isNaN(current)) {
      return;
    }

    let result;

    switch (func) {
      case '±':
        result = -current;
        break;
      case '%':
        result = current / 100;
        break;
      case '√':
        if (current < 0) {
          this.display.textContent = 'Error';
          this.clear();
          return;
        }
        result = Math.sqrt(current);
        break;
      case 'x²':
        result = current * current;
        break;
      case 'x³':
        result = current * current * current;
        break;
      case '1/x':
        if (current === 0) {
          this.display.textContent = 'Error';
          this.clear();
          return;
        }
        result = 1 / current;
        break;
      default:
        return;
    }

    this.currentValue = this.formatResult(result);
    this.shouldResetDisplay = true;
    this.updateDisplay();
  }

  formatResult(result) {
    if (result === Infinity || result === -Infinity) {
      return 'Error';
    }
    if (Number.isInteger(result)) {
      return result.toString();
    }
    return result.toFixed(10).replace(/\.?0+$/, '');
  }

  clear() {
    this.currentValue = '0';
    this.previousValue = '';
    this.operator = null;
    this.shouldResetDisplay = false;
    this.updateDisplay();
  }

  backspace() {
    if (this.currentValue.length > 1) {
      this.currentValue = this.currentValue.slice(0, -1);
    } else {
      this.currentValue = '0';
    }
    this.updateDisplay();
  }

  updateDisplay() {
    this.display.textContent = this.currentValue;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Calculator();
});
