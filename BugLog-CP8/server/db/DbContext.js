import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { Bug } from '../models/Bug'
import { Value as ValueSchema } from '../models/Value'
import { Note } from '../models/Note'

class DbContext {
  Values = mongoose.model('Value', ValueSchema)
  Bugs = mongoose.model('Bug', Bug)
  Account = mongoose.model('Account', AccountSchema)
  Notes = mongoose.model('Note', Note)
}

export const dbContext = new DbContext()
