import mongoose from "mongoose";

export const MindMapEdgeSchema = new mongoose.Schema({
    source: {type: String, required: true},
    target: {type: String, required: true},
    data: {
        strokeStyle: {
            type:String
        },
        color: {
            type:String
        }
    }
},{ timestamps: true });