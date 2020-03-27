const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const request = require("request");

//load models
const Monster = require("../../models/monster.js");


// @route GET api/monsters/test
// @desc Tests monster route
// @access Public
router.get("/test", (req, res) =>
    res.json({
        msg: "monsters Works"
    })
);

// @route GET api/monsters/{monsterName}
// @desc Gets a monster by their name
// @access Public
router.get("/:monster", (req, res) => {
    request({
        uri: "http://dnd5eapi.co/api/monsters/" + req.params.monster,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function(error, response, body) {
        res.json({
            msg: body
        })
    });
});



module.exports = router;