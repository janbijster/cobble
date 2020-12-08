import Cobble from '@/lib/cobbleCore/cobbleCore.js'
import uuidv4 from 'uuid/v4'

const storeData = (key, data) => localStorage.setItem(key, data)

const hasData = key => localStorage.getItem(key) != null

const getData = key => localStorage.getItem(key)

export default {
  namespaced: true,
  state: {
    projectName: 'New project',
    projectId: null,
    stoneInstances: []
  },
  getters: {
    projectName(state) {
      return state.projectName
    },
    stoneInstancesPerRole(state) {
      return role =>
        state.stoneInstances.filter(
          stoneInstance => stoneInstance.stone.role == role
        )
    },
    stoneInstances(state) {
      return state.stoneInstances
    },
    getProject(state) {
      return new Cobble.Project({
        name: state.projectName,
        id: state.projectId,
        stoneInstances: state.stoneInstances
      })
    },
    getSelectedStoneInstance(state) {
      return state.stoneInstances.find(instance => instance.selected)
    },
    getStoneIndex(state) {
      return stoneInstance =>
        state.stoneInstances.findIndex(instance => instance == stoneInstance)
    },
    allConnections(state) {
      return state.stoneInstances.reduce((connections, stoneInstance) => {
        return [...connections, ...stoneInstance.connections]
      }, [])
    }
  },
  mutations: {
    newProject(state) {
      state.projectName = 'New project'
      state.projectId = uuidv4()
      state.stoneInstances = []
    },
    openProject(state, project) {
      state.projectName = project.name
      state.projectId = project.id
      state.stoneInstances = project.stoneInstances
    },
    setProjectName(state, name) {
      state.projectName = name
    },
    addStone(state, { stone, x = 0, y = 0 }) {
      if (stone.onlyOne) {
        if (
          state.stoneInstances.findIndex(
            stoneInstance => stoneInstance.stone == stone
          ) > -1
        ) {
          alert(
            'This cobblestone can only be added once, but you can use multiple connections.'
          )
          return
        }
      }
      const newStoneInstance = new Cobble.StoneInstance({ stone, x, y })
      state.stoneInstances.push(newStoneInstance)
      this.commit('editor/orderStones')
      this.dispatch('editor/saveProject')
    },
    selectStoneInstance(state, { stoneInstanceToSelect }) {
      state.stoneInstances.forEach(stoneInstance => {
        stoneInstance.selected = stoneInstance == stoneInstanceToSelect
      })
      this.commit('navigation/removeComponentFromPanes', 'stone inspector')
      if (stoneInstanceToSelect) {
        this.commit('navigation/openInSidePane', 'stone inspector')
      }
    },
    moveStoneUp(state, stoneInstance) {
      let index = this.getters['editor/getStoneIndex'](stoneInstance)
      // find stone of same role with highest index lower than this
      let swapStoneIndex = -1
      if (index == 0) {
        return
      }
      for (let i = index - 1; i >= 0; i--) {
        if (state.stoneInstances[i].stone.role == stoneInstance.stone.role) {
          swapStoneIndex = i
          break
        }
      }
      if (swapStoneIndex > -1) {
        this.commit('editor/swapStones', {
          oldIndex: index,
          newIndex: swapStoneIndex
        })
        this.dispatch('editor/saveProject')
      }
    },
    deleteStoneInstance(state, stoneInstance) {
      let index = this.getters['editor/getStoneIndex'](stoneInstance)
      if (index > -1) {
        state.stoneInstances.splice(index, 1)
        this.commit('editor/deleteConnectionsTo', {
          toStoneInstance: stoneInstance
        })
        this.dispatch('editor/saveProject')
      } else {
        console.log('stoneInstance not found')
      }
    },
    swapStones(state, { oldIndex, newIndex }) {
      if (newIndex != oldIndex) {
        state.stoneInstances.splice(
          newIndex,
          0,
          state.stoneInstances.splice(oldIndex, 1)[0]
        )
        this.dispatch('editor/saveProject')
      }
    },
    orderStones(state) {
      state.stoneInstances.sort((stoneA, stoneB) => stoneA.x - stoneB.x)
      // console.log(state.stoneInstances)
    },
    deleteConnectionsTo(
      state,
      { toStoneInstance, toVariableIndex, toValueIndex }
    ) {
      state.stoneInstances.forEach(stoneInstance => {
        stoneInstance.connections = stoneInstance.connections.filter(
          connection =>
            !(
              connection.toStoneInstance == toStoneInstance &&
              (connection.toVariableIndex == toVariableIndex ||
                toVariableIndex == undefined) &&
              (connection.toValueIndex == toValueIndex ||
                toValueIndex == undefined)
            )
        )
      })
    },
    saveCode(state, { stoneInstance, startFunctionCode, updateFunctionCode }) {
      if (
        stoneInstance == null ||
        stoneInstance.stone.type != Cobble.Stone.Types.userDefined
      ) {
        console.warn(`Not a valid cobble stone instance selected`)

        return
      }
      stoneInstance.startFunctionCode = startFunctionCode
      stoneInstance.updateFunctionCode = updateFunctionCode
      this.dispatch('editor/saveProject')
    }
  },
  actions: {
    saveProject({ getters }) {
      storeData('project', getters.getProject.toJson())
    },
    initialize({ commit }) {
      let hasProjects = hasData('project')
      if (hasProjects) {
        let projectData = getData('project')
        try {
          let project = Cobble.ProjectList.ProjectFromJson(projectData)
          commit('openProject', project)
        } catch (e) {
          console.log('error opening project: ', e)
        }
      }
    }
  }
}
