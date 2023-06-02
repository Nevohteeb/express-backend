//require express
const express = require('express')
// import controllers
const {
    getWorkouts,
    getWorkout,
    createWorkout
} = require('../controllers/workoutController')

// envoke express router
const router = express.Router()

//---- Define Routes ----

// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({message: 'DELETE a workout'})
})

// UPDATE all workouts
router.patch('/:id', (req, res) => {
    res.json({message: 'UPDATE a workout'})
})

//export the router
module.exports = router