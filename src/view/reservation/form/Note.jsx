import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
export default function Note({reservation,...props}) {
  const [value, setValue] = React.useState('');
  useEffect(() => {
    if (reservation && reservation['note'])
      setValue(reservation['note'])
  }, [reservation])

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    reservation['note']=newValue;
  }
  return (
    <>
    <TextField
    id="standard-helperText"
    label="Personal Note"
    size="string"
    variant="standard"
    sx={{"& p":{textAlign:'right'}}}
    value={value}
    onChange={handleChange}
  />
    </>
  );
}