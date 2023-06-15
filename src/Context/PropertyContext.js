import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { singleProperty } from '../Api/zillowApi';

export const PropertyContext = createContext(null)

export const PropertyContextProvider = ({children}) => {
  const [property, setProperty] = useState('')

  const [mainImage, setMainImage] = useState('')
  const [imageList, setImageList] = useState([])
  const [errorMessage, setErrorMessage] = ('')

  const [loading, setLoading] = useState(true)

  const setPropertyDetails = (zpid) => {
    singleProperty.params.zpid = zpid
    axios.request(singleProperty)
      .then((response) => {
        setProperty(response.data)
        setMainImage(response.data.hiResImageLink)
        generateImageList(response.data.big)
        setLoading(false)
      })
      .catch((error) => {
        error[0] === 'AxiosError: Request failed with status code 500'
            ? setErrorMessage('There was an issue retreiving properties')
            : null
      })
  }

  const generateImageList = (images) => {
    let imagesNewList = []
    images.map((item, index) => {
      item.index = index
      imagesNewList.push(item)
    })
    setImageList(imagesNewList)
  }

  return(
    <PropertyContext.Provider value={{property, 
                                      loading, 
                                      mainImage, 
                                      imageList,
                                      errorMessage,
                                      setProperty, 
                                      setPropertyDetails,
                                      setMainImage,
                                      setLoading}}>
      {children}
    </PropertyContext.Provider>
  )

}