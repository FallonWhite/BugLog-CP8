<template>
  <div class="bugDetails">
    <h1 class="m-5">
      This is the Bug Details page
    </h1>
  </div>
</template>

<script>
// export default {
//   name: 'BugDetails',
//   setup() {
//     return {}
//   },
//   components: {}
// }

import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { useRoute, useRouter } from 'vue-router'
import { logger } from '../utils/Logger'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    onMounted(async() => {
      try {
        await bugsService.getById(route.params.id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      bug: computed(() => AppState.activeBug),
      async destroy() {
        try {
          await bugsService.destroy(route.params.id)
          router.push({ name: 'Home' }) // use push to push user back to home after closing bug
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
