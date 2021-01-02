const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const MONGO_LOCAL_URI = process.env.MONGO_LOCAL_URI;
const MONGO_ATLAS_URI = process.env.MONGO_ATLAS_URI;
mongoose.connect(
  MONGO_ATLAS_URI,
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => (error ? console.log(error) : "")
);

const connection = mongoose.connection;
connection.once("open", () => console.log("Connected to MongoDB"));

app.use("/", require("./src/routes/router"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
