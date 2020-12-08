<template>
  <div class="output-connector" ref="output-connector" @mousedown="mouseDown">
    <svg-line
      v-if="grabbed"
      :from-x="3"
      :from-y="4"
      :to-x="lineToX"
      :to-y="lineToY"
      :color="lineColor"
      :opacity="lineOpacity"
    />
  </div>
</template>

<script>
import Cobble from '@/lib/cobbleCore/cobbleCore.js'
import SvgLine from '@/components/SvgLine'
import variables from '@/assets/style/variables.scss'

export default {
  name: 'StoneOutputConnector',
  props: ['stoneInstance', 'variableIndex', 'valueIndex'],
  components: {
    SvgLine
  },
  data() {
    return {
      grabbed: false,
      lineToX: 0,
      lineToY: 0,
      rect: { top: 0, left: 0, height: 0, width: 0 },
      lineColor: variables.blueExtraLight,
      lineOpacity: 0.25
    }
  },
  mounted() {
    window.addEventListener('mouseup', this.mouseUp)
    window.addEventListener('mousemove', this.mouseMove)
    window.addEventListener('resize', this.getHolderBoundingClientRect)
    this.getHolderBoundingClientRect()
  },
  beforeDestroy() {
    window.removeEventListener('mouseup', this.mouseUp)
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('resize', this.getHolderBoundingClientRect)
  },
  methods: {
    getHolderBoundingClientRect() {
      this.rect = this.$refs['output-connector'].getBoundingClientRect()
    },
    mouseDown() {
      this.grabbed = true
      this.getHolderBoundingClientRect()
    },
    mouseMove(event) {
      if (this.grabbed) {
        this.lineToX = event.clientX - this.rect.left
        this.lineToY = event.clientY - this.rect.top
        // see if it is an input plug
        if (this.getTargetName(event) == 'StoneInputConnector') {
          // yep
          this.lineOpacity = 1
        } else {
          this.lineOpacity = 0.25
          // console.log(event.target)
        }
      }
    },
    mouseUp(event) {
      if (this.grabbed) {
        if (this.getTargetName(event) == 'StoneInputConnector') {
          // make connection
          const toComponent = this.getTargetComponent(event)
          // check if there is already a connection to this connector, if so remove it
          this.$store.commit('editor/deleteConnectionsTo', {
            toStoneInstance: toComponent.stoneInstance,
            toVariableIndex: toComponent.variableIndex,
            toValueIndex: toComponent.valueIndex
          })

          // make the new connection
          this.stoneInstance.connections.push(
            new Cobble.Connection({
              myStoneInstance: this.stoneInstance,
              toStoneInstance: toComponent.stoneInstance,
              myVariableIndex: this.variableIndex,
              toVariableIndex: toComponent.variableIndex,
              myValueIndex: this.valueIndex,
              toValueIndex: toComponent.valueIndex
            })
          )
          this.$store.dispatch('editor/saveProject')
        }
        this.grabbed = false
      }
    },
    getTargetComponent(event) {
      if (event && event.target && event.target.__vue__) {
        return event.target.__vue__
      } else {
        return null
      }
    },
    getTargetName(event) {
      const component = this.getTargetComponent(event)
      if (component && component.$options && component.$options.name) {
        return component.$options.name
      } else {
        return null
      }
    }
  }
}
</script>

<style scoped>
.output-connector {
  width: 0.5rem;
  height: 0.5rem;
  margin-bottom: 0.25rem;
  background: #fff;
  border-radius: 0.25rem;
  z-index: 0;
}
</style>
