let log = console.log;
let buttons = document.querySelector('.buttons');
let display = document.querySelectorAll('.output');
let buttonHash = createHash(buttons);
let input = '';

buttons.addEventListener('click', (event) => {
  let button = event.target.innerText;
  input = changeInput(button, input);
  displayInput(input);
  return;
});
document.addEventListener('keydown', (event) => {
  let button = event.key;
  input = changeInput(button, input);
  log(input);
  displayInput(input);
  return;
});

function Calculator() {
  this.methods = {
    '+': (x, y) => x+y,
    '-': (x, y) => x-y,
    '*': (x, y) => x*y,
    '/': (x, y) => x/y,
  }

  this.calculate = (str) => {
    let equation = str.split(''),
      x = +equation[0],
      op = equation[1],
      y = +equation[2];

    if (!this.methods[op] || isNaN(x) || isNaN(y)) return NaN;
    
    return this.methods[op](x,y);
  };
}

function changeInput(button, input){
  switch (button) {
    case 'Enter':
    case '=':
      let calculator = new Calculator();
      return calculator.calculate(input).toString();
    default:
      input = (button in buttonHash) ? input+=button : input;
      return input;
  }
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
  display.forEach((cell) => cell.innerText = '');

  for (let i=(input.length-1), j=0; i>=0; i--, j++) {
    display[i].innerText = input[j];
  }
}


