import mongoose from "mongoose";

const peepSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  username: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
});

const Peep = mongoose.model(`Peep`, peepSchema);

export default Peep;
