<template>
  <div class="stone-browser window theme-dark">
    <!-- <draggable-stone stone-name="Some input stone" role="input" />
    <draggable-stone stone-name="other input" role="input" />
    <draggable-stone stone-name="Stone for processing" role="process" />
    <draggable-stone stone-name="Stone" role="output" /> -->
    <draggable-stone
      v-for="(stone, index) in builtInStones"
      :key="index"
      :cobble-stone="stone"
    />
  </div>
</template>

<script>
import DraggableStone from '@/components/DraggableStone'
import Cobble from '@/lib/cobbleCore/cobbleCore.js'

export default {
  name: 'StoneBrowser',
  data() {
    return {
      builtInStones: Cobble.builtInStones
    }
  },
  components: {
    DraggableStone
  }
}
</script>

<style lang="scss">
.stone-browser {
  overflow-y: scroll;
}
</style>
