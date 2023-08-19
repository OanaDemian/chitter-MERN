import Peep from "../models/peep.model.js";
import { validationResult } from "express-validator";

export const allPeeps = async (req, res) => {
  try {
    const peeps = await Peep.find({});
    res.json(peeps);
  } catch (e) {
    res.status(400).send("Couldn't connect to db.");
  }
};


export const newPeep = async (req, res) => {
  console.log(req.userId)
  console.log(req.username)

    try {
      const peep = new Peep({
        userId: req.userId,
        username: req.username,
        content: req.body.peep,
        date: new Date()
      });
      await peep.save();
      res.status(201).send();
    } catch (error) {
        console.log(error);
        res.status(400).send(`Adding new peep failed`);
    }
};
