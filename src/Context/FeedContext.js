import React, { createContext, useState, useEffect } from 'react';

import { properties } from '../Api/zillowApi';

import { auth, db } from '../Api/firebaseTesting';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, doc, deleteDoc, limit } from 'firebase/firestore';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export const FeedContext = createContext(null)

export const FeedContextProvider = ({children}) => {
  const navigation = useNavigation()

  const [location, setLocation] = useState('')

  const [sort, setSort] = useState('days')

  const [status, setStatus] = useState('forSale')

  const [isSingleFamily, setIsSingleFamily] = useState(true)
  const [isMultiFamily, setIsMultiFamily] = useState(true)
  const [isApartment, setIsApartment] = useState(true)
  const [isCondo, setIsCondo] = useState(true)
  const [isManufactured, setIsManufactured] = useState(true)
  const [isTownhouse, setIsTownhouse] = useState(true)
  const [isLotLand, setIsLotLand] = useState(false)

  const [beds, setBeds] = useState(null)
  const [baths, setBaths] = useState(null)

  const [priceMin, setPriceMin] = useState(null)
  const [priceMax, setPriceMax] = useState(null)

  const [maxHoa, setMaxHoa] = useState(null)

  const [sqftMin, setSqftMin] = useState(null)
  const [sqftMax, setSqftMax] = useState(null)

  const [hasPool, setHasPool] = useState(false)
  const [hasGarage, setHasGarage] = useState(false)
  const [hasAC, setHasAC] = useState(false)
  const [isSingleStory, setIsSingleStory] = useState(false)

  const [cityView, setCityView] =  useState(false)
  const [mountainView, setMountainView] = useState(false)
  const [waterView, setWaterView] = useState(false)
  const [waterFront, setWaterFront] = useState(false)

  const [currentFeed, setCurrentFeed] = useState([]) // list of all saved searches
  const [currentFeedSearch, setCurrentFeedSearch] = useState(null) // current search being made
  const [selectedFeed, setSelectedFeed] = useState() //results

  const [emptyList, setEmptyList] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [loading, setLoading] = useState(true)

  const addNewSearch = () => {
    let newSearch = {}
    newSearch.location = location
    newSearch.status = status
    priceMin === null
      ? null 
      : newSearch.price_min = priceMin
    priceMax === null
      ? null 
      : newSearch.price_max = priceMax
    maxHoa === null
      ? null 
      : newSearch.hoa_max = maxHoa
    sqftMin === null
      ? null 
      : newSearch.sqft_min = sqftMin
    sqftMax === null
      ? null 
      : newSearch.sqft_max = sqftMax
    beds === null
      ? null 
      : newSearch.beds_min = beds
    baths === null
      ? null 
      : newSearch.baths_min = baths
    hasPool === false 
      ? null 
      : newSearch.hasPool = hasPool
    hasGarage === false 
      ? null 
      : newSearch.hasGarage = hasGarage 
    hasAC === false 
      ? null 
      : newSearch.hasAirConditioning = hasAC
    isSingleStory === false 
      ? null 
      : newSearch.singleStory = isSingleStory
    cityView === false 
      ? null 
      : newSearch.isCityView = cityView
    mountainView === false 
      ? null 
      : newSearch.isMountainView = mountainView
    waterView === false
      ? null 
      : newSearch.isWaterView = waterView
    waterFront === false 
      ? null 
      : newSearch.isWaterfront = waterFront
    newSearch.sortSelection = 'days'
    newSearch.isSingleFamily = isSingleFamily
    newSearch.isMultiFamily = isMultiFamily
    newSearch.isApartment = isApartment
    newSearch.isCondo = isCondo
    newSearch.isManufactured = isManufactured
    newSearch.isTownhouse = isTownhouse
    newSearch.referenceNumber = Math.floor(Math.random() * 999999) + 1;
    const collectionRef = collection(db, 'Feed')
    addDoc(collectionRef, {
      'search': newSearch,
      'userId': auth.currentUser.uid,
      'createdAt': serverTimestamp()
    })
    .then((response) => {
      navigation.navigate('FeedScreen')
    })
    .catch((error) => {
      console.error(error)
    })
  }

  const addNewSearchFromProfile = () => {
    let newSearch = {}
    newSearch.location = location
    newSearch.status = status
    priceMin === null
      ? null 
      : newSearch.price_min = priceMin
    priceMax === null
      ? null 
      : newSearch.price_max = priceMax
    maxHoa === null
      ? null 
      : newSearch.hoa_max = maxHoa
    sqftMin === null
      ? null 
      : newSearch.sqft_min = sqftMin
    sqftMax === null
      ? null 
      : newSearch.sqft_max = sqftMax
    beds === null
      ? null 
      : newSearch.beds_min = beds
    baths === null
      ? null 
      : newSearch.baths_min = baths
    hasPool === false 
      ? null 
      : newSearch.hasPool = hasPool
    hasGarage === false 
      ? null 
      : newSearch.hasGarage = hasGarage 
    hasAC === false 
      ? null 
      : newSearch.hasAirConditioning = hasAC
    isSingleStory === false 
      ? null 
      : newSearch.singleStory = isSingleStory
    cityView === false 
      ? null 
      : newSearch.isCityView = cityView
    mountainView === false 
      ? null 
      : newSearch.isMountainView = mountainView
    waterView === false
      ? null 
      : newSearch.isWaterView = waterView
    waterFront === false 
      ? null 
      : newSearch.isWaterfront = waterFront
    newSearch.sortSelection = 'days'
    newSearch.isSingleFamily = isSingleFamily
    newSearch.isMultiFamily = isMultiFamily
    newSearch.isApartment = isApartment
    newSearch.isCondo = isCondo
    newSearch.isManufactured = isManufactured
    newSearch.isTownhouse = isTownhouse
    newSearch.referenceNumber = Math.floor(Math.random() * 999999999) + 1;
    const collectionRef = collection(db, 'Feed')
    addDoc(collectionRef, {
      'search': newSearch,
      'userId': auth.currentUser.uid,
      'createdAt': serverTimestamp()
    })
    .then((response) => {
      navigation.navigate('SavedSearchScreen')
    })
    .catch((error) => {
      console.error(error)
    })
  }

  const grabFeed = () => {
    setLoading(true)
    const collectionRef = collection(db, 'Feed')
    const q = query(collectionRef, where('userId', '==', auth.currentUser.uid), limit(15))
    onSnapshot(q, (snapshot) => {
      let FeedList = []
      snapshot.docs.forEach((doc) => {
        FeedList.push({ ...doc.data(), id: doc.id })
      })
      FeedList.length > 0 ? grabListResults(FeedList) : setEmptyList(true)
    })
  }

  const grabListResults = (FeedList) => {
    setCurrentFeed(FeedList)
    setCurrentFeedSearch(FeedList[0])
    grabFeedResults(FeedList[0].search)
  }

  const grabFeedResults = (search) => {
    properties.params = search
    axios.request(properties)
      .then((response) => {
        setSelectedFeed(response.data.results)
        setLoading(false)
      })
      .catch((error) => {
        error[0] === 'AxiosError: Request failed with status code 500'
            ? setErrorMessage('There was an issue retreiving properties')
            : error[0] === 'AxiosError: Request failed with status code 429'
              ? resetRequest(search)
              : null
      })
  }

  const resetRequest = (search) => {
    properties.params = search
    axios.request(properties)
      .then((response) => {
        setSelectedFeed(response.data.results)
        setLoading(false)
      })
      .catch((error) => {
        error[0] === 'AxiosError: Request failed with status code 500'
            ? setErrorMessage('There was an issue retreiving properties')
            : error[0] === 'AxiosError: Request failed with status code 429'
              ? resetRequest(search)
              : null
      })
  }

  const updateSelectedFeed = (search) => {
    setLoading(true)
    grabFeedResults(search.search)
  }

  return(
    <FeedContext.Provider value={{sort,
                                  isSingleFamily,
                                  isMultiFamily,
                                  isApartment,
                                  isCondo,
                                  isManufactured,
                                  isTownhouse,
                                  isLotLand,
                                  beds,
                                  baths,
                                  priceMin,
                                  priceMax,
                                  maxHoa,
                                  sqftMin,
                                  sqftMax,
                                  hasPool,
                                  hasGarage,
                                  hasAC,
                                  isSingleStory,
                                  cityView,
                                  mountainView,
                                  waterView,
                                  waterFront,
                                  location, 
                                  status,
                                  currentFeed,
                                  selectedFeed,
                                  currentFeedSearch,
                                  loading,
                                  emptyList, 
                                  errorMessage,
                                  setEmptyList,
                                  setSort,
                                  setIsSingleFamily,
                                  setIsMultiFamily,
                                  setIsApartment,
                                  setIsCondo,
                                  setIsManufactured,
                                  setIsTownhouse,
                                  setIsLotLand,
                                  setBeds, 
                                  setBaths,
                                  setPriceMin,
                                  setPriceMax,
                                  setMaxHoa,
                                  setSqftMin,
                                  setSqftMax,
                                  setHasPool,
                                  setHasGarage,
                                  setHasAC,
                                  setIsSingleStory,
                                  setCityView,
                                  setMountainView,
                                  setWaterView,
                                  setWaterFront,
                                  setLocation, 
                                  setStatus,
                                  addNewSearch,
                                  grabFeed,
                                  setCurrentFeedSearch,
                                  updateSelectedFeed,
                                  addNewSearchFromProfile}}>
      {children}
    </FeedContext.Provider>
  )

}