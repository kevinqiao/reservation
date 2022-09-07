import { useState, useEffect } from 'react';

const useWindowDimension = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height,setHeight] = useState(window.innerHeight);
  const updateDimension=()=>{
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }
  useEffect(()=>{

      window.addEventListener('resize', updateDimension,true);
      
      return ()=>window.removeEventListener("resize",updateDimension,true)

  }, []);

  return {width, height };
};

export default useWindowDimension;