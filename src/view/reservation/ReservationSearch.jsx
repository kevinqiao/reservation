import React, { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import useReservationService from '../../service/useReservationService';
import useMessageService from "../../service/useMessageService.js";
import useWindowDimension from '../../service/useWindowDimension.js';
import SearchBar from './SearchBar';
import './reservation.css';
/**
 * Reservation Search Component
 */
export default function ReservationSearch({ ...props }){
  const { width, height } = useWindowDimension();
  const [reservations, setReservations] = React.useState(props.reservations?props.reservations:[])
  const reservationService = useReservationService();
  const {message,publish}= useMessageService(["reservationUpdated"]);

  useEffect(() => {
    if(message){
      const reservation = message['data']
      const rs = reservations.filter((r)=>r['id']===reservation['id']);
      if(rs&&rs.length==1){
         Object.assign(rs[0],reservation)
         setReservations([...reservations])
      }
    }
  },[message])


  const search=(word)=>{
      reservationService.searchReservations(word).then((rs)=>{
          setReservations(rs)
      })
  }
  const remove= async (e,reservation)=>{
     e.stopPropagation();
     reservationService.removeReservation(reservation['id']).then((res)=>{
        let rs = reservations.filter((r)=>r['id']!==reservation['id']);
        setReservations(rs)
     })
  }
  return (
    <>
      <div className="search-container">
        <div style={{ height: 40 }} />
        <div className="search-bar-container">
          <div style={{ width: width > 700 ? 120 : 20 }} />
          <div style={{ width: width > 700 ? 400 : 240 }}>
            <SearchBar onSearch={search}/>
          </div>
          <div className="search-bar-new" style={{ width: width > 700 ? 120 : 60}} onClick={() =>publish({ name: "reservationCreateOpen"})}>{width > 700 ? <span style={{ fontSize: 12 }}>New Reserveration</span> : <span style={{ fontSize: "15px" }}><AddIcon /></span>}</div>
        </div>
        <div style={{ height: 40 }} />
        {reservations && reservations.map((c, index) =>
          <div key={c['id'] + "m"} style={{ width: "95%" }} onClick={() => publish({ name: "reservationOpen",data:c})}>
            <div key="head1" className="search-item-container">
              <div className="search-item-content">
                <div><span style={{ fontSize: "12px" }}>{c['firstName'] + " " + c['lastName']}</span></div>
                {width > 700 ? <>
                  <div><span style={{ fontSize: 14 }}>{c['email']}</span></div>
                  <div><span style={{ fontSize: 14 }}>{c['phone']}</span></div>
                </> : <div style={{ fontSize: 14 }}><span>{c['phone'] ? c['phone'] : c['email']}</span></div>}
                <div><span style={{ fontSize: 14 }}>{c['confirm'] ? "Confirmed" : "To Confirm"}</span></div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:110}}>
                  <div className="search-item-btn"  onClick={(e) => { e.stopPropagation(); publish({ name: "reservationEditOpen", data: JSON.parse(JSON.stringify(c)) }) }}><span style={{ fontSize: 14 }}>Edit</span></div>
                  <div className="search-item-btn"  onClick={(e)=>remove(e,c)}><span style={{ fontSize: 14 }}>Delete</span></div>
                </div>
              </div>
            </div>
            <div style={{ width: "100%" }}><hr style={{ marginLeft: 0 }} color={"grey"} /></div>
          </div>)}
      </div>
    </>
  );
};

