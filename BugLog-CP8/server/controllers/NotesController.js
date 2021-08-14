import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .delete('/:id', this.destroy)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const note = await notesService.create(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const note = await notesService.getAll({ creatorId: req.userInfo.id })
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const note = await notesService.getById(req.params.id)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      const user = req.userInfo
      await notesService.destroy(req.params.id, user)
      res.send({ message: 'Deleted Successfully!' })
    } catch (error) {
      next(error)
    }
  }
}
