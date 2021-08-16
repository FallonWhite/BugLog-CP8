<template>
  <div class="card col-12 text-white bg-info mb-3 m-4 mr-3 justify-content-center" style="">
    <div class="card-header text-center">
      <h5 class="p-2" style="text-align: center; text-shadow: 1px 1px black; background-color: Black">
        <router-link :to="{ name: 'BugDetailsPage', params: {id: bugProp.id } }">
          {{ bugProp.title }}
        </router-link>
        <!-- </router-link> -->
      </h5>
    </div>
    <div class="card-body">
      <h5 class="card-title">
        <b class="text-dark">Title:</b> {{ bugProp.title }}
      </h5>
      <p class="card-text">
        <b class="text-dark">Description:</b> <br />{{ bugProp.description }}
      </p>
      <!-- <p class="card-text">
        {{ bugProp.closed }}
      </p>
      <p class="card-text">
        {{ bugProp.closedDate }}
      </p> -->
      <div class="align-self-end" v-if="account.id === bugProp.creatorId">
        <button class="btn-sm btn-dark" style="background-color: grey" @click="destroy">
          Close Bug
        </button>
      </div>
    </div>
  </div>
  <BugModal :bug="bugProp" />
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { bugsService } from '../services/BugsService'
export default {
  props: {
    bugProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async destroy() {
        try {
          if (await Pop.confirm()) {
            await bugsService.destroy(props.bugProp.id)
            Pop.toast('Bug Closed', 'Success!')
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
.card{
  width: 500vh;
}
</style>
