import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';

export default function RoomQuantity({ reservation, ...props }) {
  const [value, setValue] = React.useState(1);
  useEffect(() => {     
    if (reservation){
      if(!reservation['room'])
         reservation['room']={roomQuantity:1}
      else
         reservation['room']['roomQuantity']=1;
      setValue(reservation['room']['roomQuantity'])
    }
  }, [reservation])
  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    if (newValue <= 5){
      if(!reservation['room'])
          reservation['room']={};
      setValue(newValue);
      reservation['room']['roomQuantity']=newValue;
    }
  }
  return (
    <div style={{ position: "relative", top: 3 }}>
      <TextField
        id="standard-number"
        label="Room Quantity"
        type="number"
        variant="standard"
        helperText="Maximum: 5"
        value={value}
        size='small'
        sx={{ "border": "grey", "& p": { textAlign: 'left' } }}
        onChange={handleChange}
      />
    </div>
  );
}