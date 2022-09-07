

import{ useEffect} from "react";
import { Subject } from 'rxjs';

const subject = new Subject();

export const messageService = {
    sendMessage: message => subject.next(message),
    clearMessages: () => subject.next(),
    onMessage: () => subject.asObservable()
};
export default function useMessageService(selectors,handle) {
 
  useEffect(() => {
  
    const subscription = messageService.onMessage().subscribe(msg => {
           if(handle&&selectors.includes(msg['name']))
               handle(msg);
    });

    return subscription.unsubscribe;
  }, [])
  const publish=(msg)=>{
      messageService.sendMessage(msg);
  }
  return {publish}
}

