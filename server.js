//require dotenv and envoke it
require('dotenv').config()
//require express
const express = require('express')
//import mongoose
const mongoose = require('mongoose')
// import routes
const workoutRoutes = require('./routes/workouts')
const { log } = require('firebase-functions/logger')

//start express app
const app = express()

// Middleware:
app.use(express.json()) // looks for body in the request, will parse it and attaches it to req object

//log out path and method of each request
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

//Routes
app.get('/', (req, res) => {
    res.json({message: 'Welcome to the app'})
}) // will be shown at localhost:4000/

app.use('/api/workouts/', workoutRoutes) // attaches all the routes to the app

//Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for request on a certain port number
        app.listen(process.env.PORT, () => {
            console.log('DB Connected & listening on port', process.env.PORT)
        }) 
    })
    .catch((error) => {
        console.log(error)
    })