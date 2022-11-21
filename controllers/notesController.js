const Notes = require("../models/noteModel");

const addNote = async (req, res) => {
  const { title, content, createdBy } = req.body;
  const note = await Notes.create({ title, content, createdBy });
  return res.status(200).json(note);
};

const getNotes = async (req, res) => {
  const { email: createdBy } = req.query;
  const notes = await Notes.find({ createdBy }).sort({ updatedAt: -1 });
  return res.status(200).json(notes);
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  const note = await Notes.findByIdAndDelete(id);
  if (note) return res.status(200).json(note);
  return res.status(400).json({ msg: "No such note" });
};

const getNote = async (req, res) => {
  const { id } = req.params;
  const note = await Notes.findById(id);
  if (note) return res.status(200).json(note);
  return res.status(400).json({ msg: "No such note" });
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const note = await Notes.findByIdAndUpdate(id, { title, content });
  if (note) return res.status(200).json(note);
  return res.status(400).json({ msg: "No such note" });
};

module.exports = {
  addNote,
  getNotes,
  deleteNote,
  getNote,
  updateNote,
};
