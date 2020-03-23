const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MonsterSchema = new Schema({

    index:{
        type: Schema.Types.String,
        default: ""
    },

    name:{
        type: Schema.Types.String,
        default: ""
    },

    size:{
        type: Schema.Types.String,
        default: ""
    },

    type:{
        type: Schema.Types.String,
        default: ""
    },

    subtype:{
        type: Schema.Types.String,
        default: ""
    },

    alignment:{
        type: Schema.Types.String,
        default: ""
    },

    armorClass:{
        type: Schema.Types.Number,
        default: ""
    },

    hitPoints:{
        type: Schema.Types.Number,
        default: ""
    },

    hitDice:{
        type: Schema.Types.String,
        default: ""
    },

    speed:{
        type: Schema.Types.Map
    },

    strength:{
        type: Schema.Types.Number
    },

    dexterity:{
        type: Schema.Types.Number,
    },

    constitution:{
        type: Schema.Types.Number,
    },

    intelligence:{
        type: Schema.Types.Number,
    },

    wisdom:{
        type: Schema.Types.Number,
    },

    charisma:{
        type: Schema.Types.Number,
    },

    proficiencies:{
        type: Schema.Types.Array
    },

    damageVulnerabilities:{
        type: Schema.Types.Array
    },

    damageResistances:{
        type: Schema.Types.Array
    },

    damageImmunities:{
        type: Schema.Types.Array
    },

    conditionImmunities:{
        type: Schema.Types.String
    },

    senses:{
        type: Schema.Types.Map
    },

    languages:{
        type: Schema.Types.String,
    },

    challengeRating:{
        type: Schema.Types.Decimal
    },

    specialAbilities:{
        type: Schema.Types.Map
    },

    actions:{
        type: Schema.Types.Map,
    }


});

module.exports = Monsters = mongoose.model("monsters", MonsterSchema);
