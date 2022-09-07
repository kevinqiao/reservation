import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
export default function Email({ reservation,errors, ...props }) {
  const [value, setValue] = React.useState('');
  useEffect(() => {
    if (reservation && reservation['email'])
      setValue(reservation['email'])
    else
      setValue('')
  }, [reservation])

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    reservation['email']=newValue
  }
  return (
    <>
      <TextField
        error={errors && errors['email'] ? true : false}
        id="email"
        label="E-Mail"
        variant="standard"
        size='small'
        sx={{ "& p": { textAlign: 'right' } }}
        value={value}
        onChange={handleChange}
      />
    </>
  );
}