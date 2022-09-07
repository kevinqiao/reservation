import React, { useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Box from '@mui/material/Box';
import "./form.css";
export default function DepartureDate({reservation,...props}) {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(Date.now()),  
  );
  useEffect(()=>{
    if(reservation){
      if(!reservation['stay'])
         reservation['stay']={arrivalDate:Date.now()}
      else if(!reservation['departureDate'])
        reservation['stay']['departureDate']=Date.now();
      setValue(dayjs(reservation['stay']['departureDate']))
    }   
  },[reservation])

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          "& fieldset": {
            border: "none",
            borderBottom: "1px solid grey",
            borderRadius: "0px",
            height: 35
          },
          "& input": {
            paddingLeft: "0px"
          },
          "& button": {
            position: "relative",
            left:10
          },
          "& label": {
            marginLeft:"-15px"
          }
        }}
      >
      <DesktopDatePicker
        className="departure-date"
        label="Date of Departure"
        variant="inline"
        inputFormat="MM/DD/YYYY"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField size="small" style={{ border: "none" }} {...params} />}
      />
      </Box>
    </LocalizationProvider>
  );
}
