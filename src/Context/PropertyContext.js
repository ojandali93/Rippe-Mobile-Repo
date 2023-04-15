import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react';

export const PropertyContext = createContext(null)

export const PropertyContextProvider = ({children}) => {

  const [property, setProperty] = useState('')

  const [mainImage, setMainImage] = useState('')
  const [images, setImages] = useState([])

  const [loading, setLoading] = useState(false)

  const setPropertyDetails = () => {
    setLoading(true)
    setMainImage(property.hiResImageLink)
    setImages(property.big)
    setLoading(false)
  }

  return(
    <PropertyContext.Provider value={{property, 
                                      loading, 
                                      mainImage, 
                                      images,
                                      setProperty, 
                                      setPropertyDetails}}>
      {children}
    </PropertyContext.Provider>
  )

}