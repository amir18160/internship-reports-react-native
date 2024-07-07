import * as SQLite from "expo-sqlite";
import { ReportQueryType, ReportType } from "types/ReportType";

// types
type QueryResponseType = {
  status: "ok" | "error";
  message: string;
  data: any[];
  numOfDatas: number;
};

type InsertResType = {
  status: string;
  message: string;
  data: any;
};

export const dbInitialization = async () => {
  const db = await SQLite.openDatabaseAsync("reportsDatabase");
  const response = { status: "ok", message: "Database initialized" };

  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS report (
        id INTEGER PRIMARY KEY,
        description TEXT NOT NULL,
        date TEXT NOT NULL DEFAULT (datetime('now')),
        link TEXT,
        duration TEXT NOT NULL,
        userId TEXT NOT NULL,
        isReportDeleted INTEGER NOT NULL DEFAULT 0
        );
        `);
  } catch (error: any) {
    response.message = "Error initializing database: " + error.message;
    response.status = "error";
  }

  return response;
};

export const queryReportsDB = async (queries: ReportQueryType) => {
  const db = await SQLite.openDatabaseAsync("reportsDatabase");
  const {
    duration,
    limit = 1000,
    page = 1,
    date,
    userId,
    sortBy,
    dateGreaterThen,
    dateLessThen,
    durationGreaterThan,
    durationLessThan,
    isReportDeleted = false,
    id,
  } = queries;

  const whereClauses = [];

  if (userId) {
    whereClauses.push(`userId = '${userId}'`);
  }

  if (id) {
    whereClauses.push(`id = '${id}'`);
  }

  if (duration) {
    whereClauses.push(`duration = '${duration}'`);
  }

  if (date) {
    whereClauses.push(`date = '${date}'`);
  }

  if (isReportDeleted) {
    whereClauses.push(`isReportDeleted = ${isReportDeleted}`);
  }

  if (dateGreaterThen) {
    whereClauses.push(`date >= '${dateGreaterThen}' `);
  }

  if (dateLessThen) {
    whereClauses.push(`date <= '${dateLessThen}'`);
  }

  if (durationGreaterThan) {
    whereClauses.push(`duration >= '${durationGreaterThan}' `);
  }

  if (durationLessThan) {
    whereClauses.push(`duration <= '${durationLessThan}'`);
  }

  const where = whereClauses.length > 0 ? "WHERE " + whereClauses.join(" AND ") : "";
  const orderBy = sortBy ? `ORDER BY ${sortBy} ASC` : "";
  const limitC = `LIMIT ${limit} OFFSET ${(page - 1) * limit}`;

  const query = `SELECT * FROM report ${where} ${orderBy} ${limitC}`;

  const response: QueryResponseType = {
    status: "ok",
    message: "data fetched successfully",
    data: [],
    numOfDatas: 0,
  };

  let queryResponse;
  try {
    queryResponse = await db.getAllAsync(query);
    response.data = queryResponse;
    response.numOfDatas = queryResponse.length;
  } catch (err) {
    response.status = "error";
    response.message = "Error fetching data: " + err;
  }

  return response;
};

export const insertReport = async (report: ReportType) => {
  const db = await SQLite.openDatabaseAsync("reportsDatabase");
  const response: InsertResType = {
    status: "ok",
    message: "data inserted successfully",
    data: null,
  };

  const { id, description, date, link, duration, userId } = report;

  const query = `INSERT INTO report (id, description, date, link, duration, userId) VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [id, description, date, link, duration, userId];

  try {
    const writeResult = await db.runAsync(query, params);
    response.data = writeResult;
  } catch (err) {
    response.status = "error";
    response.message = "Error inserting data: " + err;
  }

  return response;
};

export const clearReportTable = async function () {
  const db = SQLite.openDatabaseSync("reportsDatabase");
  const response = { status: "ok", message: "Report table cleaned successfully." };
  const query = "DELETE FROM report";

  try {
    await db.execAsync(query);
  } catch (error) {
    response.status = "fail";
    response.status = "error cleaning database.";
  }

  return response;
};
