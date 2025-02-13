// Get the display element
const display = document.getElementById('display');

// Get all button elements
const buttons = document.querySelectorAll('button');

// Initialize variables
let num1 = '';
let num2 = '';
let operator = '';
let result = '';

// Function to create particle effect
function createParticleEffect(x, y) {
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    document.body.appendChild(particle);

    const size = Math.random() * 0.1 + 0.2; // Reduced size for particles
    particle.style.width = `${size}rem`;
    particle.style.height = `${size}rem`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const angle = Math.random() * 360;
    const distance = Math.random() * 100 + 50;

    const xMove = distance * Math.cos((angle * Math.PI) / 180);
    const yMove = distance * Math.sin((angle * Math.PI) / 180);

    // Add smooth animation
    particle.style.transform = `translate(${xMove}px, ${yMove}px) scale(0)`;
    particle.style.animation = `particle-animation 1s ease-out`;

    // Remove particle after animation
    setTimeout(() => particle.remove(), 1000);
  }
}

// Add event listener to each button
buttons.forEach(button => {
  button.addEventListener('click', event => {
    const value = button.textContent;

    // Handle numbers and decimal point
    if (!isNaN(value) || value === '.') {
      if (operator === '') {
        num1 += value;
        display.value = num1;
      } else {
        num2 += value;
        display.value = num1 + operator + num2;
      }
    }

    // Handle operators
    else if (['+', '-', '×', '÷'].includes(value)) {
      operator = value;
      display.value = num1 + operator;
    }

    // Handle equals
    else if (value === '=') {
      if (num1 && num2 && operator) {
        switch (operator) {
          case '+':
            result = parseFloat(num1) + parseFloat(num2);
            break;
          case '-':
            result = parseFloat(num1) - parseFloat(num2);
            break;
          case '×':
            result = parseFloat(num1) * parseFloat(num2);
            break;
          case '÷':
            result = parseFloat(num1) / parseFloat(num2);
            break;
        }
        display.value = result;
        num1 = result.toString();
        num2 = '';
        operator = '';
      }
    }

    // Handle clear
    else if (value === 'C') {
      createParticleEffect(event.clientX, event.clientY); // Trigger particle effect
      display.value = '';
      num1 = '';
      num2 = '';
      operator = '';
      result = '';
    }

    // Handle backspace
    else if (value === '<') {
      if (operator === '') {
        num1 = num1.slice(0, -1);
        display.value = num1;
      } else if (num2 === '') {
        operator = '';
        display.value = num1;
      } else {
        num2 = num2.slice(0, -1);
        display.value = num1 + operator + num2;
      }
    }
  });
});
