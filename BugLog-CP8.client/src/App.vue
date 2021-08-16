<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <div class="modals">
      <BugModal />
      <!-- <NoteModal /> -->
    </div>
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      🐛🐜🐛🤍Made by Fallon🤍🐛🐜🐛
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.main {
flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: url('./assets/img/pinkBugs.jpg');
  background-position: center;
  background-size: cover;
}

</style>
