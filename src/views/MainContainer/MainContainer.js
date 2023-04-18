/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../Layout/Layout';
import { userRoutes, adminRoutes, employeeRoutes } from '../../routes';
// import {
//   getCurrentUserProfileSaga,
// } from '../../store/actions';
import axiosMain from '../../http/axios/axios_main';
import SetTokenHeader from '../../hoc/SetTokenHeader/SetTokenHeader';
import { Loader } from '../../components';

const MainContainer = () => {
  const dispatch = useDispatch();
  const { userProfileData } = useSelector(state => state.profile);
  const { isUserInterestLoading } = useSelector(state => state.user);
  // const routes = (() => incompleteUserRoute)();
  const routes = (() =>
  userProfileData.personType === 'ADMIN' ? 
  adminRoutes : userProfileData.personType === 'EMPLOYEE' ? employeeRoutes : userRoutes)();
  const history = useHistory();
  const { pathname } = history.location;

  useEffect(() => {
    // dispatch(getCurrentUserProfileSaga());
  }, []);

  return !userProfileData ? (
    <Loader isFullLoader />
  ) : (
    <Layout>
      <Switch>
        {routes.map(route =>
          route.component ? (
            <Route key={route.name} path={route.path} exact={route.exact} name={route.name}>
              <route.component />
            </Route>
          ) : (
            route.redirectRoute && <Redirect key={route.name} to={route.path} />
          ),
        )}
      </Switch>
    </Layout>
  );
};

export default SetTokenHeader(MainContainer, axiosMain);
