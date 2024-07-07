import { useState, useEffect } from "react";
import { queryReportsDB } from "database/reportsDB";
import { sumTimeStrings } from "utils/calculateSum";

import { getCurrentWeekRange, getPreviusWeekRange, last30Days } from "utils/dateTime";

export const useAccordionsData = () => {
  const currentWeekRange = getCurrentWeekRange();
  const previusWeekRange = getPreviusWeekRange();
  const last30DaysRange = last30Days();

  const [accordionsInfo, setAccordionsInfo] = useState([
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

  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const processAccordionsInfo = async (_accordionsInfo: any[]) => {
      setIsPending(true);
      setIsError(false);
      setIsSuccess(false);

      try {
        const AccordionsPromiseArray = _accordionsInfo.map(async (accordionData) => {
          const datas = await queryReportsDB({
            dateLessThen: accordionData.endDate,
            dateGreaterThen: accordionData.startDate,
          });

          accordionData.data = datas.data;

          const timeStringsArr = datas.data.map((data: any) => {
            return data.duration;
          });

          accordionData.sum = sumTimeStrings(timeStringsArr);
        });

        await Promise.all(AccordionsPromiseArray);
        setAccordionsInfo(accordionsInfo);
        setIsSuccess(true);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    processAccordionsInfo([...accordionsInfo]);
  }, [accordionsInfo]);

  return {
    isPending,
    isError,
    isSuccess,
    accordionsInfo,
  };
};
