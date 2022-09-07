import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from "@mui/material/styles";
// const CssTextField = styled(TextField, {
//   shouldForwardProp: (props) => props !== "focusColor"
// })((p) => ({
//   // input label when focused
//   "& label.Mui-focused": {
//     color: p.focusColor
//   },
//   // focused color for input with variant='standard'
//   "& .MuiInput-underline:after": {
//     borderBottomColor: p.focusColor
//   },
//   // focused color for input with variant='filled'
//   "& .MuiFilledInput-underline:after": {
//     borderBottomColor: p.focusColor
//   },
//   // focused color for input with variant='outlined'
//   "& .MuiOutlinedInput-root": {
//     "&.Mui-focused fieldset": {
//       borderColor: p.focusColor
//     }
//   }
// }));
export default function FirstName({ reservation,errors, ...props }) {
  const [value, setValue] = React.useState('');
  useEffect(() => {
    if (reservation && reservation['firstName'])
      setValue(reservation['firstName'])
    else
      setValue('')
  }, [reservation])
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length<=25){
      setValue(newValue);
      reservation['firstName']=newValue;
    }
  }
  return (
    <>
      <TextField
        error={errors&&errors['firstName']?true:false}
        id="first-name"
        label="First Name"
        helperText={value ? value.length + "/25" : "0/25"}
        variant="standard"
        size='small'
        sx={{ "border": "grey", "& p": { textAlign: 'right' } }}
        value={value}
        onChange={handleChange}
      />
    </>
  );
}