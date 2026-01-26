import mongoose from "mongoose";
import { MindMapEdgeSchema } from "./MindMapEdge.schema";
import { MindMapNodeSchema } from "./MindMapNode.schema";

export const MindMapSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ownerId: { type: String, required: true },
    nodes: [MindMapNodeSchema],
    edges: [MindMapEdgeSchema]
},{ timestamps: true });