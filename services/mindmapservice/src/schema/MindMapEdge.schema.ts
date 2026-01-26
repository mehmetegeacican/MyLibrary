import mongoose from "mongoose";

export const MindMapEdgeSchema = new mongoose.Schema({
    source: {type: String, required: true},
    target: {type: String, required: true}
},{ timestamps: true });