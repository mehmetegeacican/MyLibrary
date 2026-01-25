
import express from "express";
import {
    getAllMindMaps,
    createMindMap,
    getMindMapById,
    updateMindMapById,
    deleteMindMapById
} from "../controller/mindmap.controller";

const router: express.Router = express.Router(); 


router.get('/all', getAllMindMaps);
router.post('/', createMindMap);
router.get('/:id', getMindMapById);
router.put('/:id', updateMindMapById);
router.delete('/:id', deleteMindMapById);
export default router;