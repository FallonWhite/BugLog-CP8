<template>
  <div class="bugDetailsPage container-fluid">
    <div class="row">
      <button class="btn-lrg btn-outline-secondary btn-info text-dark m-5" data-target="#note-modal" data-toggle="modal" aria-label="addNote" title="addNote">
        <b class="align-center">Add Note</b>
      </button>
      <!-- <button class="btn-lrg btn-outline-secondary btn-info text-dark m-5" data-target="#edit-bug-modal" data-toggle="modal">
        <b class="align-center">Edit</b>
      </button> -->
      <BugCard :bug-prop="bug" v-if="bug.id" />
    </div>
    <div class="row">
      <NoteCard v-for="n in notes" :key="n.id" :note-prop="n" />
    </div>
    <NoteModal :bug-prop="bug" />
    <!-- <EditBugModal :bug-prop="bug" /> -->
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
    // const state = reactive({
    //   newNote: {
    //     body: '',
    //     bugId: route.params.id
    //   }
    // })
    onMounted(async() => {
      try {
        await bugsService.getById(route.params.id)
        await bugsService.getNotesByBugId(route.params.id)
        // await bugsService.edit(route.params.id) // added to edit - attempt
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      // state,
      bug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      async destroy() {
        try {
          await bugsService.destroy(route.params.id)
          router.push({ name: 'Home' }) // use push to push user back to home after closing bug
          // await bugsService.edit(route.params.id) // added to edit
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
