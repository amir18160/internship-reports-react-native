import { ReportType } from "./ReportType";

export type RootStackParamList = {
  "welcome-screen": any;
  "login-screen": any;
  "register-screen": any;
  "bottom-navigation": any;
  "support-screen": any;
  "report-detail-screen": { report: ReportType };
  "add-report-screen": { todaysReport?: ReportType };
  "edit-profile-screen": any;
};

export type RootBottomTabParamList = {
  "home-screen": any;
  "history-screen": any;
  "profile-screen": any;
};
