import Peep from "../models/peep.model.js";

export const allPeeps = async (req, res) => {
  try {
    const peeps = await Peep.find({});
    console.log(peeps)
    res.json(peeps);
  } catch (e) {
    res.status(400).send("Couldn't connect to db.");
  }
};
