const userRouteBase="/auth";
export const environment = {
  production: true,
  apiUrlBasePath: 'https://baseappapi.azurewebsites.net/api',
  getUsers: `${userRouteBase}/users`,
  getUser: `${userRouteBase}/user`,
  postUser: `${userRouteBase}/user`,
  editUser: `${userRouteBase}/user`,
  deleteUser: `${userRouteBase}/user`,
  registerUser: `${userRouteBase}/register`,
  checkEmailExists: `${userRouteBase}/checkEmailExists`,
  checkUserNameExists: `${userRouteBase}/checkUserNameExists`,
};
