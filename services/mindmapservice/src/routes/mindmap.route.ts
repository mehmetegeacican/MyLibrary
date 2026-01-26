
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
    getMindMapByIdValidation,
    postMindMapValidation,
    putMindMapValidation,
    deleteMindMapByIdValidation
} from "../validator/mindmap.validation";

const router: express.Router = express.Router(); 


router.get('/all', getAllMindMapsValidation, getAllMindMaps);
router.get('/:id',getMindMapByIdValidation, getMindMapById);
router.post('/',postMindMapValidation, createMindMap);
router.put('/:id',putMindMapValidation, updateMindMapById);
router.delete('/:id',deleteMindMapByIdValidation,deleteMindMapById);
export default router;