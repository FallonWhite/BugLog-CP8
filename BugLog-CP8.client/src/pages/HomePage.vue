<template>
  <!-- <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center"> -->
  <div class="container-fluid justify-content-center">
    <button class="btn btn-success mx-auto" @click="sortBuggs">
      Filter By Open Bugs
    </button>
    <button class="btn btn-danger ml-1" @click="sortBugs">
      Filter By Closed Bugs
    </button>
    <div class="row mt-4">
      <div class="col-12">
        <button class="btn-lrg btn-outline-secondary btn-info text-dark mt-5 ml-5 mr-5" data-target="#bug-modal" data-toggle="modal" aria-labelledby="create-bug" aria-label="create-bug">
          <b>Create Bug</b>
        </button>
      </div>
    </div>
    <!-- <div class="custom-switch">
      <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="state.showAll">
      <label class="custom-control-label action" for="StatusSwitch">{{ state.openBugs }}</label>
    </div>
  </div> -->

    <div class="row">
      <!-- <div class="col-11" v-if="state.showAll"> -->
      <BugCard v-for="b in bugs" :key="b.id" :bug-prop="b" />
      <!-- </div> -->
      <!-- <div v-else>
      <BugCard v-for="b in openBugs" :key="b.id" :bug-prop="b" />
    </div> -->
      <!-- //add v-else to render v-for="b in openBugs" -->
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
      // showOpen: false,
      // showClosed: true
      // add a bool for showOpen: false
      sortedBuggs: computed(() => AppState.bugs.filter(bug => bug.closed === false)),
      sortedBugs: computed(() => AppState.bugs.filter(bug => bug.closed === true)),
      newBug: {}
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
      sortBuggs() {
        AppState.bugs = state.sortedBuggs
      },
      sortBugs() {
        AppState.bugs = state.sortedBugs
      }
      // openBugs: computed(() => AppState.bugs.filter(b => b.closed === true)),
      // openBugs: computed(() => AppState.bugs.filter(b => !closed))
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
