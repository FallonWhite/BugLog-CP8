import { AppState } from '../AppState'
import { api } from './AxiosService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Notifier'

class BugsService {
  async create(bug) {
    const res = await api.post('/api/bugs', bug)
    AppState.bugs.push(res.data)
    return res.data.id
  }

  async getAll() {
    const res = await api.get('/api/bugs')
    logger.log(res.data)
    AppState.bugs = res.data
  }

  async getById(id) {
    const res = await api.get('/api/bugs/' + id)
    logger.log(res.data)
    AppState.activeBug = res.data
  }

  async getNotesByBugId(bugId) {
    try {
      const res = await api.get('api/bugs/' + bugId + '/notes')
      AppState.notes = res.data
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }

  async edit(bugId, edit) {
    try {
      await api.put('api/bugs', bugId, edit)
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }

  async getActiveBug(id) {
    try {
      const res = await api.get('api/bugs', id)
      AppState.activeBug = res.data
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }

  async destroy(id) {
    try {
      await api.delete('api/bugs/' + id)
      // AppState.bugs = AppState.bugs.filter(bug => bug.id !== id)
      if (AppState.activeBug.closed === false) {
        AppState.activeBug.closed = true
        Pop.toast('Close Successful', 'success')
      } else {
        Pop.toast('Close Failed', 'error')
      }
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }
}
export const bugsService = new BugsService()
