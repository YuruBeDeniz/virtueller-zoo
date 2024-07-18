
const { Schema, model } = require("mongoose");

const animalSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    weight: { 
        type: Number, 
    },
    superpower: { 
        type: String,  
    },
    extinctSince: { 
        type: Date 
    }
});

const Animal = model("Animal", animalSchema);

module.exports = Animal;