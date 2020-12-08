<template>
  <drag :class="['draggable-stone', themeStyle]" :transfer-data="cobbleStone">
    <div class="role-part">{{ cobbleStone.role }}</div>
    <div class="name-part color-white">{{ cobbleStone.name }}</div>
  </drag>
</template>

<script>
export default {
  props: ['cobbleStone'],
  methods: {
    add() {
      // this.$store.commit('editor/addStone', { stone: this.cobbleStone })
    }
  },
  computed: {
    themeStyle() {
      if (this.cobbleStone.role == 'input') {
        return 'theme-green'
      } else if (this.cobbleStone.role == 'process') {
        return 'theme-red'
      } else if (this.cobbleStone.role == 'output') {
        return 'theme-orange'
      } else {
        return 'theme-blue'
      }
    }
  }
}
</script>

<style>
.role-part,
.name-part {
  display: inline;
}
.role-part {
  margin-right: 20px;
}
.draggable-stone {
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  display: block;
  margin: 0 0 10px;
}
.draggable-stone-add-button {
  float: right;
}
</style>
