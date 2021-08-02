import { useContext, createContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
const context = createContext()
export const useUser = () => {
  return useContext(context)
}
export function UserProvider ({ children }) {
  const [saveTemporalToken, setSaveTemporalToken] = useState('')
  const { localStorageToken, setLocalStorageToken } = useLocalStorage('loginToken')

  return (
    <context.Provider value={{ localStorageToken, setLocalStorageToken, saveTemporalToken, setSaveTemporalToken }}>
      {children}
    </context.Provider>
  )
}
