
import React, { useEffect,useContext } from 'react';
import { Subject } from 'rxjs';

const subject = new Subject();

export default function useMessageService(selectors) {
  const [event,setEvent] = React.useState(null);
  const [message,setMessage] = React.useState(null);
  useEffect(() => {
    const observable = subject.asObservable()
    observable.subscribe(setEvent);
    return ()=>observable.unsubscribe;
  },[])
  useEffect(() => {
    if(event&&(!selectors||selectors.includes(event['name'])))
       setMessage(event)
  },[event])
  const publish=(msg)=>{
       subject.next(msg)
  }

  return {message,publish}
}

