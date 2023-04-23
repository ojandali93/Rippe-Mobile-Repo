import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { InvestmentContext } from '../../Context/InvestmentContext'
import { PropertyContext } from '../../Context/PropertyContext'

const InvestmentMetricCompnent = () => {

  const {grossMonthlyIncome, setGrossMonthlyIncome} = useContext(InvestmentContext)
  const {grossMonthlyExpenses, setGrossMonthlyExpenses} = useContext(InvestmentContext)
  const {grossYearlyIncome, setGrossYearlyIncome} = useContext(InvestmentContext)
  const {grossYearlyExpenses, setGrossYearlyExpenses} = useContext(InvestmentContext)
  const {monthlyNetOperatingIncome, setMonthlyNetOperatingIncome} = useContext(InvestmentContext)
  const {yearlyNetOperatingIncome, setYearlyNetOperatingIncome} = useContext(InvestmentContext)
  const {monthlyCashFlow, setMonthlyCashFlow} = useContext(InvestmentContext)
  const {yearlyCashFlow, setYearlyCashFlow} = useContext(InvestmentContext)
  const {capRate, setCapRate} = useContext(InvestmentContext)
  const {cashOnCashReturn, setCashOnCashReturn} = useContext(InvestmentContext)
  const {yearReturnOnInvestment, setYearReturnOnInvestment} = useContext(InvestmentContext)

  const {expensesWithoutMortgage, setExpensesWithoutMortgage} = useContext(InvestmentContext)

  const {calculateMonthlyNetOperatingIncome,
         calculateYearlyNetOperatingIncome,
         calculateMonthlyCashFlow,
         calculateYearlyCashFlow,
         calculateCapRate,
         calculateCashOnCashReturn,
         calculateYearReturnOnInvestment} = useContext(InvestmentContext)

  const {property, downPaymentAmount} = useContext(PropertyContext)
  const {totalRevenue, totalExpenses} = useContext(PropertyContext)
  const {homeInsurance, utilities, mortgage} = useContext(PropertyContext)
  const {otherExpenses, hoa, propertyTax, mortgageInsurance} = useContext(PropertyContext)

  useEffect(() => {
    setGrossMonthlyIncome(totalRevenue)
    setGrossYearlyIncome(totalRevenue * 12)
    setGrossMonthlyExpenses(totalExpenses)
    setGrossYearlyExpenses(totalExpenses * 12)
    setExpensesWithoutMortgage(parseInt(homeInsurance) + parseInt(utilities) + parseInt(mortgageInsurance) + 
                            parseInt(otherExpenses) + parseInt(hoa) + parseInt(propertyTax))
  })

  useEffect(() => {
    calculateMonthlyNetOperatingIncome(totalRevenue, expensesWithoutMortgage)
  }, [totalRevenue, totalExpenses])

  useEffect(() => { 
    calculateYearlyNetOperatingIncome(monthlyNetOperatingIncome)
    calculateMonthlyCashFlow(monthlyNetOperatingIncome, mortgage)
  }, [monthlyNetOperatingIncome])

  useEffect(() => {
    calculateCapRate(yearlyNetOperatingIncome, property.price)
    calculateYearReturnOnInvestment(yearlyNetOperatingIncome, downPaymentAmount)
  }, [yearlyNetOperatingIncome])

  useEffect(() => {
    calculateMonthlyCashFlow(monthlyNetOperatingIncome, mortgage)
  }, [mortgage])

  useEffect(() => {
    calculateYearlyCashFlow(monthlyCashFlow)
  }, [monthlyCashFlow])

  useEffect(() => {
    calculateCashOnCashReturn(yearlyCashFlow, downPaymentAmount)
  }, [yearlyCashFlow])

  useEffect(() => {
    calculateCashOnCashReturn(yearlyCashFlow, downPaymentAmount)
    calculateYearReturnOnInvestment(yearlyNetOperatingIncome, downPaymentAmount)
  }, [downPaymentAmount])

  return (
    <View>
      <View>
        <Text>Investment Metrics</Text>
      </View>
      <View>
        <Text>Gross Monthly Income: {grossMonthlyIncome}</Text>
      </View>
      <View>
        <Text>Gross Yearly Income: {grossYearlyIncome}</Text>
      </View>
      <View>
        <Text>Gross Monhly Expenses: {grossMonthlyExpenses}</Text>
      </View>
      <View>
        <Text>Gross Yearly Expenses: {grossYearlyExpenses}</Text>
      </View>
      <View>
        <Text>Monthly Net Operating Income: {monthlyNetOperatingIncome}</Text>
      </View>
      <View>
        <Text>Yearly Net Operating Income: {yearlyNetOperatingIncome}</Text>
      </View>
      <View>
        <Text>Montly Cash Flow: {monthlyCashFlow}</Text>
      </View>
      <View>
        <Text>Yearly Cash Flow: {yearlyCashFlow}</Text>
      </View>
      <View>
        <Text>Cap Rate: {capRate}</Text>
      </View>
      <View>
        <Text>Cash ON Cash Return: {cashOnCashReturn}</Text>
      </View>
      <View>
        <Text>Yearly Return On Investment: {yearReturnOnInvestment}</Text>
      </View>
    </View>
  )
}

export default InvestmentMetricCompnent