import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
// Api routes
import userRouter from './routes/userRoutes';

const app = express();

dotenv.config();
const { api_port } = process.env;

AppDataSource.initialize().then(async () => {

    console.log("Conectado ao banco");

    app.use(
        express.urlencoded({ extended: true })
    );

    app.use(express.json());

    // Solve cors
    app.use(cors());

    app.get("/", (req: Request, res: Response) => {
        res.json({ message: "API para Projeto Integrador I" });
    });

    app.use("/user", userRouter);

    app.listen(api_port);
    console.log(`API escutando na porta ${api_port}`);

}).catch(error => console.log(error))
