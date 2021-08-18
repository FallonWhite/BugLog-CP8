<template>
  <div class="card col-11 d-flex text-white bg-info m-5" style="justify-content: space-around">
    <div class="card-header text-center m-4 ml-4">
      <h5 class="p-2" style="text-align: center; text-shadow: 1px 1px black; background-color: Black">
        <router-link :to="{ name: 'BugDetailsPage', params: {id: bugProp.id } }">
          Bug: {{ bugProp.title }}
        </router-link>
        <!-- </router-link> -->
      </h5>
    </div>
    <div class="card-body">
      <h5 class="card-title">
        <b class="text-dark">Title:</b> {{ bugProp.title }}
      </h5>
      <span>
        <img class="rounded-circle creator-pic my-1" :src="bugProp.creator?.picture" alt="">
        {{ bugProp.creator?.name }}
      </span>
      <p class="card-text">
        <b class="text-dark">Description:</b> <br />{{ bugProp.description }}
      </p>
      <span class="bg-dark">Last update: {{ new Date (bugProp.updatedAt).toLocaleString(time) }}</span>
      <br />
      <span class="bg-dark"> Status:
        <span v-if="bugProp.closed" class="text-light">
          <span class="text-secondary"></span>🔒Closed🔒</span>
        <span v-else class="text-info">
          <span class="text-success"></span> 🐛Open🐜
        </span>
        <!-- <p class="card-text">
        {{ bugProp.closed }}
      </p>
      <p class="card-text">
        {{ bugProp.closedDate }}
      </p> -->
        <button v-if="bugProp.creatorId === state.account.id && bugProp.closed != true" class="btn-lg btn-outline-dark btn-secondary m-5 p-2" style="" @click="destroy">
          <b>Close Bug</b>
        </button>
      </span>
    </div>
  </div>
  <BugModal :bug="bugProp" />
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
// import { router } from '../router'
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
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      route,
      time: {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      },
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
