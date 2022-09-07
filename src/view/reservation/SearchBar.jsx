import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Reservation SearchBar component
 */
export default function SearchBar({ ...props }) {
  const [value, setValue] = React.useState('');
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%"}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="search by name email phone"
        value={value}
        onKeyPress={(e)=>{
          if(e.key === 'Enter'){
              props.onSearch(e.target.value)
              e.preventDefault() 
          }
        }}
        onChange={(e)=>setValue(e.target.value)}
        inputProps={{ 'aria-label': 'search by name email phone' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={()=>props.onSearch(value)}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
