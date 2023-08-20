import { User } from '../models/user.model.js'

const verifySignUp = async (req, res, next) => {

    try {
        const user = await User.findOne({
            username: req.body.username
        })
        if (user) {
            res.status(400).send({ message: `Failed! Username is already in use!` });
            return;
        }
        
    } catch(error) {
        res.status(500).send({ message: error });
    }

    try {
        const email = await User.findOne({
            email: req.body.email
        })

        if (email) {
            res.status(400).send({ message: `Failed! Email already in use` });
            return;
        }
    } catch(error) {
        res.status(500).send({ message: error });
    }

    next();
}


export default verifySignUp; 