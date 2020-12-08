import Stone from './Stone.js'

// Built-in cobblestone class
// These contain built-in functions with safe code, so they can be run without interpreter
class BuiltInStone extends Stone {
  constructor({
    name,
    role,
    state,
    startFunction,
    updateFunction,
    onlyOne = false
  }) {
    super({ name, role, state, onlyOne })
    this.startFunction = startFunction
    this.updateFunction = updateFunction
    this.type = Stone.Types.builtIn
  }

  start({ p5, p5Lib, state, instanceId, ml5 }) {
    super.start()
    state.setAddress(instanceId)
    this.startFunction({ p5, p5Lib, state, ml5, instanceId })
  }

  update({ p5, p5Lib, state, instanceId, ml5 }) {
    super.update()
    state.setAddress(instanceId)
    this.updateFunction({ p5, p5Lib, state, ml5, instanceId })
  }

  functionBodyString(fun) {
    const funString = fun.toString()
    const stateDeclaration = funString.indexOf('_ref.state;')
    const p5Declaration = funString.indexOf('_ref.p5;')
    const bodyStart =
      stateDeclaration > -1
        ? stateDeclaration + 12
        : p5Declaration > -1
        ? p5Declaration + 9
        : funString.indexOf('{') + 2
    const bodyEnd = funString.lastIndexOf('}') - 2
    return funString.substring(bodyStart, bodyEnd)
  }
  get startFunctionCode() {
    return this.functionBodyString(this.startFunction)
  }
  get updateFunctionCode() {
    return this.functionBodyString(this.updateFunction)
  }
}

export default BuiltInStone
