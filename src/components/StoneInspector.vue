<template>
  <div class="stone-inspector window theme-dark">
    <div v-if="selectedStoneInstance == null">
      No stone selected
    </div>
    <div v-else class="stone-inspector-contents">
      <div class="stone-name">{{ selectedStoneInstance.name }}</div>
      <div class="stone-subtitle">
        <div class="stone-type">{{ selectedStoneInstance.stone.type }}</div>
        &emsp;|&emsp;
        <div class="stone-role">{{ selectedStoneInstance.stone.role }}</div>
      </div>
      <div
        v-if="selectedStoneInstance.stone.type == CobbleStoneTypes.userDefined"
      >
        <b-button
          class="button code-button theme-orange"
          expanded
          @click="editCode"
          >Edit</b-button
        >
      </div>
      <div v-else>
        <b-button
          class="button code-button theme-orange"
          expanded
          @click="editCode"
          >Edit</b-button
        >
      </div>
      <!-- <b-button
        expanded
        class="button order-button theme-blue-light"
        @click="moveUp"
      >
        <b-icon icon="arrow-up" size="is-small"></b-icon>
        <span class="mar-left-sm">Move up</span>
      </b-button> -->
      <div class="connections-title">Connections</div>
      <div class="connections-holder">
        <connection-editor
          v-for="(connection, index) in selectedStoneInstance.connections"
          :key="index"
          :original-connection="connection"
          @delete="deleteConnection(index)"
          @save="saveConnection($event, index)"
        />
        <template v-if="selectedStoneInstance.outputVariables.length > 0">
          <b-button class="button new-button theme-blue" @click="newConnection">
            <b-icon icon="plus" size="is-small"></b-icon>
            <span class="mar-left-sm">New</span>
          </b-button>
        </template>
        <template v-else>
          <div class="no-variables-notice">No variables to send out</div>
        </template>
      </div>
      <div class="button delete-button theme-red" @click="deleteStone">
        Delete
      </div>
    </div>
  </div>
</template>

<script>
import Cobble from '@/lib/cobbleCore/cobbleCore.js'
import ConnectionEditor from '@/components/ConnectionEditor'

export default {
  name: 'StoneInspector',
  components: { ConnectionEditor },
  data() {
    return {
      CobbleStoneTypes: Cobble.Stone.Types
    }
  },
  methods: {
    moveUp() {
      this.$store.commit('editor/moveStoneUp', this.selectedStoneInstance)
    },
    deleteStone() {
      this.$store.commit(
        'editor/deleteStoneInstance',
        this.selectedStoneInstance
      )
    },
    editCode() {
      this.$store.commit('navigation/openInMainPane', 'code editor')
    },
    newConnection() {
      this.selectedStoneInstance.connections.push(
        new Cobble.Connection({ myStoneInstance: this.selectedStoneInstance })
      )
    },
    saveConnection(connection, index) {
      this.$set(
        this.selectedStoneInstance.connections,
        index,
        connection.getCopy()
      )
      this.$store.dispatch('editor/saveProject')
    },
    deleteConnection(index) {
      this.selectedStoneInstance.connections.splice(index, 1)
      this.$store.dispatch('editor/saveProject')
    }
  },
  computed: {
    selectedStoneInstance() {
      return this.$store.getters['editor/getSelectedStoneInstance']
    }
  },
  watch: {
    selectedStoneInstance(val) {
      // console.log('Stone change')
      if (val == null) {
        this.$store.commit('navigation/sidePaneBack')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';

.tone-inspector-contents {
  position: relative;
}
.stone-name {
  text-align: center;
  color: $blue-extra-light;
}
.stone-subtitle,
.no-variables-notice {
  text-align: center;
}
.stone-role,
.stone-type {
  display: inline;
}
.order-buttons {
  text-align: center;
}
.order-button,
.code-button {
  margin-bottom: 5px;
}
.connections-holder {
  margin: 5px 0;
  padding: 5px;
  background: $blue-extra-dark;
  border-radius: 5px;
  position: absolute;
  top: 155px;
  bottom: 35px;
  left: 10px;
  right: 10px;
  overflow-y: scroll;
}
.connections-title {
  color: $blue-extra-light;
  text-align: center;
  margin-top: 5px;
}
.delete-button {
  position: absolute;
  bottom: 0;
  right: 10px;
  left: 10px;
}
</style>
