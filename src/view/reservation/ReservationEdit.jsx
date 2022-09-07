import React, { useEffect,useContext } from 'react';
import { animated, useSpring } from "@react-spring/web";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { radioClasses, checkboxClasses } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import ReservationContext from "./reservationContext";
import useReservationService from '../../service/useReservationService.js';
import useMessageService from "../../service/useMessageService.js";
import useWindowDimension from '../../service/useWindowDimension.js';
import ArrivalDate from './form/ArrivalDate.tsx';
import DepartureDate from './form/DepartureDate.tsx';
import RoomSize from './form/RoomSize.jsx';
import RoomQuantity from './form/RoomQuantity.jsx';
import FirstName from './form/FirstName.jsx';
import LastName from './form/LastName.jsx';
import Email from './form/Email.jsx';
import Phone from './form/Phone.jsx';
import StreetName from './form/StreetName.jsx';
import StreetNo from './form/StreetNo.jsx';
import State from './form/State.jsx';
import City from './form/City.jsx';
import Extras from './form/Extras.tsx';
import PostCode from './form/PostCode.jsx';
import Note from "./form/Note.jsx";
import Tags from './form/Tags.tsx';
import ReminderSwitch from './form/ReminderSwitch.tsx';
import NewsletterSwitch from './form/NewsletterSwitch.tsx';
import PayMethod from './form/PayMethod.tsx';
import FormConfirm from './form/FormConfirm.tsx';
import './reservation.css';
const theme = createTheme({

  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'grey',
          [`&.${checkboxClasses.checked}`]: {
            color: '#eb2a77',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          // Controls default (unchecked) color for the thumb
          color: "#eb2a77",
        },
        colorPrimary: {
          "&.Mui-checked": {
            // Controls checked color for the thumb
            color: "#eb2a77"
          }
        },
        track: {
          // Controls default (unchecked) color for the track
          opacity: 0.8,
          backgroundColor: "#eb2a77",
          ".Mui-checked.Mui-checked + &": {
            // Controls checked color for the track
            opacity: 0.4,
            backgroundColor: "#eb2a77"
          }
        }
      }
    }
    ,
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "grey",
          [`&.${radioClasses.checked}`]: {
            color: "#eb2a77",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          color: 'red',
        },
      },
    },
  },
  typography: {
    fontSize: 10,
  },
});

const validate=(reservation)=>{
  const errors={};
  console.log(reservation['email'])
  if(!reservation['firstName']||reservation['firstName'].trim().length===0)
      errors['firstName']="required";
  if(!reservation['lastName']||reservation['lastName'].trim().length===0)
      errors['lastName']="required";
  if(!reservation['email']||reservation['email'].trim().length===0)
      errors['email']="required";
  else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(reservation['email']))
      errors['email']="invalid";
  return errors;
}
/**
 * Reservation Edit/Create
 */
