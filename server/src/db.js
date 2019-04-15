import mongoose from 'mongoose'

async function createConnection() {
  try {
    return await mongoose.connect(
      'mongodb://root:secret@localhost:27017/admin',
      {
        useNewUrlParser: true
      }
    )
  } catch (error) {
    console.log(error)
  }
}

export default createConnection
