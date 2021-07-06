const express = require('express');
const expresslayouts = require("express-ejs-layouts");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser = require('body-parser');
const { JsonDatabase } = require("wio.db");
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

//database yolu.
const db = new JsonDatabase({
    databasePath: "./databases/database.json"
});

client.on('ready', () => {
    server.listen(3000);
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`0 Kişi!`, { type: 'WATCHING' });
})

//css veya js eklemek için statik kısmı.
app.use(express.static('public'));

//ip leri kaydetmek için trust proxy.
app.set('trust proxy', true)

//verilerin gönderilebilmesi için bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//ejs layouts kullanımı.
app.use(expresslayouts);
app.set("layout", "./layouts/full-width");

//ejs motor.
app.set('view engine', 'ejs');

//anasayfa
app.get('/', (req, res) => {
    res.render('index', { title: 'link-kisalt - Home' });
});

//api doc.
app.get('/api', (req, res) => {
    res.render('api', { title: 'link-kisalt - Api' });
});

let online_user_count = 0;

//socket.io'ya kullanıcı bağlandığında.
io.on("connection", socket => {
    online_user_count++;
    client.user.setActivity(`${online_user_count} Kişi!`, { type: 'WATCHING' });
    //socket io kullanıcı çıkış.
    socket.on("disconnect", () => {
        online_user_count--;
        client.user.setActivity(`${online_user_count} Kişi!`, { type: 'WATCHING' });
    });
});

app.post('/', (req, res) => {
    const { url, id } = req.body;
    if (db.has(id)) {
        //id daha önceden kaydedildimi kontrol.
        res.send('Bu id daha önceden alınmış!');
    } else {
        //id kaydedilmediyse id yi girilen url ile database'ye kaydetme.
        db.set(`${id}.url`, url);
        db.set(`${id}.id`, id);
        db.set(`${id}.ip`, req.ip);
        res.redirect(`/${id}`);
    }
});

app.get('/:id', (req, res) => {
    const { id } = req.params;
    //id girildimi kontrol.
    if (id) {
        if (db.has(id)) {
            //id database'ye kayıtlıysa url'e yönlendirme.
            res.redirect(db.get(id).url)
        } else {
            //id database'ye kayıtlı değilse ana sayfaya yönlendirme.
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

app.get('/api/:id', (req, res) => {
    const { id } = req.params;
    //id girildimi kontrol.
    if (id) {
        if (db.has(id)) {
            //id database'ye kayıtlıysa veri gönderme.
            res.json(db.get(id));
        } else {
            //id database'ye kayıtlı değilse ana sayfaya yönlendirme.
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

//Bot giriş.
client.login(process.env.token);