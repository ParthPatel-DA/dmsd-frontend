/* eslint-disable no-unused-vars */
import { put } from 'redux-saga/effects';

import {
  getBookingStart,
  getBookingSuccess,
  getBookingFail,
  getBookingSaga as getBookingSagaAction,
  editBookingStart,
  editBookingSuccess,
  editBookingFail,
  addBookingStart,
  addBookingSuccess,
  addBookingFail,
  collectPaymentStart,
  collectPaymentSuccess,
  collectPaymentFail,
} from '../../actions';
import { errorHandler } from '../../../utils';

export function* getBookingSaga(action) {
  yield put(getBookingStart());
  // const response = {
  //   data: [
  //     {
  //       vehicleId: 1,
  //       vehicleModel: "Test Model",
  //       vehicleType: "Test Type",
  //       manufacture: "Test manufacture",
  //       color: "Red",
  //       year: 2001
  //     },
  //     {
  //       vehicleId: 2,
  //       vehicleModel: "Test Model 1",
  //       vehicleType: "Test Type 1",
  //       manufacture: "Test manufacture 1",
  //       color: "Red 1",
  //       year: 2002
  //     },
  //     {
  //       vehicleId: 3,
  //       vehicleModel: "Test Model 2",
  //       vehicleType: "Test Type 2",
  //       manufacture: "Test manufacture 2",
  //       color: "Red 2",
  //       year: 2002
  //     }
  //   ]
  // }
  const id = action.payload ? action.payload.id : null;
  yield errorHandler({
    endpoint: id
      ? `/appointments/cust/${id}`
      : action.payload && action.payload.loc
      ? `/appointments/loc/${action.payload.loc}`
      : `/appointments/all`,
    successHandler: yield function* (response) {
      yield put(getBookingSuccess(response.data));
    },
    failHandler: getBookingFail,
    apiType: 'get',
  });
}

export function* addBookingSaga(action) {
  yield put(addBookingStart());
  const { data, setIsSubmitted, closeModel } = action.payload;
  yield errorHandler({
    endpoint: `/appointments`,
    successHandler: yield function* (response) {
      yield put(addBookingSuccess({ data }));
      if (setIsSubmitted) {
        setIsSubmitted(false);
        closeModel();
        yield put(getBookingSagaAction({ id: data.customerId }));
      }
    },
    failHandler: yield function* (response) {
      yield put(addBookingFail(response));
      setIsSubmitted(false);
    },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
    payload: data,
  });
}

export function* editBookingSaga(action) {
  yield put(editBookingStart());
  const { data, setIsSubmitted, isStatus = false } = action.payload;
  yield errorHandler({
    endpoint: isStatus ? `/appointments/status/${data.id}` : `/appointments/${data.id}`,
    successHandler: yield function* (response) {
      yield put(editBookingSuccess({ data }));
      if (setIsSubmitted) {
        setIsSubmitted(false);
      }
      window.location.reload();
    },
    failHandler: yield function* (response) {
      yield put(editBookingFail(response));
      if (setIsSubmitted) {
        setIsSubmitted(false);
      }
    },
    failHandlerType: 'CUSTOM',
    apiType: 'put',
    payload: data,
  });
}

export function* collectPaymentSaga(action) {
  yield put(collectPaymentStart());
  const { data, setIsSubmitted } = action.payload;
  yield errorHandler({
    endpoint: `/appointments/Upmcc/${data.id}`,
    successHandler: yield function* (response) {
      yield put(collectPaymentSuccess({ data }));
      if (setIsSubmitted) {
        setIsSubmitted(false);
      }
      window.location.reload();
    },
    failHandler: yield function* (response) {
      yield put(collectPaymentFail(response));
      if (setIsSubmitted) {
        setIsSubmitted(false);
      }
    },
    failHandlerType: 'CUSTOM',
    apiType: 'put',
    payload: data,
  });
}
