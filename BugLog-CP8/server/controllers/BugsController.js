import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import BaseController from '../utils/BaseController'
import { notesService } from '../services/NotesService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create) // Creates a new bug
      .get('', this.getAll) //  returns a list of all the bugs
      .get('/:id', this.getById) // returns a single bug with all it's data
      .get('/:id/notes', this.getNotesByBug) // returns all notes for a given bug
      .put('/:id', this.edit) // Edits bug (Restricted when the bug is closed)
      .delete('/:id', this.closeBug) // Changes status of bug from open to close (Do not allow a bug to be deleted, only change the status of the bug to closed) I'm going to attemot to treat this is an edit essentially, to start
  }

  async create(req, res, next) {
    try {
      // DO NOT TRUST THE CLIENT
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.create(req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const bug = await bugsService.getAll({ creatorId: req.userInfo.id })
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const bug = await bugsService.getById(req.params.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBug(req, res, next) {
    try {
      const note = await notesService.getAll({ bug: req.userInfo.id }) // was using creatorId:
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      delete req.body.closed
      const user = req.userInfo
      req.body.id = req.params.id
      const bug = await bugsService.edit(req.body, user)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async closeBug(req, res, next) {
    try {
      const user = req.userInfo
      req.body.id = req.params.id
      req.body.closed = true
      const bug = await bugsService.destroy(req.body, user)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }
}
