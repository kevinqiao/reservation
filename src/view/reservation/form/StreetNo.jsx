import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
export default function StreetNo({reservation,...props}) {
  const [value, setValue] = React.useState('');
  useEffect(() => {
    if(reservation){
      if(!reservation['addressStreet'])
         reservation['addressStreet']={streetNumber:''}
      else if(!reservation['addressStreet']['streetNumber'])
        reservation['addressStreet']['streetNumber']='';
      setValue(reservation['addressStreet']['streetNumber'])
    }  
    
  }, [reservation])

  const handleChange = (e) => {
    if(!reservation["addressStreet"])
      reservation["addressStreet"]={};
    const newValue = e.target.value;
    setValue(newValue);
    reservation['addressStreet']['streetNumber']=newValue;
  }
  return (
    <>
    <TextField
    id="email"
    label="Street Number"
    variant="standard"
    size='small'
    sx={{"& p":{textAlign:'right'}}}
    value={value}
    onChange={handleChange}
  />
  </>
  );
}