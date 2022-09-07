import React, { useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';



export default function PayMethod({ reservation, ...props }) {
  const [value, setValue] = React.useState("cc");
  useEffect(() => {
    if (reservation){
      if(reservation['payment'])
        setValue(reservation['payment'])
      else{
        setValue("cc")
        reservation['payment']="cc"
      }
    }
  }, [reservation])

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue)
    reservation['payment']=newValue;
  }

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="payment-lable"
        name="payment-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="cc" control={<Radio  />} label="Credit Card" />
        <FormControlLabel value="ppl" control={<Radio />} label="PayPal" />
        <FormControlLabel value="cash" control={<Radio/>} label="Cash" />
        <FormControlLabel value="btc" control={<Radio />} label="Bitcoin" />
      </RadioGroup>
    </FormControl>
  );
}
