import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
export default function Phone({reservation,...props}) {
  const [value, setValue] = React.useState('');
  useEffect(() => {
    if (reservation && reservation['phone'])
      setValue(reservation['phone'])
    else
      setValue('')
  }, [reservation])

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  }
  return (
    <>
    <TextField
    id="phone-number"
    label="Phone Number"
    helperText="Add your country code first"
    variant="standard"
    size='small'
    value={value}
    onChange={handleChange}
  />
  </>
  );
}