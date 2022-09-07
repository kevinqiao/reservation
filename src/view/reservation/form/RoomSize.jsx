import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function RoomSize({ reservation, ...props }) {
    const [value, setValue] = React.useState(1);
    useEffect(() => {
  
        if (reservation){
            if(!reservation['room'])
               reservation['room']={roomSize:1}
            else
               reservation['room']['roomSize']=1;
            switch (reservation['room']['roomSize']) {
                case 'general-suite':
                    setValue(1)
                    break; 
                case 'business-suite':
                    setValue(2)
                    break; 
                case 'presidential-suite':
                    setValue(3)
                    break;             
                default:
                    break;
            }
        }
    }, [reservation])

    const handleChange = (e) => {
        if(!reservation['room'])
           reservation['room']={};
        const newValue = Number(e.target.value);     
        setValue(newValue);
        console.log(newValue)
        switch (newValue) {
            case 1:
                reservation['room']['roomSize']="general-suite"
                break; 
            case 1:
                reservation['room']['roomSize']="business-suite"
                break; 
            case 3:
                reservation['room']['roomSize']="presidential-suite"
                break;             
            default:
                break;
        }
        console.log(reservation['room'])
    };
    return (
        <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Room Size
                </InputLabel>
                <NativeSelect
                    value={value}
                    onChange={handleChange}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value={1}>general-suite</option>
                    <option value={2}>business-suite</option>
                    <option value={3}>presidential-suite</option>
                </NativeSelect>
            </FormControl>
        </Box>
    );
}