import React,{createContext,useContext} from 'react'
const ReservationContext = React.createContext()
export const ReservationProvider = ReservationContext.Provider
export default ReservationContext