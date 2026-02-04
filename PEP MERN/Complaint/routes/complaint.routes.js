import express from 'express';
import { deletee,get,create,resolve } from "../controllers/complaint.controller.js";
const router = express.Router();

router.get('/complaint', get);
router.post('/complaint', create);
router.put('/complaint/:id', resolve);
router.delete('/complaint/:id', deletee);
export default router;