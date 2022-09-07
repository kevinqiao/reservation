import React, { useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function FormConfirm({ reservation, ...props }) {
    const [value, setValue] = React.useState(false);
    useEffect(() => {
        if (reservation && reservation['confirm'])
            setValue(reservation['confirm'])
        else{
            setValue(false);
            reservation['confirm']=false;
        }
    }, [reservation])

    const handleChange = (e) => {
        const newValue = e.target.checked;
        setValue(newValue);
        reservation['confirm'] = newValue;
    }
    return (
        <>
            <FormControlLabel  sx={{
                position: "relative", left: -5
            }} control={<Checkbox  size="medium" checked={value}  onChange={handleChange}/>} label="I confirm the information given above" />
        </>
    );
}
