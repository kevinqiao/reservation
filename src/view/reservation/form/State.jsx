import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function State({ reservation, ...props }) {
    const [value, setValue] = React.useState('');
    useEffect(() => {
        if(reservation){
            if(!reservation['addressLocation'])
               reservation['addressLocation']={state:''}
            else if(!reservation['addressLocation']['state'])
              reservation['addressLocation']['state']='';
            setValue(reservation['addressLocation']['state'])
          } 
      
    }, [reservation])
    const handleChange = (e) => {
        const newValue = e.target.value;   
        setValue(newValue);
        reservation['addressLocation']['state'] = newValue;
    }
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={states}
            size="small"
            value={value}
            onChange={handleChange}
            sx={{
                width: 145,
                marginTop: "5px",
                "& input": { marginLeft: '-12px' },
                "& p": { marginLeft: '-1px' },
                "& label": {
                    marginLeft: "-15px"
                },
                "& svg": {
                    marginRight: "-10px"
                },
                "& fieldset": {
                    border: "none",
                    borderBottom: "1px solid black",
                    borderRadius: "0px",
                }
            }}
            renderInput={(params) => <TextField   {...params} label="State" helperText={"Autocomplete"} />}
        />
    );
}

const states = [
    { label: 'Alabama' },
    { label: 'Alaska' },
    { label: 'Arizona' },
    { label: 'Arkansas' },
    { label: 'California' },
    { label: 'Colorado' },
    { label: 'Connecticut' },
    { label: 'Delaware' },
    { label: 'Florida' },
    { label: 'Georgia' },
    { label: 'Hawaii' },
    { label: 'Idaho' },
    { label: 'IllinoisIndiana' },
    { label: 'Iowa' },
    { label: 'Kansas' },
    { label: 'Kentucky' },
    { label: 'Louisiana' },
    { label: 'Maine' },
    { label: 'Maryland' },
    { label: 'Massachusetts' },
    { label: 'Michigan' },
    { label: 'Minnesota' },
    { label: 'Mississippi' },
    { label: 'Missouri' },
    { label: 'MontanaNebraska' },
    { label: 'Nevada' },
    { label: 'New Hampshire' },
    { label: 'New Jersey' },
    { label: 'New Mexico' },
    { label: 'New York' },
    { label: 'North Carolina' },
    { label: 'North Dakota' },
    { label: 'Ohio' },
    { label: 'Oklahoma' },
    { label: 'Oregon' },
    { label: 'PennsylvaniaRhode Island' },
    { label: 'South Carolina' },
    { label: 'South Dakota' },
    { label: 'Tennessee' },
    { label: 'Texas' },
    { label: 'Utah' },
    { label: 'Vermont' },
    { label: 'Virginia' },
    { label: 'Washington' },
    { label: 'West Virginia' },
    { label: 'Wisconsin' },
    { label: 'Wyoming' }
];
