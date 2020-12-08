<template>
  <div class="main-window">
    <div class="columns">
      <div class="column is-one-third">
        <window-holder
          :component-stack="sidePaneComponentStack"
          @back="sidePaneBack"
        >
          <component
            :is="getPropSafe(currentSidePaneComponent, 'componentName')"
          />
        </window-holder>
      </div>
      <div class="column">
        <window-holder
          :component-stack="mainPaneComponentStack"
          @back="mainPaneBack"
        >
          <component
            :is="getPropSafe(currentMainPaneComponent, 'componentName')"
          />
        </window-holder>
      </div>
    </div>
  </div>
</template>

<script>
import WindowHolder from '@/components/WindowHolder'
import StoneInspector from '@/components/StoneInspector'
import StoneBrowser from '@/components/StoneBrowser'
import CodeEditor from '@/components/CodeEditor'
import ProjectEditor from '@/components/ProjectEditor'
import RunProjectIframe from '@/components/RunProjectIframe'

export default {
  name: 'MainWindow',
  components: {
    WindowHolder,
    StoneInspector,
    ProjectEditor,
    RunProjectIframe,
    StoneBrowser,
    CodeEditor
  },
  data() {
    return {}
  },
  mounted() {},
  computed: {
    currentMainPaneComponent() {
      return this.$store.getters['navigation/mainPaneComponent']
    },
    currentSidePaneComponent() {
      return this.$store.getters['navigation/sidePaneComponent']
    },
    sidePaneComponentStack() {
      return this.$store.getters['navigation/sidePaneComponentStack']
    },
    mainPaneComponentStack() {
      return this.$store.getters['navigation/mainPaneComponentStack']
    }
  },
  methods: {
    getPropSafe: (object, property) =>
      object == null ? null : object[property],
    sidePaneBack() {
      this.$store.commit('navigation/sidePaneBack')
    },
    mainPaneBack() {
      this.$store.commit('navigation/mainPaneBack')
    },
    run() {
      this.$store.commit('navigation/openInMainPane', 'run')
    }
  }
}
</script>

<style lang="scss" scoped>
.main-window {
  position: absolute;
  top: 52px;
  bottom: 0px;
  left: 0;
  right: 0;
  margin: 30px 20px 20px;
}
.columns {
  height: 100%;
}
</style>
