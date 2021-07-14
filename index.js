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
require('dotenv').config();

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

let online_user_count = 0;

io.on("connection", socket => {
  online_user_count++;
  client.user.setActivity(`${online_user_count} kişiyi`, { type: "WATCHING" });
  socket.on("disconnect", () => {
    online_user_count--;
    client.user.setActivity(`${online_user_count} kişiyi`, { type: "WATCHING" });
  });
});

app.get("/", (req, res) => {
  res.render("index", { title: "FEYZ - Home", req });
});

app.get("/api", (req, res) => {
  res.render("api", { title: "FEYZ - Api", req });
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    if (db.has(id)) {
      res.render("url", { title: `FEYZ - ${id}`, veri: db.get(id), req });
    } else {
      res
        .status(404)
        .render("error", {
          title: `FEYZ - ${id}`,
          message: "Not found page.",
          code: 404,
          req
        });
    }
  } else {
    res.redirect("/");
  }
});

app.post("/", (req, res) => {
  let ip =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress;
  const { url, id } = req.body;
  if (url && id) {
    if (db.has(id)) {
      res.render("index", {
        title: "FEYZ - Home",
        message: "This id is already taken!",
        req
      });
    } else {
      db.set(`${id}`, {
        url: url,
        id: id,
        ip: ip
      });
      res.redirect(`/${id}`);
    }
  } else {
    res.redirect("/");
  }
});

app.post("/api/new", (req, res) => {
  let ip =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress;
  const { url, id } = req.body;
  if (url && id) {
    if (db.has(id)) {
      res.json({ message: "This id is already taken!" });
    } else {
      db.set(`${id}`, {
        url: url,
        id: id,
        ip: ip
      });
      res.json({ message: `Saved! url: ${url} id: ${id}` });
    }
  } else {
    res.json({ message: "Require url and id" });
  }
});

app.get("/api/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    if (db.has(id)) {
      const veri = db.get(id);
      res.json({ url: veri.url, id: veri.id });
    } else {
      res.json({ message: "Undefined" });
    }
  } else {
    res.json({ message: "Require id" });
  }
});

app.get("*", (req, res) => {
  res
    .status(404)
    .render("error", {
      title: `FEYZ - ${req.originalUrl}`,
      message: "Not found page.",
      code: 404,
      req
    });
});

client.login(process.env.TOKEN);
