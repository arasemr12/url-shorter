const express = require("express");
const expresslayouts = require("express-ejs-layouts");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser = require("body-parser");
require('dotenv').config();

app.use(express.static("public"));

app.set("trust proxy", true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expresslayouts);
app.set("layout", "layouts/main");

app.set("view engine", "ejs");

let online_user_count = 0;

io.on("connection", socket => {
  online_user_count++;
  client.user.setActivity(`!help - ${online_user_count} kişiyi`, { type: "WATCHING" });
  socket.on("disconnect", () => {
    online_user_count--;
    client.user.setActivity(`!help - ${online_user_count} kişiyi`, { type: "WATCHING" });
  });
});

app.use((req,res,next) => {
  let ip = req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  res.locals.ip = ip;
  next();
})

const GeneralRouter = require('./routes/GeneralRouter');
const ApiRouter = require('./routes/ApiRouter');

app.use('/',GeneralRouter);
app.use('/api/',ApiRouter);

app.get("*", (req, res) => {
  res.status(404).render("error", {title: `FEYZ - ${req.originalUrl}`,message: "Not found page.",code: 404,req});
});

require('./util/db').then(() => {
  console.log('Database connected!');
  const PORT = process.env.PORT || 3000;
  require('./bot/bot').then(() => {
    server.listen(PORT,() => console.log(`App listening on port ${PORT}`));
  });  
})
