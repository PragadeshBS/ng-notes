const {
  getNotes,
  addNote,
  deleteNote,
  getNote,
  updateNote,
} = require("../controllers/notesController");

const router = require("express").Router();

router.get("/notes", getNotes);

router.get("/notes/:id", getNote);

router.post("/notes", addNote);

router.put("/notes/:id", updateNote);

router.delete("/notes/:id", deleteNote);

module.exports = router;
