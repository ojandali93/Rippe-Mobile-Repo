import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { properties, singleProperty } from '../Api/zillowApi'

import { SearchFilterContext } from './SearchFilterContext';

import { calculateDownPaymentAmount,
         calculateDownPaymentPercent,
         calculateLoanAmount,
         calculateMortgageAmount,
         calculatePropertyTaxAnnual,
         calculateHomeInsuranceAmount} from '../../utilities';

import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../Api/firebaseTesting';
import { ProfileContext } from './ProfileContext';
import { useNavigation } from '@react-navigation/native';

export const PropertiesContext = createContext(null)

export const PropertiesContextProvider = ({children}) => {
  const navigation = useNavigation()

  const [results, setResults] = useState([])

  const [resultsPerPage, setResultsPerPage] = useState(null)
  const [totalPages, setTotalPages] = useState(null)
  const [totalResultsCount, setTotalResultsCount] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState([])
  const [favoritesZpids, setFavoritesZpids] = useState([])

  const [currentSearch, setCurrentSearch] = useState('')
  const [activeSearch, setActiveSearch] = useState('Los Angeles, CA')

  const [singlePropertyFound, setSinglePropertyFound] = useState(false)
  
  let resultsLength = 4
  let counter = 0

  const [viewMaps, setViewMaps] = useState(false)
  const [cityLat, setCityLat] = useState(118.2437)
  const [cityLong, setCityLong] = useState(34.0522)
  const [favoritesZpid, setFavoritesZpid] = useState([])
  
  const {sort, setSort} = useContext(SearchFilterContext)
  const {isSingleFamily} = useContext(SearchFilterContext)
  const {isMultiFamily} = useContext(SearchFilterContext)
  const {isApartment} = useContext(SearchFilterContext)
  const {isCondo} = useContext(SearchFilterContext)
  const {isManufactured} = useContext(SearchFilterContext)
  const {isTownhouse} = useContext(SearchFilterContext)

  const {beds} = useContext(SearchFilterContext)
  const {baths} = useContext(SearchFilterContext)
  const {priceMin} = useContext(SearchFilterContext)
  const {priceMax} = useContext(SearchFilterContext)
  const {maxHoa} = useContext(SearchFilterContext)
  const {sqftMin} = useContext(SearchFilterContext)
  const {sqftMax} = useContext(SearchFilterContext)

  const {hasPool} = useContext(SearchFilterContext)
  const {hasGarage} = useContext(SearchFilterContext)
  const {hasAC} = useContext(SearchFilterContext)
  const {isSingleStory} = useContext(SearchFilterContext)

  const {cityView} = useContext(SearchFilterContext)
  const {mountainView} = useContext(SearchFilterContext)
  const {waterView} = useContext(SearchFilterContext)
  const {waterFront} = useContext(SearchFilterContext)

  const {setLoggedIn} = useContext(ProfileContext)

  const getProperties = () => {
    setLoading(true)
    currentSearch === '' ? null : activeSearch === currentSearch ? null : setActiveSearch(currentSearch)
    currentSearch === ''
      ? activeSearch === '' 
        ? properties.params.location = 'Los Angeles, CA'
        : properties.params.location = activeSearch
      : properties.params.location = currentSearch
    priceMin === null
      ? null 
      : properties.params.price_min = priceMin
    priceMax === null
      ? null 
      : properties.params.price_max = priceMax
    maxHoa === null
      ? null 
      : properties.params.hoa_max = maxHoa
    sqftMin === null
      ? null 
      : properties.params.sqft_min = sqftMin
    sqftMax === null
      ? null 
      : properties.params.sqft_max = sqftMax
    beds === null
      ? null 
      : properties.params.beds_min = beds
    baths === null
      ? null 
      : properties.params.baths_min = baths
    hasPool === false 
      ? null 
      : properties.params.hasPool = hasPool
    hasGarage === false 
      ? null 
      : properties.params.hasGarage = hasGarage 
    hasAC === false 
      ? null 
      : properties.params.hasAirConditioning = hasAC
    isSingleStory === false 
      ? null 
      : properties.params.singleStory = isSingleStory
    cityView === false 
      ? null 
      : properties.params.isCityView = cityView
    mountainView === false 
      ? null 
      : properties.params.isMountainView = mountainView
    waterView === false
      ? null 
      : properties.params.isWaterView = waterView
    waterFront === false 
      ? null 
      : properties.params.isWaterfront = waterFront
    properties.params.isSingleFamily = isSingleFamily
    properties.params.isMultiFamily = isMultiFamily
    properties.params.isApartment = isApartment
    properties.params.isCondo = isCondo
    properties.params.isManufactured = isManufactured
    properties.params.isTownhouse = isTownhouse
    properties.params.page = currentPage
    properties.params.sortSelection = sort
    axios.request(properties).then(function (response) {
      response.data.abbreviatedAddress != null
        ? null 
        : setMultiProperties(response)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const setMultiProperties = (response) => {
    setCityLat(response.data.results[0].latitude)
    setCityLong(response.data.results[0].longitude)
    setTotalPages(response.data.totalPages)
    generateUrlList(response.data.results)
  }

  const generateUrlList = (results) => {
    const requestList = []
    for(let i = 0; i < results.length; i++){
      let requestObject = {
        method: 'GET',
        url: 'https://zillow56.p.rapidapi.com/property',
        params: {zpid: results[i].zpid},
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': '22cff3b757msh1086049fc5382bcp19ed7ajsn955a1faa4f16',
          'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
        }
      };
      requestList.push(requestObject)
    }
    makeNewRequest(requestList)
  }

  const grabFavorites = () => {
    const collectionRef = collection(db, 'Favorites')
    const q = query(collectionRef, where('userId', '==', auth.currentUser.uid))
    onSnapshot(q, (snapshot) => {
      let favoritesList = []
      snapshot.docs.forEach((doc) => {
        favoritesList.push({ ...doc.data(), id: doc.id })
      })
      setFavorites(favoritesList)
      grabZpidList(favoritesList)
    })
  }

  const grabZpidList = (favoritesList) => {
    let zpidList = []
    favoritesList.forEach((fav) => {
      zpidList.push(fav.zpid)
    })
    setFavoritesZpids(zpidList)
  }
  
  const makeNewRequest = (requestList) => {
    auth.currentUser === null 
      ? setLoggedIn(false)
      : setLoggedIn(true)
    if(counter < resultsLength){
      axios.request(requestList[counter])
        .then((response) => {
          let downPaymentAmount = calculateDownPaymentAmount(response.data.price, 20)
          let downPaymentPercent = calculateDownPaymentPercent(response.data.price, downPaymentAmount)
          let loanAmount = calculateLoanAmount(response.data.price, downPaymentAmount)
          let mortgageAmount = calculateMortgageAmount(loanAmount, 30, response.data.mortgageRates.thirtyYearFixedRate)
          let monthlyTaxAmount = calculatePropertyTaxAnnual(response.data.propertyTaxRate, response.data.price)
          let homeInsurance = calculateHomeInsuranceAmount(response.data.price)
          let monthlyRevenue = response.data.rentZestimate
          let expenses = 0
          let hoaFee = response.data.hoaFee
          hoaFee === null 
            ? expenses = mortgageAmount + hoaFee + monthlyTaxAmount + homeInsurance 
            : expenses = mortgageAmount + monthlyTaxAmount + homeInsurance
          let monthlyExpenses = 0
          let monthlyExpensesWithoutMortgage = 0
          hoaFee === null
            ? monthlyExpensesWithoutMortgage = hoaFee + monthlyTaxAmount + homeInsurance
            : monthlyExpensesWithoutMortgage = monthlyTaxAmount + homeInsurance
          hoaFee === null
            ? monthlyExpenses = mortgageAmount + hoaFee + monthlyTaxAmount + homeInsurance
            : monthlyExpenses = mortgageAmount + monthlyTaxAmount + homeInsurance
          let netOperatingIncome = Math.round(monthlyRevenue - monthlyExpensesWithoutMortgage)
          let yearlyNetOperatingIncome = netOperatingIncome * 12
          let monthlyCashFLow = Math.round(netOperatingIncome - mortgageAmount)
          let yearlyCashFlow = monthlyCashFLow * 12
          let currentCapRate = ((yearlyNetOperatingIncome / response.data.price) * 100).toFixed(2)
          let currentCashOnCashReturn = ((yearlyCashFlow / downPaymentAmount) * 100).toFixed(2)
          let year1ReturnOnInvestment = ((yearlyNetOperatingIncome / downPaymentAmount) * 100).toFixed(2)

          let propertyDetails = response.data
          propertyDetails.investment = {
            downPaymentAmount: downPaymentAmount,
            downPaymentPercent: downPaymentPercent,
            loanAmount: loanAmount,
            mortgageAmount: mortgageAmount,
            monthlyTaxAmount: monthlyTaxAmount,
            homeInsurance: homeInsurance,
            monthlyRevenue: monthlyRevenue,
            expenses: expenses,
            netOperatingIncome: netOperatingIncome,
            yearlyNetOperatingIncome: yearlyNetOperatingIncome,
            monthlyCashFLow: monthlyCashFLow,
            yearlyCashFlow: yearlyCashFlow,
            currentCapRate: currentCapRate,
            currentCashOnCashReturn: currentCashOnCashReturn,
            year1ReturnOnInvestment: year1ReturnOnInvestment,
            monthlyExpensesWithoutMortgage: monthlyExpensesWithoutMortgage,
          }
          setResults(results => [...results, propertyDetails])
          auth.currentUser === null ? null : grabFavorites()
          setCurrentSearch('')
          setLoading(false)
          counter++
          makeNewRequest(requestList)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      counter = 0
    }
  }

  return(
    <PropertiesContext.Provider value={{results,
                                        resultsPerPage,
                                        totalPages,
                                        totalResultsCount,
                                        loading,
                                        viewMaps,
                                        loading,
                                        cityLat, 
                                        cityLong,
                                        currentPage,
                                        favoritesZpids,
                                        favorites,
                                        singleProperty,
                                        activeSearch, 
                                        currentSearch,
                                        singlePropertyFound,
                                        setResults,
                                        setResultsPerPage,
                                        setTotalPages,
                                        setTotalResultsCount,
                                        getProperties,
                                        setViewMaps,
                                        setLoading,
                                        setCurrentPage,
                                        setActiveSearch,
                                        setCurrentSearch,
                                        setSinglePropertyFound}}>
      {children}
    </PropertiesContext.Provider>
  )

}