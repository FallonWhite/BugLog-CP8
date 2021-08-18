<template>
  <!-- <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center"> -->
  <div class="container-fluid">
    <div class="row mt-4">
      <div class="col-12 text-center">
        <button class="btn-lrg btn-outline-secondary btn-info text-dark mr-5" data-target="#bug-modal" data-toggle="modal">
          <b>Create Bug</b>
        </button>
        <!-- </div>
    </div>
    <div class="custom-switch">
      <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="state.showAll">
      <label class="custom-control-label action" for="StatusSwitch">{{ state.openBugs }} - {{ state.closedBugs }}</label>
    </div>
  </div> -->

        <div class="ui buttons big my-4 mr-4">
          <button
            class="ui button toggle"
            style="background-color: pink"
            @click="toggle"
          >
            Closed Bugs
          </button>
          <button
            class="ui button toggle"
            @click="toggle"
          >
            Open Bugs
          </button>
        </div>
        <div class="row">
          <!-- <div class="col-11" v-if="state.showAll"> -->
          <BugCard v-for="b in bugs" :key="b.id" :bug-prop="b" />
        </div>
        <!-- <div v-else-if="state.showOpen">
    </div> -->
        <!-- //add v-else to render v-for="b in openBugs" -->
      </div>
      <router-view>
      </router-view>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import { bugsService } from '../services/BugsService'
import BugCard from '../components/BugCard.vue'
import { logger } from '../utils/Logger'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      showOpen: false
      // showClosed: true

      // add a bool for showOpen: false
    })
    onMounted(async() => {
      try {
        await bugsService.getAll()
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      bugs: computed(() => AppState.bugs),
      openBugs: computed(() => AppState.bugs.filter(b => b.closed === true)),
      closedBugs: computed(() => AppState.bugs.filter(b => !closed))
      // openBugs: computed(() => AppState.bugs.filter(b => b.closed === true))
      //  add computed for openBugs  appstate.bugs.filter(b => !closed)
    }
  },
  components: {
    BugCard
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
