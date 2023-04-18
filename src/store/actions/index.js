export * from './auth/auth';
export * from './modal/modal';
export * from './profile/profile';
export const resetApp = payload => ({
  type: 'RESET_APP',
  payload,
});
