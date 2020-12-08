<template>
  <div class="stone-output-plug noselect" :style="plugStyle">
    {{ stateVariable.name }}
    <div class="connector-holder">
      <stone-output-connector
        class="output-connector"
        v-for="i in variableLength"
        :key="i"
        ref="connectors"
        :stone-instance="stoneInstance"
        :variable-index="variableIndex"
        :value-index="i - 1"
      />
    </div>
  </div>
</template>

<script>
import Cobble from '@/lib/cobbleCore/cobbleCore.js'
import StoneOutputConnector from '@/components/StoneOutputConnector'

export default {
  props: {
    stateVariable: {
      type: Object,
      default: null
    },
    stoneInstance: {
      type: Object,
      default: null
    },
    variableIndex: {
      type: Number,
      default: 0
    }
  },
  components: {
    StoneOutputConnector
  },
  computed: {
    variableLength() {
      return this.stateVariable.type == Cobble.StateVariable.Types.vector
        ? this.stateVariable.value.length
        : 1
    },
    plugStyle() {
      return {
        height: `${this.variableLength * 0.75 - 0.25}rem`
      }
    }
  },
  methods: {
    getConnector(index) {
      return this.$refs.connectors ? this.$refs.connectors[index] : undefined
    }
  }
}
</script>

<style scoped>
.stone-output-plug {
  text-align: right;
  margin: 0.5rem 0;
  padding: 0 0.25rem;
  position: relative;
  word-break: break-word;
  line-height: 0.75;
}
.connector-holder {
  width: 0.75rem;
  position: absolute;
  right: -0.7rem;
  top: 0;
}
</style>
