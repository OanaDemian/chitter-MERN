import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const peepSchema = new Schema({
    peepId: { type: ObjectId, required: true },
    user: { type: String, required: true },
    username: { type: String, required: true },
    date: {type: Date, required: true}
});

export const Peep = mongoose.model(`Peep`, peepSchema);
