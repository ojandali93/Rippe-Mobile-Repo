import React, { createContext, useState } from 'react';

import { collection, query, where, onSnapshot, addDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../Api/firebaseTesting';

export const FavoritesContext = createContext(null)

export const FavoritesContextProvider = ({children}) => {
  const [favorites, setFavorites] = useState([])
  const [favoritesZpids, setFavoritesZpids] = useState([])

  const grabFavorites = () => {
    auth.currentUser === null 
      ? null 
      : getFavorites()
  }

  const getFavorites = () => {
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

  const addFavorite = (property) => {
    const collectionRef = collection(db, 'Favorites')
    let favoriteProperty = {}
    favoriteProperty.bathrooms = property.bathrooms
    favoriteProperty.bedrooms = property.bedrooms
    favoriteProperty.city = property.city
    favoriteProperty.country = property.country
    favoriteProperty.datePriceChanged = property.datePriceChanged
    favoriteProperty.daysOnZillow = property.daysOnZillow
    favoriteProperty.homeStatus = property.homeStatus
    favoriteProperty.homeType = property.homeType
    favoriteProperty.imgSrc = property.hugePhotos[0].url
    favoriteProperty.latitude = property.latitude
    favoriteProperty.livingArea = property.livingArea
    favoriteProperty.longitude = property.longitude
    favoriteProperty.lotAreaUnit = property.lotAreaUnits
    favoriteProperty.lotAreaValue = property.lotAreaValue
    favoriteProperty.price = property.price
    favoriteProperty.priceChange = property.priceChange
    favoriteProperty.rentZestimate = property.rentZestimate
    favoriteProperty.state = property.state
    favoriteProperty.streetAddress = property.streetAddress
    favoriteProperty.zestimate = property.zestimate
    favoriteProperty.zipcode = property.zipcode
    favoriteProperty.zpid = property.zpid
    addDoc(collectionRef, {
      'property': favoriteProperty,
      'userId': auth.currentUser.uid,
      'zpid': property.zpid,
      'createdAt': serverTimestamp()
    })
    .then((response) => {
    })
    .catch((error) => {
      console.error(error)
    })
  }

  const addFeedFavorite = (property) => {
    const collectionRef = collection(db, 'Favorites')
    let favoriteProperty = {}
    favoriteProperty.bathrooms = property.bathrooms
    favoriteProperty.bedrooms = property.bedrooms
    favoriteProperty.city = property.city
    favoriteProperty.country = property.country
    favoriteProperty.daysOnZillow = property.daysOnZillow
    favoriteProperty.homeStatus = property.homeStatus
    favoriteProperty.homeType = property.homeType
    favoriteProperty.imgSrc = property.imgSrc
    favoriteProperty.latitude = property.latitude
    favoriteProperty.livingArea = property.livingArea + ' ' + property.livingAreaUnitsShort
    favoriteProperty.longitude = property.longitude
    favoriteProperty.price = property.price
    favoriteProperty.rentZestimate = property.rentZestimate
    favoriteProperty.state = property.state
    favoriteProperty.streetAddress = property.streetAddress
    favoriteProperty.zestimate = property.zestimate
    favoriteProperty.zipcode = property.zipcode
    favoriteProperty.zpid = property.zpid
    addDoc(collectionRef, {
      'property': favoriteProperty,
      'userId': auth.currentUser.uid,
      'zpid': property.zpid,
      'createdAt': serverTimestamp()
    })
    .then((response) => {
    })
    .catch((error) => {
      console.error(error)
    })
  }

  const removeFromFavorites = (property) => {
    let selectedFavorite
    favorites.forEach((fav) => {
      fav.zpid === property.zpid
        ? selectedFavorite = fav 
        : null 
    })
    const docRef = doc(db, 'Favorites', selectedFavorite.id)
    deleteDoc(docRef)
      .then((response) => {
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return(
    <FavoritesContext.Provider value={{
      favorites,
      favoritesZpids,
      setFavorites,
      setFavoritesZpids,
      grabFavorites,
      grabZpidList,
      addFavorite,
      removeFromFavorites,
      addFeedFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  )

}
