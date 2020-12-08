<template>
  <div class="connection-editor">
    <b-select
      class="connection-my-variable connection-select"
      v-model="connection.myVariableIndex"
    >
      <option
        v-for="(stateVariable, key) in connection.myStoneInstance
          .outputVariables"
        :key="key"
        :value="key"
        class="my-variable-option"
      >
        {{ stateVariable.name }}
      </option>
    </b-select>
    <template v-if="collapsed">
      <b-button
        class="button theme-blue collapse-button"
        @click="collapse(false)"
      >
        <b-icon icon="chevron-down" size="is-small" />
      </b-button>
    </template>
    <template v-else>
      <div
        v-if="connection.isInputValid && myVariable.length > 1"
        class="value-index"
      >
        vector component:
        <input
          class="value-index-input"
          type="number"
          min="0"
          :max="myVariable.length - 1"
          v-model.number="connection.myValueIndex"
        />
      </div>
      <b-button
        class="button theme-blue collapse-button"
        @click="collapse(true)"
      >
        <b-icon icon="chevron-up" size="is-small" />
      </b-button>
      to stone:
      <b-select
        class="connection-to-instance connection-select"
        v-model="connection.toStoneInstance"
      >
        <option
          v-for="(stoneInstance, key) in stoneInstances.filter(
            instance => instance.inputVariables.length > 0
          )"
          :key="key"
          :value="stoneInstance"
          class="to-instance-option"
        >
          {{ stoneInstance.name }}
        </option>
      </b-select>
      <template v-if="connection.toStoneInstance != null">
        variable:
        <b-select
          class="connection-to-variable connection-select"
          v-model="connection.toVariableIndex"
        >
          <option
            v-for="(stateVariable, key) in connection.toStoneInstance
              .inputVariables"
            :key="key"
            :value="key"
            class="to-variable-option"
          >
            {{ stateVariable.name }}
          </option>
        </b-select>
        <div
          v-if="connection.isOutputValid && toVariable.length > 1"
          class="value-index"
        >
          vector component:
          <input
            class="value-index-input"
            type="number"
            min="0"
            :max="toVariable.length - 1"
            v-model.number="connection.toValueIndex"
          />
        </div>
      </template>
      <div class="display-table">
        <b-button
          v-if="valid"
          :class="[
            'button connection-save-button mar-right-sm',
            changed ? 'theme-green' : 'theme-blue'
          ]"
          @click="save"
        >
          <b-icon icon="check" size="is-small"></b-icon>
          <span class="mar-left-sm">Save</span>
        </b-button>
        <b-button
          class="button connection-delete-button theme-red mar-right-sm"
          @click="$emit('delete')"
        >
          <b-icon icon="delete" size="is-small"></b-icon>
          <span class="mar-left-sm">Delete</span>
        </b-button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ['originalConnection'],
  data() {
    return {
      connection: this.originalConnection.getCopy(),
      collapsed: false
    }
  },
  methods: {
    save() {
      this.collapsed = true
      this.$emit('save', this.connection)
    },
    collapse(val) {
      this.collapsed = val
    }
  },
  computed: {
    stoneInstances() {
      return this.$store.getters['editor/stoneInstances'].filter(
        instance => instance != this.connection.myStoneInstance
      )
    },
    selectedStoneInstance() {
      return this.$store.getters['editor/getSelectedStoneInstance']
    },
    myOutputVariables() {
      return this.connection.myStoneInstance.outputVariables
    },
    myVariable() {
      return this.connection.isInputValid
        ? this.connection.myStoneInstance.outputVariables[
            this.connection.myVariableIndex
          ]
        : null
    },
    toVariable() {
      return this.connection.isOutputValid
        ? this.connection.toStoneInstance.inputVariables[
            this.connection.toVariableIndex
          ]
        : null
    },
    valid() {
      return this.connection.isValid
    },
    changed() {
      return !this.connection.compare(this.originalConnection)
    }
  },
  watch: {
    valid() {
      //console.log(`Valid is now ${val}`)
    },
    selectedStoneInstance() {
      this.connection = this.originalConnection.getCopy()
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/style/variables.scss';

.connection-editor {
  background: $blue-dark;
  padding: 5px 5px 7px;
  border-radius: 5px;
  margin-bottom: 5px;
  position: relative;
}
.collapse-button {
  position: absolute !important;
  top: 5px;
  right: 5px;
}
.connection-select .select select {
  background: $blue-extra-dark;
  color: $blue-extra-light;
  border: none;
  border-radius: 5px;
  margin-right: 3px !important;
}
.connection-select .select select:active,
.connection-select .select select:hover {
  box-shadow: none;
}
.connection-select .select option {
  color: $blue-extra-light;
}
.connection-delete-button,
.connection-save-button {
  float: left;
  margin-top: 5px;
  display: block;
}
.display-table {
  display: table;
}
</style>
