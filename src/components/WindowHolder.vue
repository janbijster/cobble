<template>
  <div class="window-holder">
    <div class="window-title">
      <div
        v-for="(component, index) in componentStack"
        :key="index"
        class="crumb"
      >
        <a
          v-if="index < componentStack.length - 1"
          @click="backToIndex(index)"
          >{{ component.name }}</a
        >
        <div v-else class="current-component-title">{{ component.name }}</div>
        <div class="crumb-caret" v-if="index < componentStack.length - 1">
          >
        </div>
      </div>
      {{ title }}
    </div>
    <a v-if="componentStack && hasBack" class="p right-button" @click="back">
      back
    </a>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WindowHolder',
  props: ['componentStack', 'title'],
  computed: {
    hasBack() {
      return this.componentStack.length > 1
    }
  },
  methods: {
    back() {
      this.$emit('back')
    },
    backToIndex(toIndex) {
      let stepsBack = this.componentStack.length - toIndex - 1
      for (let i = 0; i < stepsBack; i++) {
        this.back()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';

.window-holder {
  height: 100%;
  position: relative;
}
.window-title {
  margin-bottom: 10px;
  color: $blue-light;
}
.window-title a {
  color: $blue-extra-light;
}
.current-component-title {
  color: $white;
}
.right-button {
  right: 0;
  top: 0;
  position: absolute;
}
.crumb {
  display: inline-block;
}
.crumb-caret {
  display: inline-block;
  margin: 0 3px;
}
</style>
