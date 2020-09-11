const router = require('express').Router();
const User = require('../models/user');

router.route('/register').post((req, res) => {
    console.log(req.body.username);
    User({ username: req.body.username, email: req.body.email, password: req.body.password1, }).save().then(() => {
        res.json('User added!')}).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
    User.find({"username":req.body.username}).then((value)=>{
        return res.json(value)}).catch(err=>res.status(400).json('Error: ' + err))
});

module.exports = router;