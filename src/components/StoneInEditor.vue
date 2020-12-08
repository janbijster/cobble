<template>
  <div class="stone-in-editor-holder" :style="stoneHolderStyle" ref="me">
    <div :class="['stone-in-editor', themeStyle]" @click="click">
      <drag class="stone-title cursor-move" :transfer-data="stoneInstance">
        {{ stoneInstance.name }}
      </drag>
      <div class="input-plugs">
        <stone-input-plug
          v-for="(stateVariable, index) in stoneInstance.inputVariables"
          :key="`input-${index}`"
          :ref="`inputs`"
          :state-variable="stateVariable"
          :stone-instance="stoneInstance"
          :variable-index="index"
        />
      </div>
      <div class="output-plugs">
        <stone-output-plug
          v-for="(stateVariable, index) in stoneInstance.outputVariables"
          :key="`output-${index}`"
          :ref="`outputs`"
          :state-variable="stateVariable"
          :stone-instance="stoneInstance"
          :variable-index="index"
        />
      </div>
    </div>
    <connection-line
      v-for="(connection, index) in stoneInstance.connections"
      :key="index"
      :connection="connection"
      :color="connectionColor"
    />
  </div>
</template>

<script>
import ConnectionLine from '@/components/ConnectionLine'
import variables from '@/assets/style/variables.scss'
import StoneOutputPlug from '@/components/StoneOutputPlug'
import StoneInputPlug from '@/components/StoneInputPlug'

export default {
  props: ['stoneInstance'],
  components: {
    ConnectionLine,
    StoneOutputPlug,
    StoneInputPlug
  },
  data() {
    return {
      connections: [],
      colors: {
        input: {
          themeClass: 'theme-green',
          backgroundColor: variables.greenDark,
          foregroundColor: variables.greenLight
        },
        process: {
          themeClass: 'theme-red',
          backgroundColor: variables.redDark,
          foregroundColor: variables.redLight
        },
        output: {
          themeClass: 'theme-orange',
          backgroundColor: variables.orangeDark,
          foregroundColor: variables.orangeLight
        }
      }
    }
  },
  mounted() {
    this.stoneInstance.editorComponent = this
    this.stoneInstance.editorElement = this.$refs['me']
  },
  methods: {
    click() {
      this.$store.commit('editor/selectStoneInstance', {
        stoneInstanceToSelect: this.stoneInstance
      })
    },
    getInputPlug(index) {
      return this.$refs.inputs ? this.$refs.inputs[index] : undefined
    },
    getOutputPlug(index) {
      return this.$refs.outputs ? this.$refs.outputs[index] : undefined
    }
  },
  computed: {
    themeStyle() {
      const selectedClass = this.stoneInstance.selected ? 'selected ' : ''
      return (
        selectedClass + this.colors[this.stoneInstance.stone.role].themeClass
      )
    },
    stoneHolderStyle() {
      return {
        left: `${this.stoneInstance.x}px`,
        top: `${this.stoneInstance.y}px`
      }
    },
    connectionColor() {
      return this.stoneInstance.selected
        ? this.colors[this.stoneInstance.stone.role].foregroundColor
        : this.colors[this.stoneInstance.stone.role].backgroundColor
    }
  }
}
</script>

<style>
.stone-in-editor-holder {
  position: absolute;
  width: 150px;
  font-size: 0.75rem;
}
.stone-in-editor {
  border-radius: 4px;
  padding: 3px;
  display: block;
  position: relative;
  z-index: 20;
}
.stone-title {
  border-radius: 3px;
  background: #ffffff20;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
}
.cursor-move {
  cursor: move;
}
.stone-in-editor.selected {
  color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 0px 1px #ffffff86;
}

.input-plugs,
.output-plugs {
  width: 50%;
  display: inline-block;
  display: inline-block;
  vertical-align: top;
}
</style>
