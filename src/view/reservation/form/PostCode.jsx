import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
export default function PostCode({reservation,...props}) {
  const [value, setValue] = React.useState('');
  useEffect(() => {
    if(reservation){
      if(!reservation['addressLocation'])
         reservation['addressLocation']={zipCode:''}
      else if(!reservation['addressLocation']['zipCode'])
        reservation['addressLocation']['zipCode']='';
      setValue(reservation['addressLocation']['zipCode'])
    }  
   
  }, [reservation])

  const handleChange = (e) => {
    const newValue = e.target.value;
    if(!reservation['addressLocation'])
       reservation['addressLocation']={};
    reservation['addressLocation']['zipCode']=newValue;
    setValue(newValue);
  }

  return (
    <>
    <TextField
    id="zip"
    label="Zip"
    variant="standard"
    size='small'
    value={value}
    onChange={handleChange}
  />
  </>
  );
}