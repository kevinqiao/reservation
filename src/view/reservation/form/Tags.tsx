import React, { useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function Tags({reservation,...props}) {
    const [tags, setTags] = React.useState(["hotel","booking","labtest"]);
    useEffect(() => {
      if (reservation && reservation['tags'])
        setTags(reservation['tags'])
       else 
        setTags(["hotel","booking","labtest"])
    }, [reservation])

    const handleDelete = (tag) => {
        const ts =  tags.filter((t)=>t!==tag);
        setTags(ts)
        reservation['tags']=ts;
    };

    return (
        <div style={{borderBottom:"1px solid grey",width:"100%",}}>
            <div><span style={{fontSize:12,color:"grey"}}>Tags</span></div>
            <div style={{height:5}}/>
            <Stack direction="row" spacing={1}>
                {tags.map((t)=><Chip
                    key={t}
                    size="small"
                    label={t}
                    onDelete={()=>handleDelete(t)}
                />)}
            </Stack>
            <div style={{height:5}}/>
        </div>
    );
}
