import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { User } from "../models/user.model.js"

const signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            const err = new Error(`Validation failed`);
            err.statusCode = 422;
            err.data = errors.array();
            throw err;
        }
    }
    catch (err) {
        console.log(err);
        return res.status(err.statusCode ?? 500).send({ message: err.data });
    }

    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    try {
        await user.save();
        res.send({ message: `User was registered successfully` });
    } catch (error) {
        res.status(500).send({ message: error });
        return;
    }
}

const signin = async (req, res) => {
    try {
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            const err = new Error(`Validation failed`);
            err.statusCode = 422;
            err.data = errors.array();
            throw err;
        }
    }
    catch (err) {
        console.log(err);
        return res.status(err.statusCode ?? 500).send({ message: err.data });
    }

    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(404).send({ message: `User not found` });
        }
        const passwordIsInvalid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsInvalid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid username/password combination"
            });
        }
        const token = jwt.sign({ id: user.id, name: user.name, username: user.username }, process.env.SECRET, { expiresIn: 86400 });

        res.status(200).send({
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            accessToken: token
        });
    } catch (error) {
        res.status(500).send({ message: error });
        return;
    }
}

const signingFunctions = { signin, signup };

export default signingFunctions;