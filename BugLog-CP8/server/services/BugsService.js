import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async create(body) {
    const bug = await dbContext.Bugs.create(body)
    return await dbContext.Bugs.findById(bug._id).populate('creator', 'name picture')
  }

  async getAll(query = {}) {
    return await dbContext.Bugs.find(query).populate('creator', 'name picture')
  }

  async getById(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator', 'name picture')
    if (!bug) {
      throw new BadRequest('Invalid Id or Not Found')
    }
    return bug
  }

  async edit(body, user) {
    const bug = await this.getById(body.id)
    if (user.id === bug.creatorId.toString()) {
      const bug = await dbContext.Bugs.findByIdAndUpdate(body.id, body, { new: true, runValidators: false })
      if (!bug) {
        throw new BadRequest('Edit Unsuccessful')
      }
      return bug
    }
  }

  // async destroy(body, id, user) {
  //   const bug = await this.getById(id)
  //   if (user.id === bug.creatorId.toString()) {
  //     // return await dbContext.Bugs.findByIdAndUpdate(body.id, body, { new: true, runValidators: false })
  //     const bug = await dbContext.Bugs.findByIdAndUpdate(body.id, body, { new: false, runValidators: true })
  //     if (!bug) {
  //       throw new BadRequest('Close Unsuccessful')
  //     }
  //     return bug
  //   }
  // }
  async destroy(body, id) {
    const bug = await this.getById(id)
    if (bug.closed === true) {
      throw new BadRequest('Already Closed; Cannot Edit or Close')
    }
    body.closed = true
    const closed = await dbContext.Bugs.findByIdAndUpdate(id, body)
    return closed
  }
}

export const bugsService = new BugsService()
