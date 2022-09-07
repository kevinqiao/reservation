import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ReservationSearch from "./ReservationSearch";
import reservations from "./reservations.json";
describe("SearchForm", () => {
    test('Testing Reservation Search View Component', () => {
        // ARRANGE
        render(<ReservationSearch />)
    })
})