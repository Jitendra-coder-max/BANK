const express = require('express');
const router = express.Router();

// var http = require('http').Server(app);
// const auth = require('../../middleware/auth');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');


const Profile = require('../../modals/Profile');
const User = require('../../modals/User');
const Transaction = require('../../modals/Transaction');
// const Profile = require('../../modals/Profile');


// deposit fund



// router.post('/' , auth,
// // check(' accountNumber', 'please ensure that the account number exists').notEmpty(),
// check('transactionAmount', 'please enter a transaction amount').notEmpty(),
// async (req, res) => {
//     const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//     const {transactionType, accountNumber,  description, sender,transactionAmount } = req.body;

//         const transactionFields ={ } ;
//         transactionFields.user = req.user.id;
        

//         if(transactionType) transactionFields.transactionTyper = transactionType ;
//       if(accountNumber) transactionFields.accountNumber = accountNumber ;
//       if(description) transactionFields.description = description  ;
//       if(sender) transactionFields.sender = sender ;
//       if(transactionAmount) transactionFields.transactionAmount = transactionAmount ;
      
//       const formatter = new Intl.NumberFormat('en-US', {
//         style: 'currency',
//         currency: 'NGN'
//     });
//     try {


//         if (!(accountNumber && transactionAmount && description && sender )) {
//             console.log("er1")
//            return res.status(400).json({ msg:"All input are required"})
//         }
//         let transaction= await Transaction.findOne({  user: req.user.id  });


//       //   //  Smaple
//       //   if (transaction === null) {
//       //    return  res.status(404).json({msg: `This person with account number ${accountNumber} does not exist`});
//       // }
        
//         if (transactionAmount < 5000) {
//          return res.status(400).json({msg: `Sorry, deposit amount cannot be less than 5000`});
//       }



//     //


//         if(transactionAmount>= 5000 && transaction){
//             transaction =await Transaction.findOneAndUpdate(
//                 { user: req.user.id },
                
//                 {$set:transactionFields},
//                 {new:true}
//             )
//             return res.json(transaction);
            
//           }




//             transaction = new  Transaction (transactionFields);

//             await transaction.save();

            
            
//             console.log("er4")
//             return res.status(201).json({"msg" :`Deposit of ${formatter.format(transactionAmount)} to ${accountNumber} was successful.`})
        

//     } 
    
//     catch (err) {
//         console.log("er5")

//         console.error(err.message);
//         return res.status(500).send('Server Error');
        
//     }
// })



// router.get('/user/:user_id', async (req, res) => {
//   try {
//     const transaction = await Transaction.findOne({user:req.params.user_id}).
//     populate('user', ['name', 'email']);

//     if (!transaction) 
//     return res.status(400).json({ msg: ' User account not found' })
    
//     res.json(transaction);
//   } catch (err) {
//     console.error(err.message);

//     if(err.kind == 'ObjectId'){
//       return res.status(400).json({ msg: ' User account not found' })
//     }
//     res.status(500).send('Server Error');
//   }
// });



// router.post('/trans',auth,
// check('transactionAmount', 'please enter a transaction amount').notEmpty(),
// async(req,res)=>{

//   const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

      
//     const {transactionType, accountNumber,  description, sender,transactionAmount } = req.body;

//     const transferFields ={ } ;
//     transferFields.user = req.user.id;
//     // transactionFields.profile = req.profile.id;

//     if(transactionType) transferFields.transactionTyper = transactionType ;
//   if(accountNumber) transferFields.accountNumber = accountNumber ;
//   if(description) transferFields.description = description  ;
//   if(sender) transferFields.sender = sender ;
//   if(transactionAmount) transferFields.transactionAmount = transactionAmount ;

//   const formatter = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'NGN'
// });
//   try {
   

//     if (!(accountNumber && transactionAmount && description)) 
//     {

//       console.log("e2")
//       return res.status(400).json({ msg:"All input are required"})
//     }

//     let currentUser = await Transaction.findOne({  user: req.user.id  });

//     if (transactionAmount < 0) {
//      return  res.status(400).json({msg: "Insufficient funds to make this transfer"});
//   }

  

//   if(transactionAmount>= 5000 && currentUser ){
//     currentUser =await Transaction.findOneAndUpdate(
//         { user: req.user.id },
        
//         {$set:transferFields},
//         {new:true}
//     )
//     return res.json(currentUser);
    
//   }
//   currentUser= new  Transaction (transferFields);

//             await currentUser.save();

            
            
//             console.log("er4")
//             return res.status(201).json({"msg" :`Deposit of ${formatter.format(transactionAmount)} to ${accountNumber} was successful.`})
        




    

    
//   } catch (err) {
    
//     console.error(err.message);
//     return res.status(500).send('Server Error');
    
//  }


// })




// router.post('/withdraw',auth,
// check('transactionAmount', 'please enter a transaction amount').notEmpty(),
// async(req,res)=>{

//   const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

      
//     const {transactionType, accountNumber,  description, sender,transactionAmount } = req.body;

//     const transferFields ={ } ;
//     transferFields.user = req.user.id;
//     // transactionFields.profile = req.profile.id;

//     if(transactionType) transferFields.transactionTyper = transactionType ;
//   if(accountNumber) transferFields.accountNumber = accountNumber ;
//   if(description) transferFields.description = description  ;
//   if(sender) transferFields.sender = sender ;
//   if(transactionAmount) transferFields.transactionAmount = transactionAmount ;

//   const formatter = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'NGN'
// });
//   try {
   

//     if (!(accountNumber && transactionAmount && description)) 
//     {

//       console.log("e2")
//       return res.status(400).json({ msg:"All input are required"})
//     }

//     let currentUser = await Transaction.findOne({  user: req.user.id  });

