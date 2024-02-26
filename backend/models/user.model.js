import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    lists: { type: [String], default: []},
    tasks: { type: [String], default: []},
},
{
    timestamps: true,
    versionKey: false,
})

export const user = model('User', userSchema);