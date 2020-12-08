<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }" class="logo-holder">
        <img
          src="../assets/images/cobble-up-logo.png"
          class="title-icon"
          alt="Cobble"
        />
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item
        tag="router-link"
        :to="{ path: '/' }"
        v-if="currentRouteName != 'home'"
        class="color-orange mar-right-md"
      >
        <b-icon icon="chevron-left" size="is-small"></b-icon>
        <span class="mar-left-sm">back</span>
      </b-navbar-item>
      <b-navbar-item
        v-else-if="!running"
        class="color-orange mar-right-md"
        @click="run"
      >
        <b-icon icon="play" size="is-small"></b-icon>
        <span class="mar-left-sm">run</span>
      </b-navbar-item>
      <b-navbar-item v-else class="color-orange mar-right-md" @click="stop">
        <b-icon icon="stop" size="is-small"></b-icon>
        <span class="mar-left-sm">stop</span>
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'cloud' }"
        >cloud</b-navbar-item
      >
      <b-navbar-item tag="router-link" :to="{ name: 'about' }"
        >about</b-navbar-item
      >
    </template>

    <!-- <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button theme-orange">Sign up</a>
          <a class="button theme-blue">Log in</a>
        </div>
      </b-navbar-item>
    </template> -->
  </b-navbar>
</template>

<script>
import api from '@/lib/api.js'

export default {
  methods: {
    publishAndOpen() {
      api
        .publishProject(this.currentProject.toJson(), this.currentProject.id)
        .then(response => {
          let url = `./run/?id=${response.data.data.id}`
          window.open(url)
        })
        .catch(error => {
          console.log(error)
        })
    },
    run() {
      //this.publishAndOpen()
      this.$store.commit('navigation/openInMainPane', 'run')
    },
    stop() {
      this.$store.commit('navigation/mainPaneBack')
    }
  },
  computed: {
    currentProject() {
      return this.$store.getters['editor/getProject']
    },
    running() {
      return this.$store.getters['navigation/mainPaneComponent'].name == 'Run'
    },
    currentRouteName() {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
.logo-holder {
  padding: 0 12px;
}
.title-icon {
  min-height: 40px;
  max-height: 40px;
  margin: 0px 10px 0 0;
}
</style>
