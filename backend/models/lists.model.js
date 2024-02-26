import { Schema, model } from "mongoose";

const listSchema = new Schema({
    name: { type: String, required: true, default: "New list" },
    userId: { type: String, required: true },
    tasks: { type: [String], required: false, default: []},
},
{
    timestamps: true,
    versionKey: false,
})

export const list = model('Lists', listSchema);