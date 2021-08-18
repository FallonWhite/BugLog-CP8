import { AppState } from '../AppState'
import { api } from './AxiosService'
import Pop from '../utils/Notifier'
import { bugsService } from './BugsService'
import { logger } from '../utils/Logger'

class NotesService {
  async create(newNote) {
    const res = await api.post('api/notes', newNote)
    AppState.activeNote = res.data
    logger.log('created Note', res.data)
    // await this.getAll()
    await bugsService.getNotesByBugId(res.data.bug.id)
    return res.data.id
  }

  async getAll() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }

  async destroy(id, bugId) {
    await api.delete('api/notes/' + id)
    bugsService.getNotesByBugId(bugId)
  }
}

export const notesService = new NotesService()
