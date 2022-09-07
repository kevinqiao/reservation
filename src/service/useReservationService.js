import React from "react";
import ReservationContext from "../view/reservation/reservationContext.js";
export default function useReservationService() {

    const reservations = React.useContext(ReservationContext);
    const  createReservation= async (r) => {
        reservations.unshift(r)
        return r;
    }
    const findReservation = async (id) =>{
       const rs =  reservations.filter((r)=>r['id']===id);
       return rs&&rs.length===1?rs[0]:null
    }
    const findAll= async () =>{
         return reservations;
     }
    const searchReservations= async (criteria) =>{
        let res = reservations.filter((r)=>{
            const str = (r['firstName']+" "+r['lastName']+" "+r['email']+" "+(r['phone']?r['phone']:"")).toLowerCase();
            const ps =str.search(criteria);
            return ps>=0?true:false    
        })
        return res;
    }
    const confirm = async (id)=>{
        let code=0;
        const rs =  reservations.filter((r)=>r['id']===id);
        if(rs&&rs.length===1){
            rs[0]['confirm']=true;
            code = 1;
        }else
            code = 2 ;
        return code;
    }
    const updateReservation = async (u) =>{
        const rs =  reservations.filter((r)=>r['id']===u['id']);
        if(rs&&rs.length===1){
            Object.assign(rs[0],u);
            return rs[0];
        }else
           return null
    }
    const removeReservation = async (id) =>{
        const rs =  reservations.filter((r)=>r['id']===id);
        if(rs&&rs.length===1){
            const index = reservations.findIndex((r)=>r['id']==id);
            if(index>=0)
               reservations.splice(index,1);
        }
    }
    return {searchReservations,confirm,createReservation, findAll,findReservation, updateReservation, removeReservation };
  }