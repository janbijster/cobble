<template>
  <drop
    class="cobble-field"
    @drop="drop"
    @dragover="dragover"
    ref="cobbleField"
    @mousedown.native="click"
  >
    <stone-in-editor
      v-for="stoneInstance in stoneInstances"
      :key="stoneInstance.id"
      :stone-instance="stoneInstance"
      ref="stone"
    />
  </drop>
</template>

<script>
import StoneInEditor from '@/components/StoneInEditor'
import Cobble from '@/lib/cobbleCore/cobbleCore.js'

export default {
  components: { StoneInEditor },
  data() {
    return {
      rect: { top: 0, left: 0, height: 0, width: 0 },
      currentRelativeDragLeft: 0,
      currentRelativeDragTop: 0
    }
  },
  computed: {
    stoneInstances() {
      return this.$store.getters['editor/stoneInstances']
    }
  },
  mounted() {
    window.addEventListener('resize', this.getFieldBoundingClientRect)
    this.getFieldBoundingClientRect()
  },
  destroyed() {
    window.removeEventListener('resize', this.getFieldBoundingClientRect)
  },
  methods: {
    getFieldBoundingClientRect() {
      this.rect = this.$refs['cobbleField'].$el.getBoundingClientRect()
    },
    dragover(cobbleStone, dragEvent) {
      this.currentRelativeDragLeft = dragEvent.clientX - this.rect.left - 75
      this.currentRelativeDragTop = dragEvent.clientY - this.rect.top - 10
    },
    drop(stone) {
      // is it a (new to add) Stone or (existing) stoneInstance?
      // console.log(stone, stone.constructor.name)
      if (stone instanceof Cobble.Stone) {
        // Add stone
        this.$store.commit('editor/addStone', {
          stone,
          x: this.currentRelativeDragLeft,
          y: this.currentRelativeDragTop
        })
      } else if (stone instanceof Cobble.StoneInstance) {
        this.$set(stone, 'x', this.currentRelativeDragLeft)
        this.$set(stone, 'y', this.currentRelativeDragTop)
        this.$store.commit('editor/orderStones')
        this.$store.dispatch('editor/saveProject')
        this.$store.commit('editor/selectStoneInstance', {
          stoneInstanceToSelect: stone
        })
      }
    },
    click(event) {
      if (event.target == this.$refs['cobbleField'].$el) {
        console.log('deselect')
        this.$store.commit('editor/selectStoneInstance', {})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cobble-field {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}
</style>
