import { Document } from "mongoose";

export interface IMindMapNode {
    _id?: string;
    type?: string;
    data: {
        label: string;
    };
    position: { x: number; y: number };
}

export interface IMindMapEdge {
    _id?: string;
    source: string;
    target: string;
}

export interface IMindMap extends Document {
    title: string;
    ownerId: string;
    nodes: IMindMapNode[];
    edges: IMindMapEdge[];
    createdAt: Date;
    updatedAt: Date;
}