export const ReservationEdit = ({ ...props }) => {
  const [errors,setErrors] = React.useState(null);
  const [reservation, setReservation] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const { width, height } = useWindowDimension();
  const reservationService = useReservationService(useContext(ReservationContext));
  const {message,publish} = useMessageService(["reservationCreateOpen", "reservationEditOpen"]);

  useEffect(() => {
    if(message){
      setErrors(null)
      switch (message['name']) {
        case "reservationCreateOpen":
          setReservation({ id: 0 })
          break;
        case "reservationEditOpen":
          setReservation(message['data'])
          break;
        default:
          break;
      }
      setOpen(true)
    }
  },[message])

  const [styles, api] = useSpring(() => ({
    opacity: 0, x: 0, y: 0, borderRadius: 0
  }));
  const [maskStyles, maskApi] = useSpring(() => ({
    opacity: 0, display: "none"
  }))
  useEffect(() => {
    if (!open) {
      if (width > 700)
        api.start({ opacity: 0, x: width })
      else
        api.start({ opacity: 0, y: height })
      maskApi.start({ opacity: 0, display: "none" })
    } else {
      if (width > 700)
        api.start({ to: [{ opacity: 0, y: 0, width: 500, height: height }, { opacity: 1, x: width - 500 }] })
      else
        api.start({ to: [{ opacity: 0, x: 0, width: width, height: height - 60 }, { opacity: 1, y: 60 }] })
      maskApi.start({ opacity: 0.6, display: "block" })
    }
  }, [open, width, height])

  const confirm = async ()=>{

     const res = validate(reservation);
     if(Object.keys(res).length>0)
         setErrors(res)
     else if(reservation['id']===0){
        reservationService.createReservation(reservation).then((r)=>setOpen(false))
     }else{ 
        await reservationService.updateReservation(reservation);
        publish({name:"reservationUpdated",data:reservation})
        setOpen(false);
     }
  }

  return (
    <ThemeProvider theme={theme}>
      <animated.div style={{ position: "fixed", zIndex: 600, width: width > 700 ? 500 : width, height: width > 700 ? height : height - 60, top: 0, left: 0, ...styles }}>
        {reservation?<div  className='form-container' style={{ borderRadius: width < 700 ? "29px 29px 4px 4px" : 0}}>
          <div  className='form-head'>
            <div style={{ width: 50 }} />
            <div className='head-title'> {reservation && (!reservation['id'] || reservation['id'] == 0) ? "Create Reservation" : "Edit Reservation"}</div>
            <div className='btn-close' onClick={() => setOpen(false)}><span><CloseIcon style={{fontSize:30}} /></span></div>
          </div>
          <div className='form-content'>
            <div className='form-row'>
              <ArrivalDate reservation={reservation}/>
              <div style={{ width: 10 }} />
              <DepartureDate reservation={reservation}/>
            </div>
            <div className='row-divider'/>
            <div className='form-row'>
              <RoomSize reservation={reservation}/>
              <div style={{ width: 10 }} />
              <RoomQuantity reservation={reservation} />
            </div>
            <div className='row-divider'/>
            <div><FirstName errors={errors} reservation={reservation}/></div>
            <div className='row-divider'/>
            <div><LastName errors={errors} reservation={reservation}/></div>
            <div className='row-divider'/>
            <div><Email errors={errors} reservation={reservation}/></div>
            <div className='row-divider'/>
            <div><Phone reservation={reservation}/></div>
            <div className='row-divider'/>
            <div className='form-row'>
              <StreetName reservation={reservation}/>
              <div style={{ width: 10 }} />
              <StreetNo reservation={reservation}/>
            </div>
            <div className='row-divider'/>
            <div className='row-divider'/>
            <div className='form-row'>
              <PostCode reservation={reservation}/>
              <div style={{ width: 10 }} />
              <State reservation={reservation}/>
              <div style={{ width: 10 }} />
              <City reservation={reservation}/>
            </div>
            <div className='row-divider'/>
            <div className='row-divider'/>
            <div><Extras reservation={reservation}/></div>
            <div className='row-divider'/>
            <div><PayMethod reservation={reservation}/></div>
            <div className='row-divider'/>
            <div><Note reservation={reservation}/></div>
            <div className='row-divider'/>
            <div><Tags reservation={reservation} /></div>
            <div className='row-divider'/>
            <div><ReminderSwitch reservation={reservation}/></div>
            <div className='row-divider'/>
            <div><NewsletterSwitch reservation={reservation}/></div>
            <div className='row-divider'/>
            <div><FormConfirm reservation={reservation}/></div>
          </div>
          {width<700?<div style={{height:100}}/>:null}
        </div>:null}
        <div className="form-footer">
            <div className="btn-confirm"  onClick={confirm}><span>{reservation&&reservation['id']==0?'Create':'Update'}</span></div>
        </div>
      </animated.div>

      <animated.div className='form-mask' style={{...maskStyles }} onClick={() => setOpen(false)}></animated.div>
    </ThemeProvider>
  );
};

