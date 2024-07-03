export interface User {
  id: string;
  identificationNumber: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  isUserDeleted: boolean;
  isUserConfirmed: boolean;
}
