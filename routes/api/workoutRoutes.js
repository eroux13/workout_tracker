// Import Depedencies
const router = require("express").Router();
const { route } = require("../htmlRoutes");
const { Workout } = require("./../../models");

// GET Routes
router.get("/", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {totalDuration: {$sum: "$exercises.duration"}}
        }
    ])
    .then(workoutData => {
        res.json(workoutData)
    })
    .catch(err => {
        res.status(400).json(err)
    });
});

router.get("/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {totalDuration: {$sum: "$exercises.duration"}}
        }
    ])
    .sort({date: -1})
    .then(workoutData => {
        res.json(workoutData)
    })
    .catch(err => {
        res.status(400).json(err)
    });
});

// POST Routes
router.post("/", (req, res) => {
    Workout.create(
        {
            type: "workout"
        }
    )
    .then(workoutData => {
        res.json(workoutData)
    })
    .catch(err => {
        res.status(400).json(err)
    });
});

router.post("/:id", (req, res) => {
    Workout.create(
        {
            type: req.body.type,
            name: req.body.name,
            duration: req.body.duration,
            weight: req.body.weight,
            reps: req.body.reps,
            sets: req.body.sets,
            distance: req.body.distance
        }
    )
    .then(workoutData => {
        res.json(workoutData)
    })
    .catch(err => {
        res.status(400).json(err)
    });
});

// PUT Routes
router.put("/:id", ({params, body}, res) => {
    const workoutID = params.id;
    Workout.findOneAndUpdate(
        {
            _id: workoutID
        },
        {
            $push: {exercises: body}
        },
        {
            new: true
        }
    )
    .then(workoutData => {
        res.json(workoutData)
    })
    .catch(err => {
        res.status(400).json(err)
    });
});

module.exports = router;