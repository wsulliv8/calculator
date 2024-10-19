let log = console.log;
let buttons = document.querySelector('.buttons');
let display = document.querySelectorAll('.output');
let buttonHash = createHash(buttons);
let input = { equation : '', complete : false};

buttons.addEventListener('click', (event) => handleInput(event.target.innerText));
document.addEventListener('keydown', (event) => handleInput(event.key));

function handleInput(button) {
  switch (button) {
    case 'Enter':
    case '=':
      input.complete = true;
      let calculator = new Calculator();
      input.equation = calculator.calculate(input.equation).toString();
      break;
    case 'C':
    case 'Delete':
      input.complete = false;
      input.equation = '';
      break;
    default:
      if (input.complete) {
        input.complete = false;
        input.equation = '';
      }
      input.equation = (button in buttonHash) ? input.equation+=button : input.equation;
  }
  displayInput(input.equation);
  return;
}

function Calculator() {
  this.methods = {
    '+': (x, y) => x+y,
    '-': (x, y) => x-y,
    '*': (x, y) => x*y,
    '/': (x, y) => x/y,
    '%': (x, y) => x%y,
  }

  this.calculate = (str) => {
    //split string by operator but remember operator
    let equation = str.split(/(\D)/),
      x = +equation[0],
      op = equation[1],
      y = +equation[2];
    if (!this.methods[op] || isNaN(x) || isNaN(y)) return NaN;
    
    return this.methods[op](x,y);
  };
}

function createHash(element) {
  let nodeList = element.children;
  let hash = {}
  for (const node of nodeList) {
    hash[node.innerText] = true;
  }
  return hash;
}

function displayInput(input) {
  clearDisplay();

  for (let i=(input.length-1), j=0; i>=0; i--, j++) {
    display[i].innerText = input[j];
  }
}

function clearDisplay() { 
  display.forEach((cell) => cell.innerText = '');
}


