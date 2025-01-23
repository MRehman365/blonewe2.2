require('dotenv').config();
const express = require("express");
const http = require("http");
const db = require("./utiles/db");
const app = express();
const server = http.createServer(app);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

app.use("/api", require("./routes/authRoute"));
app.use("/api", require("./routes/productRoute"));
app.use("/api", require("./routes/orderRoute"));
app.use("/api", require("./routes/wishlistRouter"));
app.use("/api", require("./routes/cartRoute"));
app.use("/api", require("./routes/categoryRoute"));
app.use("/api", require("./routes/blogRoute"));

db();
server.listen(8000, () => console.log("Server is running on port 8000"));