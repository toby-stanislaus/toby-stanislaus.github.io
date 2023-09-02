let calculation = localStorage.getItem('calculation') || '\n';
document.querySelector('.results').innerHTML=calculation;

function updateCalculation(value) {
  calculation += value;
  document.querySelector('.results').innerHTML=calculation;
  localStorage.setItem('calculation', calculation);
}

// Optional: you can also create a function in order
// to reuse this code.
function saveCalculation() {
  localStorage.setItem('calculation', calculation);
}