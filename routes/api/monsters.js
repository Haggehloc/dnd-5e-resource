const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//load models
const Friend = require("../../models/monster.js");


// @route GET api/monsters/test
// @desc Tests post routes
// @access Public
router.get("/test", (req, res) =>
    res.json({
        msg: "monsters Works"
    })
);

// @route GET api/monsters/{monsterName}
// @desc Gets a monster by their name
// @access Public
router.get("/", (req, res) =>
    res.json({
        
    })
);

module.exports = router;