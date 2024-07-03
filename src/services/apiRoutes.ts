import URL from "constants/apiUrl";

// auth
export const loginUrl: string = `${URL}/auth/login/pass`; //* post
export const registerUrl: string = `${URL}/auth/register`; //* post
export const logoutUrl: string = `${URL}/auth/logout`; //* post

// user
export const userInfoUrl: string = `${URL}/users/latest-user-update`; //* get
export const queryUserUrl: string = `${URL}api/users`; // accept query //* get
export const updateUserUrl: string = `${URL}api/users`; // accept params  //* post

// report
export const queryRerportUrl: string = `${URL}api/report`; // accept all kind of query //* get
export const createReportUrl: string = `${URL}api/report`; // accept body //* post
export const deleteReportUrl: string = `${URL}api/report`; // accept params //* delete
