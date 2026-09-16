exports.getCategories = async (req, res) => {
  res.json([
    { id: 1, name: 'Web Development', icon: 'Code2' },
    { id: 2, name: 'Data Science & AI', icon: 'BrainCircuit' },
    { id: 3, name: 'UI/UX Design', icon: 'Palette' },
    { id: 4, name: 'Cloud & DevOps', icon: 'Cloud' }
  ]);
};

exports.createCategory = async (req, res) => {
  res.status(201).json({ id: Date.now(), ...req.body });
};
