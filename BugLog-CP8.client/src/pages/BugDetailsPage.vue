<template>
  <div class="bugDetailsPage">
    <div class="d-flex flex-column align-items-center mt-3">
      <img
        alt="logo"
        src="../assets/img/bug-software.jpg"
        height="150"
      />
      <h1 class="m-5 mt-1" style="text-align: center">
        Welcome the Bug Details page
      </h1>
      <h4>{{ bug.title }}</h4>
      <h5>{{ bug.description }}</h5>
    </div>
    <NoteCard v-for="n in notes" :key="n.id" :note-prop="n" />
  </div>
</template>

    <!-- <BugCard v-for="b in bugs" :key="b.id" :bug-prop="b" /> -->

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

<style>
.bugDetails {
  text-align: center;
  align-items: center;
}

</style>
