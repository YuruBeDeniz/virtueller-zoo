
const { Schema, model } = require("mongoose");

const hologramSchema = new Schema({
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
        type: String,
        default: "nicht ausgestorben"
    }
});

const Hologram = model("Hologram", hologramSchema);

module.exports = Hologram;