export interface User {
  id: string;
  identificationNumber: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  isUserDeleted: boolean;
  isUserConfirmed: boolean;
  internStatus: "OFFICIAL" | "LEARNING";
  workingField: "MOBILE" | "WEB" | "SERVER" | "UNKNOWN" | "OTHER";
  internshipMentor: string;
}
