import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVehicleSaga } from '../../../store/actions';
import AddVehicle from './AddVehicle';
import './index.css';

// eslint-disable-next-line no-unused-vars
const Vehicle = props => {
  const [openAddVehicle, setOpenAddVehicle] = useState(false)
  const { vehicleList } = useSelector(
    state => state.vehicle,
  );
  const { userData } = useSelector(
    state => state.auth,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVehicleSaga({ id: userData.id }))
  }, [])

  return (
    <>
      <div className="vehicle">
        <div className='vehicle-list'>
          <div className='vehicle-list-header'>
            <h2>Vehicle List</h2>
            <button type='button' onClick={() => setOpenAddVehicle(true)}>Add Vehicle</button>
          </div>
          <table width='100%' border={1}>
            <thead>
              <tr>
                <th>Vehicle Model</th>
                <th>Vehicle Type</th>
                <th>Manufacture</th>
                <th>Color</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {
                vehicleList ? vehicleList.length === 0 ? (
                  <tr><td colSpan={5} className="text-center pt-5 pb-5">No data</td></tr> 
                ) : vehicleList.map(item => (
                  <tr>
                    <td>{item.vehicleModel}</td>
                    <td>{item.vehicleType}</td>
                    <td>{item.vehicleManufacturer}</td>
                    <td>{item.vehicleColor}</td>
                    <td>{item.vehicleYear}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={5} className="text-center pt-5 pb-5">Loading...</td></tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
      {openAddVehicle && <AddVehicle modalOpenClose={setOpenAddVehicle} />}
    </>
  );
};

export default Vehicle;
