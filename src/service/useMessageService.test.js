
import { renderHook, act } from '@testing-library/react-hooks'
import useMessageService from './useMessageService'
describe('Test Message Service', () => {
    test('publish and handle', () => {
        // const selectors=["t1","t2","t3"]
        // const service1= renderHook(() => useMessageService(selectors));
        // const service2= renderHook(() => useMessageService(selectors));

        //  act(()=>{
        //     service1['result'].current.publish({name:"t1",data:{id:1,firstName:"kevin",lastName:"qiao"}});
        //     console.log(service2.message)
        //  })
    }),   
     test('selector', () => {

        // const handle1=(msg)=>{
        //     expect(msg['data']['id']).toBe(1);
        // }
        // const handle2=(msg)=>{
        //     expect(msg['data']['id']).toBe(1);
        // }
        // const service1= renderHook(() => useMessageService(['t1'],handle1));
        // const service2 = renderHook(() => useMessageService(['t2'],handle2));
        //  act(()=>{
        //     service1['result'].current.publish({name:"t1",data:{id:1,firstName:"kevin",lastName:"qiao"}})
        //  })
    })
})