
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
    getMindMapByIdValidation
} from "../validator/mindmap.validation";

const router: express.Router = express.Router(); 


router.get('/all', getAllMindMapsValidation, getAllMindMaps);
router.get('/:id',getMindMapByIdValidation, getMindMapById);

router.post('/', createMindMap);
router.put('/:id', updateMindMapById);
router.delete('/:id', deleteMindMapById);
export default router;