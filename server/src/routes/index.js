import { Router } from 'express';
const router = Router();
import bugs from "./bugs.js";

router.use("/bugs", bugs);

export default router;