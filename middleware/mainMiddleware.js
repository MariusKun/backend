const { userSchema } = require('../schemas/userSchema')
module.exports = {
    checkInputs: async (req, res, next)=>{
        console.log('checkInputs triggered')
        const check = await userSchema.find({username: req.body.username})
        if (check.length >= 1) {
            if (check.length > 1) console.log('douplicate usernames in db. username ' + req.body.username)
            return res.send({error: 'This Username is allready taken'})
        }
        if (!RegExp('^(?=.*?[A-Z])').test(req.body.username)) return res.send({error: `Username must have a Capital letter`})
        if (req.body.username.length < 3) return res.send({error: 'Username must be at least 3 characters long'})
        if (!(req.body.password.length <= 15)) return res.send({error: 'Password can not be longer then 15 characters'})
        if (!(req.body.password.length > 5)) return res.send({error: 'Your password is too short'})
        next()
    },
    imagesCheck: (req, res, next) => {
        if (!req.body.image) return res.send({error: 'URL is empty'})
        if (!req.session.user) return res.send({error: 'You must login to upload images'}) 
        next()
    }
}