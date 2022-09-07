import React, { useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { animated, useSpring } from "@react-spring/web";
import CloseIcon from '@mui/icons-material/Close';
import useMessageService from "../../service/useMessageService.js";
import useWindowDimension from '../../service/useWindowDimension.js';
import useReservationService from '../../service/useReservationService.js';
import './reservation.css';
/**
 * Reservation Detail View
 */
export const ReservationDetail = ({ ...props }) => {
  const [reservation, setReservation] = React.useState(props.reservation?props.reservation:null);
  const [open, setOpen] = React.useState(props.open?props.open:false);
  const { width, height } = useWindowDimension();

  const [styles, api] = useSpring(() => ({
    opacity: 0, x: 0, y: 0, borderRadius: 0
  }));
  const [maskStyles, maskApi] = useSpring(() => ({
    opacity: 0, display: "none"
  }))
  const reservationService = useReservationService();
  const messageService = useMessageService(["reservationOpen"], (m) => {
    if (m['data'])
      setReservation(m['data'])
    setOpen(true)
  });
  useEffect(() => {
    if (!open) {
      if (width > 700)
        api.start({ opacity: 0, x: width, y: 0 })
      else
        api.start({ opacity: 0, x: 0, y: height })
      maskApi.start({ opacity: 0, display: "none" })
    } else {
      if (width > 700)
        api.start({ to: [{ opacity: 0, y: 0, width: 500, height: height }, { opacity: 1, x: width - 500 }] })
      else
        api.start({ to: [{ opacity: 0, x: 0, width: width, height: height - 60 }, { opacity: 1, y: 60 }] })
      maskApi.start({ opacity: 0.6, display: "block" })
    }
  }, [open, width, height])

  const confirm = () => {
    reservationService.confirm(reservation['id']).then((code) => {
      if (code === 1)
        messageService.publish({ name: "reservationUpdated", data: reservation })
      setOpen(false)
    })
  }
  const getPaymentDesc = (payment) => {
    let desc = "";
    switch (payment) {
      case "cc":
        desc = "Credit Card"
        break; case "cc":
        desc = "Credit Card"
        break;
      case "ppl":
        desc = "Paypal"
        break;
      case "cash":
        desc = "Cash"
        break;
      case "btc":
        desc = "Bitcoin"
        break;
      default:
        break;
    }
    return desc;
  }

  return (
    <>
      <animated.div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", zIndex: 600, width: width > 700 ? 500 : width, height: width > 700 ? height : height - 60, top: 0, left: 0, ...styles }}>
        {reservation ? <div className='form-container' style={{ borderRadius: width < 700 ? "29px 29px 4px 4px" : 0 }}>
          <div className='form-head'>
            <div style={{ width: 50 }} />
            <div className='head-title'> Reservation Detail</div>
            <div className='btn-close' onClick={() => setOpen(false)}><span><CloseIcon style={{ fontSize: 30 }} /></span></div>
          </div>
          <div className='form-content' style={{ fontSize: 14 }}>
            <div className='form-row'>
              <div id="arrival-date-v"><span>Date of Arrival:</span><span>{dayjs(reservation['stay']['arrivalDate']).format('DD/MM/YYYY')}</span></div>
              <div style={{ width: 10 }} />
              <div id="departure-date-v"><span>Date of Departure:</span><span>{dayjs(reservation['stay']['departureDate']).format('DD/MM/YYYY')}</span></div>
            </div>
            <div className='row-divider'/>
            <div className='form-row'>
              <div id="room-size-v"><span>Room Size:</span><span>{reservation['room']['roomSize']}</span></div>
              <div style={{ width: 10 }} />
              <div id="room-quantity-v"><span>Room Quantity:</span><span>{reservation['room']['roomQuantity']}</span></div>
            </div>
            <div className='row-divider'/>
            <div className='form-row'>
              <div id="first-name-v"><span>First Name:</span><span>{reservation['firstName']}</span></div>
              <div style={{ width: 10 }} />
              <div id="first-name-v"><span>Last Name:</span><span>{reservation['lastName']}</span></div>
            </div>
            <div className='row-divider'/>
            <div className='form-row'>
              <div id="email-v"><span>Email:</span><span>{reservation['email']}</span></div>
            </div>
            <div className='row-divider'/>
            <div className='form-row'>
              <div id="phone-v"><span>Phone Number:</span><span>{reservation['phone']}</span></div>
            </div>
            <div className='row-divider'/>
            <div className='form-row'>
              <div id="street-name-v"><span>Street Name:</span><span>{reservation['addressStreet']['streetName']}</span></div>
              <div style={{ width: 10 }} />
              <div id="street-number-v"><span>Street Number:</span><span>{reservation['addressStreet']['streetNumber']}</span></div>
            </div>
            <div className='row-divider'/>
            <div className='form-row'>
              <div id="zip-code-v"><span>Zip:</span><span>{reservation['addressLocation']['zipCode']}</span></div>
              <div style={{ width: 10 }} />
              <div id="state-v"><span>State:</span><span>{reservation['addressLocation']['state']}</span></div>
              <div style={{ width: 10 }} />
              <div id="city-v"><span>City:</span><span>{reservation['addressLocation']['city']}</span></div>
            </div>
            <div className='row-divider'/>
            <div className='form-row'>
              <div id="extras-v"><span>Extras:</span><span>{reservation['extras'].join()}</span></div>
            </div>
            <div className='row-divider'/>
            <div className='form-row'>
              <div id="payment-v"><span>Payment:</span><span>{ getPaymentDesc(reservation['payment'])}</span></div>
            </div>
            <div className='row-divider'/>
            <div className='form-row'>
              <div id="note-v"><span>Personal Note:</span><span>{ reservation['note']}</span></div>
            </div>
            <div className='row-divider'/>
            <div className='form-row'>
              <div id="tags-v"><span>Tags:</span><span>{reservation['tags'].join()}</span></div>
            </div>
            <div className='row-divider'/>
            <div className='form-row'>
              <div id="reminder-v"><span>Send me a remind:</span><span>{ reservation['reminder']?'yes':'no'}</span></div>
            </div>
            <div className='row-divider'/>
            <div className='form-row'>
              <div id="reminder-v"><span>Subscribe to newsletter:</span><span>{ reservation['newsletter']?'yes':'no'}</span></div>
            </div>
          </div>

        </div> : null}
        {reservation&&!reservation['confirm']?<div className="form-footer">
            <div className="btn-confirm"  onClick={confirm}><span>{'Confirm'}</span></div>
        </div>:null}
      </animated.div>
      <animated.div style={{ position: "fixed", top: 0, left: 0, zIndex: 500, width: "100%", height: "100%", backgroundColor: "black", ...maskStyles }} onClick={() => setOpen(false)}></animated.div>
    </>
  );
};

