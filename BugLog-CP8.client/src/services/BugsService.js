import { AppState } from '../AppState'
import { api } from '../Services/AxiosService'
import { router } from '../router'
import { logger } from '../utils/Logger'

class BugsService {
  async create(bug) {
    const res = await api.post('/bugs', bug)
    AppState.bugs.push(res.data)
    router.push({ name: 'Bug Details', params: { id: res.data.id } })
    return res.data.id
  }

  async getAll() {
    const res = await api.get('/bugs')
    logger.log(res.data)
    AppState.cars = res.data
  }

  async getById(id) {
    const res = await api.get('/bugs', id)
    logger.log(res.data)
    AppState.activeBug = res.data
  }

  async destroy(id) {
    await api.delete('/bugs', id)
    AppState.bugs = AppState.bugs.filter(bug => bug.id !== id)
  }
}
export const bugsService = new BugsService()
