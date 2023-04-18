/* eslint-disable no-unused-vars */
import { put, call } from 'redux-saga/effects';
import {
  loginSuccess,
  loginFail,
  loginStart,
  signupSuccess,
  signupFail,
  signupStart,
  logout,
  logoutStart,
  logoutSuccess,
  resetApp,
  getUserDetailStart,
  getUserDetailSuccess,
  getCurrentUserDetailSuccess,
  getUserDetailFail,
  getCurrentUserDetailFail,
  editUserDetailStart,
} from '../../actions';
import { errorHandler } from '../../../utils';

export function* loginSaga(action) {
  yield put(loginStart());
  const { requestBody, setIsSubmitted } = action.payload;
  yield errorHandler({
    endpoint: `/customers/login`,
    successHandler: yield function* (response) {
      if (response.data.person.token) {
        yield call([localStorage, 'setItem'], 'authToken', response.data.person.token);
        // yield call([localStorage, 'setItem'], 'userid', response.data._id);
      }
      const data = response.data.person !== undefined ? response.data.person : response.data;
      setIsSubmitted(false);
      yield put(
        loginSuccess({
          token: response.data.token,
          ...data,
          // ...response.data,
          // ...response.data.userData,
        }),
      );
    },
    failHandler: yield function* (response) {
      yield put(loginFail(response));
      setIsSubmitted(false);
    },
    failHandlerType: 'CUSTOM',
    payload: requestBody,
    apiType: 'post',
  });
  // yield call([localStorage, 'setItem'], 'authToken', true);
  // yield call([localStorage, 'setItem'], 'userid', true);
}

export function* signupSaga(action) {
  yield put(signupStart());
  const { data, setPhoneVerificationModal, closeModel, setIsSubmitted } = action.payload;
  yield errorHandler({
    endpoint: `/users/signup`,
    successHandler: yield function* (response) {
      // if (data.loginType === 'manual') {
      yield put(signupSuccess(response.data));
      closeModel();
      setPhoneVerificationModal(true);
      // modalHandler(true);
      // } else {
      //   yield call([localStorage, 'setItem'], 'authToken', response.data.token);
      //   yield call([localStorage, 'setItem'], 'userid', response.data._id);
      //   yield put(loginSuccess(response.data));
      // }
    },
    failHandler: yield function* (response) {
      yield put(signupFail(response));
      setIsSubmitted(false);
    },
    failHandlerType: 'CUSTOM',
    payload: data,
    apiType: 'post',
  });
}

export function* logoutSaga(action) {
  yield put(logoutStart());
  yield call([localStorage, 'clear']);
  yield put(resetApp());
  yield put(logoutSuccess());
}

// eslint-disable-next-line no-unused-vars
export function* authenticationValidatorSaga(action) {
  yield put(loginStart());
  const token = yield localStorage.getItem('authToken');
  if (!token) {
    yield put(logout({ fromAuth: true }));
  } else {
    // yield put(
    //   getUserDetailSagaAction({
    //     data: { token },
    //     isCurrentUser: true,
    //   }),
    // );
    yield put(loginSuccess({ token }));
  }
}

export function* getUserDetailSaga(action) {
  yield put(getUserDetailStart());
  const { data, isCurrentUser } = action.payload;
  yield errorHandler({
    endpoint: `/users/details/${data.id}`,
    successHandler: yield function* (response) {
      if (isCurrentUser) {
        yield put(getCurrentUserDetailSuccess(response.data));
      } else {
        yield put(getUserDetailSuccess(response.data));
      }
    },
    failHandler: isCurrentUser ? getCurrentUserDetailFail : getUserDetailFail,
    apiType: 'get',
    token: data.token ? data.token : '',
  });
}

export function* editUserDetailSaga(action) {
  yield put(editUserDetailStart());
  const { data, closeModel } = action.payload;
  // yield errorHandler({
  //   endpoint: `/users`,
  //   successHandler: yield function* (response) {
  //     yield put(editUserDetailSuccess(response.data));
  if (data.token) {
    yield call([localStorage, 'setItem'], 'authToken', data.token);
  }
  yield put(loginSuccess(data));
  closeModel();

  //   },
  //   failHandler: editUserDetailFail,
  //   apiType: 'put',
  //   payload: data,
  // });
}