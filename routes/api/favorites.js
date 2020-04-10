const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const request = require("request");
const utils = require("../route_utils_module/lib/object_utils");

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

// @route GET api/favorites/{id}
// @desc Gets one favorite by id
// @access Public
router.get("/:id", (req, res) =>
    Monster.findOne({_id: req.params.id})
        .then(monster => {
            res.json(monster)
        })
);

// @route POST api/favorites/{name}
// @desc posts a monster to the favorites by name
// @access Public
router.post("/monsters/:name", (req, res) => {
    console.log("posting to favorites " + req.params.name);
    if(utils.isNullOrEmptyObject(req.params.name) || req.params.name === undefined){
        res.status(404).json({
            noMonstersFound: "request provided did not contain a valid name."
        });
        return;
    }
    Monster.findOne({index: req.params.name})
        .then(monster => {

            if(!utils.isNullOrEmptyObject(monster)){
                res.status(404).json({
                    noMonstersFound: "Duplicate favorites are not allowed."
                });
                return;
            }

            request({
                uri: "http://dnd5eapi.co/api/monsters/" + req.params.name,
                method: "GET",
                timeout: 10000,
                followRedirect: true,
                maxRedirects: 10
            }, function(error, response, body) {

                const returnedBody = JSON.parse(body);

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
                    .catch(err =>
                        res.status(404).json({
                            monsterNotFound: err
                        }))
            });
        })
        .catch(err => {
            res.status(404).json({
                monsterNotFound: err
            })
        });
});

// @route POST api/favorites/{name}
// @desc gets a monster from the favorites by name
// @access Public
router.get("/monsters/comments/:name", (req, res) => {
    Monster.findOne({index: req.params.name})
        .then(monster => {
            if(monster.size === 0){
                return "";
            }
            res.json({comment: monster.comment})
        }).catch(err => {
            res.status(404).json({
                monsterNotFount: "There were no comments found for this monster"
            })
    })

});

// @route POST api/favorites/monsters/comments/{name}
// @desc posts a comment to a favorites that is found by name
// @access Public
router.post("/monsters/comments/:name", (req, res) => {
    if(utils.isNullOrEmptyObject(req.body.comment)){
        res.status(404).json({
            noMonstersFound: "request provided did not contain a valid comment."
        });
    }

    Monster.findOneAndUpdate({index: req.params.name}, {comment: req.body.comment})
        .then(monster => {
            if(utils.isNullOrEmptyObject(monster)){
                res.status(404).json({
                    noMonstersFound: "No monster found to update."
                });
            }
            res.json({msg: "Monster successfully updated."});
        })
        .catch(err => {
            res.status(404).json({
                monsterNotFound: err
            })
        });
});



module.exports = router;