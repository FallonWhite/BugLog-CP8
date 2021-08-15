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
        <div class="modal-header">
          <h5 class="modal-title" id="bugModalLabel">
            New Bug
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="create">
            <div class="form-group">
              <label for="bug.title" class="col-form-label">Title:</label>
              <input v-model="state.newBug.title" type="text" class="form-control" placeholder="Bug Title..." id="bug.title">
            </div>
            <div class="form-group">
              <label for="bug.description" class="col-form-label">Description:</label>
              <textarea v-model="state.newBug.description" class="form-control" placeholder="Bug Description..." id="bug.description"></textarea>
            </div>
            <button type="button" class="btn btn-outline-dark btn-warning m-2" data-dismiss="modal">
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
// import Pop from '../utils/Notifier'
import $ from 'jquery'
export default {
  setup() {
    const state = reactive({
      newBug: {}
    })
    return {
      state,
      async create() {
        await bugsService.create(state.newBug)
        state.newBug = {}
        // jquery to close modal
        $('#bug-modal').modal('hide')
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
</style>
