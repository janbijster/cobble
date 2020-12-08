<template>
  <div class="connection-line">
    <svg :width="width" :height="height" :style="svgStyle">
      <path
        :d="
          `
            M ${fromX - left} ${fromY - top}
            Q ${fromX + bezierControl - left} ${fromY - top}
              ${middleX - left} ${middleY - top}
            Q ${toX - bezierControl - left} ${toY - top}
              ${toX - left} ${toY - top}

          `
        "
        :stroke="color"
        :stroke-width="strokeWidth"
        fill="none"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      default: '#fff'
    },
    fromX: {
      default: 0
    },
    toX: {
      default: 0
    },
    fromY: {
      default: 0
    },
    toY: {
      default: 0
    },
    strokeWidth: {
      default: 5
    },
    bezierControl: {
      default: 30
    },
    opacity: {
      default: 1
    }
  },
  computed: {
    left() {
      return (
        Math.min(this.fromX, this.toX) - this.strokeWidth - this.bezierControl
      )
    },
    top() {
      return (
        Math.min(this.fromY, this.toY) - this.strokeWidth - this.bezierControl
      )
    },
    width() {
      return (
        Math.max(this.fromX, this.toX) +
        2 * this.strokeWidth +
        this.bezierControl -
        this.left
      )
    },
    height() {
      return (
        Math.max(this.fromY, this.toY) +
        2 * this.strokeWidth +
        this.bezierControl -
        this.top
      )
    },
    svgStyle() {
      return {
        top: `${this.top}px`,
        left: `${this.left}px`,
        position: 'absolute',
        opacity: this.opacity
      }
    },
    middleX() {
      return 0.5 * (this.fromX + this.toX)
    },
    middleY() {
      return 0.5 * (this.fromY + this.toY)
    }
  }
}
</script>

<style>
.connection-line {
  position: absolute;
  z-index: 10;
}
</style>
