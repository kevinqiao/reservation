
import React, { useEffect } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];
const extras=
[
  "extraBreakfast",
  "extraTV",
  "extraWiFi",
  "extraParking",
  "extraBalcony"
  ]
function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function Extras({reservation,...props}) {
  const theme = useTheme();
  const [values,setValues]= React.useState<string[]>([])
  useEffect(() => {
    if (reservation && reservation['extras']){
      setValues(reservation['extras']);
    }else{
      setValues([])
    }
  }, [reservation])

  const handleChange = (event: SelectChangeEvent<typeof values>) => {
    const {
      target: { value },
    } = event;
    const newValue=typeof value === 'string' ? value.split(',') : value;
    setValues(newValue);
    reservation['extras']=newValue;
  };

  return (
    <div style={{position:"relative",left:"-20px"}}>
      <FormControl size="small" sx={{ m: 1, width: 170,

              "& fieldset": {
                marginLeft:"12px",
                border: "none",
                width:"75%",
                borderBottom: "1px solid grey",
                borderRadius: "0"
              }
       }}>
        <InputLabel id="demo-multiple-name-label">Extras</InputLabel>
        <Select

          id="extras"
          multiple
          value={values}
          onChange={handleChange}
          input={<OutlinedInput label="Extras" />}
          MenuProps={MenuProps}
        >
          {extras.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, values, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
