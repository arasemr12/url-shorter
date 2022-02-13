const express = require('express');
const urlmodel = require('../models/url');
const router = express.Router();

router.get("/:id", (req, res) => {
    const { id } = req.params;
    if(!id) return res.status(500).json({status:500,message:'Please enter id!'});
    urlmodel.findOne({id:id}).then((result) => {
        if(!result) return res.status(404).json({status:404,message:'Not found!'});
        res.status(200).json({"id":result.id,"url":result.url,"Created":result.Created});
    });
});
  
router.post("/new", (req, res) => {
    let id = Date.now() + (Math.random() * 46656);
    id = (id.toString(36)).slice(-8);
    let ip = res.locals.ip;
    const { url } = req.body;
    if(!url) return res.status(500).json({status:500,message:'Please enter url!'});
    urlmodel.create({
        id: id,
        url: url,
        authorip: ip
    }).then((v) => res.status(201).json({status:201,info:{"id": id}}));
});

module.exports = router;