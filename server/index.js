import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser"
// const http = require("http").createServer(app);
import config from "./config/index.js";
import { connect } from "mongoose";
import routes from "./src/routes/index.js";

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use(routes);

const port = process.env.SERVER_PORT || 5000;
connect(config.database.mongoConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    // Start the application
    app.listen(port, () => {
      console.log(`Server Running at ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to database");
    console.error(error);
  });

export default app;
