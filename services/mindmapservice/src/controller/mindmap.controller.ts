import { fetchAllMindMaps, fetchMindMapById, postMindMap, putMindMap, removeMindMapById } from "../service/mindmap.service";

/**
 * The controller for receiving all mindmaps
 * GET /api/v3/mindmaps/all
 * @param req 
 * @param res 
 */
export const getAllMindMaps = async (req: any, res: any) => {
    try {
        const { ownerId } = req.query;
        if (!ownerId) {
            return res.status(400).json({ message: "ownerId query parameter is required" });
        }
        const mindmaps = await fetchAllMindMaps(ownerId as string);
        return res.status(200).json(mindmaps);
    } catch (error) {
        console.error("Error fetching all mindmaps:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

/**
 * The Controller for receiving a mindmap by id
 * GET /api/v3/mindmaps/:id
 * @param req 
 * @param res 
 */
export const getMindMapById = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "MindMap id parameter is required" });
        }
        const mindmap = await fetchMindMapById(id);
        console.log("Fetched mindmap:", mindmap);
        if (!mindmap) {
            return res.status(404).json({ message: "MindMap not found" });
        }
        return res.status(200).json(mindmap);

    } catch (error) {
        console.error("Error fetching mindmap by Id:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


/**
 * The Controller for creating a mindmap
 * POST /api/v3/mindmaps
 * @param req 
 * @param res
 */
export const createMindMap = async (req: any, res: any) => {
    try {
        const {
            title,
            nodes,
            edges
        } = req.body;

        const {
            ownerId
        } = req.query;

        const newlyAddedMindMap = await postMindMap({
            title,
            nodes,
            edges,
            ownerId
        });


        return res.status(201).json(newlyAddedMindMap);

    } catch (error) {
        console.error("Error creating mindmap:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

/**
 * The Controller for updating a mindmap by id
 * PUT /api/v3/mindmaps/:id
 * @param req 
 * @param res 
 */
export const updateMindMapById = async (req: any, res: any) => {

    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "MindMap id parameter is required" });
        }
        const { title, nodes, edges } = req.body;
        const updatedMindMap = await putMindMap(id, { title, nodes, edges });
        return res.status(200).json(updatedMindMap);

    } catch(error) {
        console.error("Error updating mindmap by id :", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

/**
 * The Controller for deleting a mindmap by id
 * DELETE /api/v3/mindmaps/:id
 * @param req 
 * @param res 
 */
export const deleteMindMapById = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "MindMap id parameter is required" });
        }
        const deletedMindMap = await removeMindMapById(id, false);
        return res.status(200).json(deletedMindMap);

    } catch (error) {
        console.error("Error deleting mindmap by id :", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}