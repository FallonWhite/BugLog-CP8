import { AppState } from '../AppState'
import { api } from './AxiosService'
import Pop from '../utils/Notifier'
import { bugsService } from './BugsService'

class NotesService {
  async create(note) {
    const res = await api.post('api/notes', note)
    AppState.activeNote = res.data
    await this.getAll()
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
    await api.destroy('api/notes/' + { id })
    bugsService.getNotesByBugId(bugId)
  }
}

export const notesService = new NotesService()
