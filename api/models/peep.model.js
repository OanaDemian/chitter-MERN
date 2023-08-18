import mongoose from "mongoose";

const Schema = mongoose.Schema;

const peepSchema = new Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
});

const Peep = mongoose.model(`Peep`, peepSchema);

export default Peep;
