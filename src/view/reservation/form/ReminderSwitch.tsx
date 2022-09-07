import React, { useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function ReminderSwitch({reservation,...props}) {
    const [value, setValue] = React.useState(false);
    useEffect(() => {
      if (reservation && reservation['reminder'])
        setValue(reservation['reminder'])
      else{
        setValue(false)
        reservation['reminder']=false;
      }
    }, [reservation])
  
    const handleChange = (e) => {
      const newValue = e.target.checked;
      setValue(newValue);
      reservation['reminder']=newValue;
    }
  return (
    <FormGroup>
      <FormControlLabel control={<Switch checked={value} size="small" sx={{"& .MuiSwitch-thumb":{marginTop:"2px",width:14,height:14},"& .MuiSwitch-track":{height:12}}}  onClick={handleChange}/>} label="Send me a reminder" />
    </FormGroup>
  );
}
