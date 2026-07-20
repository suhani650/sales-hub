import "dotenv/config";
console.log("JWT_SECRET =", process.env.JWT_SECRET);
console.log("JWT_REFRESH_SECRET =", process.env.JWT_REFRESH_SECRET);
import path from "path";
import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import xssClean from "xss-clean";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import sellerRoutes from "./routes/seller/index.js";

const app = express();
const server = http.createServer(app);

// Serve uploads folder statically
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

const io = new SocketServer(server, {
  cors: { origin: process.env.CLIENT_URL, credentials: true },
});

// --- Security ---------------------------------------------------------
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(xssClean());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." },
  }),
);

// Stricter limiter for auth endpoints to slow brute-force attempts.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 20 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

// --- Core middleware ----------------------------------------------------
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));

// --- API docs -------------------------------------------------------------
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "salesHub Marketplace API", version: "1.0.0" },
    servers: [{ url: `http://localhost:${process.env.PORT || 5000}/api` }],
  },
  apis: ["./src/routes/*.js"],
});
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Routes -----------------------------------------------------------
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/seller", sellerRoutes);

app.get("/api/health", (req, res) =>
  res.json({ status: "ok", time: new Date().toISOString() }),
);

// --- Sockets (chat presence / live dashboard) --------------------------
io.on("connection", (socket) => {
  socket.on("join", (room) => socket.join(room));
  socket.on("dashboard:subscribe", () => socket.join("dashboard"));
  socket.on("disconnect", () => {});
});
app.set("io", io);

// --- Error handling -----------------------------------------------------
app.use((req, res) => res.status(404).json({ error: "Route not found." }));
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal server error." });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`salesHub API listening on :${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api/docs`);
});
