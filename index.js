const express = require('express');
const expresslayouts = require("express-ejs-layouts");
const app = express();
const bodyParser = require('body-parser');
const { JsonDatabase } = require("wio.db");

//database yolu.
const db = new JsonDatabase({
    databasePath: "./databases/database.json"
});

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

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { title: 'link-kisalt - Home' });
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

//port dinleme
app.listen(3000, () => {
    console.log('listening on *:3000');
});