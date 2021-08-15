<template>
  <!-- <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center"> -->
  <div class="container-fluid">
    <div class="row mt-4">
      <div class="col-12 text-right">
        <button class="btn btn-outline-secondary btn-info text-dark mr-5" data-target="#bug-modal" data-toggle="modal">
          <b>Create Bug</b>
        </button>
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-12">
        <h1 class="text-info p-4 m-4" style="text-align: center; text-shadow: 2px 2px black; background-color: grey">
          <button class="btn btn-outline-secondary btn-info text-center mr-5 text-dark" data-target="#bug-modal" data-toggle="modal">
            <b>Create Bug</b>
          </button>
        </h1>
      </div> -->
    <div class="row">
      <div class="col-4" v-for="b in bugs" :key="b.id">
        <BugCard :bug="b" />
      </div>
    </div>
  </div>
  <router-view>
  </router-view>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import { bugsService } from '../services/BugsService'
import BugCard from '../components/BugCard.vue'
import { logger } from '../utils/Logger'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await bugsService.getAll()
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      bugs: computed(() => AppState.bugs)
    }
  },
  components: {
    BugCard
    BugModal
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
