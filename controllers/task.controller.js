const Task = require('../models/task.model');

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const t = await Task.create({ title, description, userId: req.user.id });
    return res.status(201).json(t);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.getTasks = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { userId: req.user.id };
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.getTask = async (req, res) => {
  try {
    const t = await Task.findById(req.params.id);
    if (!t) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'admin' && t.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    res.json(t);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.updateTask = async (req, res) => {
  try {
    const t = await Task.findById(req.params.id);
    if (!t) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'admin' && t.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    Object.assign(t, req.body);
    await t.save();
    res.json(t);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

exports.deleteTask = async (req, res) => {
  try {
    const t = await Task.findById(req.params.id);
    if (!t) return res.status(404).json({ message: 'Not found' });

    if (req.user.role !== 'admin' && t.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ ok: true, message: "Task deleted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
};
