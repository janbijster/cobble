<template>
  <div class="code-editor">
    <template v-if="selectedStoneInstance == null">
      <div class="notice">No stone selected</div>
    </template>
    <template v-else>
      <input class="input-name" v-model="instanceName" />
      <!-- State -->
      <div class="function-tite mar-top-sm">State</div>
      <div class="state-variables">
        <state-variable-editor
          v-for="(variable, index) in selectedStoneInstance.state"
          :key="index"
          :original-state-variable="variable"
          :editable="editable"
          @delete="deleteStateVariable(index)"
          @save="saveStateVariable($event, index)"
        />
        <b-button
          v-if="editable"
          class="button new-button theme-blue"
          @click="newStateVariable"
        >
          <b-icon icon="plus" size="is-small"></b-icon>
          <span class="mar-left-sm">New</span>
        </b-button>
      </div>
      <!-- End state -->
      <!-- Save and close buttons if editable -->
      <template v-if="editable">
        Code
        <b-button
          :class="[
            'button code-editor-button mar-right-sm',
            anyCodeChanged ? 'theme-green' : 'theme-blue'
          ]"
          @click="save"
        >
          <b-icon icon="check" size="is-small"></b-icon>
          <span class="mar-left-sm">Save</span>
        </b-button>
        <b-button
          :class="[
            'button code-editor-button',
            anyCodeChanged ? 'theme-red' : 'theme-blue'
          ]"
          @click="cancel"
        >
          <b-icon icon="cancel" size="is-small"></b-icon>
          <span class="mar-left-sm">Cancel</span>
        </b-button>
      </template>
      <!-- End save and close buttons if editable -->
      <!-- Code -->
      <template v-if="editable">
        <div class="function-title start-function-title">Start</div>
        <prism-editor
          v-model="startCode"
          language="js"
          :readonly="!editable"
        ></prism-editor>
        <div class="function-title">Update</div>
        <prism-editor
          v-model="updateCode"
          language="js"
          :readonly="!editable"
        ></prism-editor>
      </template>
      <!-- end code -->
    </template>
  </div>
</template>

<script>
import PrismEditor from 'vue-prism-editor'
import 'prismjs'
import '@/assets/style/prismTheme.css'
import Cobble from '@/lib/cobbleCore/cobbleCore.js'
import StateVariableEditor from './StateVariableEditor'

const initialcodeText = 'loading...'

export default {
  components: {
    PrismEditor,
    StateVariableEditor
  },
  data() {
    return {
      startCode: initialcodeText,
      updateCode: initialcodeText,
      instanceName: initialcodeText
    }
  },
  mounted() {
    this.startCode = this.selectedStoneInstance.startFunctionCode
    this.updateCode = this.selectedStoneInstance.updateFunctionCode
    this.instanceName = this.selectedStoneInstance.name
  },
  methods: {
    save() {
      this.$store.commit('editor/saveCode', {
        stoneInstance: this.selectedStoneInstance,
        startFunctionCode: this.startCode,
        updateFunctionCode: this.updateCode
      })
      //this.$store.commit('navigation/mainPaneBack')
    },
    cancel() {
      this.startCode = this.selectedStoneInstance.startFunctionCode
      this.updateCode = this.selectedStoneInstance.updateFunctionCode
    },
    saveStateVariable(stateVariable, index) {
      this.$set(
        this.selectedStoneInstance.state,
        index,
        stateVariable.getCopy()
      )
      this.$store.dispatch('editor/saveProject')
    },
    deleteStateVariable(index) {
      this.selectedStoneInstance.state.splice(index, 1)
      this.$store.dispatch('editor/saveProject')
    },
    newStateVariable() {
      this.selectedStoneInstance.state.push(
        new Cobble.StateVariable({
          name: 'newStateVariable',
          type: Cobble.StateVariable.Types.number
        })
      )
      this.$store.dispatch('editor/saveProject')
    }
  },
  // watch: {
  //   startCode(newCode) {
  //     console.log(`Start code changed to: ${newCode}`)
  //   },
  //   updateCode(newCode) {
  //     console.log(`Update code changed to: ${newCode}`)
  //   }
  // },
  computed: {
    selectedStoneInstance() {
      return this.$store.getters['editor/getSelectedStoneInstance']
    },
    anyCodeChanged() {
      return (
        this.startCode != this.selectedStoneInstance.startFunctionCode ||
        this.updateCode != this.selectedStoneInstance.updateFunctionCode
      )
    },
    editable() {
      return (
        this.selectedStoneInstance.stone.type == Cobble.Stone.Types.userDefined
      )
    }
  },
  watch: {
    instanceName(val) {
      this.selectedStoneInstance.name = val
      this.$store.dispatch('editor/saveProject')
    },
    selectedStoneInstance(val) {
      if (val == null) {
        this.$store.commit('navigation/mainPaneBack')
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/style/variables.scss';

.notice {
  color: $blue-middle;
}
.code-editor {
  background: $blue-dark;
  padding: 10px;
  border-radius: 5px;
  height: calc(100% - 20px);
  overflow-y: scroll;
}
input {
  background: $blue-extra-dark;
  padding: 10px 10px 11px;
  border-radius: 5px;
  margin-right: 3px !important;
  border: none;
  color: $white;
}
.input-name {
  width: 100%;
}
.state-variables {
  background: $blue-extra-dark;
  padding: 5px;
  border-radius: 5px;
  margin: 5px 0;
}

.prism-editor-wrapper {
  height: unset;
}
.code-editor-button {
  float: right;
}
.function-title {
  color: $blue-light;
}
.start-function-title {
  margin-top: 10px;
}
</style>
