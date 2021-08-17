<template>
  <!-- Modal -->
  <div class="modal fade"
       id="note-modal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title" id="noteModalLabel">
            New Note
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body bg-dark">
          <form @submit.prevent="create">
            <div class="form-group">
              <label for="note.body" class="col-form-label">Info:</label>
              <textarea v-model="state.newNote.body"
                        class="form-control"
                        name="body"
                        placeholder="Note Information..."
                        id="note.body"
              ></textarea>
            </div>
            <button type="button" class="btn btn-outline-dark btn-secondary m-2" data-dismiss="modal">
              <b><i>Cancel</i></b>
            </button>
            <button type="submit" class="btn btn-outline-dark btn-info">
              <b>Add Note</b>
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
import { notesService } from '../services/NotesService'
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Notifier'
import $ from 'jquery'
export default {
  name: 'NoteModal',
  props: {
    bugProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      newNote: {
        bug: props.bugProp.id
      },
      thisNote: computed(() => AppState.activeNote)
    })
    return {
      state,
      async create() {
        try {
          state.newNote.bugId = route.params.id
          await notesService.create(state.newNote)
          state.newNote = {}
          bugsService.getNotesByBugId(route.params.id)
          $('#note-modal').modal('toggle')
          Pop.toast('Created Successfully', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
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
