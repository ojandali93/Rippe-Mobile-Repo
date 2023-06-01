import React, { createContext, useState } from 'react';

export const ProfileContext = createContext(null)

export const ProfileContextProvider = ({children}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [loggedIn, setLoggedIn] = useState(false)

  const [openCreateAccount, setOpenCreateAccount] = useState(false)

  return(
    <ProfileContext.Provider value={{email,
                                      password,
                                      verify,
                                      openCreateAccount,
                                      username,
                                      phone,
                                      loggedIn,
                                      location,
                                      firstName, 
                                      lastName, 
                                      setLastName,
                                      setFirstName,
                                      setLocation,
                                      setEmail,
                                      setPassword,
                                      setVerify,
                                      setUsername, 
                                      setPhone,
                                      setLoggedIn,
                                      setOpenCreateAccount}}>
      {children}
    </ProfileContext.Provider>
  )

}
