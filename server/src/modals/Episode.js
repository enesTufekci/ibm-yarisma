import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
  title: String,
  isActive: {
    type: Boolean,
    default: false
  },
  questions: {
    type: String,
    required: false
  }
})

const Episode = mongoose.model('Episode', schema)

export default Episode
