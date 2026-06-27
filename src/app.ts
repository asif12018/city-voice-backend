import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from "path";
import config from './app/config';
import { IndexRoutes } from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5000",
    config.BETTER_AUTH_URL,
  ] as string[],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}

app.use(cors(corsOptions));
app.use(cookieParser());

// 4. GLOBAL PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// application routes
// app.use('/api/v1', router);

//5. All other routes

app.use("/api/v1", IndexRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('City voice server is running!');
});

export default app;
