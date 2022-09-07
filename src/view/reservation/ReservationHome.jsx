import React from 'react';
import { ReservationProvider } from './reservationContext'
import { ReservationEdit } from './ReservationEdit';
import { ReservationDetail } from './ReservationDetail';
import ReservationSearch from './ReservationSearch';
import reservations from "./reservations.json";
import './reservation.css';

/**
 * Reservation Main Home
 */
export const ReservationHome = ({ ...props }) => {

  return (
    <ReservationProvider value={reservations}>
      <>
      <div style={{width: "100%", height: "100%" }}>
          <ReservationSearch />
      </div>
      <ReservationDetail/>
      <ReservationEdit/>
      </>
    </ReservationProvider>
  );
};

