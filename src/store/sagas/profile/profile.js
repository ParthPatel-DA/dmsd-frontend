import { put, call } from 'redux-saga/effects';

import {
  getProfileStart,
  getProfileSuccess,
  getProfileFail,
  // getCurrentUserProfileSaga as getCurrentUserProfileSagaAction,
  editProfileStart,
  editProfileSuccess,
  editProfileFail,
  showModal,
  logout,
} from '../../actions';
import { errorHandler } from '../../../utils';

export function* getProfileSaga(action) {
  yield put(getProfileStart());
  const id = action.payload ? action.payload.id : null;
  yield errorHandler({
    endpoint: `/users/getUserProfile/${id || ''}`,
    successHandler: yield function* (response) {
      yield put(getProfileSuccess(response.data));
    },
    failHandler: getProfileFail,
    apiType: 'get',
  });
}

export function* editProfileSaga(action) {
  yield put(editProfileStart());
  const {
    data,
    hideSuccessPopup,
    setIsSubmitted,
    setEditProfile,
    setUpdateProfileRequestHandler,
    key,
    closeModel,
  } = action.payload;
  yield errorHandler({
    endpoint: `/users/updateUserProfile`,
    successHandler: yield function* (response) {
      if (data.phoneNumber) {
        yield put(logout({ logoutType: 'manual' }));
      } else {
        yield put(editProfileSuccess({ data, key }));
        if (!hideSuccessPopup) {
          yield put(
            showModal({
              title: 'Edit Profile',
              open: true,
              notifyType: 2,
              message: response.msg,
            }),
          );
        }
        if (setEditProfile) {
          setEditProfile(false);
        }
        if (setIsSubmitted) {
          setIsSubmitted(false);
        }
      }
      // if (!key) {
      //   yield put(getCurrentUserProfileSagaAction());
      // }
      if (closeModel) {
        closeModel();
      }
    },
    failHandler: yield function* (response) {
      yield put(editProfileFail(response));
      setIsSubmitted(false);
    },
    failHandlerType: 'CUSTOM',
    apiType: 'post',
    payload: data,
  });

  if (setUpdateProfileRequestHandler) {
    setUpdateProfileRequestHandler(key, 'REMOVE');
  }
}