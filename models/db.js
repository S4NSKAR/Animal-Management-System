const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/AnimalDB', {
    useNewUrlParser: true
},

err => {
    if(!err) {
        console.log('Connection Successful')
    } else {
        console.log('Error in connection: ' + err)
    }
})

require('./animal.model')