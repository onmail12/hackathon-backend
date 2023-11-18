import express from "express";
import { getConnection } from "./db.js";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";

let con = await getConnection();
const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

app.get("/laporan", async (req, res) => {
  const [data] = await con.query("SELECT * FROM laporan");
  res.json(data);
});

app.post("/laporan", async (req, res) => {
  const { name, email, notelp, address, jenis_limbah, img_name } = req.body;
  await con.query(
    "INSERT INTO laporan (nama, email, notelp, address, jenis_limbah, status, img_name) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      name,
      email,
      notelp,
      address,
      jenis_limbah,
      "Menunggu verifikasi",
      img_name,
    ]
  );
  res.json({ msg: "success" });
});

app.post("/upload", async (req, res) => {
  try {
    const { picture } = req.files;
    picture.mv(`img/${picture.name}`);

    res.json({ status: true });
  } catch (error) {
    console.error(error);
    res.json({ status: false });
  }
});

const server = app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${server.address().port}`);
});
