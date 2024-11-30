import express from "express";

import {
  getPointsById,
  processReceipt,
} from "../controllers/receiptController.js";

const router = express.Router();

router.get("/:id/points", getPointsById);
router.post("/process", processReceipt);

export default router;
