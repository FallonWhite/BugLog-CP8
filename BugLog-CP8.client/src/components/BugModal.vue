<template>
  <!-- Modal -->
  <div class="modal fade"
       id="bug-modal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title" id="bugModalLabel">
            New Bug
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body bg-dark">
          <form @submit.prevent="create">
            <div class="form-group">
              <label for="bug.title" class="col-form-label">Title:</label>
              <input v-model="state.newBug.title"
                     type="text"
                     name="title"
                     class="form-control"
                     placeholder="Bug Title..."
                     required
                     minlength="5"
                     maxlength="100"
              >
            </div>
            <div class="form-group">
              <label for="bug.description" class="col-form-label">Description:</label>
              <textarea v-model="state.newBug.description"
                        type="text"
                        class="form-control"
                        name="description"
                        placeholder="Bug Description..."
                        required
                        minlength="5"
                        maxlength="300"
              ></textarea>
            </div>
            <button type="button" class="btn btn-outline-dark btn-secondary m-2" data-dismiss="modal">
              <b><i>Cancel</i></b>
            </button>
            <button type="submit" class="btn btn-outline-dark btn-info">
              <b>Submit Bug</b>
            </button>
          </form>
        </div>
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Notifier'
import $ from 'jquery'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
// import { useRoute } from 'vue-router'
import { router } from '../router'
import { logger } from '../utils/Logger'
export default {
  setup() {
    // const router = useRouter()
    const state = reactive({
      user: computed(() => AppState.user),
      bug: computed(() => AppState.bug),
      newBug: {},
      thisBug: computed(() => AppState.activeBug)
    })
    return {
      state,
      async create() {
        try {
          const bugId = await bugsService.create(state.newBug)
          logger.log(state.newBug)
          $('#bug-modal').modal('hide')
          // jquery to close modal
          router.push({ name: 'BugDetailsPage', params: { id: bugId } })
          state.newBug = {}
          Pop.toast('Bug Creation Successful', 'Success')
        } catch (error) {
          Pop.toast(error, 'creation error')
        }
      }
    }
  }
}
</script>
<style lang="scss">
.modal-backdrop.show{
  opacity: 1!important;
  background:  var(--fade);
  backdrop-filter: blur(10px) brightness(.5) contrast(.75);
}
.modal-body{
  height: 50vh;
  overflow-y: auto;
  background-color: dark;
}
.hoverable {
  cursor: pointer;
}
</style>
