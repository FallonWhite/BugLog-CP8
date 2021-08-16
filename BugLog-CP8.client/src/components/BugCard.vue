<template>
  <div class="card col-md-12 text-white bg-info mb-3 m-4 justify-content-center" style="">
    <div class="card-header text-center">
      <h5 class="p-2" style="text-align: center; text-shadow: 2px 2px black; background-color: grey">
        <router-link :to="{ name: 'BugDetailsPage', params: {id: bugProp.id } }">
          Bug
        </router-link>
        <!-- </router-link> -->
      </h5>
    </div>
    <div class="card-body">
      <h5 class="card-title">
        {{ bugProp.title }}
      </h5>
      <p class="card-text">
        {{ bugProp.description }}
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
