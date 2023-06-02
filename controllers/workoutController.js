// import workout model
const Workout = require('../models/workoutModel')
// import mongoose
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    // -1 in sort will put them in descending order (latest first)
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// get single workout
const getWorkout = async (req, res ) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Workout'})
    }

    const workout = await Workout.findById(id)

    if(!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

// create new workout
const createWorkout = async (req, res) => {
    const {title,load, reps} = req.body

    // add doc to db
    try {
        const workout = await Workout.create({title, load, reps});
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout

// update a workout

// Export mulitple functions
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout
}