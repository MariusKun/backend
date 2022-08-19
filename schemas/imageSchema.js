const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
})

module.exports = {
    imageSchema: mongoose.model('image', imageSchema)
}