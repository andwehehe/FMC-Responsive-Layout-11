//warning messages
let warning1 = document.querySelector('.warning-1');
let warning2 = document.querySelector('.warning-2');
let warning3 = document.querySelector('.warning-3');
let warning4 = document.querySelector('.warning-4');
let warnings = document.querySelectorAll('.warning');

document.querySelectorAll('.radio__input').forEach(article => {
  article.addEventListener('click', () => {
    const radio = article.querySelector('input[type="radio"]');
    radio.checked = true;
    warning4.style.display = "none"
  });
});

// inputs
let mortgageAmount = document.getElementById('mortgageAmount');
let mortgageTerm = document.getElementById('mortgageTerm');
let interestRate = document.getElementById('interestRate');
let submit = document.getElementById('submit');

//input containers
let mortgageInputContainer = document.querySelector('.sub-container__input-1');
let termInputContainer = document.querySelector('.sub-container__input-2');
let rateInputContainer = document.querySelector('.sub-container__input-3');

let mortgageIcon = document.querySelector('.sub-container__input-1 .icon');
let termIcon = document.querySelector('.sub-container__input-2 .icon');
let rateIcon = document.querySelector('.sub-container__input-3 .icon');


// output layout
let defaultLayout = document.querySelector('.without__output');
let outputLayout = document.querySelector('.with__output');

//display output
let repaymentOutput = document.querySelector('.monthly__repayments');
let totalOutput = document.querySelector('.total__repayments');

// Mortgage Repayment calculator
// calculation menu
let repaymentRadio = document.getElementById('repaymentRadio');
let interestRadio = document.getElementById('interestRadio');

mortgageAmount.addEventListener('input', () => {
  mortgageInputContainer.style.borderColor = "";
  mortgageIcon.style = "";
  warning1.style.display = "none";
})

mortgageTerm.addEventListener('input', () => {
  termInputContainer.style.borderColor = "";
  termIcon.style = "";
  warning2.style.display = "none";
})

interestRate.addEventListener('input', () => {
  rateInputContainer.style.borderColor = "";
  rateIcon.style = ""; 
  warning3.style.display = "none";
})

submit.addEventListener('click', () => {
  let isEmpty = false;
  if(mortgageAmount.value === '') {
    mortgageInputContainer.style.borderColor = "red";
    mortgageIcon.style.backgroundColor = "red";
    mortgageIcon.style.color = "white";
    warning1.style.display = "block";
    isEmpty = true;
  }

  if(mortgageTerm.value === '') {
    termInputContainer.style.borderColor = "red";
    termIcon.style.backgroundColor = "red";
    termIcon.style.color = "white";
    warning2.style.display = "block";
    isEmpty = true;
  }

  if(interestRate.value === '') {
    rateInputContainer.style.borderColor = "red";
    rateIcon.style.backgroundColor = "red";
    rateIcon.style.color = "white";
    warning3.style.display = "block";
    isEmpty = true;
  }

  if(repaymentRadio.checked && !isEmpty) {
    calculateRepayment();
  } else if(interestRadio.checked && !isEmpty) {
    calculateInterest();
  } else {
    warning4.style.display = "block";
  }
})

function calculateRepayment() {
  let amount = Number(mortgageAmount.value);
  let term = Number(mortgageTerm.value);
  let rate = Number(interestRate.value);

  let r = rate / (12 * 100);
  let n = term * 12;
  let numerator = r * (1 + r) ** n;
  let denominator = ((1 + r) ** n) - 1;
  let mortgage = (amount * (numerator / denominator));
  let totalRepayment = mortgage * n;

  // toggle layout
  defaultLayout.style.display = "none";
  outputLayout.style.display = "block";

  repaymentOutput.innerHTML = `&pound;${mortgage.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  totalOutput.innerHTML = `&pound;${totalRepayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

function calculateInterest() {
  let amount = Number(mortgageAmount.value);
  let term = Number(mortgageTerm.value);
  let rate = Number(interestRate.value);

  let r = rate / (12 * 100);
  let n = term * 12;
  let monthlyInterest = amount * r;
  let totalInterest = monthlyInterest * n;

  // toggle layout
  defaultLayout.style.display = "none";
  outputLayout.style.display = "block";

  repaymentOutput.innerHTML = `&pound;${monthlyInterest.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  totalOutput.innerHTML = `&pound;${totalInterest.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

//clear function
let all = document.querySelectorAll("input");
let allArticle = document.querySelectorAll("article");
let allIcon = document.querySelectorAll(".icon");
document.querySelector('.clear').addEventListener('click', () => {
  all.forEach(child => {
   child.value = "";
   child.checked = false;
  })

  allArticle.forEach(article => {
    article.style = "";
  })

  allIcon.forEach(icon => {
    icon.style = "";
  })

  warnings.forEach(warning => {
    warning.style.display = "none";
  })

  defaultLayout.style.display = "block";
  outputLayout.style.display = "none";
})