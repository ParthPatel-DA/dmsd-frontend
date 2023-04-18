import React from 'react';

export const guestRoutes = [
  {
    path: '/',
    name: 'Signin',
    exact: true,
    component: React.lazy(() => import('../../views/auth/Login/index')),
  },
  {
    redirectRoute: true,
    name: 'Login',
    path: '/',
  },
];

export const userRoutes = [
  {
    path: '/home',
    name: 'Home',
    exact: true,
    component: React.lazy(() => import('../../views/user/Home/Home')),
  },
  {
    redirectRoute: true,
    name: 'feedRedirect',
    path: '/home',
    // rootRedirect: true,
  },
];

export const adminRoutes = [
  {
    path: '/home',
    name: 'Home',
    exact: true,
    component: React.lazy(() => import('../../views/admin/Home/Home')),
  },
  {
    redirectRoute: true,
    name: 'feedRedirect',
    path: '/home',
    // rootRedirect: true,
  },
];

export const employeeRoutes = [
  {
    path: '/home',
    name: 'Home',
    exact: true,
    component: React.lazy(() => import('../../views/employee/Home/Home')),
  },
  {
    redirectRoute: true,
    name: 'feedRedirect',
    path: '/home',
    // rootRedirect: true,
  },
];
