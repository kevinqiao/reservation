
import React from 'react';
import '@testing-library/jest-dom'
import useReservationService from "./useReservationService";
import reservations from "./MockData.json";

test("findAll function", async () => {
    let useContextMock = React.useContext = jest.fn();
    useContextMock.mockReturnValue(reservations);
    const service=  useReservationService();
    const result = await  service.findAll();
    expect(result.length).toBe(2);      
   
});
test("searchReservation function", async () => {
    let useContextMock = React.useContext = jest.fn();
    useContextMock.mockReturnValue(reservations);
    const service=  useReservationService();
    const result = await  service.searchReservations("kevin")
    expect(result.length).toBe(2);      
   
});

test("confirm function", async () => {
    let useContextMock = React.useContext = jest.fn();
    useContextMock.mockReturnValue(reservations);
    const service=  useReservationService();
    const beforeConfirm = await service.findReservation("1");
    expect(beforeConfirm['confirm']).toBe(false)
    await service.confirm("1");
    const afterConfirm = await service.findReservation("1");
    expect(beforeConfirm['confirm']).toBe(true);

});

test("updateReservation function", async () => {
    let useContextMock = React.useContext = jest.fn();
    useContextMock.mockReturnValue(reservations);
    const service=  useReservationService();
    const beforeUpdate = await service.findReservation("1");
    expect(beforeUpdate['firstName']).toBe("Kevin")
    expect(beforeUpdate['lastName']).toBe("Qiao")
    await service.updateReservation({id:"1",firstName:"first",lastName:"last"});
    const afterUpdate = await service.findReservation("1");
    expect(afterUpdate['firstName']).toBe("first");
    expect(afterUpdate['lastName']).toBe("last");

    // check all properties in real project
});
test("createReservation function",async () => {
    let useContextMock = React.useContext = jest.fn();
    useContextMock.mockReturnValue(reservations);
    const service=  useReservationService();
    const beforeAll = await service.findAll();
    const beforeLength = beforeAll.length;
    await service.createReservation({id:3,firstName:"test",lastName:"test"});
    const afterAll = await service.findAll();
    expect(afterAll.length).toBe(beforeLength+1)

});
test("removeReservation function",async () => {
    let useContextMock = React.useContext = jest.fn();
    useContextMock.mockReturnValue(reservations);
    const service=  useReservationService();
    const beforeAll = await service.findAll();
    const beforeLength = beforeAll.length;
    await service.removeReservation("2");
    const afterAll = await service.findAll();
    expect(afterAll.length).toBe(beforeLength-1)
});