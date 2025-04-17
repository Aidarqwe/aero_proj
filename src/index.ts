import * as dotenv from "dotenv";
dotenv.config();
import * as express from "express";
import * as http from "http";
import { Express } from "express";
import * as cors from "cors";
import * as path from "node:path";
import * as cookieParser from 'cookie-parser';
import sequelize from "./db";
import authRoutes from "./routes/auth-router";
import filesRoutes from "./routes/files-router";
import errorMiddleware from "./middleware/error-middleware";

const app: Express = express();
const port: number = parseInt(process.env.PORT || "5000", 10);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(authRoutes);
app.use('/file', filesRoutes);
app.use(errorMiddleware);

const server = http.createServer(app);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({force: false});
        server.listen(port, async () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();