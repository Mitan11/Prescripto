import { createContext } from "react";

export const AppContext = createContext()

const currency = '$'

const calculateAge = (date) => {
    const today = new Date()
    const birthDate = new Date(date)
    let age = today.getFullYear() - birthDate.getFullYear()
    return String(age)
}

const AppContextProvider = (props)=>{
    const value = {
        calculateAge,
        currency
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider