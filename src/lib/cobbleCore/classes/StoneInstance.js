import uuidv4 from 'uuid/v4'
import StateVariable from './StateVariable.js'

// Cobblestone instance
// When a stone is added to the project, an instance is made. This instance contains the configuration.
class StoneInstance {
  constructor({
    stone,
    id = null,
    name = null,
    state = null,
    connections = [],
    connectionsData = null,
    startFunctionCode = null,
    updateFunctionCode = null,
    x = 0,
    y = 0
  }) {
    this.id = id == null ? uuidv4() : id
    this.stone = stone
    this.name = name == null ? `${this.stone.name} #${this.id.slice(30)}` : name
    // copy the stone's default state to the instance:
    this.state =
      state == null
        ? stone.state.map(stateVariable => stateVariable.getCopy())
        : state
    this.selected = false
    this.connections = connections
    this.connectionsData = connectionsData

    // Copy stones code to the instance, allow for editing
    this.startFunctionCode =
      startFunctionCode == null ? stone.startFunctionCode : startFunctionCode
    this.updateFunctionCode =
      updateFunctionCode == null ? stone.updateFunctionCode : updateFunctionCode

    // Editor variables:

    // position
    this.x = x
    this.y = y

    // later set by vue component when created
    // visible dom element in the editor
    this.editorComponent = null
    this.editorElement = null
  }

  start({ p5, p5Lib, state, interpreter, instanceId, ml5 }) {
    this.stone.start({
      p5,
      p5Lib,
      state,
      interpreter,
      instanceId,
      instanceStartFunctionCode: this.startFunctionCode,
      ml5
    })
  }

  update({ p5, p5Lib, state, interpreter, instanceId, ml5 }) {
    this.stone.update({
      p5,
      p5Lib,
      state,
      interpreter,
      instanceId,
      instanceUpdateFunctionCode: this.updateFunctionCode,
      ml5
    })
  }

  get inputVariables() {
    return this.state
      ? this.state.filter(stateVariable => stateVariable.isInput)
      : []
  }
  get outputVariables() {
    return this.state
      ? this.state.filter(stateVariable => stateVariable.isOutput)
      : []
  }

  serialize() {
    console.log(`serializing stoneInstance ${this.name}`)
    return {
      id: this.id,
      name: this.name,
      startFunctionCode: this.startFunctionCode,
      updateFunctionCode: this.updateFunctionCode,
      stoneName: this.stone.name,
      state: this.state.map(stateVariable => stateVariable.serialize()),
      connections: this.connections.map(connection => connection.serialize()),
      x: this.x,
      y: this.y
    }
  }

  static Deserialize({ data, stoneList }) {
    return new StoneInstance({
      stone: stoneList.find(stone => stone.name == data.stoneName),
      id: data.id,
      name: data.name,
      state: data.state.map(stateVariableData =>
        StateVariable.Deserialize({ data: stateVariableData })
      ),
      connections: [], // the connections are later restored when all the stoneInstances are there
      connectionsData: data.connections,
      startFunctionCode: data.startFunctionCode,
      updateFunctionCode: data.updateFunctionCode,
      x: data.x,
      y: data.y
    })
  }
}

export default StoneInstance
