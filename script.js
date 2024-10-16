let log = console.log;

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

function acceptInput() {
  let input = '';
  let buttons = document.querySelector('.buttons');

  buttons.addEventListener('click', (event) => {
    let button = event.target.innerText;
    input = changeInput(button, input);
    log(input);
  });
  document.addEventListener('keydown', (event) => {
    let button = event.key;
    input = changeInput(button, input);
    log(input);
  });
  if (typeof input === 'number') return input;
}

function changeInput(button, input){
  switch (button) {
    case 'Enter':
      let calculator = new Calculator();
      return calculator.calculate(input);
      break;
    default: 
      return input += button;
  }
}

acceptInput();