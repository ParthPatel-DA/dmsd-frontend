import * as actionLabels from '../../actionLabels';

export const getBookingStart = () => ({
  type: actionLabels.GET_BOOKING_START,
});

export const getBookingSaga = payload => ({
  type: actionLabels.GET_BOOKING_SAGA,
  payload,
});

export const getBookingSuccess = payload => ({
  type: actionLabels.GET_BOOKING_SUCCESS,
  payload,
});

export const getBookingFail = payload => ({
  type: actionLabels.GET_BOOKING_FAIL,
  payload,
});

export const addBookingStart = () => ({
  type: actionLabels.ADD_BOOKING_START,
});

export const addBookingSaga = payload => ({
  type: actionLabels.ADD_BOOKING_SAGA,
  payload,
});

export const addBookingSuccess = payload => ({
  type: actionLabels.ADD_BOOKING_SUCCESS,
  payload,
});

export const addBookingFail = payload => ({
  type: actionLabels.ADD_BOOKING_FAIL,
  payload,
});

export const editBookingStart = () => ({
  type: actionLabels.EDIT_BOOKING_START,
});

export const editBookingSaga = payload => ({
  type: actionLabels.EDIT_BOOKING_SAGA,
  payload,
});

export const editBookingSuccess = payload => ({
  type: actionLabels.EDIT_BOOKING_SUCCESS,
  payload,
});

export const editBookingFail = payload => ({
  type: actionLabels.EDIT_BOOKING_FAIL,
  payload,
});

export const collectPaymentStart = () => ({
  type: actionLabels.COLLECT_PAYMENT_START,
});

export const collectPaymentSaga = payload => ({
  type: actionLabels.COLLECT_PAYMENT_SAGA,
  payload,
});

export const collectPaymentSuccess = payload => ({
  type: actionLabels.COLLECT_PAYMENT_SUCCESS,
  payload,
});

export const collectPaymentFail = payload => ({
  type: actionLabels.COLLECT_PAYMENT_FAIL,
  payload,
});
