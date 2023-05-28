import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
// Api routes
import userRouter from './routes/userRoutes';
import supplierRouter from './routes/supplierRoutes';
import productRouter from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import establishmentRouter from './routes/establishmentRoutes';
import { conn } from './db/conn';
import addressRouter from "./routes/addressRoutes";

const app = express();

dotenv.config();
const { api_port } = process.env;

app.use(
    express.urlencoded({ extended: true })
);

app.use(express.json());

// Solve cors
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "API to Projeto Integrador I" });
});

app.use("/user", userRouter);

app.use("/supplier", supplierRouter);

app.use("/product", productRouter);

app.use("/establishment", establishmentRouter);

app.use("/category", categoryRoutes);

app.use("/address", addressRouter);

app.listen(api_port);
console.log(`API listening on port ${api_port}`);

// Database connection
conn();