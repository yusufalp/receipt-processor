import { v4 as uuidv4 } from "uuid";

import Points from "../utils/Points.js";
import { processedReceipts } from "../data/processedReceipts.js";

export const getPointsById = (req, res, next) => {
  const { id } = req.params;

  if (!processedReceipts.has(id)) {
    return res.status(404).json({ error: { message: `Receipt not found` } });
  }

  const receipt = processedReceipts.get(id);

  const points = receipt.points;

  res.status(200).json({ points });
};

export const processReceipt = (req, res, next) => {
  const receipt = req.body;

  const id = uuidv4();
  const points = new Points(receipt).getPoints();

  const newReceipt = { id, points, ...receipt };

  processedReceipts.set(id, newReceipt);
  console.log("processedReceipts :>> ", processedReceipts);

  res.status(201).json({ id });
};
