const { Accountant, Payer, User } = require('../models');

// /api/v1/auth/new
// public
// add a new user
exports.registerUser = async (req, res, next) => {
    try {
        console.log(req.body)
        const { name, username, password, role } = await req.body;
        console.log(name)
        await User.register({ username: username }, password, async (err, user) => {
            if (err) {
                console.log('register error'+err);
                return res.status(500).json({
                    success: false,
                    msg: err
                })
            } else {
                user.name = name;
                user.role = role;
                user.save();
                if (role === 'Accountant') {
                    const accountant = await Accountant.create({
                        name, username,
                        userId: user.id
                    })
                } else if (role === 'Payer') {
                    const { age, state, panId } = req.body;
                    const admin = await Payer.create({
                        name, username, age, state, panId,
                        userId: user.id,
                    })
                }
                return res.status(200).json({
                    success: true,
                    data: user
                })
            }
        })
    } catch (err) {
        console.log('catched error' + err);
        return res.status(500).json({
            success: false,
            message: 'Unable to register user'
        })
    }
}