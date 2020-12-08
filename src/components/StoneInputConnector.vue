<template>
  <div class="input-connector" @click="click"></div>
</template>

<script>
export default {
  name: 'StoneInputConnector',
  props: ['stoneInstance', 'variableIndex', 'valueIndex'],
  methods: {
    click() {
      this.$store.commit('editor/deleteConnectionsTo', {
        toStoneInstance: this.stoneInstance,
        toVariableIndex: this.variableIndex,
        toValueIndex: this.valueIndex
      })
    }
  }
}
</script>

<style scoped>
.input-connector {
  width: 0.5rem;
  height: 0.5rem;
  margin-bottom: 0.25rem;
  background: #fff;
  border-radius: 0.25rem;
}
</style>
