<template>
  <div class="stone-input-plug noselect" :style="plugStyle">
    {{ stateVariable.name }}
    <div class="connector-holder">
      <stone-input-connector
        class="input-connector"
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
// TODO merge part of this with StoneOutputPlug. Make DRYer
import Cobble from '@/lib/cobbleCore/cobbleCore.js'
import StoneInputConnector from '@/components/StoneInputConnector'

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
    StoneInputConnector
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
.stone-input-plug {
  text-align: left;
  margin: 0.5rem 0;
  padding: 0 0.25rem;
  position: relative;
  word-break: break-word;
  line-height: 0.75;
}
.connector-holder {
  width: 0.75rem;
  position: absolute;
  left: -0.45rem;
  top: 0;
}
</style>
