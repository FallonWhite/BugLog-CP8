<template>
  <!-- <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center"> -->
  <div class="container-fluid justify-content-center">
    <div class="row">
      <button class="btn-lrg btn-outline-dark btn-success ml-5 mt-1" @click="openBugs">
        <b>Filter By Open Bugs</b>
      </button>
      <!-- <button class="btn-lrg btn-outline-dark btn-info ml-5 mt-1" @click="getAllBugs">
        <b>No Filter</b>
      </button> -->
      <button class="btn-lrg btn-outline-dark btn-danger ml-5 mt-1" @click="closedBugs">
        <b>Filter By Closed Bugs</b>
      </button>
    </div>
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
      openBugs: computed(() => AppState.bugs.filter(bug => bug.closed === false)),
      closedBugs: computed(() => AppState.bugs.filter(bug => bug.closed === true))
      // newBug: {}
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
      openBugs() {
        AppState.bugs = state.openBugs
      },
      closedBugs() {
        AppState.bugs = state.closedBugs
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
