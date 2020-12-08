<template>
  <div class="cobble-stone-list">
    <transition-group name="list">
      <div v-for="stoneInstance in stoneInstances" :key="stoneInstance.id">
        <stone-in-editor :stone-instance="stoneInstance" ref="stone" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import StoneInEditor from '@/components/StoneInEditor'

export default {
  name: 'CobbleStoneList',
  props: ['role'],
  components: { StoneInEditor },
  computed: {
    stoneInstances() {
      return this.$store.getters['editor/stoneInstancesPerRole'](this.role)
    }
  }
}
</script>

<style lang="scss" scoped>
.cobble-stone-list {
  margin: 10px 0;
  height: calc(100% - 20px);
  border-radius: 3px;
}
.list-enter-active {
  transition: all 0.15s ease;
}
.list-leave-active {
  transition: all 0.1s ease;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: scale(0) translateY(-50px);
}
</style>
