import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },

    dueDate: {
      type: Date,
      required: false,
    },
  },
  // Why can't i see timestamps as part of my response on postman
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
