import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
export default function StreetName({reservation,...props}) {
  const [value, setValue] = React.useState('');
  useEffect(() => {
    console.log(reservation)
    if(reservation){
      if(!reservation['addressStreet'])
         reservation['addressStreet']={streetName:''}
      else if(!reservation['addressStreet']['streetName'])
        reservation['addressStreet']['streetName']='';
      setValue(reservation['addressStreet']['streetName'])
    }   
  }, [reservation])

  const handleChange = (e) => {
    if(!reservation["addressStreet"])
       reservation["addressStreet"]={};
    const newValue = e.target.value;
    if (newValue.length<=50){
      setValue(newValue);
      reservation['addressStreet']=newValue;
    }
  }
  return (
    <>
    <TextField
    id="email"
    label="Street Name"
    variant="standard"
    size='small'
    sx={{"& p":{textAlign:'right'}}}
    value={value}
    onChange={handleChange}
  />
  </>
  );
}