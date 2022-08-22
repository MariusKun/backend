const { userSchema } = require('../schemas/userSchema')
const { imageSchema } = require('../schemas/imageSchema')
const { offerSchema } = require('../schemas/offerSchema')
const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        const newUser = new userSchema
        newUser.username = req.body.username
        newUser.password = await bcrypt.hash(req.body.password, 10)
        try {newUser.save()}
        catch (e){console.log(e)}
        res.send({error: false, status: 'user registered successfully'})
    },
    login: async (req, res) => {
        const user = await userSchema.findOne({username: req.body.username})
        if (!user) return res.send({error: 'no such user'})
        const passMatch = await bcrypt.compare(req.body.password, user.password)
        if (passMatch){
            req.session.user = user
            res.send({error: false, status: 'login success', user})
        } else res.send({error: 'wrong password', status: 'login failed'})
    },
    autoLogin: (req, res) => {
        if (req.session.user) return res.send({error: false, user: req.session.user}) 
        else res.send({error: 'no user'})
    },
    logout: (req, res) => {
        delete req.session.user
        res.send({error:false, status: 'you are logged out'})
    },
    imagesUpload: (req, res) => {
        const newimages = new imageSchema
        newimages.image = req.body.image
        newimages.owner = req.session.user._id
        try {newimages.save()}
        catch (e){console.log(e)}
        res.send({error: false, status: 'images uploaded successfully'})
    },
    imagesList: async (req, res) => {
        console.log("images list trigered");
        const imagesList = await imageSchema.find({owner: req.params.id})
        res.send({error: false, images: imagesList})
        console.log(imagesList);
    },
    users: async (req, res) => {
        const users = await userSchema.find( {_id:{$ne:req.session.user._id} })
        res.send({users})
    },
    user: async (req, res) => {
        const user = await userSchema.findOne({_id: req.params.id})
        const imagesList = await imageSchema.find({owner: req.params.id})
        res.send({user, images:imagesList})
    },
    submitOffer: async (req, res) => {
        const offer = new offerSchema
        offer.iget = [...req.body.iget]
        offer.youget = [...req.body.youget]
        offer.madeByName = req.body.madeByName
        offer.madeByID = req.body.madeByID
        offer.madeToName = req.body.madeToName
        offer.madeToID = req.body.madeToID
        offer.save()
        res.send({error: false, status: 'offer submited'})
    },
    getOffers: async (req, res) => {
        let offers = []
        if (req.session.user) offers = await offerSchema.find({madeToID:req.session.user._id}) 
        res.send({error: false, offers})
    },
    rejectOffer: async (req, res) => {
        await offerSchema.findByIdAndDelete(req.body.offerID)
        let offers = []
        if (req.session.user) offers = await offerSchema.find({madeToID:req.session.user._id}) 
        res.send({error: false, offers})
    },
    acceptOffer: async (req, res) => {
        let offer = await offerSchema.findOne({_id:req.body.offerID})
        offer.iget.map( async images=>{
            await imageSchema.findByIdAndUpdate(images._id, {owner: offer.madeByID})
        })
        offer.youget.map( async images=>{
            await imageSchema.findByIdAndUpdate(images._id, {owner: offer.madeToID})
        })
        await offerSchema.findByIdAndDelete(req.body.offerID)
        let offers = []
        if (req.session.user) offers = await offerSchema.find({madeToID:req.session.user._id}) 
        res.send({error: false, offers})
    }
}