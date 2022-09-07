import React from 'react';
import {ReservationDetail} from '../view/reservation/ReservationDetail.jsx';
import ReservationSearch from '../view/reservation/ReservationSearch.jsx';
import reservations from "../view/reservation/reservations.json";
export default {
  title: 'Reservation',
  component:ReservationSearch,
};

export const  Search = (args) => <ReservationSearch {...args}/>;
export const  SearchResult = (args) => <ReservationSearch reservations={reservations}/>;
export const  Detail = (args) => <ReservationDetail open={true} reservation={reservations[0]}/>;