import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    title: { type: String, required: true, default: "New task" },
    listId: {type: String, required: true },
    description: { type: String, required: false },
    done: { type: Boolean, default: false },
},
{
    timestamps: true,
    versionKey: false,
})

export const task = model('Tasks', taskSchema);