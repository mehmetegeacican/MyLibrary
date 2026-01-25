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