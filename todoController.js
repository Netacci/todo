import Todo from './todoModel.js';

const addTodo = async (req, res) => {
  const { title, description, dueDate, isCompleted } = req.body;
  try {
    const todo = await Todo.create({
      title,
      description,
      dueDate,
      isCompleted,
    });
    res.status(201).json({ data: todo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTodos = async (req, res) => {
  try {
    let { filter, startDate, endDate } = req.query;
    let query = {};
    // If start date isnt passed,  it returns all todo that is less than the end date. Of endDate isnt passed, it returns all todos greater than the start date

    // sets startDate greater than or equal todueDate to query.dueDate.
    if (startDate) {
      startDate = new Date(startDate);
      query.dueDate = { $gte: startDate };
    }
    // checks if query.dueDate already has a value if not sets an empty object. then add the $lte condition to query.dueDate to ensure that dueDate is less than or equal to endDate.
    // This solves my issue with overiding dueDate when I was passing query.dueDate = { $lte: endDate };
    if (endDate) {
      endDate = new Date(endDate);
      query.dueDate = query.dueDate || {};
      query.dueDate.$lte = endDate;
    }

    // filter based on isCompleted status
    if (filter === 'completed') {
      query.isCompleted = true;
    } else if (filter === 'pending') {
      query.isCompleted = false;
    }

    const todos = await Todo.find(query);
    res.status(200).json({
      data: todos,
      message: 'Todo list retrieved successfully',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ data: todo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteAllTodos = async (req, res) => {
  try {
    const todo = await Todo.deleteMany();
    if (!todo) {
      return res.status(404).json({ message: 'No Todo found' });
    }
    res.status(200).json({ message: 'Todo list deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ data: todo, message: 'Todo updated successfully' });
  } catch (err) {}
};
const toggleTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    todo.isCompleted = !todo.isCompleted;
    //What saves() do - Saves this document by inserting a new document into the database if document.isNew is true, or sends an updateOne operation only with the modifications to the database, it does not replace the whole document in the latter case.
    await todo.save();
    res.status(200).json({ data: todo, message: 'Todo updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  addTodo,
  getTodos,
  getTodo,
  deleteTodo,
  deleteAllTodos,
  updateTodo,
  toggleTodo,
};
