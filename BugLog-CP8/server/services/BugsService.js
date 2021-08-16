import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
// import { logger } from '../utils/Logger'

class BugsService {
  async create(body) {
    const bug = await dbContext.Bugs.create(body)
    return await dbContext.Bugs.findById(bug._id).populate('creator', 'name picture')
  }

  async getAll(query = {}) {
    return await dbContext.Bugs.find(query).populate('creator', 'name picture')
  }

  async getById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId).populate('creator', 'name picture')
    if (!bug) {
      throw new BadRequest('Invalid Id or Not Found')
    }
    return bug
  }

  async edit(body, user) {
    const bug = await this.getById(body.id)
    if (user.id === bug.creatorId.toString()) {
      if (bug.closed === false) {
        const bug = await dbContext.Bugs.findByIdAndUpdate(body.id, body, { new: true, runValidators: false })
        if (!bug) {
          throw new BadRequest('Edit Unsuccessful')
        }
      } else {
        throw new BadRequest('Bug is closed and cannot be edited')
      }
      return bug
    }
  }

  async destroy(body, user) {
    const bug = await this.getById(body.id)
    if (user.id === bug.creatorId.toString()) {
      const bug = await dbContext.Bugs.findByIdAndUpdate(body.id, body, { new: true, runValidators: false })
      if (!bug) {
        throw new BadRequest('Close Unsuccessful')
      }
      return bug
    }
  }
}

export const bugsService = new BugsService()
