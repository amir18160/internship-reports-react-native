import { useState, useEffect } from "react";
import { sumTimeStrings } from "utils/calculateSum";

import { getCurrentWeekRange, getPreviusWeekRange, last30Days } from "utils/dateTime";
import { useReport } from "./useReport";
import { ReportType } from "types/ReportType";

type AccordionsInfoType = {
  title: string;
  sum: string;
  startDate: string;
  endDate: string;
  data: ReportType[];
};

export const useAccordionsData = () => {
  const currentWeekRange = getCurrentWeekRange();
  const previusWeekRange = getPreviusWeekRange();
  const last30DaysRange = last30Days();

  const [isPending, setIsPending] = useState(true);
  const [accordionsInfo, setAccordionsInfo] = useState<AccordionsInfoType[]>([
    {
      title: "هفته کنونی",
      sum: "0",
      startDate: currentWeekRange[0],
      endDate: currentWeekRange[1],
      data: [],
    },
    {
      title: "هفته قبل",
      sum: "0",
      startDate: previusWeekRange[0],
      endDate: previusWeekRange[1],
      data: [],
    },
    {
      title: "سی روز اخیر",
      sum: "0",
      startDate: last30DaysRange[0],
      endDate: last30DaysRange[1],
      data: [],
    },
  ]);

  const {
    data,
    error,
    isError,
    isPending: isQueryPending,
    isSuccess,
    performMutation,
  } = useReport("QUERY_REPORT");

  useEffect(function () {
    performMutation({});
  }, []);

  useEffect(
    function () {
      console.info("---------------------------------------");

      console.log(data);
      if (!data || !data.reports) return;

      data.reports.map((report: ReportType) => {
        for (let index = 0; index < accordionsInfo.length; index++) {
          if (
            report.date < accordionsInfo[index].endDate &&
            report.date > accordionsInfo[index].startDate
          ) {
            accordionsInfo[index].data.push(report);
          }
        }
      });
    },
    [data, accordionsInfo],
  );

  useEffect(() => {
    if (!data) return;

    const processAccordionsInfo = (_accordionsInfo: any[]) => {
      _accordionsInfo.map((accordionData) => {
        const timeStringsArr = accordionData.data.map((_data: any) => {
          return _data.duration;
        });

        accordionData.sum = sumTimeStrings(timeStringsArr);
      });

      setAccordionsInfo(accordionsInfo);
    };

    processAccordionsInfo([...accordionsInfo]);
    setIsPending(false);
  }, [accordionsInfo, data]);

  return {
    isPending,
    isError,
    isSuccess,
    accordionsInfo,
  };
};
