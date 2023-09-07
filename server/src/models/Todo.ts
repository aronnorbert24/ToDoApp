import mongoose from 'mongoose'

export interface Todo {
  title: string
  description: string
  priority: string
  isChecked: boolean
  dueDate: Date
  userId: mongoose.Schema.Types.ObjectId
}

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  priority: {
    type: String,
    default: 'Medium',
  },

  isChecked: {
    type: Boolean,
    default: false,
  },

  dueDate: {
    type: Date,
    default: Date.now(),
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export default mongoose.model('todo', todoSchema)
