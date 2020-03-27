const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const request = require("request");

//load models
const Monster = require("../../models/monster.js");

// @route GET api/favorites/test
// @desc Tests favorites route
// @access Public
router.get("/test", (req, res) =>
    res.json({
        msg: "favorites Works"
    })
);

// @route GET api/favorites/
// @desc Gets all of the names of all of the favorites
// @access Public
router.get("/", (req, res) =>
    Monster.find()
        .select("name")
        .then(monsters => {
            res.json(monsters)
        })
);

// @route GET api/favorites/
// @desc Gets all of the names of all of the favorites
// @access Public
router.get("/:id", (req, res) =>
    Monster.findOne({_id: req.params.id})
        .then(monster => {
            res.json(monster)
        })
);

// @route POST api/monsters/{name}
// @desc posts a monster to the favorites by name
// @access Public
router.post("/monster/:name", (req, res) => {
    request({
        uri: "http://dnd5eapi.co/api/monsters/" + req.params.name,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function(error, response, body) {
        returnedBody = JSON.parse(body);
        const newMonster = new Monster({
            external_id: returnedBody._id,
            index: returnedBody.index,
            name: returnedBody.name,
            size: returnedBody.size,
            type: returnedBody.type,
            subtype: returnedBody.subType,
            alignment: returnedBody.alignment,
            armorClass: returnedBody.armor_class,
            hitPoints: returnedBody.hit_points,
            hitDice: returnedBody.hit_dice,
            proficiencies: returnedBody.proficiencies,
            damageVulnerabilities: returnedBody.damage_vulnerabilities,
            damageResistances: returnedBody.damage_resistances,
            damageImmunities: returnedBody.damage_immunities
        });

        newMonster
            .save()
            .then(Monster => res.json(Monster))
            .catch(err =>
                res.status(404).json({
                    monsterNotFound: err,
                }))
    });
});

module.exports = router;