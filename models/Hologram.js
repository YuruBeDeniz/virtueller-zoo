
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
        default: "not extinct"
    }
});

const Hologram = model("Hologram", hologramSchema);

module.exports = Hologram;