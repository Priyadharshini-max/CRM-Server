// Importing the Express
const express = require("express");
const app = express();

require("dotenv").config();

const cors = require("cors");
// Importing all the routes
const loginRoute = require("./routes/login.routes");
 const registerRoute = require("./routes/register.routes");

const mongo = require("./shared/mongo");

async function loadApp() {
  try {
    // Mongo Connection
    await mongo.connect();
    app.use(cors());
    
    // Middlewares
    // Parse Request Body
    app.use(express.json());

    // Routes
    app.use("/login", loginRoute);
    app.use("/register", registerRoute);

    // Starting Server
    app.listen(process.env.PORT, () => console.log(`Server listening at port ${process.env.PORT}...`));
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

loadApp();
