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
    // const user = new User()
    // user.nome = "Timber"
    // user.sobrenome = "Saw"
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")

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
