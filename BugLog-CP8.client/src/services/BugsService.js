import { AppState } from '../AppState'
import { api } from './AxiosService'
import { logger } from '../utils/Logger'

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
    const res = await api.get('/api/bugs', id)
    logger.log(res.data)
    AppState.activeBug = res.data
  }

  async destroy(id) {
    await api.delete('/api/bugs', id)
    AppState.bugs = AppState.bugs.filter(bug => bug.id !== id)
  }
}
export const bugsService = new BugsService()
