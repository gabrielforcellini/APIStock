import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { conn } from './db/conn';
// Api routes
import userRouter from './routes/userRoutes';
import supplierRouter from './routes/supplierRoutes';
import productRouter from './routes/productRoutes';
import categoryRouter from './routes/categoryRoutes';
import establishmentRouter from './routes/establishmentRoutes';
import addressRouter from "./routes/addressRoutes";
import stockRouter from "./routes/stockRoutes";
import stockProductRouter from "./routes/stockProductRoutes";
import preferencesRouter from './routes/preferencesRoutes';
import supplierProductRouter from "./routes/supplierProductRoutes";

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

app.use("/category", categoryRouter);

app.use("/address", addressRouter);

app.use("/stock", stockRouter);

app.use("/stock-product", stockProductRouter);

app.use("/supplier-product", supplierProductRouter)

app.use("/preferences", preferencesRouter);

app.listen(api_port);
console.log(`API listening on port ${api_port}`);

// Database connection
conn();