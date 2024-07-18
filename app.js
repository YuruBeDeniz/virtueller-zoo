require("dotenv/config");

require("./db");

const express = require("express");
const app = express();

require("./config")(app);

const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

console.log(require.resolve('./routes/hologram.routes'));


const hologramRoutes = require("./routes/hologram.routes");
app.use("/api/hologram", hologramRoutes);


module.exports = app;