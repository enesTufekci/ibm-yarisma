import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
  teams: String,
  episodeId: String,
  correctAnswers: {
    type: String,
    default: '[]'
  },
  wrongAnswers: {
    type: String,
    default: '[]'
  },
  isActive: {
    type: Boolean,
    default: true
  }
})

const Competition = mongoose.model('Competition', schema)

export default Competition
