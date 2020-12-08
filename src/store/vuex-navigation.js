const mainPaneComponents = [
  {
    name: 'Editor',
    componentName: 'project-editor',
    default: true
  },
  {
    name: 'Run',
    componentName: 'run-project-iframe'
  },
  {
    name: 'Code editor',
    componentName: 'code-editor'
  }
]
const sidePaneComponents = [
  {
    name: 'Stone browser',
    componentName: 'stone-browser',
    default: true
  },
  {
    name: 'Stone inspector',
    componentName: 'stone-inspector'
  },
  {
    name: 'Code editor',
    componentName: 'code-editor'
  }
]

export default {
  namespaced: true,
  state: {
    sidePaneComponentStack: [sidePaneComponents.find(comp => comp.default)],
    mainPaneComponentStack: [mainPaneComponents.find(comp => comp.default)]
  },
  getters: {
    sidePaneComponent: state => state.sidePaneComponentStack.slice(-1)[0],
    mainPaneComponent: state => state.mainPaneComponentStack.slice(-1)[0],
    sidePaneBackAvailable: state => state.sidePaneComponentStack.length > 1,
    mainPaneBackAvailable: state => state.mainPaneComponentStack.length > 1,
    sidePaneComponentStack: state => state.sidePaneComponentStack,
    mainPaneComponentStack: state => state.mainPaneComponentStack
  },
  mutations: {
    openInSidePane(state, componentName) {
      const foundComponent = sidePaneComponents.find(
        comp => comp.name.toLowerCase() === componentName.toLowerCase()
      )
      if (
        foundComponent != null &&
        foundComponent != state.sidePaneComponentStack.slice(-1)[0]
      ) {
        //check if component is already in the stack
        const toIndex = state.sidePaneComponentStack.findIndex(
          comp => comp == foundComponent
        )
        if (toIndex > -1) {
          // if so, go back to that one
          let stepsBack = state.sidePaneComponentStack.length - toIndex - 1
          for (let i = 0; i < stepsBack; i++) {
            this.commit('navigation/sidePaneBack')
          }
        } else {
          //if not, add it to the stack
          state.sidePaneComponentStack.push(foundComponent)
        }
      }
    },
    sidePaneBack(state) {
      if (state.sidePaneComponentStack.length > 1) {
        state.sidePaneComponentStack.splice(-1, 1)
      }
    },
    openInMainPane(state, componentName) {
      const foundComponent = mainPaneComponents.find(
        comp => comp.name.toLowerCase() === componentName.toLowerCase()
      )
      if (
        foundComponent != null &&
        foundComponent != state.mainPaneComponentStack.slice(-1)[0]
      ) {
        //check if component is already in the stack
        const toIndex = state.mainPaneComponentStack.findIndex(
          comp => comp == foundComponent
        )
        if (toIndex > -1) {
          // if so, go back to that one
          let stepsBack = state.mainPaneComponentStack.length - toIndex - 1
          for (let i = 0; i < stepsBack; i++) {
            this.commit('navigation/mainPaneBack')
          }
        } else {
          //if not, add it to the stack
          state.mainPaneComponentStack.push(foundComponent)
        }
      }
    },
    mainPaneBack(state) {
      if (state.mainPaneComponentStack.length > 1) {
        state.mainPaneComponentStack.splice(-1, 1)
      }
    },
    removeComponentFromPanes(state, componentName) {
      state.sidePaneComponentStack = state.sidePaneComponentStack.filter(
        comp => comp.name.toLowerCase() !== componentName.toLowerCase()
      )
      state.mainPaneComponentStack = state.mainPaneComponentStack.filter(
        comp => comp.name.toLowerCase() !== componentName.toLowerCase()
      )
    }
  },
  actions: {}
}
