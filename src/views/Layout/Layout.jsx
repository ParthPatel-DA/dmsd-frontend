import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  logout,
} from '../../store/actions';
import axiosMain from '../../http/axios/axios_main';
import SetTokenHeader from '../../hoc/SetTokenHeader/SetTokenHeader';

const Layout = props => {
  const { children } = props;
  const dispatch = useDispatch();
  const { userProfileData } = useSelector(
    state => state.profile,
  );
  const history = useHistory();
  const { pathname } = history.location;
  const handleLogout = () => dispatch(logout());
  
  return (
    <>
      Layout

      {children}
    </>
  );
};

export default SetTokenHeader(Layout, axiosMain);
