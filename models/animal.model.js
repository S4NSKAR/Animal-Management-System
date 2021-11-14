const mongoose = require("mongoose");

var animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "This field is required",
    },
    breed: {
        type: String,
        required: "This field is required",
    },
    category: {
        type: String,
        required: "This field is required",
    },
    cage: {
        type: String,
        required: "This field is required",
    },
});

mongoose.model("Animal", animalSchema);