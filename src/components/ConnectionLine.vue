<template>
  <div class="connection-line-holder">
    <div class="anchor" ref="anchor" />
    <svg-line
      v-if="ready"
      :from-x="fromX"
      :to-x="toX"
      :from-y="fromY"
      :to-y="toY"
      :color="color"
    />
  </div>
</template>

<script>
import SvgLine from '@/components/SvgLine'

export default {
  props: ['connection', 'color'],
  components: {
    SvgLine
  },
  data() {
    return {
      updateIntervalId: null,
      checkInterval: 500,
      fromRect: null,
      toRect: null,
      anchorRect: null
    }
  },
  mounted() {
    this.updateIntervalId = setInterval(this.update, this.checkInterval)
  },
  computed: {
    fromConnector() {
      if (
        !this.connection.myStoneInstance ||
        !this.connection.myStoneInstance.editorComponent
      ) {
        return undefined
      }
      const outputPlug = this.connection.myStoneInstance.editorComponent.getOutputPlug(
        this.connection.myVariableIndex
      )
      if (!outputPlug) {
        return null
      }
      const connector = outputPlug.getConnector(this.connection.myValueIndex)
      return connector.$el
    },
    toConnector() {
      if (
        !this.connection.toStoneInstance ||
        !this.connection.toStoneInstance.editorComponent
      ) {
        return undefined
      }
      const inputPlug = this.connection.toStoneInstance.editorComponent.getInputPlug(
        this.connection.toVariableIndex
      )
      if (!inputPlug) {
        return null
      }
      const connector = inputPlug.getConnector(this.connection.toValueIndex)
      return connector.$el
    },
    fromX() {
      if (this.ready) {
        return this.fromRect.x + 0.5 * this.fromRect.width - this.anchorRect.x
      } else {
        return 0
      }
    },
    fromY() {
      if (this.ready) {
        return this.fromRect.y + 0.5 * this.fromRect.height - this.anchorRect.y
      } else {
        return 0
      }
    },
    toX() {
      if (this.ready) {
        return this.toRect.x + 0.5 * this.fromRect.width - this.anchorRect.x
      } else {
        return 0
      }
    },
    toY() {
      if (this.ready) {
        return this.toRect.y + 0.5 * this.toRect.height - this.anchorRect.y
      } else {
        return 0
      }
    },
    ready() {
      return (
        this.fromRect != null && this.anchorRect != null && this.toRect != null
      )
    }
  },
  methods: {
    update() {
      if (this.fromConnector != null) {
        this.fromRect = this.fromConnector.getBoundingClientRect()
      }
      if (this.toConnector != null) {
        this.toRect = this.toConnector.getBoundingClientRect()
      }
      let anchorEl = this.$refs['anchor']
      if (anchorEl != null) {
        this.anchorRect = anchorEl.getBoundingClientRect()
      }
    }
  }
}
</script>

<style>
.connection-line-holder {
  position: absolute;
  z-index: 10;
}
</style>