//     if (transactionAmount < 0) {
//      return  res.status(400).json({msg: "Insufficient funds to make this transfer"});
//   }

  

//   if(transactionAmount>= 5000 && currentUser ){
//     currentUser =await Transaction.findOneAndUpdate(
//         { user: req.user.id },
        
//         {$set:transferFields},
//         {new:true}
//     )
//     return res.json(currentUser);
    
//   }
//   currentUser= new  Transaction (transferFields);

//             await currentUser.save();

            
            
//             console.log("er4")
//             return res.status(201).json({"msg" :`Deposit of ${formatter.format(transactionAmount)} to ${accountNumber} was successful.`})
        




    

    
//   } catch (err) {
    
//     console.error(err.message);
//     return res.status(500).send('Server Error');
    
//  }


// })




router.get( '/:accountNumber', async(req, res)=> {

    try{
        const transaction =  await User.find({ accountNumber: req.params.accountNumber })

        if (!transaction) 
                
        return res.status(400).json({ msg: 'User account not found' })
       res.json(transaction)    
    }
    catch(err){
        console.error(err.message);
        // if(err.kind == 'ObjectId'){
        //           return res.status(400).json({ msg: ' User account not found' })
                // }
        res.status(500).send('Server Error');


    }
})




router.post('/try',async (req,res)=> {

  {
    try {

        const { accountNumber, transactionAmount, description, sender } = req.body;
        if (!(accountNumber && transactionAmount && description && sender)) {
           return res.status(400).json({msg:"All input are required"})
        }
        let user = await User.findOne({ accountNumber });

        
        // let user = await User.findOne({ user : req.user.id });

        
        if (user === null) {
            return res.status(404).json({msg:`This User with account number ${accountNumber} does not exist`});
        }
        if (transactionAmount < 5000) {

          
           return res.status(400).json({msg:`Sorry, deposit amount cannot be less than 5000`});
        }
        if (transactionAmount >= 5000) {
            user.accountBalance = user.accountBalance + transactionAmount;
            

            // const transactionDetails ={ } ,

            let transactionDetails = {
                transactionType: 'Deposit',
                accountNumber: accountNumber,
                description: description,
                sender: sender,
                transactionAmount: transactionAmount
            };

            

           

           
            await user.save();
           return  res.json(transactionDetails);
            
        //    return res.status(201).json({msg:`Deposit of ${formatter.format(depositAmount)} to ${accountNumber} was successful`});
        }

    } catch (err) {
        return res.json({ message: err });

    
    }
 }

} )




router.post('/transfer',
 auth,check('transactionAmount', 'please enter a transaction amount').notEmpty(),
 async(req,res)=>{

    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

    {
        try {
            const { accountNumber,transactionAmount , description } = req.body;
            if (!(accountNumber && transactionAmount && description)) {
                return res.status(400).json({msg:"All input are required"})
            }
    
            let beneficiary = await User.findOne({ accountNumber });
            if (beneficiary === null) {

                // console.log(err1)
               return res.status(400).json({msg:"User with this account number does not exist"});
            }
    
            let currentUser = await User.findById(req.user.user_id);
            // let currentUser = await User.findById(req.user.'63375e0820a2c149ebe03f68');
            // let currentUser = await User.findById(req._id);
            // let currentUser = await User.findOne(
            //     { user: req.user._id });

    
            // let currentUser = await User.findById(req.user.id);
            if (transactionAmount> currentUser.accountBalance && transactionAmount > 0) {

                console.log(err2)
              return  res.status(400).json({msg:"Insufficient funds to make this transfer"});
            }
            if (currentUser.accountNumber === beneficiary) {
                console.log(err3)
              return  res.status(400).json({msg:"Sorry you cannot send money to yourself"});
            }
    
            if (currentUser.accountNumber !== beneficiary) {
                beneficiary.accountBalance = beneficiary.accountBalance + transactionAmount;
                currentUser.accountBalance = currentUser.accountBalance - transactionAmount;
                let transactionDetails = {
                    transactionType: 'Transfer',
                    accountNumber: accountNumber,
                    description: description,
                    sender: currentUser.accountNumber,
                    transactionAmount: transactionAmount
                };
                await beneficiary.save();
                await currentUser.save();
                console.log(err3)

                return  res.json(transactionDetails);
                // await Transaction.create(transactionDetails);
    
                // res.status(200).send(`Transfer of ${formatter.format(transferAmount)} to ${accountNumber} was successful`);
            }
        } catch (err) {

            console.log("err5")
            // res.json({ message: err });
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

})


router.post('/with',auth,check('transactionAmount', 'please enter a transaction amount').notEmpty(),
 async (req,res)=>{

    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

    try {
        const { transactionAmount } = req.body;
        if (!transactionAmount) {
           return  res.status(400).json({msg:"Please input the amount you'd like to withdraw"});
        }
        let currentUser = await User.findById(req.user.user_id);
        if (transactionAmount > currentUser.accountBalance) {
            return res.status(400).json({msg:"Insufficient funds to make this withdrawal"})
        }
        currentUser.accountBalance = currentUser.accountBalance - transactionAmount;
        let transactionDetails = {
            transactionType: 'Withdraw',
            accountNumber: currentUser.accountNumber,
            description: `NIBSS withdrawal of ${formatter.format(transactionAmount)}`,
            sender: currentUser.accountNumber,
            transactionAmount: transactionAmount
        };
        await currentUser.save();
        return  res.json(transactionDetails);

    } catch (err) {
        // res.json({ message: e });

        console.log("err5")
           
            console.error(err.message);
        //    return res.status(500).json({msg:"Server Error"})
        res.status(500).send('Server Error');;

    }

    
})










module.exports = router;



