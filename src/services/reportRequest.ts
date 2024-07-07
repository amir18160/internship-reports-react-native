import axios, { AxiosResponse } from "axios";

// routes
import { createReportUrl, queryRerportUrl, deleteReportUrl } from "./apiRoutes";

// types
import {
  CreateReportType,
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
  data: CreateReportType,
): Promise<ReportResponseType> => {
  // FIXME: url is not valid!!!!!!!!!!!!1111
  const res: AxiosResponse = await axios.post<ReportResponseType>(createReportUrl, data);
  return res.data;
};

export const deleteReport = async () => {
  const res: AxiosResponse = await axios.post(deleteReportUrl);
  return res.data;
};
