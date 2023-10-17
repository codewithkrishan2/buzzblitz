import { getCurrentUserDetail, isLoggedIn } from '../Auth/Index';
import userContext from './UserContext';
import { useEffect, useState } from 'react';

function UserProvider({children}) {

    const [user, setUser] =  useState({
        data:{},
        login:false
    })

    useEffect(()=>{
      setUser({
        data:getCurrentUserDetail(),
        login:isLoggedIn()
      })
    } ,[])

  return (
    <userContext.Provider value={{ user, setUser }}>
        {children}
    </userContext.Provider>
  )
}

export default UserProvider