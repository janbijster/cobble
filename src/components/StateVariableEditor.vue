<template>
  <div class="state-variable-editor">
    <template v-if="!editable">
      <div class="state-variable-name-display">{{ stateVariable.name }}</div>
      <div class="state-variable-type-display">
        {{ stateVariable.type.name }}
      </div>
    </template>
    <template v-else>
      <input class="state-variable-name" v-model="stateVariable.name" />
      <b-select class="state-variable-type" v-model="stateVariableType">
        <option
          v-for="(type, key) in variableTypes"
          :key="key"
          :value="type"
          class="state-variable-type-option"
        >
          {{ type.name }}
        </option>
      </b-select>
      <b-button
        class="button order-button theme-red mar-right-sm"
        @click="$emit('delete')"
      >
        <b-icon icon="delete" size="is-small"></b-icon>
        <span class="mar-left-sm">Delete</span>
      </b-button>
    </template>
    <b-button
      :class="[
        'button order-button mar-right-sm',
        anythingChanged ? 'theme-green' : 'theme-blue'
      ]"
      @click="save"
    >
      <b-icon icon="check" size="is-small"></b-icon>
      <span class="mar-left-sm">Save</span>
    </b-button>
    <b-button
      :class="[
        'button order-button mar-right-sm',
        anythingChanged ? 'theme-orange' : 'theme-blue'
      ]"
      @click="reset"
    >
      <b-icon icon="cancel" size="is-small"></b-icon>
      <span class="mar-left-sm">Reset</span>
    </b-button>
    <div class="variable-value">
      <template v-if="stateVariable.type == variableTypes.number">
        <input
          type="number"
          class="value-number"
          v-model.number="stateVariable.value"
        />
      </template>
      <template v-else-if="stateVariable.type == variableTypes.string">
        <input class="value-string" v-model="stateVariable.value" />
      </template>
      <template v-else-if="stateVariable.type == variableTypes.vector">
        <template v-if="editable">
          length:
          <input
            class="value-vector-length"
            type="number"
            min="1"
            v-model.number="vectorSize"
          />
          values:
        </template>
        <input
          class="value-vector-component"
          type="number"
          v-for="(value, index) in stateVariable.value"
          :key="index"
          v-model.number="stateVariable.value[index]"
        />
      </template>
    </div>
  </div>
</template>

<script>
import Cobble from '@/lib/cobbleCore/cobbleCore.js'

export default {
  props: ['originalStateVariable', 'editable'],
  data() {
    return {
      stateVariable: this.originalStateVariable.getCopy(),
      vectorSize: this.isVector
        ? this.originalStateVariable.value.length
        : null,
      stateVariableType: this.originalStateVariable.type
    }
  },
  mounted() {
    if (this.isVector) {
      this.vectorSize = this.stateVariable.value.length
    }
  },
  methods: {
    save() {
      this.$emit('save', this.stateVariable)
    },
    reset() {
      this.stateVariable = this.originalStateVariable.getCopy()
    }
  },
  computed: {
    isVector() {
      return this.stateVariable.type == this.variableTypes.vector
    },
    variableTypes() {
      return Cobble.StateVariable.Types
    },
    anythingChanged() {
      return !this.stateVariable.compare(this.originalStateVariable)
    }
  },
  watch: {
    vectorSize(val) {
      if (this.isVector) {
        this.stateVariable.value.length = val
      }
    },
    stateVariableType(type) {
      this.stateVariable.type = type
      this.vectorSize = this.isVector ? this.stateVariable.value.length : null
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/style/variables.scss';

.state-variable-editor {
  background: $blue-dark;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
}

.state-variable-name-display,
.state-variable-type-display,
.state-variable-value-display {
  display: inline-block;
  margin-right: 10px;
}
.state-variable-name-display {
  color: $white;
}
.state-variable-type-display {
  color: $blue-middle;
}

.state-variable-type {
  display: inline-block;
  vertical-align: middle;
}
.state-variable-type .select select {
  background: $blue-extra-dark;
  color: $blue-extra-light;
  border: none;
  border-radius: 5px;
  margin-right: 3px !important;
}
.state-variable-type .select select:active,
.state-variable-type .select select:hover {
  box-shadow: none;
}
.state-variable-type .select option {
  color: $blue-extra-light;
}
input {
  background: $blue-extra-dark;
  padding: 10px 10px 11px;
  border-radius: 5px;
  margin-right: 3px !important;
  border: none;
  color: $white;
  width: 100px;
}
.state-variable-name {
  width: 200px;
}
.order-button {
  float: right;
}
.variable-value {
  margin-top: 5px;
}
</style>
