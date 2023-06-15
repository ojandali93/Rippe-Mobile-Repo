const calculateMonthlyNetOperatingIncome = (totalRevenue, expensesWithoutMortgage) => {
  return (totalRevenue - expensesWithoutMortgage)  
}

const calculateYearlyNetOperatingIncome = (monthlyNetOperatingIncome) => {
  return (monthlyNetOperatingIncome * 12)  
}

const calculateMonthlyCashFlow = (monthlyNetOperatingIncome, mortgage) => {
  return (monthlyNetOperatingIncome - mortgage)
}

const calculateYearlyCashFlow = (monthlyCashFlow) => {
  return(monthlyCashFlow * 12)
}

const calculateCapRate = (yearlyNetOperatingIncome, price) => {
  return (((yearlyNetOperatingIncome/price) * 100).toFixed(2))
}

const calculateCashOnCashReturn = (yearlyCashFlow, downPaymentAmount) => {
  return (((yearlyCashFlow / downPaymentAmount) * 100).toFixed(2))
}

const calculateYearReturnOnInvestment = (yearlyNetOperatingIncome, downPaymentAmount) => {
  return (((yearlyNetOperatingIncome / downPaymentAmount) * 100).toFixed(2))
}

const calculateDownPaymentAmount = (homePrice, downPaymentPercent) => {
  return Math.round(homePrice * (downPaymentPercent / 100))
}

const calculateLoanAmount = (homePrice, downPaymentAmount) => {
  return (homePrice - downPaymentAmount)
}

const calculateDownPaymentPercent = (homePrice, downPaymentAmount) => {
  return Math.round((downPaymentAmount / homePrice) * 100)
}

const calculateMortgageAmount = (loanAmount, loanYears, interestRate) => {
  let interest = (interestRate / 100) / 12
  let powerRate = Math.pow(1 + interest, (loanYears * 12))
  let monthlyPayment = loanAmount * ((interest * powerRate) / (powerRate - 1))
  return Math.round(monthlyPayment)
}

const calculatePropertyTaxAnnual = (taxRate, propertyValue) => {
  let annualTaxAmount = propertyValue * (taxRate / 100)
  let monthlyTaxAmount = Math.round(annualTaxAmount/12)
  return monthlyTaxAmount
}

const calculateHomeInsuranceAmount = (price) => {
  let initialPrice = Math.round(price / 1000)
  let annualValue = Math.round(initialPrice * 3.5)
  return Math.round(annualValue/12)
}

const calculateMortgageInsurance = (loanAmount) => {
  return Math.round((loanAmount * 0.0058) / 12)
}

const convertString = (inputString) => {
  let words = inputString.split('_');
  let convertedWords = words.map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  let convertedString = convertedWords.join(' ');
  return convertedString;
}

function getStateName(stateCode) {
  const states = {
    AL: 'Alabama',
    AK: 'Alaska',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming'
  };

  // Convert the state code to uppercase for consistency
  const code = stateCode.toUpperCase();

  // Check if the state code exists in the states object
  if (code in states) {
    return states[code];
  } else {
    return '';
  }
}

module.exports = {
  calculateMonthlyNetOperatingIncome,
  calculateYearlyNetOperatingIncome,
  calculateMonthlyCashFlow,
  calculateYearlyCashFlow,
  calculateCapRate,
  calculateCashOnCashReturn,
  calculateYearReturnOnInvestment,
  calculateDownPaymentAmount,
  calculateLoanAmount,
  calculateDownPaymentPercent,
  calculateMortgageAmount,
  calculatePropertyTaxAnnual,
  calculateHomeInsuranceAmount,
  calculateMortgageInsurance,
  convertString,
  getStateName
}