const express = require('express');
const router = express.Router();

const config = require('config');
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const { check, validationResult} = require('express-validator')

const auth = require('../../middleware/auth');

const User = require('../../modals/User');


router.get('/', auth, async (req,res) => {
    try{

        console.log("err2")
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);


    }
    catch(err){

        console.log("err")
        // console.error(err.message);
        res.status(500).send('Server Error')

    }
});



// router.get('/',(req,res) => res.send('User route'));

router.post('/',[
check('email', 'Please include a valid email').isEmail()
,check(
    'password',
    'password is required').exists()],
    async (req,res) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array()})
    }

    const { email, password} = req.body;

    try{
       
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({errors:[{msg: 'Invalid Credentials'}]});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res
            .status(400)
            .json({errors: [{msg: 'Invalid Credentials'}]})
        }
        


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

//  export default router;