import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async create(body) {
    const note = await dbContext.Notes.create(body)
    return await dbContext.Notes.findById(note._id).populate('creator', 'name picture').populate('bug', '_id')
  }

  async getAll(query = {}) {
    return await dbContext.Notes.find(query).populate('creator', 'name picture')
  }

  // async getById(id, userId) {
  //   const note = await dbContext.Notes.findById(noteId).populate('creator', 'name picture')
  //   if (!note) {
  //     throw new BadRequest('Invalid Id')
  //   }
  //   return note
  // }

  async getById(id) {
    const note = await dbContext.Notes.findById(id).populate('creator', 'name picture')
    if (!note) {
      throw new BadRequest('No Note Available')
    }
    return note
  }

  async destroy(id, user) {
    const note = await this.getById(id)
    if (user.id === note.creatorId.toString()) {
      await this.getById(id)
      return await dbContext.Notes.findOneAndDelete({ _id: id, creatorId: user })
    }
  }
  // async destroy(noteId, userId) {
  //   return await dbContext.Bugs.findOneAndDelete({ _id: noteId, creatorId: userId })// ?
  // }
}

export const notesService = new NotesService()
