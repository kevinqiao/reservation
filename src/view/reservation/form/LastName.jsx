import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
export default function LastName({reservation,errors,...props}) {
  const [value, setValue] = React.useState('');
  useEffect(() => {
    if (reservation && reservation['lastName'])
      setValue(reservation['lastName'])
    else
      setValue('')
  }, [reservation])
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length<=50){
      setValue(newValue);
      reservation['lastName']=newValue;
    }
  }
  return (
    <>
      <TextField
        error={errors&&errors['lastName']?true:false}
        id="last-name"
        label="Last Name"
        helperText={value ? value.length + "/50" : "0/50"}
        variant="standard"
        size='small'
        sx={{ "border": "grey", "& p": { textAlign: 'right' } }}
        value={value}
        onChange={handleChange}
      />
    </>
  );
}