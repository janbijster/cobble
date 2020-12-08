<template>
  <div id="app">
    <navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  components: {
    Navigation
  },
  mounted() {
    if (ENVIRONMENT == 'production') { // eslint-disable-line
      window.onbeforeunload = () => true
    }
    setTimeout(() => this.$store.dispatch('editor/initialize'), 500)
  }
}
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  overflow: hidden !important;
}
</style>
