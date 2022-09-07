import React, { useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function NewsletterSwitch({reservation,...props}) {
    const [value, setValue] = React.useState(false);
    useEffect(() => {
      if (reservation && reservation['newsletter'])
        setValue(reservation['newsletter'])
      else{
        setValue(false)
        reservation['newsletter']=false;
      }
    }, [reservation])
  
    const handleChange = (e) => {
      const newValue = e.target.checked;
      setValue(newValue);
      reservation['newsletter']=newValue;
    }
  return (
    <FormGroup>
      <FormControlLabel control={<Switch checked={value}  size="small" sx={{"& .MuiSwitch-thumb":{marginTop:"2px",width:14,height:14},"& .MuiSwitch-track":{height:12}}} onClick={handleChange}/>} label="Subscribe to newsletter" />
    </FormGroup>
  );
}
