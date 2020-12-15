const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");

// middleware
app.use(express.json()); // body parser
app.use("/api/user", authRoutes);

app.listen(3000, () => console.log("🚀 server is running...."));
