import { ReportQueryResponseType } from "types/ReportType";
import { useReport } from "./useReport";
import {
  dbInitialization as sqliteDbInit,
  insertReport,
  clearReportTable,
} from "database/reportsDB";
import { useEffect } from "react";

export function useSQlite() {
  const { data, isError, error, isPending, isSuccess, performMutation } =
    useReport("QUERY_REPORT");

  async function DBInitialization() {
    const { message: messageInit, status: statusInit } = await sqliteDbInit();
    const { message: messageClear, status: statusClear } = await clearReportTable();

    if (statusInit === "ok" && statusClear === "ok") {
      console.info(`db inistialization: ${messageInit} | status: ${statusInit}`);
      console.info(`db inistialization: ${messageClear} | status: ${statusClear}`);
    } else {
      console.log("error: ", messageInit);
      return;
    }

    performMutation({});
  }

  useEffect(
    function () {
      if (!isSuccess || !data) return;

      const responseData: ReportQueryResponseType = data;

      // require some error handling

      responseData.reports.map(async (_report) => {
        const { message, status } = await insertReport(_report);
        if (status === "error") {
          console.error("error: ", message);
          return;
        }
      });

      console.info("db inistialization: report table was inserted| status: ok");
    },
    [data, isSuccess],
  );

  return { data, isError, error, isPending, isSuccess, DBInitialization };
}
