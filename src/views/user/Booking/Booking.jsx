import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBookingSaga, getLocationSaga, getServiceSaga, getVehicleSaga
} from '../../../store/actions';
import AddBooking from './AddBooking';
import './index.css';

// eslint-disable-next-line no-unused-vars
const Booking = props => {
  const [openAddBooking, setOpenAddBooking] = useState(false)
  const { bookingList } = useSelector(
    state => state.booking,
  );
  const { userData } = useSelector(
    state => state.auth,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookingSaga({ id: userData.id }))
    dispatch(getVehicleSaga({ id: userData.id }))
    dispatch(getLocationSaga())
    dispatch(getServiceSaga())

  }, [])

  return (
    <>
      <div className="vehicle">
        <div className='vehicle-list'>
          <div className='vehicle-list-header'>
            <h2>Booking List</h2>
            <button type='button' onClick={() => setOpenAddBooking(true)}>Book Appointment</button>
          </div>
          <table width='100%' border={1}>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Location</th>
                <th>Service</th>
                <th>Appointment Date</th>
                <th>Total Charge</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            {
                bookingList ? bookingList.length === 0 ? (
                  <tr><td colSpan={6} className="text-center pt-5 pb-5">No data</td></tr> 
                ) : bookingList.map(item => (
                  <tr>
                    <td>{item.vehicleType}</td>
                    <td>{item.locationName}</td>
                    <td>{item.serviceName}</td>
                    <td>{item.appointmentDate}</td>
                    <td>${item.total_charge}</td>
                    <td>{item.status}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={6} className="text-center pt-5 pb-5">Loading...</td></tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
      {openAddBooking && <AddBooking modalOpenClose={setOpenAddBooking} />}
    </>
  );
};

export default Booking;
