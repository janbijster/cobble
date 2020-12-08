<template>
  <div class="run-project window theme-dark">
    <iframe class="run-iframe" :src="runUrl" id="iframe" />
  </div>
</template>

<script>
const runUrl = RUN_URL // eslint-disable-line

export default {
  name: 'RunProject',
  data() {
    return {
      runUrl
    }
  },
  mounted() {
    // inject the project as js into the iframe:
    let iframe = document.getElementById('iframe')
    iframe.addEventListener('load', () => {
      iframe.contentWindow.projectJson = this.currentProject.toJson()
      iframe.contentWindow.eval('window.startCobble(window.projectJson)')
    })
  },
  destroyed() {
    console.log('Stopping...')
  },
  computed: {
    currentProject() {
      return this.$store.getters['editor/getProject']
    }
  }
}
</script>

<style>
.run-project {
  position: relative;
}
#iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: none;
}
</style>
