import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
export default function City({reservation,...props}) {
  const [value, setValue] = React.useState('');
  useEffect(() => {
    if(reservation){
      if(!reservation['addressLocation'])
         reservation['addressLocation']={city:''}
      else if(!reservation['addressLocation']['city'])
        reservation['addressLocation']['city']='';
      setValue(reservation['addressLocation']['city'])
    } 
   
  }, [reservation])

  const handleChange = (e) => {
    const newValue = e.target.value;
    if(!reservation['addressLocation'])
       reservation['addressLocation']={};
    reservation['addressLocation']['city']=newValue;
    setValue(newValue);
  }

  return (
    <>
    <TextField
    id="city"
    label="City"
    variant="standard"
    size='small'
    value={value}
    onChange={handleChange}
  />
  </>
  );
}