
/**
 * The controller for receiving all mindmaps
 * @param req 
 * @param res 
 */
export const getAllMindMaps = async (req:any,res:any) => {
    res.status(200).json({message: "Get all mindmaps - To be implemented"});
}

/**
 * The Controller for receiving a mindmap by id
 * @param req 
 * @param res 
 */
export const getMindMapById = async (req:any,res:any) => {
    res.status(200).json({message: "Get mindmap by id - To be implemented"});
}


/**
 * The Controller for creating a mindmap
 * @param req 
 * @param res
 */
export const createMindMap = async (req:any,res:any) => {
    res.status(201).json({message: "Create mindmap - To be implemented"});
}

/**
 * The Controller for updating a mindmap by id
 * @param req 
 * @param res 
 */
export const updateMindMapById = async (req:any,res:any) => {
    res.status(200).json({message: "Update mindmap by id - To be implemented"});
}

/**
 * The Controller for deleting a mindmap by id
 * @param req 
 * @param res 
 */
export const deleteMindMapById = async (req:any,res:any) => {
    res.status(200).json({message: "Delete mindmap by id - To be implemented"});
}