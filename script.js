let log = console.log;
let buttons = document.querySelector('.buttons');
let display = document.querySelectorAll('.output');
let displayInner = document.querySelector('.innerDisplay');
let buttonHash = createHash(buttons);
let input = '';
let complete = false;
let calculator = new Calculator();
let resizeTimer;

buttons.addEventListener('click', (event) => handleInput(event.target.textContent));
document.addEventListener('keydown', (event) => handleInput(event.key));
//Change # of output blocks based on screen size

window.addEventListener('resize', resizeDisplay);
resizeDisplay();
//window.addEventListener('resize', () => log('resize!'));

function handleInput(button) {
  switch (button) {
    case 'Enter':
    case '=':
      complete = true;
      input = calculator.calculate(input).toString();
      break;
    case '1/x':
    case 'x2':
    case 'x':
    case '+/-':
      complete = true;
      input = calculator.calculate(input).toString();
      input = calculator.calculateSpecial(input, button).toString();
      break;
    case 'C':
    case 'CE':
    case 'Delete':
      complete = false;
      input = '';
      break;
    case '\ue14a':
      input = input.slice(1);
      break;
    default:
      if (complete) {
        complete = false;
        input = '';
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
    '1/x': (x) => 1/x,
    'x2': (x) => x*x,
    'x': (x) => Math.sqrt(x),
    '+/-': (x) => x*(-1),
  }
/* The code snippet below was my attempt at implementing the eval
function. */
  this.calculate = (str) => {
    //create arrays for operators and operands
    let operators = str.match(/[^\.\d]/g);
    let operands = str.split(/[^\.\d]/).map((char) => +char);
    /*ACTION: Able to accept multiple inputs (includind decimals)
    but does not observe proper order of operations. Need to build
    parser for handling this.*/
    return operands.reduce( (total,current,index, operands) => {
      if (index === operands.length)
        return total;
      else
        return this.methods[operators[index-1]](total,operands[index]);
    })
  };

//  this.calculate = (str) => Function("return " + str)();

  this.calculateSpecial = (x, op) => this.methods[op](x);
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

function resizeDisplay() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout( () => {
    displayInner = document.querySelector('.innerDisplay');
    let desired = Math.floor(displayInner.offsetWidth/18);
    let actual = displayInner.children.length;
    while (actual > desired) {
      displayInner.removeChild(displayInner.lastElementChild);
      actual--;
    }
    while (actual < desired) {
      const output = document.createElement('div');
      output.classList.add('output');
      displayInner.appendChild(output);
      actual++;
    }
    display = document.querySelectorAll('.output');
  }, 300);
  return;
}

