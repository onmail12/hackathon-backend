import { createConnection } from "mysql2/promise";

export const getConnection = async () => {
  return await createConnection({
    host: "localhost",
    user: "root",
    database: "kupeduli",
  });
};