const express = require("express");
const expresslayouts = require("express-ejs-layouts");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser = require("body-parser");
const { JsonDatabase } = require("wio.db");
const Discord = require("discord.js");
const client = new Discord.Client();

const db = new JsonDatabase({
  databasePath: "./databases/database.json"
});

client.on("ready", () => {
  server.listen(3000);
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`0 Kişi!`, { type: "WATCHING" });
});

app.use(express.static("public"));

app.set("trust proxy", true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expresslayouts);
app.set("layout", "./layouts/main");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "FEYZ - Home" });
});

app.get("/api", (req, res) => {
  res.render("api", { title: "FEYZ - Api" });
});

let online_user_count = 0;

io.on("connection", socket => {
  online_user_count++;
  client.user.setActivity(`${online_user_count} Kişi!`, { type: "WATCHING" });
  socket.on("disconnect", () => {
    online_user_count--;
    client.user.setActivity(`${online_user_count} Kişi!`, { type: "WATCHING" });
  });
});

app.post("/", (req, res) => {
  const { url, id } = req.body;
  if (url && id) {
    if (db.has(id)) {
      res.render("index", { title: "FEYZ - Home", message: "This id is already taken!" });
    } else {
      db.set(`${id}`, {
        url: url,
        id: id,
        ip: req.ip
      });
      res.redirect(`/${id}`);
    }
  }else {
    res.redirect("/");
  }
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    if (db.has(id)) {
      res.render("url", { title: `FEYZ - ${id}`, veri: db.get(id) });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
});

client.login(process.env.TOKEN);
