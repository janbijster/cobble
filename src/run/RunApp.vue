<template>
  <div id="canvas-holder" ref="canvas-holder"></div>
</template>

<script>
import api from '@/lib/api.js'
const getCobble = () => import('@/lib/cobbleCore/cobbleCore.js')

export default {
  name: 'run-app',
  data() {
    return {
      project: null
    }
  },
  mounted() {
    api
      .getPublishedProject()
      .then(response => {
        let success = response.data.success
        if (success) {
          this.startProject(response.data.data)
        }
      })
      .catch(() => {
        // maybe used as an iframe, leave callback on window to trigger play
        window.startCobble = projectJson => this.startProject(projectJson)
      })
  },
  methods: {
    startProject(projectJson) {
      getCobble().then(module => {
        const Cobble = module.default
        this.project = Cobble.ProjectList.ProjectFromJson(projectJson)
        new Cobble(this.project)
      })
    }
  }
}
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  background-color: #000;
  overflow: hidden;
}
#canvas-holder {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
}
</style>
