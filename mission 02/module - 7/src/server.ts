import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_ewhBXpjrv17s@ep-frosty-boat-apd7iled-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20),
        password VARCHAR(20) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log("Table created successfully");
  } catch (error) {
    console.log(error);
  }
};

initDB();

app.get("/user", (req: Request, res: Response) => {
  //   res.send("Hello World......!");
  res.status(200).json({
    message: "Express Server",
    author: "next level",
  });
});

app.post("/", async (req: Request, res: Response) => {
  //   console.log(req.body);
  const { name, email, password } = req.body;
  console.log(name, email, password);
  res.status(201).json({
    message: "Created Successfully",
    data: { name, email },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
