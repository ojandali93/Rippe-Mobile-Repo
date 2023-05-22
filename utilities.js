const calculateMonthlyNetOperatingIncome = (totalRevenue, expensesWithoutMortgage) => {
  setMonthlyNetOperatingIncome(totalRevenue - expensesWithoutMortgage)  
}

const calculateYearlyNetOperatingIncome = (monthlyNetOperatingIncome) => {
  setYearlyNetOperatingIncome(monthlyNetOperatingIncome * 12)  
}

const calculateMonthlyCashFlow = (monthlyNetOperatingIncome, mortgage) => {
  setMonthlyCashFlow(monthlyNetOperatingIncome - mortgage)
}

const calculateYearlyCashFlow = (monthlyCashFlow) => {
  setYearlyCashFlow(monthlyCashFlow * 12)
}

const calculateCapRate = (yearlyNetOperatingIncome, price) => {
  setCapRate(((yearlyNetOperatingIncome/price) * 100).toFixed(2))
}

const calculateCashOnCashReturn = (yearlyCashFlow, downPaymentAmount) => {
  setCashOnCashReturn(((yearlyCashFlow / downPaymentAmount) * 100).toFixed(2))
}

const calculateYearReturnOnInvestment = (yearlyNetOperatingIncome, downPaymentAmount) => {
  setYearReturnOnInvestment(((yearlyNetOperatingIncome / downPaymentAmount) * 100).toFixed(2))
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
  calculateMortgageInsurance
}