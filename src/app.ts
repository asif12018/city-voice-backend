import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from "path";
import config from './app/config';
import { IndexRoutes } from './app/routes';
import { getAuth } from './app/lib/auth';
import { notFount } from './app/middlewares/notFoundRoutes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';

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

// Better Auth handles everything else under /api/v1/auth (catch-all for auth)
app.use("/api/v1/auth", async (req: Request, res: Response, next) => {
  try {
    const { toNodeHandler } = await import("better-auth/node");
    const auth = await getAuth();
    const handler = toNodeHandler(auth);
    return handler(req, res);
  } catch (err) {
    next(err);
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('City voice server is running!');
});

app.use(notFount);
app.use(globalErrorHandler);

export default app;
