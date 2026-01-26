import mongoose from "mongoose";
import {
    MindMapSchema
} from "../schema/MindMap.schema";

export const MindMap = mongoose.model('MindMap', MindMapSchema);