import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native'
import { metricInfo } from '../../../metricInfo'
import { FinancesContext } from '../../Context/FinancesContext'
import { Feather } from 'react-native-vector-icons'

import { calculateMonthlyNetOperatingIncome,
          calculateYearlyNetOperatingIncome,
          calculateMonthlyCashFlow,
          calculateYearlyCashFlow,
          calculateCapRate,
          calculateCashOnCashReturn,
          calculateYearReturnOnInvestment,
          convertToDollarAmount} from '../../../utilities'    
import { PropertyContext } from '../../Context/PropertyContext'

const deviceWidth = Dimensions.get('window').width
const deviceheight = Dimensions.get('window').height
const aspectWidth = deviceWidth - 16

const InvestmentMetricCompnent = () => {


  const[accessGrossMonthlyIncome, setAccessGrossMonthlyIncome] = useState(false)
  const[accessGrossYearlyIncome, setAccessGrossearlyIncome] = useState(false)
  const[accessGrossMonthyExpenses, setAccessGrossMonthyExpenses] = useState(false)
  const[accessGrossYearlyExpenses, setAccessGrossYearlyExpenses] = useState(false)
  const[accessMonthlyNOI, setAccessMonthlyNOI] = useState(false)
  const[accessYearlyNOI, setAccessYearlyNOI] = useState(false)
  const[accessMonthlyCashFlow, setAccessMonthlyCashFlow] = useState(false)
  const[accessYearlyCashFlow, setAccessYearlyCashFlow] = useState(false)
  const[accessCapRate, setAccessCapRate] = useState(false)
  const[accessCashOnCashReturn, setAccessCashOnCashReturn] = useState(false)
  const[accessROI, setAccessROI] = useState(false)

  const {monthlyNOI, setMonthlyNOI} = useContext(FinancesContext)
  const {yearlyNOI, setYearlyNOI} = useContext(FinancesContext)
  const {monthlyCF, setMonthlyCF} = useContext(FinancesContext)
  const {yearlyCf, setYearlyCF} = useContext(FinancesContext)
  const {capRate, setCapRate} = useContext(FinancesContext)
  const {CashOnCashReturn, setCashOnCashReturn} = useContext(FinancesContext)
  const {roi, setRoi} = useContext(FinancesContext)

  const {accessInvestmentMetrics, setAccessInvestmentMetrics} = useContext(PropertyContext)

  const {expenses, dpAmount} = useContext(FinancesContext)
  const {expensesNoMotgage} = useContext(FinancesContext)
  const {mortgage} = useContext(FinancesContext)
  const {totalRevenue} = useContext(FinancesContext)

  const {property} = useContext(PropertyContext)

  useEffect(() => {
    setMonthlyNOI(calculateMonthlyNetOperatingIncome(totalRevenue, expensesNoMotgage))
  }, [totalRevenue, expenses, expensesNoMotgage])

  useEffect(() => { 
    setYearlyNOI(calculateYearlyNetOperatingIncome(monthlyNOI))
    setMonthlyCF(calculateMonthlyCashFlow(monthlyNOI, mortgage))
  }, [monthlyNOI])

  useEffect(() => {
    setCapRate(calculateCapRate(yearlyNOI, property.price))
    setRoi(calculateYearReturnOnInvestment(yearlyNOI, dpAmount))
  }, [yearlyNOI])

  useEffect(() => {
    setMonthlyCF(calculateMonthlyCashFlow(monthlyNOI, mortgage))
  }, [mortgage])

  useEffect(() => {
    setYearlyCF(calculateYearlyCashFlow(monthlyCF))
  }, [monthlyCF])

  useEffect(() => {
    setCashOnCashReturn(calculateCashOnCashReturn(yearlyCf, dpAmount))
  }, [yearlyCf])

  useEffect(() => {
    setCashOnCashReturn(calculateCashOnCashReturn(yearlyCf, dpAmount))
    setRoi(calculateYearReturnOnInvestment(yearlyNOI, dpAmount))
  }, [dpAmount])

  const displayPartialTabPhone = () => {
    return(
      <TouchableOpacity 
        onPress={() => {setAccessInvestmentMetrics(!accessInvestmentMetrics)}} 
        style={
          deviceheight > 900 
            ? styles.partialInvestmentComponentPhone 
            : deviceheight > 800 && deviceheight < 900 
              ? styles.partialInvestmentComponentPhoneM 
              : deviceheight < 800
                ? styles.partialInvestmentComponentPhoneS
                : null
        }>
        <View>
          <Feather style={styles.icon} size={24} color={'black'} name={'chevrons-up'}/>
        </View>
        <View>
          <Text style={styles.sectonHeader}>Investment Metrics</Text>
        </View>
        <View>
          <Feather style={styles.icon} size={24} color={'black'} name={'chevrons-up'}/>
        </View>
      </TouchableOpacity>
    )
  }

  const displayFullTabPhone = () => {
    return(
      <View style={
        deviceheight > 900 
          ? styles.investmentComponent 
          : deviceheight > 800 && deviceheight < 900 
            ? styles.investmentComponentM 
            : deviceheight < 800
              ? styles.investmentComponentS
              : null
      }>
        <TouchableOpacity onPress={() => {setAccessInvestmentMetrics(!accessInvestmentMetrics)}} style={styles.centerHeader}>
          <View>
            <Feather style={styles.icon} size={24} color={'black'} name={'chevrons-down'}/>
          </View>
          <View>
            <Text style={styles.sectonHeader}>Investment Metrics</Text>
          </View>
          <View>
            <Feather style={styles.icon} size={24} color={'black'} name={'chevrons-down'}/>
          </View>
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.column}>
            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>Income (M):</Text>
                <TouchableOpacity onPress={() => {setAccessGrossMonthlyIncome(!accessGrossMonthlyIncome)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>${convertToDollarAmount(totalRevenue)}</Text>
            </View>

            <Modal
              visible={accessGrossMonthlyIncome}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.grossMonthlyRevenue.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.grossMonthlyRevenue.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessGrossMonthlyIncome(!accessGrossMonthlyIncome)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>Expenses (M):</Text>
                <TouchableOpacity onPress={() => {setAccessGrossMonthyExpenses(!accessGrossMonthyExpenses)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>${convertToDollarAmount(expenses)}</Text>
            </View>

            <Modal
              visible={accessGrossMonthyExpenses}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.totalMonthlyExpenses.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.totalMonthlyExpenses.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessGrossMonthyExpenses(!accessGrossMonthyExpenses)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>NOI (M):</Text>
                <TouchableOpacity onPress={() => {setAccessMonthlyNOI(!accessMonthlyNOI)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>${convertToDollarAmount(monthlyNOI)}</Text>
            </View>

            <Modal
              visible={accessMonthlyNOI}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.monthlyNOI.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.monthlyNOI.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessMonthlyNOI(!accessMonthlyNOI)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>Cash Flow (M):</Text>
                <TouchableOpacity onPress={() => {setAccessMonthlyCashFlow(!accessMonthlyCashFlow)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>${convertToDollarAmount(monthlyCF)}</Text>
            </View>

            <Modal
              visible={accessMonthlyCashFlow}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.monthlyCashFlow.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.monthlyCashFlow.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessMonthlyCashFlow(!accessMonthlyCashFlow)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>Cap Rate:</Text>
                <TouchableOpacity onPress={() => {setAccessCapRate(!accessCapRate)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>{capRate}%</Text>
            </View>

            <Modal
              visible={accessCapRate}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.capRate.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.capRate.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessCapRate(!accessCapRate)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

          <View style={styles.column}>
            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>Income (Y):</Text>
                <TouchableOpacity onPress={() => {setAccessGrossearlyIncome(!accessGrossYearlyIncome)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>${convertToDollarAmount(totalRevenue * 12)}</Text>
            </View>

            <Modal
              visible={accessGrossYearlyIncome}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.grossYearlyRevenue.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.grossYearlyRevenue.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessGrossearlyIncome(!accessGrossYearlyIncome)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>Expenses (Y):</Text>
                <TouchableOpacity onPress={() => {setAccessGrossYearlyExpenses(!accessGrossYearlyExpenses)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>${convertToDollarAmount(expenses * 12)}</Text>
            </View>

            <Modal
              visible={accessGrossYearlyExpenses}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.totalYearlyExpenses.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.totalYearlyExpenses.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessGrossYearlyExpenses(!accessGrossYearlyExpenses)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>NOI (Y):</Text>
                <TouchableOpacity onPress={() => {setAccessYearlyNOI(!accessYearlyNOI)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>${convertToDollarAmount(yearlyNOI)}</Text>
            </View>

            <Modal
              visible={accessYearlyNOI}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.yearlyNOI.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.yearlyNOI.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessYearlyNOI(!accessYearlyNOI)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>Cash Flow (Y):</Text>
                <TouchableOpacity onPress={() => {setAccessYearlyCashFlow(!accessYearlyCashFlow)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>${convertToDollarAmount(yearlyCf)}</Text>
            </View>

            <Modal
              visible={accessYearlyCashFlow}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.yearlyCashFlow.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.yearlyCashFlow.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessYearlyCashFlow(!accessYearlyCashFlow)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>CoC Return:</Text>
                <TouchableOpacity onPress={() => {setAccessCashOnCashReturn(!accessCashOnCashReturn)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>{CashOnCashReturn}%</Text>
            </View>

            <Modal
              visible={accessCashOnCashReturn}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.cashOnCashReturn.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.cashOnCashReturn.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessCashOnCashReturn(!accessCashOnCashReturn)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <View style={styles.roiMetrics}>
          <View style={styles.key}>
            <Text style={styles.metricTextRoi}>Return On Investment (1 Year):</Text>
            <TouchableOpacity onPress={() => {setAccessROI(!accessROI)}} style={styles.infoCOntainer}>
              <Text style={styles.info}>
                i
              </Text>
            </TouchableOpacity>
            <Text style={styles.roiMetricText}>{roi}%</Text>
          </View>
        </View>

        <Modal
          visible={accessROI}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalCOntent}>
              <Text style={styles.label}>{metricInfo.rOI.label}</Text>
              <Text style={styles.modalInfo}>{metricInfo.rOI.info}</Text>
              <TouchableOpacity onPress={() => {setAccessROI(!accessROI)}}>
                <Text style={styles.close}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  const displayPhone = () => {
    return(
      <>
        {
          accessInvestmentMetrics ? displayFullTabPhone() : displayPartialTabPhone()
        }
      </>
    )
  }

  const displayTabletFull = () => {
    return(
      <View style={styles.investmentComponentTablet}>
        <TouchableOpacity onPress={() => {setAccessInvestmentMetrics(!accessInvestmentMetrics)}} style={[styles.partialInvestmentComponentTablet, styles.centerHeader]}>
          <View>
            <Feather style={styles.icon} size={24} color={'black'} name={'chevrons-down'}/>
          </View>
          <View>
            <Text style={styles.sectonHeader}>Investment Metrics</Text>
          </View>
          <View>
            <Feather style={styles.icon} size={24} color={'black'} name={'chevrons-down'}/>
          </View>
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.column}>
            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>Income (M):</Text>
                <TouchableOpacity onPress={() => {setAccessGrossMonthlyIncome(!accessGrossMonthlyIncome)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>${convertToDollarAmount(totalRevenue)}</Text>
            </View>

            <Modal
              visible={accessGrossMonthlyIncome}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.grossMonthlyRevenue.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.grossMonthlyRevenue.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessGrossMonthlyIncome(!accessGrossMonthlyIncome)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>Expenses (M):</Text>
                <TouchableOpacity onPress={() => {setAccessGrossMonthyExpenses(!accessGrossMonthyExpenses)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>${convertToDollarAmount(expenses)}</Text>
            </View>

            <Modal
              visible={accessGrossMonthyExpenses}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.totalMonthlyExpenses.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.totalMonthlyExpenses.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessGrossMonthyExpenses(!accessGrossMonthyExpenses)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>NOI (M):</Text>
                <TouchableOpacity onPress={() => {setAccessMonthlyNOI(!accessMonthlyNOI)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>${convertToDollarAmount(monthlyNOI)}</Text>
            </View>

            <Modal
              visible={accessMonthlyNOI}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.monthlyNOI.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.monthlyNOI.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessMonthlyNOI(!accessMonthlyNOI)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>Cash Flow (M):</Text>
                <TouchableOpacity onPress={() => {setAccessMonthlyCashFlow(!accessMonthlyCashFlow)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>${convertToDollarAmount(monthlyCF)}</Text>
            </View>

            <Modal
              visible={accessMonthlyCashFlow}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.monthlyCashFlow.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.monthlyCashFlow.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessMonthlyCashFlow(!accessMonthlyCashFlow)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>Cap Rate:</Text>
                <TouchableOpacity onPress={() => {setAccessCapRate(!accessCapRate)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>{capRate}%</Text>
            </View>

            <Modal
              visible={accessCapRate}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.capRate.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.capRate.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessCapRate(!accessCapRate)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

          <View style={styles.column}>
            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>Income (Y):</Text>
                <TouchableOpacity onPress={() => {setAccessGrossearlyIncome(!accessGrossYearlyIncome)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>${convertToDollarAmount(totalRevenue * 12)}</Text>
            </View>

            <Modal
              visible={accessGrossYearlyIncome}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.grossYearlyRevenue.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.grossYearlyRevenue.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessGrossearlyIncome(!accessGrossYearlyIncome)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>Expenses (Y):</Text>
                <TouchableOpacity onPress={() => {setAccessGrossYearlyExpenses(!accessGrossYearlyExpenses)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>${convertToDollarAmount(expenses * 12)}</Text>
            </View>

            <Modal
              visible={accessGrossYearlyExpenses}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.totalYearlyExpenses.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.totalYearlyExpenses.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessGrossYearlyExpenses(!accessGrossYearlyExpenses)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>NOI (Y):</Text>
                <TouchableOpacity onPress={() => {setAccessYearlyNOI(!accessYearlyNOI)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>${convertToDollarAmount(yearlyNOI)}</Text>
            </View>

            <Modal
              visible={accessYearlyNOI}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.yearlyNOI.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.yearlyNOI.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessYearlyNOI(!accessYearlyNOI)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>Cash Flow (Y):</Text>
                <TouchableOpacity onPress={() => {setAccessYearlyCashFlow(!accessYearlyCashFlow)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>${convertToDollarAmount(yearlyCf)}</Text>
            </View>

            <Modal
              visible={accessYearlyCashFlow}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.yearlyCashFlow.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.yearlyCashFlow.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessYearlyCashFlow(!accessYearlyCashFlow)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.metric}>
              <View style={styles.key}>
                <Text style={styles.metricText}>CoC Return:</Text>
                <TouchableOpacity onPress={() => {setAccessCashOnCashReturn(!accessCashOnCashReturn)}} style={styles.infoCOntainer}>
                  <Text style={styles.info}>
                    i
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.metricText}>{CashOnCashReturn}%</Text>
            </View>

            <Modal
              visible={accessCashOnCashReturn}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalCOntent}>
                  <Text style={styles.label}>{metricInfo.cashOnCashReturn.label}</Text>
                  <Text style={styles.modalInfo}>{metricInfo.cashOnCashReturn.info}</Text>
                  <TouchableOpacity onPress={() => {setAccessCashOnCashReturn(!accessCashOnCashReturn)}}>
                    <Text style={styles.close}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <View style={styles.roiMetrics}>
          <View style={styles.key}>
            <Text style={styles.metricTextRoi}>Return On Investment (1 Year):</Text>
            <TouchableOpacity onPress={() => {setAccessROI(!accessROI)}} style={styles.infoCOntainer}>
              <Text style={styles.info}>
                i
              </Text>
            </TouchableOpacity>
            <Text style={styles.roiMetricText}>{roi}%</Text>
          </View>
        </View>

        <Modal
          visible={accessROI}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalCOntent}>
              <Text style={styles.label}>{metricInfo.rOI.label}</Text>
              <Text style={styles.modalInfo}>{metricInfo.rOI.info}</Text>
              <TouchableOpacity onPress={() => {setAccessROI(!accessROI)}}>
                <Text style={styles.close}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  const displayTabletPartial = () => {
    return(
      <TouchableOpacity onPress={() => {setAccessInvestmentMetrics(!accessInvestmentMetrics)}} style={styles.partialInvestmentComponentPhone}>
        <View>
          <Feather style={styles.icon} size={24} color={'black'} name={'chevrons-up'}/>
        </View>
        <View>
          <Text style={styles.sectonHeader}>Investment Metrics</Text>
        </View>
        <View>
          <Feather style={styles.icon} size={24} color={'black'} name={'chevrons-up'}/>
        </View>
      </TouchableOpacity>
    )
  }

  const displayTablet = () => {
    return(
      <>
        {
          accessInvestmentMetrics ? displayTabletFull() : displayTabletPartial()
        }
      </>
    )
  }

  return (
    <>
      {
        deviceWidth >= 500 ? displayTablet() : displayPhone()
      }
    </>
  )
}

const styles = StyleSheet.create({
  investmentComponent: {
    height: 220,
    width: '100%',
    position: 'absolute',
    left: 0,
    top: deviceheight - 354,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  investmentComponentM: {
    height: 214,
    width: '100%',
    position: 'absolute',
    left: 0,
    top: deviceheight - 332,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  investmentComponentS: {
    height: 220,
    width: '100%',
    position: 'absolute',
    left: 0,
    top: deviceheight - 288,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  centerHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 12
  },
  partialInvestmentComponentPhone: {
    height: 40,
    width: '100%',
    position: 'absolute',
    left: 0,
    top: deviceheight - 174,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  partialInvestmentComponentPhoneM: {
    height: 40,
    width: '100%',
    position: 'absolute',
    left: 0,
    top: deviceheight - 154,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  partialInvestmentComponentPhoneS: {
    height: 40,
    width: '100%',
    position: 'absolute',
    left: 0,
    top: deviceheight - 108,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  investmentComponentTablet: {
    height: 225,
    width: '100%',
    position: 'absolute',
    left: 0,
    top: deviceheight - 300,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  headerComponent: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16
  },
  sectonHeader: {
    fontSize: 24,
    fontWeight: '700'
  },
  icon: {
    marginHorizontal: 8
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  metric: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8
  },
  metricText: {
    fontSize: 16,
    fontWeight: '500'
  },
  key: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoCOntainer: {
    height: 15,
    width: 15,
    backgroundColor: 'grey',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4
  },
  info: {
    fontSize: 8,
    fontWeight: '900',
    color: 'white',
  },
  modalContainer: {
    width: aspectWidth,
    height: deviceheight,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalCOntent: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12
  },
  modalInfo: {
    textAlign: 'justify',
    marginBottom: 16
  },
  close: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    color: 'blue',
    fontWeight: 'bold',
  },
  column: {
    width: '49%',
  },
  roiMetrics: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 2
  },
  metricTextRoi: {
    fontSize: 18,
    fontWeight: '700'
  },
  roiMetricText: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: '700'
  }
})

export default InvestmentMetricCompnent