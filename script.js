let log = console.log;
let buttons = document.querySelector('.buttons');
let display = document.querySelectorAll('.output');
let buttonHash = createHash(buttons);
let input = '';
let complete = false;

buttons.addEventListener('click', (event) => handleInput(event.target.innerText));
document.addEventListener('keydown', (event) => handleInput(event.key));

function handleInput(button) {

  switch (button) {
    case 'Enter':
    case '=':
      let calculator = new Calculator();
      complete = true;
      input = calculator.calculate(input).toString();
      break;
    case 'C':
    case 'Delete':
      input = '';
      complete = false;
      break;
    default:
      if (complete) {
        input = '';
        complete = false;
      }
      input = (button in buttonHash) ? input+=button : input;
  }
  displayInput(input);
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


