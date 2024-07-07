export interface ReportQueryResponseType {
  reportCount: number;
  status: string;
  reports: ReportType[];
}

export interface ReportType {
  id: number;
  description: string;
  date: string;
  link: null | string;
  duration: string;
  userId: string;
  isReportDeleted: boolean;
}

export interface CreateReportType {
  description: string;
  date: string;
  link: null | string;
  duration: string;
}

export interface ReportQueryType {
  id?: number;
  description?: string;
  date?: string;
  link?: null | string;
  duration?: string;
  userId?: string;
  isReportDeleted?: boolean;
  isAdmin?: boolean;
  limit?: number;
  page?: number;
  sortBy?: string;
  dateGreaterThen?: string;
  dateLessThen?: string;
  durationGreaterThan?: string;
  durationLessThan?: string;
  isDeleted?: true;
}

export interface ReportResponseType {
  status: string;
  report: ReportType;
}
