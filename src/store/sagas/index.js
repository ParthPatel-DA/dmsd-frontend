import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import * as actionLabels from '../actionLabels';
import {
  loginSaga,
  logoutSaga,
  authenticationValidatorSaga,
  signupSaga,
  getUserDetailSaga,
  editUserDetailSaga,
} from './auth/auth';
import {
  editProfileSaga,
  getProfileSaga,
} from './profile/profile';

export function* watchAuthentication() {
  yield all([
    takeLatest(actionLabels.LOGIN_SAGA, loginSaga),
    takeLatest(actionLabels.SIGNUP_SAGA, signupSaga),
    takeLatest(actionLabels.AUTHENTICATION_VALIDATOR, authenticationValidatorSaga),
    takeLatest(actionLabels.LOGOUT_SAGA, logoutSaga),
    takeLatest(actionLabels.GET_USER_DETAIL_SAGA, getUserDetailSaga),
    takeLatest(actionLabels.EDIT_USER_DETAIL_SAGA, editUserDetailSaga),
  ]);
}

export function* watchProfile() {
  yield all([
    takeLatest(actionLabels.GET_PROFILE_SAGA, getProfileSaga),
    takeEvery(actionLabels.EDIT_PROFILE_SAGA, editProfileSaga),
  ]);
}