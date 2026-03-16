import express from "express";
import Entry from "../models/Entry.js";
import { requireAuth } from "../middleware/auth.js";
import { createEntrySchema, updateEntrySchema } from "../validators/entry.validators.js";

const router = express.Router();
router.use(requireAuth);

// List (only my entries) + optional search
router.get("/", async (req, res) => {
  const { q } = req.query; // search in title/content
  const filter = { userId: req.user.id };

  if (q && typeof q === "string" && q.trim()) {
    filter.$or = [
      { title: { $regex: q.trim(), $options: "i" } },
      { content: { $regex: q.trim(), $options: "i" } }
    ];
  }

  const entries = await Entry.find(filter).sort({ date: -1, createdAt: -1 }).limit(200);
  return res.json(entries);
});

// Get one (only mine)
router.get("/:id", async (req, res) => {
  const entry = await Entry.findOne({ _id: req.params.id, userId: req.user.id });
  if (!entry) return res.status(404).json({ message: "Not found" });
  return res.json(entry);
});

// Create
router.post("/", async (req, res) => {
  const parsed = createEntrySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid input", errors: parsed.error.flatten() });

  const entry = await Entry.create({ ...parsed.data, userId: req.user.id });
  return res.status(201).json(entry);
});

// Update (only mine)
router.put("/:id", async (req, res) => {
  const parsed = updateEntrySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid input", errors: parsed.error.flatten() });

  const entry = await Entry.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { $set: parsed.data },
    { new: true }
  );

  if (!entry) return res.status(404).json({ message: "Not found" });
  return res.json(entry);
});

// Delete (only mine)
router.delete("/:id", async (req, res) => {
  const deleted = await Entry.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!deleted) return res.status(404).json({ message: "Not found" });
  return res.json({ message: "Deleted" });
});

export default router;