const express = require('express');
const urlmodel = require('../models/url');
const Discord = require('discord.js')
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", { title: "FEYZ - Home", req });
});

router.get("/api", (req, res) => {
    res.render("api", { title: "FEYZ - Api", req });
});

router.get("/contact", (req, res) => {
    res.render("contact", { title: "FEYZ - Contact", req });
});

router.get("/discord", (req, res) => {
    res.redirect(process.env.DC_INVITE_URL);
});

router.post("/contact", (req, res) => {
    let ip =
        req.headers["cf-connecting-ip"] ||
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress;

    let { email, message } = req.body;
    let embed = new Discord.MessageEmbed()
        .setTitle('Yeni bir iletişim desteği!')
        .setAuthor({
            name: ip
        })
        .setDescription('Yeni bir iletişim desteği geldi!')
        .setColor('RANDOM')
        .addFields(
            { name: 'E-Mail', value: email },
            { name: 'Message', value: message }
        )

    client.channels.cache.get(process.env.LOG_CHANNEL_ID).send({ embeds: [embed] });
    res.render("contact", { title: "FEYZ - Contact", req });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    if(!id) return res.redirect('/');
    urlmodel.findOne({id:id}).then((result) => {
        if(!result) return res.redirect('/');
        res.render("url", { title: `FEYZ - ${result.id}`, veri: result, req });
    });
});
  
router.post("/", (req, res) => {
    let id = Date.now() + (Math.random() * 46656);
    id = (id.toString(36)).slice(-8);
    let ip = res.locals.ip;
    const { url } = req.body;
    if(!url) return res.redirect('/');
    urlmodel.create({
        id: id,
        url: url,
        authorip: ip
    }).then((v) => res.redirect(`/${v.id}`));
});

module.exports = router;