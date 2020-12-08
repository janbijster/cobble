import Stone from './Stone.js'

// User defined cobblestone class
// These are written by users, so the start and update functions should be run with an interpreter
class UserDefinedStone extends Stone {
  constructor({ name, role, state, startFunctionCode, updateFunctionCode }) {
    super({ name, role, state })
    this.startFunctionCode = startFunctionCode
    this.updateFunctionCode = updateFunctionCode
    this.type = Stone.Types.userDefined
  }
  start({ interpreter, instanceId, instanceStartFunctionCode }) {
    super.start()
    interpreter.appendCode(`state.setAddress("${instanceId}");\n`)
    interpreter.appendCode(instanceStartFunctionCode)
    interpreter.run()
  }

  update({ interpreter, instanceId, instanceUpdateFunctionCode }) {
    super.update()
    interpreter.appendCode(`state.setAddress("${instanceId}");\n`)
    interpreter.appendCode(instanceUpdateFunctionCode)
    interpreter.run()
  }
}

export default UserDefinedStone
