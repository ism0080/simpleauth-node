const express = require("express");
const app = express();

const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const verifyToken = require("./routes/validate-token");

// middleware
app.use(express.json()); // body parser

app.use("/api/user", authRoutes);
app.use("/api/dashboard", verifyToken, dashboardRoutes);

app.listen(3000, () => console.log("🚀 server is running...."));
