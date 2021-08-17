<template>
  <div class="bugDetailsPage container-fluid">
    <div class="row">
      <button class="btn-lrg btn-outline-secondary btn-info text-dark m-5" data-target="#note-modal" data-toggle="modal">
        <b class="align-center">Add Note</b>
      </button>
      <BugCard :bug-prop="bug" v-if="bug.id" />
    </div>
    <div class="row">
      <NoteCard v-for="n in notes" :note-prop="n" />
    </div>
    <NoteModal :bug-prop="bug" />
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
import NoteModal from '../components/NoteModal.vue'

export default {
  components: { NoteModal },
  setup() {
    const route = useRoute()
    const router = useRouter()
    onMounted(async() => {
      try {
        await bugsService.getById(route.params.id)
        await bugsService.getNotesByBugId(route.params.id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      bug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
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
