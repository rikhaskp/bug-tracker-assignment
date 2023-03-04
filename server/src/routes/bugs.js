import { Router } from 'express';
import bugController from "../controllers/bugContoller.js";
var router = Router();

router.get("/getAllBugs", bugController.getAllBugs);
router.get("/getBugDetails/:id", bugController.getBugDetails);
router.post("/addBug", bugController.addBug);
router.put("/updateBug/:id", bugController.updateBug);
router.delete("/deleteBug/:id", bugController.deleteBug);

export default router;