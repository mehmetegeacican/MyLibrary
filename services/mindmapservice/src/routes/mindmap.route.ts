
import express from "express";
import {
    getAllMindMaps,
    createMindMap,
    getMindMapById,
    updateMindMapById,
    deleteMindMapById
} from "../controller/mindmap.controller";
import {
    getAllMindMapsValidation,
    validate
} from "../validator/mindmap.validation";

const router: express.Router = express.Router(); 


router.get('/all', getAllMindMapsValidation, getAllMindMaps);
router.post('/', createMindMap);
router.get('/:id', getMindMapById);
router.put('/:id', updateMindMapById);
router.delete('/:id', deleteMindMapById);
export default router;