import { IMindMap } from "../interface/mindmap.interface";
import { MindMap } from "../model/MindMap.model";

/**
 * Fetches All MindMaps for a given ownerId
 * @param ownerId the owner's id
 * @returns the list of mindmaps with only title, createdAt and updatedAt fields
 */
export const fetchAllMindMaps = async (ownerId:string) => {
    return await MindMap.find({ ownerId}).select('title ownerId createdAt updatedAt').sort({ updatedAt: -1 }).lean();
}

/**
 * Fetches a MindMap by its id
 * @param mindMapId the mindmap's id
 * @returns the mindmap document
 */
export const fetchMindMapById = async (mindMapId:string) => {
    return await MindMap.findById(mindMapId).lean();
}

/**
 * Creates a new MindMap
 * @param payload Request payload for creating a mindmap
 * @returns 
 */
export const postMindMap = async (payload: Partial<IMindMap>) => {
    return await MindMap.create(payload);
}

/**
 * Updates a MindMap by its id
 * @param mindMapId the mindmap's id
 * @param payload the update payload
 * @returns the updated mindmap document
 */
export const putMindMap = async (mindMapId: string, payload: Partial<IMindMap>) => {
    return await MindMap.findByIdAndUpdate(mindMapId, payload, { new: true }).lean();
}

/**
 * Deletes a MindMap by its id
 * @param mindMapId Mindmap's id
 * @returns deleted mindmap document
 */
export const removeMindMapById = async (mindMapId: string) => {
    return await MindMap.findByIdAndDelete(mindMapId).lean();
}