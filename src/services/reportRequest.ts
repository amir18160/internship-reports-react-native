import axios, { AxiosResponse } from "axios";

// routes
import {
  createReportUrl,
  queryRerportUrl,
  deleteReportUrl,
  updateReportUrl,
} from "./apiRoutes";

// types
import {
  CreateReportType,
  UpdateReportType,
  ReportQueryResponseType,
  ReportQueryType,
  ReportResponseType,
} from "types/ReportType";

export const queryReport = async (
  data: ReportQueryType,
): Promise<ReportQueryResponseType> => {
  const res: AxiosResponse = await axios.get<ReportQueryResponseType>(queryRerportUrl, {
    params: data,
  });
  return res.data;
};

export const addNewReport = async ({
  date,
  description,
  duration,
  link,
}: CreateReportType): Promise<ReportResponseType> => {
  const cleanObject: any = { description, duration };
  if (link) {
    cleanObject.link = link;
  }

  const res: AxiosResponse = await axios.post<ReportResponseType>(
    createReportUrl,
    cleanObject,
  );
  return res.data;
};

export const updateReport = async (
  data: UpdateReportType,
): Promise<ReportResponseType> => {
  const res: AxiosResponse = await axios.patch<ReportResponseType>(updateReportUrl, data);
  return res.data;
};

export const deleteReport = async () => {
  const res: AxiosResponse = await axios.post(deleteReportUrl);
  return res.data;
};
