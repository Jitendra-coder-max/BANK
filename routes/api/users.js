const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../modals/User')

// const { check, validationResult} = require('express-validator')

// router.get('/',(req,res) => res.send('User route'));

router.post('/',[check('name', 'Name is required')
.not().
isEmpty(),
check('email', 'Please include a valid email').isEmail()
,check(
    'password',
    'please enter password with 6 or more cahracters').isLength({min:6})],
    async (req,res) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array()})
    }

    // name email password accountBalance

    const {name, email, password,accountBalance} = req.body;

    try{
       
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({errors:[{msg: 'User already exists'}]});
        }
        
        user = new User({
            name,
            email,
            password,
            accountBalance
        });




        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();


        const payload = {
            user: {
                id:user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'),{
            expiresIn:3600},
            (err,token)=>{
                if(err) throw err;
                res.json({token})
            })
        // res.send('User Registerd')


    }

    catch(err){

    console.error(err.message)
res.status(500).send('Server Error')}

});

module.exports = router;


// const express = require('express');
// const router = express.Router();


// router.get('/',(req,res) => res.send('User route'));

// module.exports = router;
