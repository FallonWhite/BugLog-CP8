<template>
  <div class="card col-11 d-flex text-white bg-info m-5" style="justify-content: space-around">
    <div class="card-header text-center">
      <h5 class="p-2" style="text-align: center; text-shadow: 1px 1px black; background-color: Black">
        {{ new Date (noteProp.createdAt).toLocaleString(time) }} - <img class="rounded-circle creator-pic my-1" style="max-width:40px" :src="noteProp.creator?.picture" alt=""> {{ noteProp.creator?.name }}
      </h5>
    </div>
    <div class="card-body">
      <!-- <h5 class="card-title">
        <b class="text-dark">Title:</b> {{ noteProp.title }}
      </h5> -->
      <span>

        <!-- {{ noteProp.creator?.name }} -->
      </span>
      <p class="card-text">
        <b class="text-dark">Info:</b> <br />
        {{ noteProp.body }}
      </p>
      <button class="btn-sm btn-dark" style="background-color: grey" @click="destroy" v-if="state.user.isAuthenticated && state.account.id === noteProp.creatorId">
        ❌Delete❌
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
// import { router } from '../router'
import Pop from '../utils/Notifier'
import { notesService } from '../services/NotesService'
export default {
  props: {
    noteProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    return {
      state,
      route,
      async destroy() {
        try {
          if (await Pop.confirm()) {
            await notesService.destroy(props.noteProp._id, props.noteProp.bug.id)
            Pop.toast('Deleted Successfully', 'success')
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>
<style>

</style>
