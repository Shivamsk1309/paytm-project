const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const routerRoot = require("./routes/index");

dotenv.config();

const app = express();
app.use(bodyParser.json()); //or app.use(express.json()

app.use(cors());

app.use("/api/v1", routerRoot);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
