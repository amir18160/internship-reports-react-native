import { queryReportsDB } from "database/reportsDB";
import { useState } from "react";
import { ReportQueryType } from "types/ReportType";

type ResponseType = {
  status: "ok" | "error";
  message: string;
  data: any[];
  numOfDatas: number;
};

export const useReportSQlite = (options: ReportQueryType) => {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<ResponseType | null>(null);

  async function getReportsFromSqlite() {
    setIsPending(true);
    const result = await queryReportsDB(options);
    setIsPending(false);
    if (result.status !== "ok") {
      setIsError(true);
    } else {
      setIsSuccess(true);
      setData(result);
    }
  }

  return { getReportsFromSqlite, isPending, isError, isSuccess, data };
};
