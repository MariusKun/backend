const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
})

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
const offerSchema = new Schema({
    iget: {
        type: [imageSchema],
        required: true
    },
    youget: {
        type: [imageSchema],
        required: true
    },
    madeToID: {
        type: String,
        required: true
    },
    madeToName: {
        type: String,
        required: true
    },
    madeByID: {
        type: String,
        required: true
    },
    madeByName: {
        type: String,
        required: true
    }
})

module.exports = {
    offerSchema: mongoose.model('offer', offerSchema)
}