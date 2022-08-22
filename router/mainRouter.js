const express = require('express')
const router = express.Router()
const { 
    autoLogin,
    register,
    login,
    logout,
    imagesUpload,
    imagesList,
    users,
    user,
    submitOffer,
    getOffers,
    rejectOffer,
    acceptOffer
} = require('../controlers/mainControler')
const { checkInputs, imagesCheck } = require('../middleware/mainMiddleware')

router.post('/register', checkInputs, register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/autoLogin', autoLogin)
router.post('/imagesUpload', imagesCheck, imagesUpload)
router.get('/imagesList/:id', imagesList)
router.get('/users', users)
router.get('/user/:id', user)
router.post('/submitOffer', submitOffer)
router.get('/getOffers', getOffers)
router.post('/rejectOffer', rejectOffer)
router.post('/acceptOffer', acceptOffer)

module.exports = router