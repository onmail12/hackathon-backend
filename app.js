import express from "express";
import { getConnection } from "./db.js";

let con = await getConnection();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.get("/laporan", async (req, res) => {
  const [data] = await con.query("SELECT * FROM laporan");
  res.json(data);
});

app.post("/laporan", async (req, res) => {
  console.log(req.body);
  const { name, email, address, jenisLimbah } = req.body;
  await con.query(
    "INSERT INTO laporan (nama, email, address, jenis_limbah) VALUES (?,?,?,?)",
    [name, email, address, jenisLimbah]
  );
  res.json({ msg: "success" });
});

const server = app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${server.address().port}`);
});
