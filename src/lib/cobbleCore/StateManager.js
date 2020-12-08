export default class StateManager {
  constructor(stoneInstances) {
    this.stoneInstances = stoneInstances
    this.currentStoneInstance = null
  }

  setAddress(id) {
    this.currentStoneInstance = this.stoneInstances.find(
      stoneInstance => stoneInstance.id == id
    )
  }

  set(variableName, value) {
    const stateVariable = this.findVariable(variableName)
    stateVariable.value = value
  }

  setOnAddress(id, variableName, value) {
    const stoneInstance = this.stoneInstances.find(
      stoneInstance => stoneInstance.id == id
    )
    if (stoneInstance != null) {
      const stateVariable = stoneInstance.state.find(
        variable => variable.name == variableName
      )
      if (stateVariable != null) {
        stateVariable.value = value
      }
    }
  }

  get(variableName, index) {
    const stateVariable = this.findVariable(variableName)
    if (typeof stateVariable.value == 'object') {
      return stateVariable.value[index]
    } else {
      return stateVariable.value
    }
  }

  findVariable(variableName) {
    console.assert(this.currentStoneInstance != null)
    const stateVariable = this.currentStoneInstance.state.find(
      variable => variable.name == variableName
    )
    if (stateVariable == null) {
      console.log(`${variableName} not found`)
    }
    console.assert(stateVariable != null)
    return stateVariable
  }
}
