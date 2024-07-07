import { useMutation, MutationFunction } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  addNewReport,
  queryReport,
  deleteReport,
  updateReport,
} from "services/reportRequest";
import { ErrorResponseType } from "types/ErrorResponseType";
import {
  CreateReportType,
  ReportQueryResponseType,
  ReportQueryType,
  ReportResponseType,
} from "types/ReportType";

type ActionType = "ADD_REPORT" | "QUERY_REPORT" | "UPDATE_REPORT" | "DELETE_REPORT";
type ExpectedResponseType = ReportQueryResponseType | ReportResponseType;

type MutationFnType = MutationFunction<
  ExpectedResponseType,
  CreateReportType | ReportQueryType
>;

export function useReport(action: ActionType) {
  let mutationFn: MutationFnType;

  switch (action) {
    case "ADD_REPORT":
      mutationFn = addNewReport as MutationFnType;
      break;

    case "QUERY_REPORT":
      mutationFn = queryReport as MutationFnType;
      break;

    case "UPDATE_REPORT":
      mutationFn = updateReport as MutationFnType;
      break;

    case "DELETE_REPORT":
      mutationFn = deleteReport as MutationFnType;
      break;

    default:
      throw new Error(`Unsupported action: ${action}`);
  }

  const { mutate, data, isError, isSuccess, isPending, error } = useMutation<
    any,
    AxiosError<ErrorResponseType>,
    CreateReportType | ReportQueryType
  >({
    mutationFn,
  });

  function performMutation(_data: CreateReportType | ReportQueryType) {
    mutate(_data);
  }

  return { performMutation, data, isError, isSuccess, isPending, error };
}
