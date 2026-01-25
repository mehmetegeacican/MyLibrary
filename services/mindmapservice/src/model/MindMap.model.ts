import mongoose from "mongoose";
import { MindMapEdgeSchema } from "./MindMapEdge.model";
import { MindMapNodeSchema } from "./MindMapNode.model";

const MindMapSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ownerId: { type: String, required: true },
    nodes: [MindMapNodeSchema],
    edges: [MindMapEdgeSchema]
},{ timestamps: true });

export const MindMap = mongoose.model('MindMap', MindMapSchema);