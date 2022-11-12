require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const router = require("./routes");

const port = 5000;

const cors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
};

const app = express();

app.use(express.json());

app.use(cors);

// log
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/dist/todo"));
  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "frontend", "dist", "todo", "index.html")
    );
  });
}

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to mongodb");
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
