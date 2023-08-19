import { User } from '../models/userModel'

const allAccess = (req, res) => {
    res.status(200).send(`Public Content`);
};

const userControllers = {
    allAccess,
    userBoard: function (req, res) { res.status(200).send(`User Content`) },
}

export default userControllers;

 
  
  