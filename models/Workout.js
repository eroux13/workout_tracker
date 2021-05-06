// Impoet Dependencies
const mongoose = require("mongoose");

// Create Mongoose Schema
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                required: true,
                // Use enum to check and validate value
                enum: ["resistance", "cardio"]
            },
            name: {
                type: String,
                required: true,
                trim: true
            },
            duration: {
                type: Number
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }
        }
    ]
});

const Workout = mongoose.Model("Workout", workoutSchema);

module.exports = Workout;