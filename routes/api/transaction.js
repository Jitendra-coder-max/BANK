const express = require('express');
const router = express.Router();


const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');


const Profile = require('../../modals/Profile');
const User = require('../../modals/User');
const Transaction = require('../../modals/Transaction');








router.get('/:accountNumber', async (req, res) => {

    try {
        const transaction = await User.find({ accountNumber: req.params.accountNumber })

        if (!transaction)

            return res.status(400).json({ msg: 'User account not found' })
        res.json(transaction)
    }
    catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');


    }
})


// deposit fund

router.post('/try', async (req, res) => {

    {
        try {

            const { accountNumber, transactionAmount, description, sender } = req.body;
            if (!(accountNumber && transactionAmount && description && sender)) {
                return res.status(400).json({ msg: "All input are required" })
            }
            let user = await User.findOne({ accountNumber });

            if (user === null) {
                return res.status(404).json({ msg: `This User with account number ${accountNumber} does not exist` });
            }
            if (transactionAmount < 5000) {


                return res.status(400).json({ msg: `Sorry, deposit amount cannot be less than 5000` });
            }
            if (transactionAmount >= 5000) {
                user.accountBalance = user.accountBalance + transactionAmount;


                let transactionDetails = {
                    transactionType: 'Deposit',
                    accountNumber: accountNumber,
                    description: description,
                    sender: sender,
                    transactionAmount: transactionAmount
                };

                await user.save();
                return res.json(transactionDetails);


            }

        } catch (err) {
            return res.json({ message: err });


        }
    }

})




router.post('/transfer',
    auth, check('transactionAmount', 'please enter a transaction amount').notEmpty(),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        {
            try {
                const { accountNumber, transactionAmount, description } = req.body;
                if (!(accountNumber && transactionAmount && description)) {
                    return res.status(400).json({ msg: "All input are required" })
                }

                let beneficiary = await User.findOne({ accountNumber });
                if (beneficiary === null) {

                    
                    return res.status(400).json({ msg: "User with this account number does not exist" });
                }

                let currentUser = await User.findById(req.user.user_id);
                
                if (transactionAmount > currentUser.accountBalance && transactionAmount > 0) {

                   
                    return res.status(400).json({ msg: "Insufficient funds to make this transfer" });
                }
                if (currentUser.accountNumber === beneficiary) {
                    
                    return res.status(400).json({ msg: "Sorry you cannot send money to yourself" });
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
                    

                    return res.json(transactionDetails);
                
                }
            } catch (err) {

                
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        }

    })


router.post('/with', auth, check('transactionAmount', 'please enter a transaction amount').notEmpty(),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { transactionAmount } = req.body;
            if (!transactionAmount) {
                return res.status(400).json({ msg: "Please input the amount you'd like to withdraw" });
            }
            let currentUser = await User.findById(req.user.user_id);
            if (transactionAmount > currentUser.accountBalance) {
                return res.status(400).json({ msg: "Insufficient funds to make this withdrawal" })
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
            return res.json(transactionDetails);

        } catch (err) {
            
           
            console.error(err.message);
            res.status(500).send('Server Error');;

        }


    })










module.exports = router;



